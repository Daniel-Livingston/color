import{s as $,f as b,l as _,a as S,g as d,h as f,m as g,d as p,c as x,i as u,E as h,n as v,r as E,K as q}from"../chunks/scheduler.Jes5VxJn.js";import{S as y,i as C}from"../chunks/index.RNoZNs9N.js";import{d as H}from"../chunks/singletons.BGN2423A.js";const K=()=>{const s=H;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},P={subscribe(s){return K().page.subscribe(s)}};function j(s){let t,r=s[0].status+"",o,n,i,c=s[0].error?.message+"",l;return{c(){t=b("h1"),o=_(r),n=S(),i=b("p"),l=_(c)},l(e){t=d(e,"H1",{});var a=f(t);o=g(a,r),a.forEach(p),n=x(e),i=d(e,"P",{});var m=f(i);l=g(m,c),m.forEach(p)},m(e,a){u(e,t,a),h(t,o),u(e,n,a),u(e,i,a),h(i,l)},p(e,[a]){a&1&&r!==(r=e[0].status+"")&&v(o,r),a&1&&c!==(c=e[0].error?.message+"")&&v(l,c)},i:E,o:E,d(e){e&&(p(t),p(n),p(i))}}}function k(s,t,r){let o;return q(s,P,n=>r(0,o=n)),[o]}let B=class extends y{constructor(t){super(),C(this,t,k,j,$,{})}};export{B as component};