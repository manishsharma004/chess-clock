import{s as Y,d as z,n as W,r as Z}from"../chunks/scheduler.DHKgWpgq.js";import{S as $,i as x,e as T,b as U,s as R,c as g,d as E,f as j,g as d,h as F,m as h,j as G,k as u,n as A,l as X}from"../chunks/index.vMr7mszy.js";const ee=!0,te=!0,ce=Object.freeze(Object.defineProperty({__proto__:null,prerender:ee,ssr:te},Symbol.toStringTag,{value:"Module"}));function se(s){let t;return{c(){t=U("∥")},l(e){t=j(e,"∥")},m(e,n){G(e,t,n)},d(e){e&&d(t)}}}function le(s){let t;return{c(){t=U("►")},l(e){t=j(e,"►")},m(e,n){G(e,t,n)},d(e){e&&d(t)}}}function re(s){let t,e,n,w=s[8](s[3])+"",m,b,_,k,o,f=s[8](s[2])+"",v,O,B,c,i,S,D,r,V,I,N,L;function H(l,a){return l[4]?se:le}let y=H(s),p=y(s);return{c(){t=T("div"),e=T("div"),n=T("button"),m=U(w),k=R(),o=T("button"),v=U(f),B=R(),c=T("div"),i=T("button"),p.c(),D=R(),r=T("button"),V=U("↺"),this.h()},l(l){t=g(l,"DIV",{class:!0});var a=E(t);e=g(a,"DIV",{class:!0});var P=E(e);n=g(P,"BUTTON",{class:!0});var J=E(n);m=j(J,w),J.forEach(d),k=F(P),o=g(P,"BUTTON",{class:!0});var K=E(o);v=j(K,f),K.forEach(d),P.forEach(d),B=F(a),c=g(a,"DIV",{class:!0});var q=E(c);i=g(q,"BUTTON",{class:!0});var M=E(i);p.l(M),M.forEach(d),D=F(q),r=g(q,"BUTTON",{class:!0});var Q=E(r);V=j(Q,"↺"),Q.forEach(d),q.forEach(d),a.forEach(d),this.h()},h(){h(n,"class",b=z(`button button-white ${s[1]==="white"?"selected":""}`)+" svelte-pu3rke"),n.disabled=_=!s[0],h(o,"class",O=z(`button button-black ${s[1]==="black"?"selected":""}`)+" svelte-pu3rke"),h(e,"class","buttons svelte-pu3rke"),h(i,"class","button reset-button svelte-pu3rke"),i.disabled=S=!s[0],h(r,"class","button reset-button svelte-pu3rke"),r.disabled=I=!s[0],h(c,"class","actions svelte-pu3rke"),h(t,"class","container svelte-pu3rke")},m(l,a){G(l,t,a),u(t,e),u(e,n),u(n,m),u(e,k),u(e,o),u(o,v),u(t,B),u(t,c),u(c,i),p.m(i,null),u(c,D),u(c,r),u(r,V),N||(L=[A(n,"click",s[11]),A(o,"click",s[12]),A(i,"click",s[6]),A(r,"click",s[5])],N=!0)},p(l,[a]){a&8&&w!==(w=l[8](l[3])+"")&&X(m,w),a&2&&b!==(b=z(`button button-white ${l[1]==="white"?"selected":""}`)+" svelte-pu3rke")&&h(n,"class",b),a&1&&_!==(_=!l[0])&&(n.disabled=_),a&4&&f!==(f=l[8](l[2])+"")&&X(v,f),a&2&&O!==(O=z(`button button-black ${l[1]==="black"?"selected":""}`)+" svelte-pu3rke")&&h(o,"class",O),y!==(y=H(l))&&(p.d(1),p=y(l),p&&(p.c(),p.m(i,null))),a&1&&S!==(S=!l[0])&&(i.disabled=S),a&1&&I!==(I=!l[0])&&(r.disabled=I)},i:W,o:W,d(l){l&&d(t),p.d(),N=!1,Z(L)}}}const C=6e5;function ne(s,t,e){let m=!1,b="",_=C,k=C,o;const f=()=>{clearInterval(o),e(4,o=0)},v=()=>{f(),e(2,_=C),e(3,k=C),e(0,m=!1)},O=()=>{o?f():B()},B=()=>{f(),e(4,o=setInterval(()=>{b==="white"?e(3,k-=100):b==="black"&&e(2,_-=100),(_<=0||k<=0)&&v()},100))},c=(r="")=>{e(1,b=r),e(0,m=!0),o||B()};return[m,b,_,k,o,v,O,c,r=>{const I=r%1e3/100;r=Math.floor(r/1e3);const N=r%60;return`${Math.floor(r/60)}m:${N}.${I}s`},!0,!0,()=>c("black"),()=>c("white")]}class ue extends ${constructor(t){super(),x(this,t,ne,re,Y,{prerender:9,ssr:10})}get prerender(){return this.$$.ctx[9]}get ssr(){return this.$$.ctx[10]}}export{ue as component,ce as universal};
