"use strict";function animateTo(e,n,t){return new Promise((i=>{if((null==t?void 0:t.duration)===1/0)throw new Error("Promise-based animations must be finite.");if(!(null==e?void 0:e.animate))return;const o=e.animate(n,{...t,duration:prefersReducedMotion()?0:t.duration});o.addEventListener("cancel",i,{once:!0}),o.addEventListener("finish",i,{once:!0})}))}function prefersReducedMotion(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function stopAnimations(e){var n;return Promise.all(((null===(n=null==e?void 0:e.getAnimations)||void 0===n?void 0:n.call(e))||[]).map((e=>new Promise((n=>{const t=requestAnimationFrame(n);e.addEventListener("cancel",(()=>t),{once:!0}),e.addEventListener("finish",(()=>t),{once:!0}),e.cancel()})))))}function shimKeyframesHeightAuto(e,n){return e.map((e=>({...e,height:"auto"===e.height?`${n}px`:e.height})))}const defaultAnimationRegistry=new Map,customAnimationRegistry=new WeakMap;function ensureAnimation(e){return null!=e?e:{keyframes:[],options:{duration:0}}}function setDefaultAnimation(e,n){defaultAnimationRegistry.set(e,ensureAnimation(n))}function getAnimation(e,n){const t=customAnimationRegistry.get(e);if(null==t?void 0:t[n])return t[n];return defaultAnimationRegistry.get(n)||{keyframes:[],options:{duration:0}}}exports.animateTo=animateTo,exports.getAnimation=getAnimation,exports.setDefaultAnimation=setDefaultAnimation,exports.shimKeyframesHeightAuto=shimKeyframesHeightAuto,exports.stopAnimations=stopAnimations;