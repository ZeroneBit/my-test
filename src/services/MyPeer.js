import { EventEmitter } from 'eventemitter3';
import Peer from 'peerjs';

import { EventTypes, PeerEvents } from './MyEnums';
import MyFile from './MyFile';

export default class MyPeer extends EventEmitter {

    constructor() {
        super();

        this.CHUNK_SIZE = 500 * 1024;

        this.peer = null;
        this.pairs = {};
        this.outgoing = [];

        this._initializePeer();
    }

    //publics

    abortFiles() {
        for (let pair of this.pairs.values()) {
            for (let ic of pair.incoming) {
                if (ic.file) {
                    ic.abort();
                }
            }
        }
    }

    requestFileInfos(remoteId) {
        this._ensureConnection(remoteId, (conn) => {
            const message = {
                type: EventTypes.Request_File_Infos,
            };
            conn.send(message);
        });

        return PeerEvents.Info_Got;
    }

    downloadFile(remoteId, fileInfo) {
        let inc = this.pairs[remoteId].incoming.find(f => f.name === fileInfo.name);
        Object.assign(inc, {
            file: new MyFile({ name: inc.name, size: inc.size }),
        });

        this._requestFileChunk(remoteId, fileInfo, 0);
    }

    setOutgingFiles(files) {
        if (files) {
            for (let i = 0; i < files.length; i++) {
                let f = files.item(i);
                if (this.outgoing.findIndex(o => o.name == f.name) < 0) {
                    this.outgoing.push(f);
                }
            }
        }
    }


    //privates
    _initializePeer() {
        this.peer = new Peer(null, {
            debug: 3,
            confi: {
                'iceServers': [
                    { url: 'stun:stun.services.mozilla.com' },
                    { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' }
                ],
            },
        });

        this.peer.on('open', this._peerOpen.bind(this));
        this.peer.on('connection', this._peerConnection.bind(this));
        this.peer.on('disconnected', this._peerDisconnected.bind(this));
        this.peer.on('close', this._peerClose.bind(this));
        this.peer.on('error', this._peerError.bind(this));
    }
    _peerOpen(id) {
        this.emit(PeerEvents.Peer_Opened, id);
    }
    _peerConnection(conn) {
        let pair = this.pairs[conn.peer];
        if (!pair || !pair.conn || !pair.conn.open) {
            this.pairs[conn.peer] = { conn };
            console.log("_peerConnection " + conn.open);
            this._initializeConnection(conn);
        }
    }
    _peerDisconnected() { }
    _peerClose() { }
    _peerError(err) {
        console.error("Peer error " + err.type);
        console.error(err);
    }

    _ensureConnection(remoteId, callback) {
        let pair = this.pairs[remoteId];
        if (!pair) {
            this.pairs[remoteId] = {};
            pair = this.pairs[remoteId];
        }
        if (!pair.conn || !pair.conn.open) {
            pair.conn = this.peer.connect(remoteId)
            console.log("this.peer.connect" + pair.conn.open);
            this._initializeConnection(pair.conn, callback);
            return;
        }

        callback && callback(pair.conn);
    }
    _initializeConnection(conn, openCallback) {
        conn.on('open', () => {
            console.log("conn opened");
            openCallback && openCallback(conn);
        });
        conn.on('data', (data) => {
            this._onJSONData(data, conn);
        });
        conn.on('error', (err) => { this._connError(err, conn); });
        conn.on('close', () => { this._connClose(conn); });
    }

    _connError(err, conn) {
        console.error(err);
    }
    _connClose(conn) {
        console.error("conn closed");
    }

    _onJSONData(data, conn) {
        switch (data.type) {
            case EventTypes.Request_File_Infos: {
                const message = {
                    type: EventTypes.Response_File_INfos,
                    payload: Array.from(this.outgoing, function (f) { return { name: f.name, size: f.size, type: f.type, peer: this.id }; }, this.peer),
                };
                conn.send(message);
            } break;
            case EventTypes.Response_File_INfos: {
                let pair = this.pairs[conn.peer];
                if (pair.incoming) {
                    for (let f of data.payload) {
                        let inc = pair.incoming.find(i => i.name === f.name);
                        if (!inc) {
                            pair.incoming.push(f);
                        }
                    }
                } else {
                    pair.incoming = data.payload;
                }

                this.emit(PeerEvents.Info_Got, conn.peer, data.payload);
            } break;

            case EventTypes.Request_File_Chunk: {
                this._sendFileChunk(data.payload, conn);
            } break;
            case EventTypes.Response_File_Chunk: {
                this._receiveFileChunk(data.payload, conn);
            } break;
            default: console.error('Unknown message: ' + data);
        }
    }

    _requestFileChunk(remoteId, fileInfo, chunkIndex) {
        this._ensureConnection(remoteId, (conn) => {
            const message = {
                type: EventTypes.Request_File_Chunk,
                payload: {
                    fileInfo: {
                        name: fileInfo.name,
                    },
                    index: chunkIndex
                },
            };
            conn.send(message);
        });
    }

    _receiveFileChunk(payload, conn) {
        let { index, fileInfo, data, last } = payload;
        let iFile = this.pairs[conn.peer].incoming.find(f => f.name === fileInfo.name);
        iFile.file.append(data, (speed, progress) => {
            if (last) {
                iFile.file.close();
                this.emit(PeerEvents.File_Got, iFile);
            }
            else {
                this.emit(PeerEvents.File_Progress, iFile, speed, progress);

                this._requestFileChunk(conn.peer, fileInfo, index + 1);
            }
        });
    }

    _sendFileChunk(payload, conn) {
        const reader = new FileReader();

        let fileInfo = payload.fileInfo;
        let index = payload.index;
        let blob = this.outgoing.find(f => f.name === fileInfo.name);
        let isLastChunk = false;
        let start = index * this.CHUNK_SIZE;
        let end = start + this.CHUNK_SIZE;
        if (end >= blob.size) {
            end = blob.size;
            isLastChunk = true;
        }
        let slice = blob.slice || blob.mozSlice || blob.webkitSlice;
        let slicedBlob = slice.call(blob, start, end);

        reader.onload = function (event) {
            if (reader.readyState !== FileReader.DONE) {
                return;
            }
            const blockBuffer = event.target.result;
            const message = {
                type: EventTypes.Response_File_Chunk,
                payload: {
                    index: index,
                    fileInfo: fileInfo,
                    data: blockBuffer,
                    last: isLastChunk,
                },
            };
            conn.send(message);
        }
        reader.readAsArrayBuffer(slicedBlob);
    }

}