(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{39:function(e,t,n){e.exports=n(69)},68:function(e,t,n){},69:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(4),c=n(5),l=n.n(c);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=n(2),s=n(3),u=(n(53),"\n// Having fun with js code snippets!\n\n// Made with \u2764 By Zill Ding at https://github.com/zillding/js-playground\n\n// key bindings:\n// |    mac    |     pc     |                |\n// |:---------:|:----------:|----------------|\n// | cmd+enter | ctrl+enter | run code       |\n// | cmd+k     | ctrl+k     | clear console  |\n// | cmd+s     | ctrl+s     | format code    |\n// | cmd+o     | ctrl+o     | search library |\n\nalert('This is an AWESOME app!');\nconsole.log('Happy coooooding'); // open developer console to view result\n"),m="js-playground-by-zill",d=localStorage;function f(e){try{var t=d.getItem("".concat(m,"-").concat(e));return JSON.parse(t)}catch(n){return null}}function p(e,t){d.setItem("".concat(m,"-").concat(e),JSON.stringify(t))}var b="content";function v(e){p(b,e.trim())}function h(){var e=f(b)||"";return"".concat(e.trim()||u.trim(),"\n")}var y="vim-mode-enabled";var g=n(8),E=n.n(g),O=[{mac:["cmd","enter"],pc:["ctrl","enter"],text:"run code"},{mac:["cmd","k"],pc:["ctrl","k"],text:"clear console"},{mac:["cmd","s"],pc:["ctrl","s"],text:"format code"},{mac:["cmd","o"],pc:["ctrl","o"],text:"search library"}],x=function(e){return r.a.createElement("kbd",Object.assign({className:E.a.key},e))};var k=function(e){var t=e.isOpen,n=e.onRequestClose;return r.a.createElement(l.a,{style:{overlay:{display:"flex",alignItems:"center",justifyContent:"center"},content:{position:"static"}},isOpen:t,onRequestClose:n},r.a.createElement("h4",{style:{marginTop:0}},"Key Bindings"),r.a.createElement("table",{style:{width:"100%"}},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"mac"),r.a.createElement("th",null,"pc"),r.a.createElement("th",null))),r.a.createElement("tbody",null,O.map(function(e){var t=e.mac,n=e.pc,a=e.text;return r.a.createElement("tr",{key:a},r.a.createElement("td",{className:E.a.td},t.map(function(e){return r.a.createElement(x,{key:e},e)})),r.a.createElement("td",{className:E.a.td},n.map(function(e){return r.a.createElement(x,{key:e},e)})),r.a.createElement("td",null,a))}))))},j=function(){return r.a.createElement("span",{style:{margin:"0 4px"}},"|")};var w=function(e){var t=e.editor,n=e.editorVimModeEnabled,o=e.onToggleVimMode,c=Object(a.useState)(!1),l=Object(i.a)(c,2),s=l[0],u=l[1];return r.a.createElement("div",{style:{display:"flex",alignItems:"center",overflow:"auto",padding:4}},r.a.createElement("span",null,"JS Playground"),r.a.createElement(j,null),r.a.createElement("label",{style:{display:"flex",cursor:"pointer"}},r.a.createElement("input",{type:"checkbox",style:{cursor:"pointer"},checked:n,onChange:o}),n?"Vim On":"Vim Off"),r.a.createElement("button",{style:{marginLeft:"auto"},onClick:function(){u(!0)}},"?"),r.a.createElement(k,{isOpen:s,onRequestClose:function(){u(!1),t.focus()}}))},C=n(36),S=n(25),I=n(26),L=n(37),M=n(27),B=n(38),T=n(28),V=n.n(T),A=n(29),J=n.n(A),R=n(30),K=n.n(R),N=n(31),_=n.n(N),q=n(32),z=n.n(q),D=n(33),H=n.n(D);var P=function(e){var t=e.isOpen,n=e.onRequestClose,o=e.onAdd,c=Object(a.useState)(""),s=Object(i.a)(c,2),u=s[0],m=s[1],d=Object(a.useState)(!1),f=Object(i.a)(d,2),p=f[0],b=f[1],v=Object(a.useState)([]),h=Object(i.a)(v,2),y=h[0],g=h[1];function E(){m(""),g([]),n()}return r.a.createElement(l.a,{isOpen:t,onRequestClose:E},r.a.createElement("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},r.a.createElement("form",{onSubmit:function(e){var t;e.preventDefault(),b(!0),(t=u,fetch("https://api.cdnjs.com/libraries?search=".concat(t.trim())).then(function(e){return e.json()}).then(function(e){return e.results})).then(function(e){b(!1),g(e)}).catch(function(e){b(!1),alert(e.message)})}},r.a.createElement("input",{style:{width:"100%",boxSizing:"border-box",fontSize:18,border:"1px #ddd solid",borderRadius:4,padding:"4px 8px"},autoFocus:!0,disabled:p,value:u,onChange:function(e){m(e.target.value)}})),p?r.a.createElement("span",null,"searching..."):r.a.createElement("div",{style:{flex:1,overflow:"auto"}},r.a.createElement("ul",null,y.map(function(e){var t=e.name,n=e.latest;return r.a.createElement("li",{key:t,style:{margin:"2px 0"}},r.a.createElement("button",{style:{cursor:"pointer"},onClick:function(){E(),o(n)}},r.a.createElement("strong",null,t)," - ",n))})))))};function W(e){try{var t=eval.call(window,e);console.log("%c\u2192","color: darkgrey",J()(t)?JSON.stringify(t):t)}catch(n){console.error(n)}}function F(){console.clear&&console.clear()}function U(e,t){var n=/^\/\/@@\s+(\S*)/,a=t.map(function(e){var t=e.url;return"//@@ ".concat(t)}).join("\n").trim(),r=e.split("\n").filter(function(e){return!n.test(e)}).join("\n").trim();return"".concat(a,"\n\n").concat(r)}function $(e){var t=e.title,n=e.text;return r.a.createElement("div",{style:{wordBreak:"break-word"}},t&&r.a.createElement("strong",null,t),t&&n&&r.a.createElement("div",{style:{height:4}}),n&&r.a.createElement("p",{style:{margin:0}},n))}var G=function(e){function t(e){var n;return Object(S.a)(this,t),(n=Object(L.a)(this,Object(M.a)(t).call(this,e))).persist=V()(v,500),n.commands=[{name:"runCommand",bindKey:{win:"Ctrl-Enter",mac:"Command-Enter"},exec:function(e){return W(e.getValue())}},{name:"clearCommand",bindKey:{win:"Ctrl-k",mac:"Command-k"},exec:F},{name:"searchLibCommand",bindKey:{win:"Ctrl-o",mac:"Command-o"},exec:function(){n.setState({modalIsOpen:!0})}},{name:"formatCommand",bindKey:{win:"Ctrl-s",mac:"Command-s"},exec:function(e){n.setState(function(t){var n=t.libraries;return{value:K.a.format(U(e.getValue(),n),{singleQuote:!0,parser:"babel",plugins:[_.a]})}})}}],n.onChange=function(e){n.setState({value:e}),n.persist(e)},n.onAddLib=function(e){n.state.libraries.some(function(t){return t.url===e})?s.a.warn(r.a.createElement($,{title:"The library is already loaded.",text:e})):n.loadLib(e).then(function(){var e=n.state,t=e.value,a=e.libraries;n.onChange(U(t,a))})},n.state={value:h(),modalIsOpen:!1,libraries:[]},n}return Object(B.a)(t,e),Object(I.a)(t,[{key:"loadLib",value:function(e){var t,n=this;return(t=e,new Promise(function(e,n){if(H.a.isUri(t)){var a=document.createElement("script");a.src=t,a.onload=e,a.onerror=n,document.head.appendChild(a)}else n()})).then(function(){s.a.success(r.a.createElement($,{title:"JS loaded!",text:e})),n.setState(function(t){var n=t.libraries;return{libraries:[].concat(Object(C.a)(n),[{url:e}])}})}).catch(function(){s.a.error(r.a.createElement($,{title:"JS load failed.",text:e}))})}},{key:"loadLibs",value:function(){var e=this,t=this.state.value,n=/^\/\/@@\s+(\S*)/;t.split("\n").forEach(function(t){var a=n.exec(t)||[],r=Object(i.a)(a,2)[1];r&&e.loadLib(r)})}},{key:"render",value:function(){var e=this,t=this.props,n=t.vimModeOn,o=t.onLoad,c=this.state,l=c.value,i=c.modalIsOpen;return r.a.createElement(a.Fragment,null,r.a.createElement(z.a,{mode:"javascript",theme:"monokai",focus:!0,enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,editorProps:{$blockScrolling:1/0},style:{position:"absolute",height:"100%",width:"100%"},keyboardHandler:n?"vim":void 0,setOptions:{tabSize:2},commands:this.commands,value:l,onLoad:function(t){o(t),e.loadLibs()},onChange:this.onChange}),r.a.createElement("button",{style:{position:"absolute",top:10,right:10,zIndex:9999},onClick:function(){W(l)}},"run"),r.a.createElement(P,{isOpen:i,onRequestClose:function(){e.setState({modalIsOpen:!1})},onAdd:this.onAddLib}))}}]),t}(a.Component);s.a.configure({position:s.a.POSITION.BOTTOM_RIGHT});var Q={display:"flex",flexDirection:"column",alignItems:"stretch",position:"fixed",top:0,bottom:0,left:0,right:0},X={flex:0},Z={flex:1,position:"relative"};var Y=function(){var e=Object(a.useState)(f(y)||!1),t=Object(i.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(),l=Object(i.a)(c,2),s=l[0],u=l[1];return r.a.createElement("div",{style:Q},r.a.createElement("div",{style:X},r.a.createElement(w,{editor:s,editorVimModeEnabled:n,onToggleVimMode:function(){var e=!n;o(e),p(y,e),s.focus()}})),r.a.createElement("div",{style:Z},r.a.createElement(G,{vimModeOn:n,onLoad:u})))};n(68);l.a.setAppElement("#root"),Object(o.render)(r.a.createElement(Y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){e.exports={key:"KeyBindingsModal_key__18X5U",td:"KeyBindingsModal_td__2WFrV"}}},[[39,1,2]]]);
//# sourceMappingURL=main.94ea8396.chunk.js.map