let e,t,n,l=!1,s=!1,o=!1,r=!1,i=null,c=!1;const f="undefined"!=typeof window?window:{},a=f.document||{head:{}},u={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,s)=>e.addEventListener(t,n,s),rel:(e,t,n,s)=>e.removeEventListener(t,n,s),ce:(e,t)=>new CustomEvent(e,t)},$=e=>Promise.resolve(e),d=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replaceSync}catch(e){}return!1})(),h=(e,t,n)=>{n&&n.map((([n,s,l])=>{const r=p(e,n),o=y(t,l),i=b(n);u.ael(r,s,o,i),(t.o=t.o||[]).push((()=>u.rel(r,s,o,i)))}))},y=(e,t)=>n=>{try{256&e.t?e.i[t](n):(e.u=e.u||[]).push([t,n])}catch(e){he(e)}},p=(e,t)=>8&t?f:e,b=e=>0!=(2&e),m=new WeakMap,w=e=>"sc-"+e.$,g={},v=e=>"object"==(e=typeof e)||"function"===e,j=(e,t,...n)=>{let s=null,l=null,r=null,o=!1,i=!1;const a=[],c=t=>{for(let n=0;n<t.length;n++)s=t[n],Array.isArray(s)?c(s):null!=s&&"boolean"!=typeof s&&((o="function"!=typeof e&&!v(s))&&(s+=""),o&&i?a[a.length-1].h+=s:a.push(o?k(null,s):s),i=o)};if(c(n),t){t.key&&(l=t.key),t.name&&(r=t.name);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}if("function"==typeof e)return e(null===t?{}:t,a,O);const u=k(e,null);return u.p=t,a.length>0&&(u.m=a),u.g=l,u.v=r,u},k=(e,t)=>({t:0,j:e,h:t,k:null,m:null,p:null,g:null,v:null}),S={},O={forEach:(e,t)=>e.map(M).forEach(t),map:(e,t)=>e.map(M).map(t).map(C)},M=e=>({vattrs:e.p,vchildren:e.m,vkey:e.g,vname:e.v,vtag:e.j,vtext:e.h}),C=e=>{if("function"==typeof e.vtag){const t=Object.assign({},e.vattrs);return e.vkey&&(t.key=e.vkey),e.vname&&(t.name=e.vname),j(e.vtag,t,...e.vchildren||[])}const t=k(e.vtag,e.vtext);return t.p=e.vattrs,t.m=e.vchildren,t.g=e.vkey,t.v=e.vname,t},x=(e,t,n,s,l,r)=>{if(n!==s){let o=de(e,t),i=t.toLowerCase();if("class"===t){const t=e.classList,l=R(n),r=R(s);t.remove(...l.filter((e=>e&&!r.includes(e)))),t.add(...r.filter((e=>e&&!l.includes(e))))}else if("style"===t){for(const t in n)s&&null!=s[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in s)n&&s[t]===n[t]||(t.includes("-")?e.style.setProperty(t,s[t]):e.style[t]=s[t])}else if("key"===t);else if("ref"===t)s&&s(e);else if(o||"o"!==t[0]||"n"!==t[1]){const i=v(s);if((o||i&&null!==s)&&!l)try{if(e.tagName.includes("-"))e[t]=s;else{const l=null==s?"":s;"list"===t?o=!1:null!=n&&e[t]==l||(e[t]=l)}}catch(e){}null==s||!1===s?!1===s&&""!==e.getAttribute(t)||e.removeAttribute(t):(!o||4&r||l)&&!i&&e.setAttribute(t,s=!0===s?"":s)}else t="-"===t[2]?t.slice(3):de(f,i)?i.slice(2):i[2]+t.slice(3),n&&u.rel(e,t,n,!1),s&&u.ael(e,t,s,!1)}},P=/\s/,R=e=>e?e.split(P):[],T=(e,t,n,s)=>{const l=11===t.k.nodeType&&t.k.host?t.k.host:t.k,r=e&&e.p||g,o=t.p||g;for(s in r)s in o||x(l,s,r[s],void 0,n,t.t);for(s in o)x(l,s,r[s],o[s],n,t.t)},E=(s,i,c,u)=>{const h=i.m[c];let d,f,p,m=0;if(l||(o=!0,"slot"===h.j&&(e&&u.classList.add(e+"-s"),h.t|=h.m?2:1)),null!==h.h)d=h.k=a.createTextNode(h.h);else if(1&h.t)d=h.k=a.createTextNode("");else{if(r||(r="svg"===h.j),d=h.k=a.createElementNS(r?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",2&h.t?"slot-fb":h.j),r&&"foreignObject"===h.j&&(r=!1),T(null,h,r),null!=e&&d["s-si"]!==e&&d.classList.add(d["s-si"]=e),h.m)for(m=0;m<h.m.length;++m)f=E(s,h,m,d),f&&d.appendChild(f);"svg"===h.j?r=!1:"foreignObject"===d.tagName&&(r=!0)}return d["s-hn"]=n,3&h.t&&(d["s-sr"]=!0,d["s-cr"]=t,d["s-sn"]=h.v||"",p=s&&s.m&&s.m[c],p&&p.j===h.j&&s.k&&L(s.k,!1)),d},L=(e,t)=>{u.t|=1;const s=e.childNodes;for(let e=s.length-1;e>=0;e--){const l=s[e];l["s-hn"]!==n&&l["s-ol"]&&(H(l).insertBefore(l,A(l)),l["s-ol"].remove(),l["s-ol"]=void 0,o=!0),t&&L(l,t)}u.t&=-2},N=(e,t,s,l,r,o)=>{let i,a=e["s-cr"]&&e["s-cr"].parentNode||e;for(a.shadowRoot&&a.tagName===n&&(a=a.shadowRoot);r<=o;++r)l[r]&&(i=E(null,s,r,e),i&&(l[r].k=i,a.insertBefore(i,A(t))))},F=(e,t,n,l,r)=>{for(;t<=n;++t)(l=e[t])&&(r=l.k,z(l),s=!0,r["s-ol"]?r["s-ol"].remove():L(r,!0),r.remove())},W=(e,t)=>e.j===t.j&&("slot"===e.j?e.v===t.v:e.g===t.g),A=e=>e&&e["s-ol"]||e,H=e=>(e["s-ol"]?e["s-ol"]:e).parentNode,U=(e,t)=>{const n=t.k=e.k,s=e.m,l=t.m,o=t.j,i=t.h;let a;null===i?(r="svg"===o||"foreignObject"!==o&&r,"slot"===o||T(e,t,r),null!==s&&null!==l?((e,t,n,s)=>{let l,r,o=0,i=0,a=0,c=0,u=t.length-1,h=t[0],d=t[u],f=s.length-1,p=s[0],m=s[f];for(;o<=u&&i<=f;)if(null==h)h=t[++o];else if(null==d)d=t[--u];else if(null==p)p=s[++i];else if(null==m)m=s[--f];else if(W(h,p))U(h,p),h=t[++o],p=s[++i];else if(W(d,m))U(d,m),d=t[--u],m=s[--f];else if(W(h,m))"slot"!==h.j&&"slot"!==m.j||L(h.k.parentNode,!1),U(h,m),e.insertBefore(h.k,d.k.nextSibling),h=t[++o],m=s[--f];else if(W(d,p))"slot"!==h.j&&"slot"!==m.j||L(d.k.parentNode,!1),U(d,p),e.insertBefore(d.k,h.k),d=t[--u],p=s[++i];else{for(a=-1,c=o;c<=u;++c)if(t[c]&&null!==t[c].g&&t[c].g===p.g){a=c;break}a>=0?(r=t[a],r.j!==p.j?l=E(t&&t[i],n,a,e):(U(r,p),t[a]=void 0,l=r.k),p=s[++i]):(l=E(t&&t[i],n,i,e),p=s[++i]),l&&H(h.k).insertBefore(l,A(h.k))}o>u?N(e,null==s[f+1]?null:s[f+1].k,n,s,i,f):i>f&&F(t,o,u)})(n,s,t,l):null!==l?(null!==e.h&&(n.textContent=""),N(n,null,t,l,0,l.length-1)):null!==s&&F(s,0,s.length-1),r&&"svg"===o&&(r=!1)):(a=n["s-cr"])?a.parentNode.textContent=i:e.h!==i&&(n.data=i)},q=e=>{const t=e.childNodes;let n,s,l,r,o,i;for(s=0,l=t.length;s<l;s++)if(n=t[s],1===n.nodeType){if(n["s-sr"])for(o=n["s-sn"],n.hidden=!1,r=0;r<l;r++)if(i=t[r].nodeType,t[r]["s-hn"]!==n["s-hn"]||""!==o){if(1===i&&o===t[r].getAttribute("slot")){n.hidden=!0;break}}else if(1===i||3===i&&""!==t[r].textContent.trim()){n.hidden=!0;break}q(n)}},D=[],V=e=>{let t,n,l,r,o,i,a=0;const c=e.childNodes,u=c.length;for(;a<u;a++){if(t=c[a],t["s-sr"]&&(n=t["s-cr"])&&n.parentNode)for(l=n.parentNode.childNodes,r=t["s-sn"],i=l.length-1;i>=0;i--)n=l[i],n["s-cn"]||n["s-nr"]||n["s-hn"]===t["s-hn"]||(_(n,r)?(o=D.find((e=>e.S===n)),s=!0,n["s-sn"]=n["s-sn"]||r,o?o.O=t:D.push({O:t,S:n}),n["s-sr"]&&D.map((e=>{_(e.S,n["s-sn"])&&(o=D.find((e=>e.S===n)),o&&!e.O&&(e.O=o.O))}))):D.some((e=>e.S===n))||D.push({S:n}));1===t.nodeType&&V(t)}},_=(e,t)=>1===e.nodeType?null===e.getAttribute("slot")&&""===t||e.getAttribute("slot")===t:e["s-sn"]===t||""===t,z=e=>{e.p&&e.p.ref&&e.p.ref(null),e.m&&e.m.map(z)},B=e=>ae(e).M,G=(e,t,n)=>{const s=B(e);return{emit:e=>I(s,t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e})}},I=(e,t,n)=>{const s=u.ce(t,n);return e.dispatchEvent(s),s},J=(e,t)=>{t&&!e.C&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.C=t)))},K=(e,t)=>{if(e.t|=16,!(4&e.t))return J(e,e.P),Se((()=>Q(e,t)));e.t|=512},Q=(e,t)=>{const n=e.i;let s;return t&&(e.t|=256,e.u&&(e.u.map((([e,t])=>le(n,e,t))),e.u=null),s=le(n,"componentWillLoad")),se(s,(()=>X(e,n,t)))},X=async(e,t,n)=>{const s=e.M,l=s["s-rc"];n&&(e=>{const t=e.R,n=e.M,s=t.t,l=((e,t)=>{let n=w(t);const s=be.get(n);if(e=11===e.nodeType?e:a,s)if("string"==typeof s){let t,l=m.get(e=e.head||e);l||m.set(e,l=new Set),l.has(n)||(t=a.createElement("style"),t.innerHTML=s,e.insertBefore(t,e.querySelector("link")),l&&l.add(n))}else e.adoptedStyleSheets.includes(s)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,s]);return n})(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&s&&(n["s-sc"]=l,n.classList.add(l+"-h"))})(e),Y(e,t),l&&(l.map((e=>e())),s["s-rc"]=void 0);{const t=s["s-p"],n=()=>ee(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},Y=(r,c)=>{try{i=c,c=c.render&&c.render(),r.t&=-17,r.t|=2,((r,i)=>{const c=r.M,h=r.R,d=r.T||k(null,null),f=(e=>e&&e.j===S)(i)?i:j(null,null,i);if(n=c.tagName,h.L&&(f.p=f.p||{},h.L.map((([e,t])=>f.p[t]=c[e]))),f.j=null,f.t|=4,r.T=f,f.k=d.k=c.shadowRoot||c,e=c["s-sc"],t=c["s-cr"],l=0!=(1&h.t),s=!1,U(d,f),u.t|=1,o){let e,t,n,s,l,r;V(f.k);let o=0;for(;o<D.length;o++)e=D[o],t=e.S,t["s-ol"]||(n=a.createTextNode(""),n["s-nr"]=t,t.parentNode.insertBefore(t["s-ol"]=n,t));for(o=0;o<D.length;o++)if(e=D[o],t=e.S,e.O){for(s=e.O.parentNode,l=e.O.nextSibling,n=t["s-ol"];n=n.previousSibling;)if(r=n["s-nr"],r&&r["s-sn"]===t["s-sn"]&&s===r.parentNode&&(r=r.nextSibling,!r||!r["s-nr"])){l=r;break}(!l&&s!==t.parentNode||t.nextSibling!==l)&&t!==l&&(!t["s-hn"]&&t["s-ol"]&&(t["s-hn"]=t["s-ol"].parentNode.nodeName),s.insertBefore(t,l))}else 1===t.nodeType&&(t.hidden=!0)}s&&q(f.k),u.t&=-2,D.length=0})(r,c)}catch(e){he(e,r.M)}return i=null,null},Z=()=>i,ee=e=>{const t=e.M,n=e.i,s=e.P;64&e.t||(e.t|=64,oe(t),le(n,"componentDidLoad"),e.N(t),s||ne()),e.F(t),e.C&&(e.C(),e.C=void 0),512&e.t&&ke((()=>K(e,!1))),e.t&=-517},te=e=>{{const t=ae(e),n=t.M.isConnected;return n&&2==(18&t.t)&&K(t,!1),n}},ne=()=>{oe(a.documentElement),ke((()=>I(f,"appload",{detail:{namespace:"surecart"}})))},le=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){he(e)}},se=(e,t)=>e&&e.then?e.then(t):t(),oe=e=>e.classList.add("hydrated"),re=(e,t,n)=>{if(t.W){e.watchers&&(t.A=e.watchers);const s=Object.entries(t.W),l=e.prototype;if(s.map((([e,[s]])=>{31&s||2&n&&32&s?Object.defineProperty(l,e,{get(){return((e,t)=>ae(this).H.get(t))(0,e)},set(n){((e,t,n,s)=>{const l=ae(this),r=l.M,o=l.H.get(t),i=l.t,a=l.i;if(n=((e,t)=>null==e||v(e)?e:4&t?"false"!==e&&(""===e||!!e):2&t?parseFloat(e):1&t?e+"":e)(n,s.W[t][0]),(!(8&i)||void 0===o)&&n!==o&&(!Number.isNaN(o)||!Number.isNaN(n))&&(l.H.set(t,n),a)){if(s.A&&128&i){const e=s.A[t];e&&e.map((e=>{try{a[e](n,o,t)}catch(e){he(e,r)}}))}2==(18&i)&&K(l,!1)}})(0,e,n,t)},configurable:!0,enumerable:!0}):1&n&&64&s&&Object.defineProperty(l,e,{value(...t){const n=ae(this);return n.U.then((()=>n.i[e](...t)))}})})),1&n){const n=new Map;l.attributeChangedCallback=function(e,t,s){u.jmp((()=>{const t=n.get(e);if(this.hasOwnProperty(t))s=this[t],delete this[t];else if(l.hasOwnProperty(t)&&"number"==typeof this[t]&&this[t]==s)return;this[t]=(null!==s||"boolean"!=typeof this[t])&&s}))},e.observedAttributes=s.filter((([e,t])=>15&t[0])).map((([e,s])=>{const l=s[1]||e;return n.set(l,e),512&s[0]&&t.L.push([e,l]),l}))}}return e},ie=(e,t={})=>{const n=[],s=t.exclude||[],l=f.customElements,r=a.head,o=r.querySelector("meta[charset]"),i=a.createElement("style"),c=[];let p,m=!0;Object.assign(u,t),u.l=new URL(t.resourcesUrl||"./",a.baseURI).href,e.map((e=>{e[1].map((t=>{const r={t:t[0],$:t[1],W:t[2],q:t[3]};r.W=t[2],r.q=t[3],r.L=[],r.A={};const o=r.$,i=class extends HTMLElement{constructor(e){super(e),$e(e=this,r),1&r.t&&e.attachShadow({mode:"open"})}connectedCallback(){p&&(clearTimeout(p),p=null),m?c.push(this):u.jmp((()=>(e=>{if(0==(1&u.t)){const t=ae(e),n=t.R,s=()=>{};if(1&t.t)h(e,t,n.q);else{t.t|=1,12&n.t&&(e=>{const t=e["s-cr"]=a.createComment("");t["s-cn"]=!0,e.insertBefore(t,e.firstChild)})(e);{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){J(t,t.P=n);break}}n.W&&Object.entries(n.W).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,s,l)=>{if(0==(32&t.t)){{if(t.t|=32,(l=pe(n)).then){const e=()=>{};l=await l,e()}l.isProxied||(n.A=l.watchers,re(l,n,2),l.isProxied=!0);const s=()=>{};t.t|=8;try{new l(t)}catch(e){he(e)}t.t&=-9,t.t|=128,s()}if(l.style){let e=l.style;const t=w(n);if(!be.has(t)){const s=()=>{};((e,t,n)=>{let s=be.get(e);d&&n?(s=s||new CSSStyleSheet,"string"==typeof s?s=t:s.replaceSync(t)):s=t,be.set(e,s)})(t,e,!!(1&n.t)),s()}}}const r=t.P,o=()=>K(t,!0);r&&r["s-rc"]?r["s-rc"].push(o):o()})(0,t,n)}s()}})(this)))}disconnectedCallback(){u.jmp((()=>(()=>{if(0==(1&u.t)){const e=ae(this),t=e.i;e.o&&(e.o.map((e=>e())),e.o=void 0),le(t,"disconnectedCallback")}})()))}componentOnReady(){return ae(this).D}};r.V=e[0],s.includes(o)||l.get(o)||(n.push(o),l.define(o,re(i,r,1)))}))})),i.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",i.setAttribute("data-styles",""),r.insertBefore(i,o?o.nextSibling:r.firstChild),m=!1,c.length?c.map((e=>e.connectedCallback())):u.jmp((()=>p=setTimeout(ne,30)))},ce=(e,t)=>t,fe=new WeakMap,ae=e=>fe.get(e),ue=(e,t)=>fe.set(t.i=e,t),$e=(e,t)=>{const n={t:0,M:e,R:t,H:new Map};return n.U=new Promise((e=>n.F=e)),n.D=new Promise((e=>n.N=e)),e["s-p"]=[],e["s-rc"]=[],h(e,n,t.q),fe.set(e,n)},de=(e,t)=>t in e,he=(e,t)=>(0,console.error)(e,t),ye=new Map,pe=e=>{const t=e.$.replace(/-/g,"_"),n=e.V,s=ye.get(n);return s?s[t]:import(`./${n}.entry.js`).then((e=>(ye.set(n,e),e[t])),he)},be=new Map,me=[],we=[],ge=(e,t)=>n=>{e.push(n),c||(c=!0,t&&4&u.t?ke(je):u.raf(je))},ve=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){he(e)}e.length=0},je=()=>{ve(me),ve(we),(c=me.length>0)&&u.raf(je)},ke=e=>$().then(e),Se=ge(we,!0);export{ce as F,S as H,Z as a,ie as b,G as c,te as f,B as g,j as h,$ as p,ue as r};