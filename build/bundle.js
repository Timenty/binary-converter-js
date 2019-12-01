var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function a(t){t.forEach(e)}function o(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e}const l=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);function u(t,e){t.appendChild(e)}function c(t,e,n){t.insertBefore(e,n||null)}function s(t){t.parentNode.removeChild(t)}function d(t){return document.createElement(t)}function p(){return t=" ",document.createTextNode(t);var t}function f(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}let m;function h(t){m=t}function $(){if(!m)throw new Error("Function called outside component initialization");return m}function g(){const t=$();return(e,n)=>{const a=t.$$.callbacks[e];if(a){const o=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);a.slice().forEach(e=>{e.call(t,o)})}}}const b=[],v=[],x=[],y=[],_=Promise.resolve();let w=!1;function V(t){x.push(t)}function D(t){y.push(t)}function E(){const t=new Set;do{for(;b.length;){const t=b.shift();h(t),C(t.$$)}for(;v.length;)v.pop()();for(let e=0;e<x.length;e+=1){const n=x[e];t.has(n)||(n(),t.add(n))}x.length=0}while(b.length);for(;y.length;)y.pop()();w=!1}function C(t){null!==t.fragment&&(t.update(t.dirty),a(t.before_update),t.fragment&&t.fragment.p(t.dirty,t.ctx),t.dirty=null,t.after_update.forEach(V))}const k=new Set;let j;function U(t,e){t&&t.i&&(k.delete(t),t.i(e))}function A(t,e,n,a){if(t&&t.o){if(k.has(t))return;k.add(t),j.c.push(()=>{k.delete(t),a&&(n&&t.d(1),a())}),t.o(e)}}function B(t,e,n){l(t.$$.props,e)&&(e=t.$$.props[e]||e,t.$$.bound[e]=n,n(t.$$.ctx[e]))}function O(t){t&&t.c()}function S(t,n,i){const{fragment:r,on_mount:l,on_destroy:u,after_update:c}=t.$$;r&&r.m(n,i),V(()=>{const n=l.map(e).filter(o);u?u.push(...n):a(n),t.$$.on_mount=[]}),c.forEach(V)}function T(t,e){const n=t.$$;null!==n.fragment&&(a(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx={})}function P(t,e){t.$$.dirty||(b.push(t),w||(w=!0,_.then(E)),t.$$.dirty=n()),t.$$.dirty[e]=!0}function F(e,o,i,r,l,u){const c=m;h(e);const s=o.props||{},d=e.$$={fragment:null,ctx:null,props:u,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(c?c.$$.context:[]),callbacks:n(),dirty:null};let p=!1;d.ctx=i?i(e,s,(t,n,a=n)=>(d.ctx&&l(d.ctx[t],d.ctx[t]=a)&&(d.bound[t]&&d.bound[t](a),p&&P(e,t)),n)):s,d.update(),p=!0,a(d.before_update),d.fragment=!!r&&r(d.ctx),o.target&&(o.hydrate?d.fragment&&d.fragment.l(function(t){return Array.from(t.childNodes)}(o.target)):d.fragment&&d.fragment.c(),o.intro&&U(e.$$.fragment),S(e,o.target,o.anchor),E()),h(c)}class L{$destroy(){T(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}function M(t={regex:/.{1,4}/gm,spacer:" "}){const e=new RegExp(t.regex);return n=>n?n.match(e).join(t.spacer):""}const N=["insertText","insertFromPaste"],R=["deleteContentBackward","deleteByCut","historyUndo","historyRedo"],G=(t,e)=>e.includes(t),H=(t,e)=>t.match(e)||[];function I(e){let n,a,o,i,r,l;return{c(){var t,u,c,s;n=d("div"),f(a=d("input"),"class","c_input"),a.value=e.showValue,f(a,"type",o=e.options.type),f(a,"placeholder",i=e.options.placeholder),f(a,"title",r=e.options.title),f(n,"class","inputwrap"),t=a,u="input",c=e.mask,t.addEventListener(u,c,s),l=()=>t.removeEventListener(u,c,s)},m(t,e){c(t,n,e),u(n,a)},p(t,e){t.showValue&&(a.value=e.showValue),t.options&&o!==(o=e.options.type)&&f(a,"type",o),t.options&&i!==(i=e.options.placeholder)&&f(a,"placeholder",i),t.options&&r!==(r=e.options.title)&&f(a,"title",r)},i:t,o:t,d(t){t&&s(n),l()}}}function q(t,e,n){let{dataValue:a="0000"}=e,{pattern:o=/\d/gm}=e,{delimiter:i=(t=>t)}=e,{options:r={placeholder:"",title:"",type:"text"}}=e;const l=g();var u;u=()=>{l("updated")},$().$$.after_update.push(u);const c=function(t={pattern:/./gm,value:""}){const e=new RegExp(t.pattern),n={shadowValue:t.value};let a=()=>"",o=()=>n.value;Object.defineProperty(n,"value",{set:function(t){return this.shadowValue=t,a(n),t},get:function(){return this.shadowValue}});const i=t=>{t.preventDefault();let{inputType:a,srcElement:i,data:r}=t;G(a,N)&&(n.value=H(i.value,e).join(""),e.test(r)||(i.value=o())),G(a,R)&&(n.value=H(i.value,e).join(""))};return i.onChange=function(t){return a="function"==typeof t?t:()=>{},i},i.onGetDefault=function(t){return o="function"==typeof t?t:()=>n.value,i},i}({pattern:o,value:a}).onChange(t=>n("dataValue",a=t.value)).onGetDefault(()=>s);let s;return t.$set=t=>{"dataValue"in t&&n("dataValue",a=t.dataValue),"pattern"in t&&n("pattern",o=t.pattern),"delimiter"in t&&n("delimiter",i=t.delimiter),"options"in t&&n("options",r=t.options)},t.$$.update=(t={delimiter:1,dataValue:1})=>{(t.delimiter||t.dataValue)&&n("showValue",s=i(a))},{dataValue:a,pattern:o,delimiter:i,options:r,mask:c,showValue:s}}class z extends L{constructor(t){super(),F(this,t,q,I,r,{dataValue:0,pattern:0,delimiter:0,options:0})}}function J(t){let e,n,a,o,i,r,l,m,h,$,g,b,x,y,_,w,V,E,C,k,j,P,F,L,M,N;function R(e){t.numinput0_dataValue_binding.call(null,e)}let G={pattern:/[10]/gm,delimiter:t.binaryDelimiter,options:{placeholder:"1100 0001",title:"binary input",type:"text"}};void 0!==t.bin&&(G.dataValue=t.bin);const H=new z({props:G});function I(e){t.numinput1_dataValue_binding.call(null,e)}v.push(()=>B(H,"dataValue",R)),H.$on("updated",t.binaryUpdated);let q={options:{placeholder:"12345",title:"decimal input",type:"text"}};void 0!==t.dec&&(q.dataValue=t.dec);const J=new z({props:q});function K(e){t.numinput2_dataValue_binding.call(null,e)}v.push(()=>B(J,"dataValue",I)),J.$on("updated",t.decUpdated);let Q={pattern:/([\dA-Fa-f])/gm,delimiter:t.hexaDelimiter,options:{placeholder:"ef fe",title:"hex input",type:"text"}};void 0!==t.hex&&(Q.dataValue=t.hex);const W=new z({props:Q});return v.push(()=>B(W,"dataValue",K)),W.$on("updated",t.hexUpdated),{c(){e=d("main"),n=d("section"),(a=d("h5")).textContent="Binary format 1010 0001",o=p(),O(H.$$.fragment),r=p(),l=d("textarea"),h=p(),$=d("section"),(g=d("h5")).textContent="Decimal",b=p(),O(J.$$.fragment),y=p(),_=d("textarea"),w=p(),V=d("section"),(E=d("h5")).textContent="Hexadecimal",C=p(),O(W.$$.fragment),j=p(),P=d("textarea"),L=p(),(M=d("footer")).innerHTML='<a target="_blank" href="https://bitbucket.org/timenty/" class="svelte-nlcmbm">\n\t\tauthor @timenty\n\t</a>',f(a,"class","svelte-nlcmbm"),l.disabled=!0,f(l,"class","result__container svelte-nlcmbm"),f(l,"cols","30"),f(l,"rows","10"),l.value=m=t.binaryDelimiter(t.bin),f(n,"class","container svelte-nlcmbm"),f(g,"class","svelte-nlcmbm"),_.disabled=!0,f(_,"class","result__container svelte-nlcmbm"),f(_,"cols","30"),f(_,"rows","10"),_.value=t.showDec,f($,"class","container svelte-nlcmbm"),f(E,"class","svelte-nlcmbm"),P.disabled=!0,f(P,"class","result__container svelte-nlcmbm"),f(P,"cols","30"),f(P,"rows","10"),P.value=F=t.hexaDelimiter(t.hex),f(V,"class","container svelte-nlcmbm"),f(e,"class","svelte-nlcmbm"),f(M,"class","svelte-nlcmbm")},m(t,i){c(t,e,i),u(e,n),u(n,a),u(n,o),S(H,n,null),u(n,r),u(n,l),u(e,h),u(e,$),u($,g),u($,b),S(J,$,null),u($,y),u($,_),u(e,w),u(e,V),u(V,E),u(V,C),S(W,V,null),u(V,j),u(V,P),c(t,L,i),c(t,M,i),N=!0},p(t,e){const n={};!i&&t.bin&&(i=!0,n.dataValue=e.bin,D(()=>i=!1)),H.$set(n),(!N||t.bin&&m!==(m=e.binaryDelimiter(e.bin)))&&(l.value=m);const a={};!x&&t.dec&&(x=!0,a.dataValue=e.dec,D(()=>x=!1)),J.$set(a),N&&!t.showDec||(_.value=e.showDec);const o={};!k&&t.hex&&(k=!0,o.dataValue=e.hex,D(()=>k=!1)),W.$set(o),(!N||t.hex&&F!==(F=e.hexaDelimiter(e.hex)))&&(P.value=F)},i(t){N||(U(H.$$.fragment,t),U(J.$$.fragment,t),U(W.$$.fragment,t),N=!0)},o(t){A(H.$$.fragment,t),A(J.$$.fragment,t),A(W.$$.fragment,t),N=!1},d(t){t&&s(e),T(H),T(J),T(W),t&&s(L),t&&s(M)}}}function K(t,e,n){const a=M({regex:/.{1,4}/gm,spacer:" "}),o=M({regex:/.{1,2}/gm,spacer:" "});let i="10101",r="fe",l="10";let u;return t.$$.update=(t={dec:1})=>{t.dec&&n("showDec",u=l)},{binaryDelimiter:a,hexaDelimiter:o,bin:i,hex:r,dec:l,binaryUpdated:t=>{n("dec",l=(t=>t.split("").reverse().reduce((t,e,n)=>"0"===e?t:t+Math.pow(2,n),0))(i))},decUpdated:t=>{let e=parseInt(l,10),a=l;n("bin",i=e.toString(2)),n("hex",r=e.toString(16)),window.setTimeout((function(){n("dec",l=a||0)}),0)},hexUpdated:t=>{n("dec",l=(t=>BigInt("0x"+(+t?t:"0")).toString(10))(r))},showDec:u,numinput0_dataValue_binding:function(t){n("bin",i=t)},numinput1_dataValue_binding:function(t){n("dec",l=t)},numinput2_dataValue_binding:function(t){n("hex",r=t)}}}return new class extends L{constructor(t){super(),F(this,t,K,J,i,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
