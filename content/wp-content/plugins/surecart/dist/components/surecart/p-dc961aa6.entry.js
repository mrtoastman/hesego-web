import{r as s,h as i,H as o}from"./p-dfbe004d.js";import{o as r}from"./p-d63f2554.js";const t=class{constructor(r){s(this,r)}render(){var r,s,t;return(null===(r=null==this?void 0:this.order)||void 0===r?void 0:r.bump_amount)?i("sc-line-item",null,i("span",{slot:"description"},this.label||wp.i18n.__("Bundle Discount","surecart")),i("span",{slot:"price"},i("sc-format-number",{type:"currency",currency:(null===(s=this.order)||void 0===s?void 0:s.currency)||"usd",value:null===(t=this.order)||void 0===t?void 0:t.bump_amount}))):i(o,{style:{display:"none"}})}};r(t,["order"],!1),t.style=":host{display:block}";export{t as sc_line_item_bump};