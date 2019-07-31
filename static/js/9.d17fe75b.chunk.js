(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{104:function(e,n,t){"use strict";var i=t(22),r=t(12),o=t(25),a=t(23),s=t(24),l=t(115),c=t(116),u=t.n(c),f=t(88),h=t(118),p=t.n(h),d=function(){function e(n){Object(i.a)(this,e),this.size=n.size,this.name=n.name,this.lastAppendTime=new Date,this.received=0,this.fileStream=null,this.writer=null}return Object(r.a)(e,[{key:"append",value:function(e,n){var t=this;this._ensureFileStreamWriter(function(i){var r=new Blob([e]).stream().getReader();!function o(){return r.read().then(function(r){if(r.done){var a=t._calculateSpeed(e.byteLength),s=t._calculateProgress(e.byteLength);n(a,s)}else i.write(r.value).then(o)})}()})}},{key:"close",value:function(){this.writer&&(this.writer.close(),this.writer=null)}},{key:"abort",value:function(){this.writer&&(this.fileStream.abort(),this.writer.abort())}},{key:"_calculateProgress",value:function(e){return this.received+=e,100*this.received/this.size}},{key:"_calculateSpeed",value:function(e){var n=new Date,t=n.getTime()-this.lastAppendTime.getTime();return this.lastAppendTime=n,1e3*e/t}},{key:"_ensureFileStreamWriter",value:function(e){var n=this;this.writer?e&&e(this.writer):this._polifill(function(){p.a.WritableStream=window.WritableStream||window.WebStreamsPolyfill.WritableStream,n.fileStream=p.a.createWriteStream(n.name,{size:n.size}),n.writer=n.fileStream.getWriter(),e&&e(n.writer)})}},{key:"_polifill",value:function(e){if(e.done)e();else{Object.defineProperty(Blob.prototype,"stream",{configurable:!0,enumerable:!0,writable:!0,value:function(){return new Response(this).body}});var n=document.createElement("script");n.setAttribute("src","https://cdn.jsdelivr.net/npm/web-streams-polyfill@2.0.2/dist/ponyfill.min.js"),n.async=!0,n.onreadystatechange=n.onload=function(){e.done||n.readyState&&!/loaded|complete/.test(n.readyState)||(e.done=!0,e())},document.getElementsByTagName("head")[0].appendChild(n)}}}]),e}();t.d(n,"a",function(){return v});var v=function(e){function n(){var e;return Object(i.a)(this,n),(e=Object(o.a)(this,Object(a.a)(n).call(this))).CHUNK_SIZE=512e3,e.peer=null,e.pairs={},e.outgoing=[],e._initializePeer(),e}return Object(s.a)(n,e),Object(r.a)(n,[{key:"abortFiles",value:function(){var e=!0,n=!1,t=void 0;try{for(var i,r=this.pairs.values()[Symbol.iterator]();!(e=(i=r.next()).done);e=!0){var o=i.value,a=!0,s=!1,l=void 0;try{for(var c,u=o.incoming[Symbol.iterator]();!(a=(c=u.next()).done);a=!0){var f=c.value;f.file&&f.abort()}}catch(h){s=!0,l=h}finally{try{a||null==u.return||u.return()}finally{if(s)throw l}}}}catch(h){n=!0,t=h}finally{try{e||null==r.return||r.return()}finally{if(n)throw t}}}},{key:"requestFileInfos",value:function(e){return this._ensureConnection(e,function(e){var n={type:f.a.Request_File_Infos};e.send(n)}),f.b.Info_Got}},{key:"downloadFile",value:function(e,n){var t=this.pairs[e].incoming.find(function(e){return e.name===n.name});Object.assign(t,{file:new d({name:t.name,size:t.size})}),this._requestFileChunk(e,n,0)}},{key:"setOutgingFiles",value:function(e){var n=this;if(e)for(var t=function(t){var i=e.item(t);n.outgoing.findIndex(function(e){return e.name==i.name})<0&&n.outgoing.push(i)},i=0;i<e.length;i++)t(i)}},{key:"_initializePeer",value:function(){this.peer=new u.a(null,{debug:3}),this.peer.on("open",this._peerOpen.bind(this)),this.peer.on("connection",this._peerConnection.bind(this)),this.peer.on("disconnected",this._peerDisconnected.bind(this)),this.peer.on("close",this._peerClose.bind(this)),this.peer.on("error",this._peerError.bind(this))}},{key:"_peerOpen",value:function(e){this.emit(f.b.Peer_Opened,e)}},{key:"_peerConnection",value:function(e){var n=this.pairs[e.peer];n&&n.conn&&n.conn.open||(this.pairs[e.peer]={conn:e},console.log("_peerConnection "+e.open),this._initializeConnection(e))}},{key:"_peerDisconnected",value:function(){}},{key:"_peerClose",value:function(){}},{key:"_peerError",value:function(e){console.error("Peer error "+e.type),console.error(e)}},{key:"_ensureConnection",value:function(e,n){var t=this.pairs[e];if(t||(this.pairs[e]={},t=this.pairs[e]),!t.conn||!t.conn.open)return t.conn=this.peer.connect(e),console.log("this.peer.connect"+t.conn.open),void this._initializeConnection(t.conn,n);n&&n(t.conn)}},{key:"_initializeConnection",value:function(e,n){var t=this;e.on("open",function(){console.log("conn opened"),n&&n(e)}),e.on("data",function(n){t._onJSONData(n,e)}),e.on("error",function(n){t._connError(n,e)}),e.on("close",function(){t._connClose(e)})}},{key:"_connError",value:function(e,n){console.error(e)}},{key:"_connClose",value:function(e){console.error("conn closed")}},{key:"_onJSONData",value:function(e,n){switch(e.type){case f.a.Request_File_Infos:var t={type:f.a.Response_File_INfos,payload:Array.from(this.outgoing,function(e){return{name:e.name,size:e.size,type:e.type,peer:this.id}},this.peer)};n.send(t);break;case f.a.Response_File_INfos:var i=this.pairs[n.peer];if(i.incoming){var r=!0,o=!1,a=void 0;try{for(var s,l=function(){var e=s.value;i.incoming.find(function(n){return n.name===e.name})||i.incoming.push(e)},c=e.payload[Symbol.iterator]();!(r=(s=c.next()).done);r=!0)l()}catch(u){o=!0,a=u}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}}else i.incoming=e.payload;this.emit(f.b.Info_Got,n.peer,e.payload);break;case f.a.Request_File_Chunk:this._sendFileChunk(e.payload,n);break;case f.a.Response_File_Chunk:this._receiveFileChunk(e.payload,n);break;default:console.error("Unknown message: "+e)}}},{key:"_requestFileChunk",value:function(e,n,t){this._ensureConnection(e,function(e){var i={type:f.a.Request_File_Chunk,payload:{fileInfo:{name:n.name},index:t}};e.send(i)})}},{key:"_receiveFileChunk",value:function(e,n){var t=this,i=e.index,r=e.fileInfo,o=e.data,a=e.last,s=this.pairs[n.peer].incoming.find(function(e){return e.name===r.name});s.file.append(o,function(e,o){a?(s.file.close(),t.emit(f.b.File_Got,s)):(t.emit(f.b.File_Progress,s,e,o),t._requestFileChunk(n.peer,r,i+1))})}},{key:"_sendFileChunk",value:function(e,n){var t=new FileReader,i=e.fileInfo,r=e.index,o=this.outgoing.find(function(e){return e.name===i.name}),a=!1,s=r*this.CHUNK_SIZE,l=s+this.CHUNK_SIZE;l>=o.size&&(l=o.size,a=!0);var c=(o.slice||o.mozSlice||o.webkitSlice).call(o,s,l);t.onload=function(e){if(t.readyState===FileReader.DONE){var o=e.target.result,s={type:f.a.Response_File_Chunk,payload:{index:r,fileInfo:i,data:o,last:a}};n.send(s)}},t.readAsArrayBuffer(c)}}]),n}(l.EventEmitter)},117:function(e,n){function t(e){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}t.keys=function(){return[]},t.resolve=t,e.exports=t,t.id=117},180:function(e,n,t){"use strict";t.r(n);var i=t(22),r=t(12),o=t(25),a=t(23),s=t(24),l=t(0),c=t.n(l),u=t(175),f=t(188),h=t(11),p=t(104),d=t(88),v=function(e){function n(e){var t;return Object(i.a)(this,n),(t=Object(o.a)(this,Object(a.a)(n).call(this,e))).textFieldRef=c.a.createRef(),t.state={progress:0,receiverUrl:"",outgoing:[]},t.myPeer=null,t}return Object(s.a)(n,e),Object(r.a)(n,[{key:"componentWillMount",value:function(){this.myPeer=new p.a,this.initializeMyPeer()}},{key:"initializeMyPeer",value:function(){var e=this;this.myPeer.on(d.b.Peer_Opened,function(n){console.log(n),e.setState({receiverUrl:"".concat(window.location,"/").concat(n)})})}},{key:"selectFile",value:function(e){var n=e.target.files;this.myPeer.setOutgingFiles(n),this.setState({outgoing:this.myPeer.outgoing})}},{key:"oCopy",value:function(e){this.textFieldRef&&this.textFieldRef.value&&(this.textFieldRef.select(),document.execCommand("Copy"),this.setState({snackbarOpen:!0}))}},{key:"render",value:function(){var e=this,n=this.props.classes;return c.a.createElement("div",null,c.a.createElement("input",{id:"button-file",className:n.buttonInput,type:"file",multiple:!0,onChange:this.selectFile.bind(this)}),c.a.createElement("label",{htmlFor:"button-file"},c.a.createElement(u.a,{variant:"contained",component:"span",className:n.button,color:"primary"},"Select Files")),this.state.outgoing&&this.state.outgoing.map(function(e){return c.a.createElement("div",null,e.name)}),c.a.createElement(f.a,{label:"Receiver Url",placeholder:"Receiver Url",variant:"outlined",margin:"normal",fullWidth:!0,value:this.state.receiverUrl,inputRef:function(n){e.textFieldRef=n}}),c.a.createElement(u.a,{variant:"contained",component:"span",className:n.button,color:"primary",disabled:!this.state.receiverUrl,onClick:this.oCopy.bind(this)},"Copy Receiver Url"))}}]),n}(c.a.Component);n.default=Object(h.a)(function(e){return{button:{margin:e.spacing(1)},buttonInput:{display:"none"}}},{withTheme:!0})(v)},88:function(e,n,t){"use strict";t.d(n,"a",function(){return r}),t.d(n,"b",function(){return o});var i=t(22),r=function e(){Object(i.a)(this,e)};r.Request_File_Infos="request_file_infos",r.Response_File_INfos="response_file_infos",r.Request_File_Chunk="request_download_file_chunk",r.Response_File_Chunk="response_download_file_chunk";var o=function e(){Object(i.a)(this,e)};o.Peer_Opened="peer_opened",o.Info_Got="info_got",o.File_Got="file_got",o.File_Progress="file_progress"}}]);
//# sourceMappingURL=9.d17fe75b.chunk.js.map