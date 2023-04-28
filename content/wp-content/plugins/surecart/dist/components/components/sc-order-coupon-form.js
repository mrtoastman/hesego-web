import{proxyCustomElement,HTMLElement,createEvent,h}from"@stencil/core/internal/client";import{o as openWormhole}from"./consumer.js";import{i as isRtl}from"./page-align.js";import{d as defineCustomElement$e}from"./sc-alert2.js";import{d as defineCustomElement$d}from"./sc-block-ui2.js";import{d as defineCustomElement$c}from"./sc-button2.js";import{d as defineCustomElement$b}from"./sc-coupon-form2.js";import{d as defineCustomElement$a}from"./sc-form-control2.js";import{d as defineCustomElement$9}from"./sc-format-number2.js";import{d as defineCustomElement$8}from"./sc-icon2.js";import{d as defineCustomElement$7}from"./sc-input2.js";import{d as defineCustomElement$6}from"./sc-line-item2.js";import{d as defineCustomElement$5}from"./sc-skeleton2.js";import{d as defineCustomElement$4}from"./sc-spinner2.js";import{d as defineCustomElement$3}from"./sc-tag2.js";import{d as defineCustomElement$2}from"./sc-tooltip2.js";const scOrderCouponFormCss=":host{display:block}.coupon-form{position:relative}.form{opacity:0;visibility:hidden;height:0;transition:opacity var(--sc-transition-fast) ease-in-out}.coupon-form--is-open .form{opacity:1;visibility:visible;height:auto;margin-top:var(--sc-spacing-small);display:grid;gap:var(--sc-spacing-small)}.coupon-form--is-open .trigger{color:var(--sc-input-label-color)}.coupon-form--is-open .trigger:hover{text-decoration:none}.trigger{cursor:pointer;font-size:var(--sc-font-size-small);color:var(--sc-color-gray-500);user-select:none}.trigger:hover{text-decoration:underline}.order-coupon-form--is-rtl .trigger,.order-coupon-form--is-rtl .trigger:hover{text-align:right}",ScOrderCouponForm$1=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.scApplyCoupon=createEvent(this,"scApplyCoupon",7)}handleErrorsChange(){var e;const o=((null===(e=null==this?void 0:this.error)||void 0===e?void 0:e.additional_errors)||[]).find((e=>{var o;return"discount.promotion_code"===(null===(o=null==e?void 0:e.data)||void 0===o?void 0:o.attribute)}));this.errorMessage=(null==o?void 0:o.message)?null==o?void 0:o.message:""}render(){var e,o,t,s,r,n;return h("sc-coupon-form",{label:this.label||wp.i18n.__("Add Coupon Code","surecart"),collapsed:this.collapsed,placeholder:this.placeholder,loading:this.busy&&!(null===(t=null===(o=null===(e=this.order)||void 0===e?void 0:e.line_items)||void 0===o?void 0:o.data)||void 0===t?void 0:t.length),busy:this.busy,error:this.errorMessage,discount:null===(s=null==this?void 0:this.order)||void 0===s?void 0:s.discount,currency:null===(r=null==this?void 0:this.order)||void 0===r?void 0:r.currency,"discount-amount":null===(n=null==this?void 0:this.order)||void 0===n?void 0:n.discount_amount,class:{"order-coupon-form--is-rtl":isRtl()},"button-text":this.buttonText||wp.i18n.__("Apply","surecart")})}static get watchers(){return{error:["handleErrorsChange"]}}static get style(){return scOrderCouponFormCss}},[1,"sc-order-coupon-form",{label:[1],loading:[4],busy:[4],error:[8],order:[16],collapsed:[4],placeholder:[1],buttonText:[1,"button-text"],open:[32],value:[32],errorMessage:[32]}]);function defineCustomElement$1(){"undefined"!=typeof customElements&&["sc-order-coupon-form","sc-alert","sc-block-ui","sc-button","sc-coupon-form","sc-form-control","sc-format-number","sc-icon","sc-input","sc-line-item","sc-skeleton","sc-spinner","sc-tag","sc-tooltip"].forEach((e=>{switch(e){case"sc-order-coupon-form":customElements.get(e)||customElements.define(e,ScOrderCouponForm$1);break;case"sc-alert":customElements.get(e)||defineCustomElement$e();break;case"sc-block-ui":customElements.get(e)||defineCustomElement$d();break;case"sc-button":customElements.get(e)||defineCustomElement$c();break;case"sc-coupon-form":customElements.get(e)||defineCustomElement$b();break;case"sc-form-control":customElements.get(e)||defineCustomElement$a();break;case"sc-format-number":customElements.get(e)||defineCustomElement$9();break;case"sc-icon":customElements.get(e)||defineCustomElement$8();break;case"sc-input":customElements.get(e)||defineCustomElement$7();break;case"sc-line-item":customElements.get(e)||defineCustomElement$6();break;case"sc-skeleton":customElements.get(e)||defineCustomElement$5();break;case"sc-spinner":customElements.get(e)||defineCustomElement$4();break;case"sc-tag":customElements.get(e)||defineCustomElement$3();break;case"sc-tooltip":customElements.get(e)||defineCustomElement$2()}}))}openWormhole(ScOrderCouponForm$1,["loading","busy","order","error"],!1),defineCustomElement$1();const ScOrderCouponForm=ScOrderCouponForm$1,defineCustomElement=defineCustomElement$1;export{ScOrderCouponForm,defineCustomElement};