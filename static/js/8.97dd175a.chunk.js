(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{104:function(e,n,t){"use strict";var i=t(22),o=t(12),r=t(25),a=t(23),s=t(24),l=t(115),c=t(116),u=t.n(c),f=t(88),p=t(118),h=t.n(p),d=function(){function e(n){Object(i.a)(this,e),this.size=n.size,this.name=n.name,this.create=!0,this.fileStream=h.a.createWriteStream(this.name,{size:this.size}),this.writer=this.fileStream.getWriter(),Object.defineProperty(Blob.prototype,"stream",{configurable:!0,enumerable:!0,writable:!0,value:function(){return new Response(this).body}})}return Object(o.a)(e,[{key:"append",value:function(e,n){var t=this;console.log(e.byteLength);var i=new Blob([e]).stream().getReader();!function e(){return i.read().then(function(i){i.done?n():t.writer.write(i.value).then(e)})}()}},{key:"close",value:function(){this.writer.close()}},{key:"_reset",value:function(){}}]),e}();t.d(n,"a",function(){return _});var _=function(e){function n(){var e;return Object(i.a)(this,n),(e=Object(r.a)(this,Object(a.a)(n).call(this))).CHUNK_SIZE=16777216,e.peer=null,e.pairs={},e.outgoing=[],e._initializePeer(),e}return Object(s.a)(n,e),Object(o.a)(n,[{key:"requestFileInfos",value:function(e){return this._ensureConnection(e,function(e){console.log("sending request "+e.open);var n={type:f.a.Request_File_Infos};e.send(n)}),f.b.Info_Got}},{key:"downloadFile",value:function(e,n){var t=this.pairs[e].incoming.find(function(e){return e.name===n.name});Object.assign(t,{file:new d({name:t.name,size:t.size})}),this._requestFileChunk(e,n,0)}},{key:"setOutgingFiles",value:function(e){var n=this;if(e)for(var t=function(t){var i=e.item(t);n.outgoing.findIndex(function(e){return e.name==i.name})<0&&n.outgoing.push(i)},i=0;i<e.length;i++)t(i)}},{key:"_initializePeer",value:function(){this.peer=new u.a(null,{debug:3,confi:{iceServers:[{url:"stun:stun.services.mozilla.com"},{url:"turn:numb.viagenie.ca",credential:"muazkh",username:"webrtc@live.com"}]}}),this.peer.on("open",this._peerOpen.bind(this)),this.peer.on("connection",this._peerConnection.bind(this)),this.peer.on("disconnected",this._peerDisconnected.bind(this)),this.peer.on("close",this._peerClose.bind(this)),this.peer.on("error",this._peerError.bind(this))}},{key:"_peerOpen",value:function(e){this.emit(f.b.Peer_Opened,e)}},{key:"_peerConnection",value:function(e){var n=this.pairs[e.peer];n&&n.conn&&n.conn.open||(this.pairs[e.peer]={conn:e},console.log("_peerConnection "+e.open),this._initializeConnection(e))}},{key:"_peerDisconnected",value:function(){}},{key:"_peerClose",value:function(){}},{key:"_peerError",value:function(e){console.error("Peer error "+e.type),console.error(e)}},{key:"_ensureConnection",value:function(e,n){var t=this.pairs[e];if(t||(this.pairs[e]={},t=this.pairs[e]),!t.conn||!t.conn.open)return t.conn=this.peer.connect(e),console.log("this.peer.connect"+t.conn.open),void this._initializeConnection(t.conn,n);n&&n(t.conn)}},{key:"_initializeConnection",value:function(e,n){var t=this;e.on("open",function(){console.log("conn opened"),n&&n(e)}),e.on("data",function(n){void 0!==n.byteLength||t._onJSONData(n,e)}),e.on("error",function(n){t._connError(n,e)}),e.on("close",function(){t._connClose(e)})}},{key:"_connError",value:function(e,n){console.error(e)}},{key:"_connClose",value:function(e){console.error("conn closed")}},{key:"_onJSONData",value:function(e,n){switch(e.type){case f.a.Request_File_Infos:var t={type:f.a.Response_File_INfos,payload:Array.from(this.outgoing,function(e){return{name:e.name,size:e.size,type:e.type,peer:this.id}},this.peer)};n.send(t);break;case f.a.Response_File_INfos:this.pairs[n.peer].incoming=e.payload,this.emit(f.b.Info_Got,n.peer,e.payload);break;case f.a.Request_File_Chunk:this._sendFileChunk(e.payload,n);break;case f.a.Response_File_Chunk:this._receiveFileChunk(e.payload,n);break;default:console.error("Unknown message: "+e)}}},{key:"_requestFileChunk",value:function(e,n,t){this._ensureConnection(e,function(e){console.log("download file "+e.open);var i={type:f.a.Request_File_Chunk,payload:{fileInfo:{name:n.name},index:t}};e.send(i)})}},{key:"_receiveFileChunk",value:function(e,n){var t=this,i=e.index,o=e.fileInfo,r=e.data,a=e.last,s=this.pairs[n.peer].incoming.find(function(e){return e.name===o.name});s.file.append(r,function(){a?(s.file.close(),t.emit(f.b.File_Got,o)):(t.emit(f.b.File_Progress,o,i*t.CHUNK_SIZE),t._requestFileChunk(n.peer,o,i+1))})}},{key:"_sendFileChunk",value:function(e,n){var t=new FileReader,i=e.fileInfo,o=e.index,r=this.outgoing.find(function(e){return e.name===i.name}),a=!1,s=o*this.CHUNK_SIZE,l=s+this.CHUNK_SIZE;l>=r.size&&(l=r.size,a=!0);var c=(r.slice||r.mozSlice||r.webkitSlice).call(r,s,l);t.onload=function(e){if(t.readyState===FileReader.DONE){var r=e.target.result,s={type:f.a.Response_File_Chunk,payload:{index:o,fileInfo:i,data:r,last:a}};n.send(s)}},t.readAsArrayBuffer(c)}}]),n}(l.EventEmitter)},117:function(e,n){function t(e){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}t.keys=function(){return[]},t.resolve=t,e.exports=t,t.id=117},181:function(e,n,t){"use strict";t.r(n);var i=t(22),o=t(12),r=t(25),a=t(23),s=t(24),l=t(0),c=t.n(l),u=t(175),f=t(79),p=t(174),h=t(182),d=t(183),_=t(184),m=t(185),v=t(186),y=t(137),b=t(11),g=t(142),k=t.n(g),F=t(143),w=t.n(F),C=t(104),I=t(88),O=function(e){function n(e){var t;return Object(i.a)(this,n),(t=Object(r.a)(this,Object(a.a)(n).call(this,e))).remoteId=e.match.params.id,t.myPeer=null,t.state={peerFiles:[]},t}return Object(s.a)(n,e),Object(o.a)(n,[{key:"componentWillMount",value:function(){this.myPeer=new C.a,this.initializeMyPeer()}},{key:"initializeMyPeer",value:function(){var e=this;this.myPeer.on(I.b.Peer_Opened,function(e){console.log(e)}),this.myPeer.on(I.b.Info_Got,function(n,t){console.log(t),e.setState({peerFiles:t})}),this.myPeer.on(I.b.File_Progress,function(e,n){console.log("got "+n)}),this.myPeer.on(I.b.File_Got,function(n){e.state.peerFiles.find(function(e){return e.name===n.name}).downloading=!1,e.setState({}),console.log("finished")})}},{key:"retriveFileInfos",value:function(e){this.myPeer.requestFileInfos(this.remoteId)}},{key:"downloadFile",value:function(e,n){console.log(n),n.downloading=!0,this.setState({}),this.myPeer.downloadFile(this.remoteId,n)}},{key:"render",value:function(){var e=this.props.classes;return c.a.createElement("div",null,c.a.createElement(u.a,{variant:"contained",component:"span",className:e.button,color:"primary",onClick:this.retriveFileInfos.bind(this)},"Retrive Files"),this.state.peerFiles&&this.state.peerFiles.length&&this.renderFileInfos())}},{key:"renderFileInfos",value:function(){var e=this,n=this.props.classes;return c.a.createElement("div",null,c.a.createElement(f.a,{variant:"h6",className:n.title},this.remoteId),c.a.createElement("div",{className:n.paperBackground},c.a.createElement(p.a,{dense:!0},this.state.peerFiles.map(function(n){return c.a.createElement(h.a,{key:n.name},c.a.createElement(d.a,null,c.a.createElement(_.a,null,c.a.createElement(k.a,null))),c.a.createElement(m.a,{primary:n.name,secondary:n.size}),c.a.createElement(v.a,null,c.a.createElement(y.a,{edge:"end","aria-label":"Download",disabled:!!n.downloading,onClick:function(t){e.downloadFile(t,n)}},c.a.createElement(w.a,null))))}))))}}]),n}(c.a.Component);n.default=Object(b.a)(function(e){return{button:{margin:e.spacing(1)},buttonInput:{display:"none"},title:{margin:e.spacing(4,0,2)},paperBackground:{backgroundColor:e.palette.background.paper}}},{withTheme:!0})(O)},88:function(e,n,t){"use strict";t.d(n,"a",function(){return o}),t.d(n,"b",function(){return r});var i=t(22),o=function e(){Object(i.a)(this,e)};o.Request_File_Infos="request_file_infos",o.Response_File_INfos="response_file_infos",o.Request_File_Chunk="request_download_file_chunk",o.Response_File_Chunk="response_download_file_chunk";var r=function e(){Object(i.a)(this,e)};r.Peer_Opened="peer_opened",r.Info_Got="info_got",r.File_Got="file_got",r.File_Progress="file_progress"}}]);
//# sourceMappingURL=8.97dd175a.chunk.js.map