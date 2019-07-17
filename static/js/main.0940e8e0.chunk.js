(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{108:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(10),s=a.n(r),l=a(158),o=a(157),c=a(23),u=a(18),m=a(26),d=a(24),h=a(27),p=a(109),v=a(149),b=a(150),f=a(151),g={root:{flexGrow:1}},k=function(e){function t(e){return Object(c.a)(this,t),Object(m.a)(this,Object(d.a)(t).call(this,e))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=Object(p.a)(g);return i.a.createElement("div",{className:e.root},i.a.createElement(v.a,{position:"static",color:"primary"},i.a.createElement(b.a,null,i.a.createElement(f.a,{variant:"h6"},"Tools"))))}}]),t}(i.a.Component),y=a(159),x=a(4),E=a(61),C=a(69),O=a(20),w=a.n(O),T=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={time:w.a.utc(),inputIndex:-1},a.ticks=0,a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"ticksChanged",value:function(e){var t=e.target.value;this.ticks=t;var a=(t-621355968e9)/1e4;a>MediaStreamAudioDestinationNode&&console.error("Invalid number");var n=w()(a).utc();this.setState({time:n,inputIndex:2})}},{key:"unixSChanged",value:function(e){var t=e.target.value,a=w()(1e3*t).utc();this.setState({time:a,inputIndex:0})}},{key:"unixMsChanged",value:function(e){var t=e.target.value,a=w()(1*t).utc();this.setState({time:a,inputIndex:1})}},{key:"timeChanged",value:function(e){this.setState({time:e,inputIndex:3})}},{key:"convertToUnixS",value:function(e){return w()(e).unix()}},{key:"convertToUnixMs",value:function(e){return w()(e).valueOf()}},{key:"convertToTicks",value:function(e){if(2==this.state.inputIndex)return this.ticks;return 1e4*w()(e).valueOf()+621355968e9}},{key:"render",value:function(){var e=this.props.classes;return i.a.createElement("div",null,i.a.createElement(y.a,{id:"unix-s-textarea",className:e.textField,label:"Unix Time (s)",placeholder:"Unix Time (s)",color:"primary",variant:"standard",fullWidth:!0,onChange:this.unixSChanged.bind(this),value:this.convertToUnixS(this.state.time)}),i.a.createElement(y.a,{id:"unix-ms-textarea",className:e.textField,label:"Unix Time (ms)",placeholder:"Unix Time (ms)",color:"primary",variant:"standard",fullWidth:!0,onChange:this.unixMsChanged.bind(this),value:this.convertToUnixMs(this.state.time)}),i.a.createElement(y.a,{id:"ticks-textarea",className:e.textField,label:"Time Ticks",placeholder:"Ticks",color:"primary",variant:"standard",fullWidth:!0,onChange:this.ticksChanged.bind(this),value:this.convertToTicks(this.state.time)}),i.a.createElement(E.b,{utils:C.a},i.a.createElement(E.a,{inputVariant:"standard",label:"UTC Time",className:e.textField,placeholder:"UTC Time",color:"primary",onChange:this.timeChanged.bind(this),value:this.state.time,ampm:!1,autoOk:!0,format:"YYYY-MM-DD T HH:mm:ss.SSS Z",fullWidth:!0})))}}]),t}(i.a.Component),j=(Object(x.a)(function(e){return{textField:{margin:e.spacing(2),width:400,display:"block"},typography:{display:"inline-block"}}},{withTheme:!0})(T),a(153)),S=a(154),F=a(155),I=a(161),R=a(156),N=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={progress:0,snackbarOpen:!1,showImage:!1},a.textFieldRef=i.a.createRef(),a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"readFile",value:function(e){var t=this,a=e.target.files[0];if(window.FileReader){this.setState({progress:0,base64:"",showImage:!1});var n=new FileReader;n.onprogress=function(e){if(e.lengthComputable){var a=Math.floor(100*e.loaded/e.total);a>=100&&(a=95),t.setState({progress:a})}},n.onload=function(e){t.setState({base64:e.target.result},function(){t.setState({progress:100})})},n.readAsDataURL(a)}else alert("Not supported by your browser!")}},{key:"oCopy",value:function(e){this.textFieldRef&&this.textFieldRef.value&&(this.textFieldRef.select(),document.execCommand("Copy"),this.setState({snackbarOpen:!0}))}},{key:"oRestore",value:function(e){this.setState({showImage:!0})}},{key:"handleSnackbarClose",value:function(e){this.setState({snackbarOpen:!1})}},{key:"render",value:function(){var e=this,t=this.props.classes;return i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("input",{accept:"image/*",id:"button-file",className:t.buttonInput,type:"file",onChange:this.readFile.bind(this)}),i.a.createElement("label",{htmlFor:"button-file"},i.a.createElement(j.a,{variant:"contained",component:"span",className:t.button,color:"primary"},"Select"))),i.a.createElement("div",null,i.a.createElement(S.a,{variant:"determinate",color:"primary",value:this.state.progress})),i.a.createElement("div",null,i.a.createElement(y.a,{label:"Base64",placeholder:"Base64",variant:"outlined",margin:"normal",multiline:!0,rows:"3",fullWidth:!0,value:this.state.base64,inputRef:function(t){e.textFieldRef=t}})),i.a.createElement("div",null,i.a.createElement(j.a,{variant:"contained",className:t.button,color:"primary",onClick:this.oCopy.bind(this)},"Copy All"),i.a.createElement(j.a,{variant:"contained",className:t.button,color:"secondary",disabled:!this.state.base64,onClick:this.oRestore.bind(this)},"Restore to image")),i.a.createElement("div",null,i.a.createElement(F.a,null,this.state.showImage&&this.state.base64&&i.a.createElement("img",{src:this.state.base64}))),i.a.createElement("div",null,i.a.createElement(I.a,{anchorOrigin:{horizontal:"center",vertical:"top"},autoHideDuration:3e3,message:"Copied Successfully",onClose:this.handleSnackbarClose.bind(this),open:this.state.snackbarOpen})))}}]),t}(i.a.Component),U=Object(x.a)(function(e){return{button:{margin:e.spacing(1)},buttonInput:{display:"none"},success:{backgroundColor:R.a[600]}}},{withTheme:!0})(N),M=function(e){function t(){return Object(c.a)(this,t),Object(m.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){this.props.classes;return i.a.createElement("div",null,i.a.createElement(k,null),i.a.createElement(U,null))}}]),t}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var W=a(58),D=a(73),A=Object(D.a)({palette:{primary:{main:"#3f51b5",contrastText:"#fff"},secondary:{main:"#ff9800",contrastText:"#000"},error:{main:W.a.A400},background:{default:"#fff"}}});s.a.render(i.a.createElement(o.a,{theme:A},i.a.createElement(l.a,null),i.a.createElement(M,null)),document.querySelector("#root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},87:function(e,t,a){e.exports=a(108)}},[[87,1,2]]]);
//# sourceMappingURL=main.0940e8e0.chunk.js.map