function t(t){let e="";const n=Object.entries(t);let r;for(;r=n.shift();){let[t,s]=r;if(Array.isArray(s)||s&&s.constructor===Object){const e=Object.entries(s).reverse();for(const[r,s]of e)n.unshift([`${t}[${r}]`,s])}else void 0!==s&&(null===s&&(s=""),e+="&"+[t,s].map(encodeURIComponent).join("="))}return e.substr(1)}function e(t){return(function(t){let e;try{e=new URL(t,"http://example.com").search.substring(1)}catch(t){}if(e)return e}(t)||"").replace(/\+/g,"%20").split("&").reduce(((t,e)=>{const[n,r=""]=e.split("=").filter(Boolean).map(decodeURIComponent);return n&&function(t,e,n){const r=e.length,s=r-1;for(let o=0;o<r;o++){let r=e[o];!r&&Array.isArray(t)&&(r=t.length.toString());const c=!isNaN(Number(e[o+1]));t[r]=o===s?n:t[r]||(c?[]:{}),Array.isArray(t[r])&&!c&&(t[r]={...t[r]}),t=t[r]}}(t,n.replace(/\]/g,"").split("["),r),t}),{})}function n(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments.length>1?arguments[1]:void 0;if(!r||!Object.keys(r).length)return n;let s=n;const o=n.indexOf("?");return-1!==o&&(r=Object.assign(e(n),r),s=s.substr(0,o)),s+"?"+t(r)}export{n as a,t as b,e as g};