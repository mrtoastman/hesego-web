import{r as registerInstance,h}from"./index-fd4790f6.js";import{o as openWormhole}from"./consumer-b5087188.js";const scCartFormSubmitCss="sc-order-submit{display:block;width:auto}",ScCartFormSubmit=class{constructor(s){registerInstance(this,s),this.type="primary",this.size="medium",this.full=!0}render(){return h("sc-button",{submit:!0,type:this.type,size:this.size,full:this.full,loading:this.busy,disabled:this.busy},!!this.icon&&h("sc-icon",{name:this.icon,slot:"prefix"}),h("slot",null))}};openWormhole(ScCartFormSubmit,["busy"],!1),ScCartFormSubmit.style=scCartFormSubmitCss;export{ScCartFormSubmit as sc_cart_form_submit};