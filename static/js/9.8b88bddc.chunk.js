(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{115:function(e,n,t){"use strict";var i=t(22),r=t(12),o=t(25),a=t(23),s=t(24),l=t(131),c=t(132),u=t.n(c),f=t(97),h=t(134),p=function(){function e(n){Object(i.a)(this,e),this.size=n.size,this.name=n.name,this.lastAppendTime=new Date,this.received=0,this.buffer=[]}return Object(r.a)(e,[{key:"append",value:function(e,n){this.buffer.push(e),this.received+=e.byteLength;var t=this._calculateSpeed(e.byteLength),i=this._calculateProgress();n&&n(t,i,this.received)}},{key:"close",value:function(){var e=new Blob(this.buffer);this.buffer=[],Object(h.saveAs)(e,this.name)}},{key:"abort",value:function(){this.buffer=[]}},{key:"_calculateProgress",value:function(){return 100*this.received/this.size}},{key:"_calculateSpeed",value:function(e){var n=new Date,t=n.getTime()-this.lastAppendTime.getTime();return this.lastAppendTime=n,1e3*e/t}}]),e}();t.d(n,"a",function(){return d});var d=function(e){function n(){var e;return Object(i.a)(this,n),(e=Object(o.a)(this,Object(a.a)(n).call(this))).CHUNK_SIZE=512e3,e.peer=null,e.pairs={},e.outgoing=[],e.messageCache={},e._initializePeer(),alert(window.peerjs.util.browser),e}return Object(s.a)(n,e),Object(r.a)(n,[{key:"abortFiles",value:function(){var e=!0,n=!1,t=void 0;try{for(var i,r=this.pairs.values()[Symbol.iterator]();!(e=(i=r.next()).done);e=!0){var o=i.value,a=!0,s=!1,l=void 0;try{for(var c,u=o.incoming[Symbol.iterator]();!(a=(c=u.next()).done);a=!0){var f=c.value;f.file&&f.abort()}}catch(h){s=!0,l=h}finally{try{a||null==u.return||u.return()}finally{if(s)throw l}}}}catch(h){n=!0,t=h}finally{try{e||null==r.return||r.return()}finally{if(n)throw t}}}},{key:"requestFileInfos",value:function(e){return this._ensureConnection(e,function(e){console.log("Sending "+f.a.Request_File_Infos+e.open);var n={type:f.a.Request_File_Infos};e.send(n)}),f.b.Info_Got}},{key:"downloadFile",value:function(e,n){var t=this.pairs[e].incoming.find(function(e){return e.name===n.name});Object.assign(t,{file:new p({name:t.name,size:t.size})}),this.pairs[e].transferringFile=t,this._requestFile(e,n)}},{key:"setOutgingFiles",value:function(e){var n=this;if(e)for(var t=function(t){var i=e.item(t);n.outgoing.findIndex(function(e){return e.name==i.name})<0&&n.outgoing.push(i)},i=0;i<e.length;i++)t(i)}},{key:"_initializePeer",value:function(){this.peer=new u.a(null,{debug:3,config:{iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"turn:numb.viagenie.ca",credential:"muazkh",username:"webrtc@live.com"},{urls:"turn:192.158.29.39:3478?transport=udp",credential:"JZEOEt2V3Qb0y27GRntt2u2PAYA=",username:"28224511:1379330808"},{urls:"turn:192.158.29.39:3478?transport=tcp",credential:"JZEOEt2V3Qb0y27GRntt2u2PAYA=",username:"28224511:1379330808"}]}}),this.peer.on("open",this._peerOpen.bind(this)),this.peer.on("connection",this._peerConnection.bind(this)),this.peer.on("disconnected",this._peerDisconnected.bind(this)),this.peer.on("close",this._peerClose.bind(this)),this.peer.on("error",this._peerError.bind(this))}},{key:"_peerOpen",value:function(e){this.emit(f.b.Peer_Opened,e)}},{key:"_peerConnection",value:function(e){var n=this,t=this.pairs[e.peer];t&&t.conn&&t.conn.open||(this.pairs[e.peer]={conn:e},console.log("_peerConnection "+e.open),this._initializeConnection(e,function(e){n._ClearCachedMessages(e)}))}},{key:"_peerDisconnected",value:function(){}},{key:"_peerClose",value:function(){}},{key:"_peerError",value:function(e){console.error("Peer error "+e.type),console.error(e)}},{key:"_ensureConnection",value:function(e,n){var t=this.pairs[e];if(t||(this.pairs[e]={},t=this.pairs[e]),!t.conn||!t.conn.open)return t.conn=this.peer.connect(e),console.log("this.peer.connect"+t.conn.open),void this._initializeConnection(t.conn,n);n&&n(t.conn)}},{key:"_initializeConnection",value:function(e,n){var t=this;e.on("open",function(){console.log("conn opened"),n&&n(e)}),e.on("data",function(n){n.byteLength?t._onArrayBuffer(n,e):t._onJSONData(n,e)}),e.on("error",function(n){t._connError(n,e)}),e.on("close",function(){t._connClose(e)})}},{key:"_connError",value:function(e,n){console.error(e)}},{key:"_connClose",value:function(e){console.error("conn closed")}},{key:"_onArrayBuffer",value:function(e,n){var t=this.pairs[n.peer].transferringFile;this._receiveFile(t,e)}},{key:"_onJSONData",value:function(e,n){switch(console.log("_onJSONData "+e.type+n.open),e.type){case f.a.Request_File_Infos:var t={type:f.a.Response_File_INfos,payload:Array.from(this.outgoing,function(e){return{name:e.name,size:e.size,type:e.type,peer:this.id}},this.peer)};this._SendMessage(n,t);break;case f.a.Response_File_INfos:var i=this.pairs[n.peer];if(i.incoming){var r=!0,o=!1,a=void 0;try{for(var s,l=function(){var e=s.value;i.incoming.find(function(n){return n.name===e.name})||i.incoming.push(e)},c=e.payload[Symbol.iterator]();!(r=(s=c.next()).done);r=!0)l()}catch(u){o=!0,a=u}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}}else i.incoming=e.payload;this.emit(f.b.Info_Got,n.peer,e.payload);break;case f.a.Request_File:this._sendFile(e.payload,n);break;default:console.error("Unknown message: "+e)}}},{key:"_requestFile",value:function(e,n){var t=this;this._ensureConnection(e,function(e){var i={type:f.a.Request_File,payload:{fileInfo:{name:n.name}}};t._SendMessage(e,i)})}},{key:"_receiveFile",value:function(e,n){var t=this;e.file.append(n,function(n,i,r){r>=e.size?(e.file.close(),t.emit(f.b.File_Got,e)):t.emit(f.b.File_Progress,e,n,i)})}},{key:"_sendFile",value:function(e,n){var t=this,i=new FileReader,r=e.fileInfo,o=this.outgoing.find(function(e){return e.name===r.name}),a=o.slice||o.mozSlice||o.webkitSlice,s=0;i.onload=function(e){if(i.readyState===FileReader.DONE){var r=e.target.result;t._SendMessage(n,r),(s+=r.byteLength)<o.size&&l(s)}};var l=function(e){var n=a.call(o,e,e+t.CHUNK_SIZE);i.readAsArrayBuffer(n)};l(0)}},{key:"_SendMessage",value:function(e,n){if(e.open)e.send(n);else{var t=this.messageCache[e.peer];t||(t=this.messageCache[e.peer]=[]),t.push(n)}}},{key:"_ClearCachedMessages",value:function(e){var n=this,t=this.messageCache[e.peer];t&&t.forEach(function(t){n._SendMessage(e,t)})}}]),n}(l.EventEmitter)},133:function(e,n){function t(e){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}t.keys=function(){return[]},t.resolve=t,e.exports=t,t.id=133},226:function(e,n,t){"use strict";t.r(n);var i=t(22),r=t(12),o=t(25),a=t(23),s=t(24),l=t(0),c=t.n(l),u=t(209),f=t(79),h=t(208),p=t(215),d=t(216),v=t(217),m=t(218),y=t(219),_=t(170),g=t(11),b=t(175),k=t.n(b),F=t(176),w=t.n(F),O=t(115),C=t(97),E=function(){function e(){Object(i.a)(this,e)}return Object(r.a)(e,null,[{key:"IsWeChat",value:function(){return"micromessenger"==window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)}}]),e}(),I=function(e){function n(e){var t;return Object(i.a)(this,n),(t=Object(o.a)(this,Object(a.a)(n).call(this,e))).remoteId=e.match.params.id,t.myPeer=null,t.state={peerFiles:[]},t}return Object(s.a)(n,e),Object(r.a)(n,[{key:"componentWillMount",value:function(){this.myPeer=new O.a,this.initializeMyPeer()}},{key:"componentWillUnmount",value:function(){this.myPeer.abortFiles()}},{key:"initializeMyPeer",value:function(){var e=this;this.myPeer.on(C.b.Peer_Opened,function(e){console.log(e)}),this.myPeer.on(C.b.Info_Got,function(n,t){console.log(t),e.setState({peerFiles:t})}),this.myPeer.on(C.b.File_Progress,function(e,n,t){console.log("Speed: ".concat(n,"; Progress: ").concat(t))}),this.myPeer.on(C.b.File_Got,function(n){e.state.peerFiles.find(function(e){return e.name===n.name}).downloading=!1,e.setState({}),console.log("finished")})}},{key:"retriveFileInfos",value:function(e){this.myPeer.requestFileInfos(this.remoteId)}},{key:"downloadFile",value:function(e,n){console.log(n),n.downloading=!0,this.setState({}),this.myPeer.downloadFile(this.remoteId,n)}},{key:"render",value:function(){var e=this.props.classes;return E.IsWeChat()?c.a.createElement("div",null,"We detect that you are in WeChat, please open this page in your default browser instead."):c.a.createElement("div",null,c.a.createElement(u.a,{variant:"contained",component:"span",className:e.button,color:"primary",onClick:this.retriveFileInfos.bind(this)},"Retrive Files"),this.state.peerFiles&&this.state.peerFiles.length&&this.renderFileInfos())}},{key:"renderFileInfos",value:function(){var e=this,n=this.props.classes;return c.a.createElement("div",null,c.a.createElement(f.a,{variant:"h6",className:n.title},this.remoteId),c.a.createElement("div",{className:n.paperBackground},c.a.createElement(h.a,{dense:!0},this.state.peerFiles.map(function(n){return c.a.createElement(p.a,{key:n.name},c.a.createElement(d.a,null,c.a.createElement(v.a,null,c.a.createElement(k.a,null))),c.a.createElement(m.a,{primary:n.name,secondary:n.size}),c.a.createElement(y.a,null,c.a.createElement(_.a,{edge:"end","aria-label":"Download",disabled:!!n.downloading,onClick:function(t){e.downloadFile(t,n)}},c.a.createElement(w.a,null))))}))))}}]),n}(c.a.Component);n.default=Object(g.a)(function(e){return{button:{margin:e.spacing(1)},buttonInput:{display:"none"},title:{margin:e.spacing(4,0,2)},paperBackground:{backgroundColor:e.palette.background.paper}}},{withTheme:!0})(I)},97:function(e,n,t){"use strict";t.d(n,"a",function(){return r}),t.d(n,"b",function(){return o});var i=t(22),r=function e(){Object(i.a)(this,e)};r.Request_File_Infos="request_file_infos",r.Response_File_INfos="response_file_infos",r.Request_File="request_download_file",r.Response_File="response_download_file";var o=function e(){Object(i.a)(this,e)};o.Peer_Opened="peer_opened",o.Info_Got="info_got",o.File_Got="file_got",o.File_Progress="file_progress"}}]);
//# sourceMappingURL=9.8b88bddc.chunk.js.map