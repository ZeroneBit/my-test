(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{169:function(e,t,a){"use strict";a.r(t);var n=a(22),s=a(12),i=a(25),l=a(23),r=a(24),o=a(0),c=a.n(o),u=a(11),d=a(168),h=a(170),m=a(176),p=a(171),b=a(179),f=a(172),v=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(i.a)(this,Object(l.a)(t).call(this,e))).state={progress:0,snackbarOpen:!1,showImage:!1},a.textFieldRef=c.a.createRef(),a}return Object(r.a)(t,e),Object(s.a)(t,[{key:"readFile",value:function(e){var t=this,a=e.target.files[0];if(window.FileReader){this.setState({progress:0,base64:"",showImage:!1});var n=new FileReader;n.onprogress=function(e){if(e.lengthComputable){var a=Math.floor(100*e.loaded/e.total);a>=100&&(a=95),t.setState({progress:a})}},n.onload=function(e){t.setState({base64:e.target.result},function(){t.setState({progress:100})})},n.readAsDataURL(a)}else alert("Not supported by your browser!")}},{key:"oCopy",value:function(e){this.textFieldRef&&this.textFieldRef.value&&(this.textFieldRef.select(),document.execCommand("Copy"),this.setState({snackbarOpen:!0}))}},{key:"oRestore",value:function(e){this.setState({showImage:!0})}},{key:"handleSnackbarClose",value:function(e){this.setState({snackbarOpen:!1})}},{key:"render",value:function(){var e=this,t=this.props.classes;return c.a.createElement("div",null,c.a.createElement("div",null,c.a.createElement("input",{accept:"image/*",id:"button-file",className:t.buttonInput,type:"file",onChange:this.readFile.bind(this)}),c.a.createElement("label",{htmlFor:"button-file"},c.a.createElement(d.a,{variant:"contained",component:"span",className:t.button,color:"primary"},"Select"))),c.a.createElement("div",null,c.a.createElement(h.a,{variant:"determinate",color:"primary",value:this.state.progress})),c.a.createElement("div",null,c.a.createElement(m.a,{label:"Base64",placeholder:"Base64",variant:"outlined",margin:"normal",multiline:!0,rows:"3",fullWidth:!0,value:this.state.base64,inputRef:function(t){e.textFieldRef=t}})),c.a.createElement("div",null,c.a.createElement(d.a,{variant:"contained",className:t.button,color:"primary",onClick:this.oCopy.bind(this)},"Copy All"),c.a.createElement(d.a,{variant:"contained",className:t.button,color:"secondary",disabled:!this.state.base64,onClick:this.oRestore.bind(this)},"Restore to image")),c.a.createElement("div",null,c.a.createElement(p.a,null,this.state.showImage&&this.state.base64&&c.a.createElement("img",{src:this.state.base64}))),c.a.createElement("div",null,c.a.createElement(b.a,{anchorOrigin:{horizontal:"center",vertical:"top"},autoHideDuration:3e3,message:"Copied Successfully",onClose:this.handleSnackbarClose.bind(this),open:this.state.snackbarOpen})))}}]),t}(c.a.Component);t.default=Object(u.a)(function(e){return{button:{margin:e.spacing(1)},buttonInput:{display:"none"},success:{backgroundColor:f.a[600]}}},{withTheme:!0})(v)}}]);
//# sourceMappingURL=10.3449c657.chunk.js.map