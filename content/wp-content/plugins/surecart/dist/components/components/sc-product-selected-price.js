import{proxyCustomElement,HTMLElement,createEvent,h,Host,Fragment}from"@stencil/core/internal/client";import{i as intervalString}from"./price.js";import{g as getLineItemByProductId}from"./getters2.js";import{f as formBusy}from"./getters3.js";import{o as onChange}from"./watchers.js";import{d as defineCustomElement$a}from"./sc-button2.js";import{d as defineCustomElement$9}from"./sc-form2.js";import{d as defineCustomElement$8}from"./sc-form-control2.js";import{d as defineCustomElement$7}from"./sc-format-number2.js";import{d as defineCustomElement$6}from"./sc-icon2.js";import{d as defineCustomElement$5}from"./sc-input2.js";import{d as defineCustomElement$4}from"./sc-price-input2.js";import{d as defineCustomElement$3}from"./sc-spinner2.js";import{d as defineCustomElement$2}from"./sc-tooltip2.js";const scProductSelectedPriceCss=":host{display:block}sc-form{width:100%}.selected-price{display:flex;align-items:center;gap:var(--sc-spacing-small);flex-wrap:wrap}.selected-price__wrap{display:flex;align-items:baseline;flex-wrap:wrap;gap:var(--sc-spacing-xx-small);color:var(--sc-selected-price-color, var(--sc-color-gray-800));line-height:1}.selected-price__price{font-size:var(--sc-font-size-xxx-large);font-weight:var(--sc-font-weight-bold);white-space:nowrap}.selected-price__interval{font-weight:var(--sc-font-weight-bold);opacity:0.65;white-space:nowrap}.selected-price__scratch-price{opacity:0.65;font-weight:var(--sc-font-weight-normal);text-decoration:line-through}",ScProductSelectedPrice$1=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.scUpdateLineItem=createEvent(this,"scUpdateLineItem",7)}lineItem(){return getLineItemByProductId(this.productId)}componentWillLoad(){onChange("checkout",(()=>{var e,t,s;this.adHocAmount=(null===(e=this.lineItem())||void 0===e?void 0:e.ad_hoc_amount)||(null===(s=null===(t=this.lineItem())||void 0===t?void 0:t.price)||void 0===s?void 0:s.amount)}))}updatePrice(){var e,t,s;this.showInput=!1,(this.adHocAmount||0===this.adHocAmount)&&this.adHocAmount!==(null===(e=this.lineItem())||void 0===e?void 0:e.ad_hoc_amount)&&this.scUpdateLineItem.emit({price_id:null===(s=null===(t=this.lineItem())||void 0===t?void 0:t.price)||void 0===s?void 0:s.id,quantity:1,ad_hoc_amount:this.adHocAmount})}handleShowInputChange(e){e&&setTimeout((()=>{this.input.triggerFocus()}),50)}render(){var e,t,s,o,c;const n=null===(e=this.lineItem())||void 0===e?void 0:e.price;return n?h("div",{class:{"selected-price":!0}},this.showInput?h("sc-form",{onScSubmit:e=>{e.preventDefault(),e.stopImmediatePropagation(),this.updatePrice()},onScFormSubmit:e=>{e.preventDefault(),e.stopImmediatePropagation()}},h("sc-price-input",{ref:e=>this.input=e,size:"large","currency-code":(null==n?void 0:n.currency)||"usd",min:null==n?void 0:n.ad_hoc_min_amount,max:null==n?void 0:n.ad_hoc_max_amount,placeholder:"0.00",required:!0,value:null===(s=null===(t=this.adHocAmount)||void 0===t?void 0:t.toString)||void 0===s?void 0:s.call(t),onScInput:e=>this.adHocAmount=parseInt(e.target.value)},h("sc-button",{slot:"suffix",type:"link",submit:!0},wp.i18n.__("Update","surecart")))):h(Fragment,null,h("div",{class:"selected-price__wrap"},h("span",{class:"selected-price__price"},(null==n?void 0:n.scratch_amount)>n.amount&&h(Fragment,null,h("sc-format-number",{class:"selected-price__scratch-price",part:"price__scratch",type:"currency",currency:null==n?void 0:n.currency,value:null==n?void 0:n.scratch_amount})," "),h("sc-format-number",{type:"currency",currency:null==n?void 0:n.currency,value:null!==(null===(o=this.lineItem())||void 0===o?void 0:o.ad_hoc_amount)?null===(c=this.lineItem())||void 0===c?void 0:c.ad_hoc_amount:null==n?void 0:n.amount})),h("span",{class:"selected-price__interval"},intervalString(n,{labels:{interval:"/",period:
/** translators: used as in time period: "for 3 months" */
wp.i18n.__("for","surecart")}}))),(null==n?void 0:n.ad_hoc)&&!formBusy()&&h("sc-button",{class:"selected-price__change-amount",type:"primary",size:"small",onClick:()=>this.showInput=!0},h("sc-icon",{name:"edit",slot:"prefix"}),wp.i18n.__("Change Amount","surecart")))):h(Host,{style:{display:"none"}})}static get watchers(){return{showInput:["handleShowInputChange"]}}static get style(){return scProductSelectedPriceCss}},[1,"sc-product-selected-price",{productId:[1,"product-id"],showInput:[32],adHocAmount:[32]}]);function defineCustomElement$1(){"undefined"!=typeof customElements&&["sc-product-selected-price","sc-button","sc-form","sc-form-control","sc-format-number","sc-icon","sc-input","sc-price-input","sc-spinner","sc-tooltip"].forEach((e=>{switch(e){case"sc-product-selected-price":customElements.get(e)||customElements.define(e,ScProductSelectedPrice$1);break;case"sc-button":customElements.get(e)||defineCustomElement$a();break;case"sc-form":customElements.get(e)||defineCustomElement$9();break;case"sc-form-control":customElements.get(e)||defineCustomElement$8();break;case"sc-format-number":customElements.get(e)||defineCustomElement$7();break;case"sc-icon":customElements.get(e)||defineCustomElement$6();break;case"sc-input":customElements.get(e)||defineCustomElement$5();break;case"sc-price-input":customElements.get(e)||defineCustomElement$4();break;case"sc-spinner":customElements.get(e)||defineCustomElement$3();break;case"sc-tooltip":customElements.get(e)||defineCustomElement$2()}}))}defineCustomElement$1();const ScProductSelectedPrice=ScProductSelectedPrice$1,defineCustomElement=defineCustomElement$1;export{ScProductSelectedPrice,defineCustomElement};