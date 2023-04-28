function animateTo(n,e,t){return new Promise((i=>{if((null==t?void 0:t.duration)===1/0)throw new Error("Promise-based animations must be finite.");if(!(null==n?void 0:n.animate))return;const o=n.animate(e,{...t,duration:prefersReducedMotion()?0:t.duration});o.addEventListener("cancel",i,{once:!0}),o.addEventListener("finish",i,{once:!0})}))}function prefersReducedMotion(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function stopAnimations(n){var e;return Promise.all(((null===(e=null==n?void 0:n.getAnimations)||void 0===e?void 0:e.call(n))||[]).map((n=>new Promise((e=>{const t=requestAnimationFrame(e);n.addEventListener("cancel",(()=>t),{once:!0}),n.addEventListener("finish",(()=>t),{once:!0}),n.cancel()})))))}function shimKeyframesHeightAuto(n,e){return n.map((n=>({...n,height:"auto"===n.height?`${e}px`:n.height})))}const defaultAnimationRegistry=new Map,customAnimationRegistry=new WeakMap;function ensureAnimation(n){return null!=n?n:{keyframes:[],options:{duration:0}}}function setDefaultAnimation(n,e){defaultAnimationRegistry.set(n,ensureAnimation(e))}function getAnimation(n,e){const t=customAnimationRegistry.get(n);if(null==t?void 0:t[e])return t[e];return defaultAnimationRegistry.get(e)||{keyframes:[],options:{duration:0}}}export{animateTo as a,shimKeyframesHeightAuto as b,setDefaultAnimation as c,getAnimation as g,stopAnimations as s};