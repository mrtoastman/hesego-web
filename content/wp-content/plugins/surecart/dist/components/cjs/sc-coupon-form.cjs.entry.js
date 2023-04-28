"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const index=require("./index-9c866aeb.js"),pageAlign=require("./page-align-bf197eb4.js"),price=require("./price-d3e21aa4.js"),scCouponFormCss=":host {\n  display: block;\n}\n\nsc-button {\n  color: var(--sc-color-primary-500);\n}\n\n.coupon-form {\n  position: relative;\n  container-type: inline-size;\n}\n.coupon-form .coupon-button {\n  opacity: 0;\n  visibility: hidden;\n  transform: scale(0.9);\n  transition: all var(--sc-transition-fast) ease;\n}\n.coupon-form .coupon-button-mobile {\n  margin-top: var(--sc-input-label-margin);\n  display: none;\n}\n.coupon-form--has-value .coupon-button {\n  opacity: 1;\n  visibility: visible;\n  transform: scale(1);\n}\n\n@container (max-width: 320px) {\n  .coupon-form .coupon-button {\n    display: none;\n  }\n  .coupon-form .coupon-button-mobile {\n    display: block;\n  }\n}\n.form {\n  opacity: 0;\n  visibility: hidden;\n  height: 0;\n  transform: translateY(5px);\n  transition: opacity var(--sc-transition-medium) ease, transform var(--sc-transition-medium) ease;\n  position: relative;\n  gap: var(--sc-spacing-small);\n}\n\n.coupon-form--is-open .form {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n  height: auto;\n  margin: var(--sc-spacing-small) 0;\n}\n.coupon-form--is-open .trigger {\n  display: none;\n}\n\n.trigger {\n  cursor: pointer;\n  font-size: var(--sc-font-size-small);\n  line-height: var(--sc-line-height-dense);\n  color: var(--sc-input-label-color);\n  user-select: none;\n}\n.trigger:hover {\n  text-decoration: underline;\n}\n\n.coupon-form--is-rtl .trigger {\n  text-align: right;\n}",ScCouponForm=class{constructor(n){index.registerInstance(this,n),this.scApplyCoupon=index.createEvent(this,"scApplyCoupon",7)}handleOpenChange(n){n&&setTimeout((()=>this.input.triggerFocus()),50)}handleBlur(){this.value||(this.open=!1,this.error="")}applyCoupon(){this.scApplyCoupon.emit(this.input.value.toUpperCase())}handleKeyDown(n){"Enter"===(null==n?void 0:n.code)&&this.applyCoupon()}render(){var n,o,e,t,i,s,r;if(this.loading)return index.h("sc-skeleton",{style:{width:"120px",display:"inline-block"}});if(null===(o=null===(n=null==this?void 0:this.discount)||void 0===n?void 0:n.promotion)||void 0===o?void 0:o.code){let n="";return(null===(e=null==this?void 0:this.discount)||void 0===e?void 0:e.coupon)&&(null===(t=null==this?void 0:this.discount)||void 0===t?void 0:t.coupon.percent_off)&&(n=price.getHumanDiscount(null===(i=null==this?void 0:this.discount)||void 0===i?void 0:i.coupon)),index.h("sc-line-item",{exportparts:"description:info, price-description:discount, price:amount"},index.h("span",{slot:"description"},index.h("div",{part:"discount-label"},wp.i18n.__("Discount","surecart")),index.h("sc-tag",{exportparts:"base:coupon-tag",type:"success",class:"coupon-tag",clearable:!0,onScClear:()=>{this.scApplyCoupon.emit(null),this.open=!1}},null===(r=null===(s=null==this?void 0:this.discount)||void 0===s?void 0:s.promotion)||void 0===r?void 0:r.code)),n&&index.h("span",{class:"coupon-human-discount",slot:"price-description"},"(",n,")"),index.h("span",{slot:"price"},index.h("sc-format-number",{type:"currency",currency:null==this?void 0:this.currency,value:null==this?void 0:this.discountAmount})))}return this.collapsed?index.h("div",{part:"base",class:{"coupon-form":!0,"coupon-form--is-open":this.open||this.forceOpen,"coupon-form--has-value":!!this.value,"coupon-form--is-rtl":pageAlign.isRtl()}},index.h("div",{part:"label",class:"trigger",onMouseDown:()=>{this.open||(this.open=!0)}},index.h("slot",{name:"label"},this.label)),index.h("div",{class:"form",part:"form"},index.h("sc-input",{exportparts:"base:input__base, input, form-control:input__form-control",value:this.value,onScInput:n=>this.value=n.target.value,placeholder:this.placeholder,onScBlur:()=>this.handleBlur(),onKeyDown:n=>this.handleKeyDown(n),ref:n=>this.input=n},index.h("sc-button",{exportparts:"base:button__base, label:button_label",slot:"suffix",type:"text",loading:this.busy,size:"medium",class:"coupon-button",onClick:()=>this.applyCoupon()},index.h("slot",null,this.buttonText))),index.h("sc-button",{exportparts:"base:button__base, label:button_label",type:"primary",outline:!0,loading:this.busy,size:"medium",class:"coupon-button-mobile",onClick:()=>this.applyCoupon()},index.h("slot",null,this.buttonText)),!!this.error&&index.h("sc-alert",{exportparts:"base:error__base, icon:error__icon, text:error__text, title:error_title, message:error__message",type:"danger",open:!0},index.h("span",{slot:"title"},this.error))),this.loading&&index.h("sc-block-ui",{exportparts:"base:block-ui, content:block-ui__content"})):index.h("sc-form-control",{label:this.label,class:{"coupon-form":!0,"coupon-form--has-value":!!this.value,"coupon-form--is-rtl":pageAlign.isRtl()}},index.h("sc-input",{exportparts:"base:input__base, input, form-control:input__form-control",value:this.value,onScInput:n=>this.value=n.target.value,placeholder:this.placeholder,onScBlur:()=>this.handleBlur(),onKeyDown:n=>this.handleKeyDown(n),ref:n=>this.input=n},index.h("sc-button",{exportparts:"base:button__base, label:button_label",slot:"suffix",type:"text",loading:this.busy,size:"medium",class:"coupon-button",onClick:()=>this.applyCoupon()},index.h("slot",null))),!!this.error&&index.h("sc-alert",{exportparts:"base:error__base, icon:error__icon, text:error__text, title:error_title, message:error__message",type:"danger",open:!0},index.h("span",{slot:"title"},this.error)))}static get watchers(){return{open:["handleOpenChange"]}}};ScCouponForm.style=scCouponFormCss,exports.sc_coupon_form=ScCouponForm;