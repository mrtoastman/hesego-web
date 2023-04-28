"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const index=require("./index-9c866aeb.js"),consumer=require("./consumer-3f5ce850.js"),index$1=require("./index-2840f0ff.js");require("./watchers-203d7acd.js"),require("./index-f6f80680.js"),require("./add-query-args-17c551b6.js"),require("./watchers-be62d6ad.js"),require("./watchers-d5742848.js"),require("./getters-c6087113.js"),require("./util-98cb3494.js"),require("./fetch-b673a242.js"),require("./get-query-arg-53bf21e2.js");const scCustomerEmailCss=":host{display:block}a{color:var(--sc-color-primary-500)}a.customer-email__login-link{color:var(--sc-customer-login-link-color, var(--sc-input-placeholder-color));text-decoration:none;font-size:var(--sc-font-size-small)}.tracking-confirmation-message{font-size:var(--sc-font-size-xx-small)}.tracking-confirmation-message span{opacity:0.75}",ScCustomerEmail=class{constructor(e){index.registerInstance(this,e),this.scChange=index.createEvent(this,"scChange",7),this.scClear=index.createEvent(this,"scClear",7),this.scInput=index.createEvent(this,"scInput",7),this.scFocus=index.createEvent(this,"scFocus",7),this.scBlur=index.createEvent(this,"scBlur",7),this.scUpdateOrderState=index.createEvent(this,"scUpdateOrderState",7),this.scUpdateAbandonedCart=index.createEvent(this,"scUpdateAbandonedCart",7),this.scLoginPrompt=index.createEvent(this,"scLoginPrompt",7),this.size="medium",this.value="",this.pill=!1,this.showLabel=!0,this.help="",this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}async handleChange(){var e;this.value=this.input.value,this.scChange.emit();try{const t=await index$1.createOrUpdateCheckout({id:null===(e=this.order)||void 0===e?void 0:e.id,data:{email:this.input.value}});this.scUpdateOrderState.emit(t)}catch(e){console.error(e)}}handleSessionChange(e){(null==e?void 0:e.email)&&e.email!==this.value&&(this.value=e.email)}async reportValidity(){var e,t;return null===(t=null===(e=this.input)||void 0===e?void 0:e.reportValidity)||void 0===t?void 0:t.call(e)}renderOptIn(){return this.trackingConfirmationMessage?!1!==this.abandonedCheckoutEnabled?index.h("div",{class:"tracking-confirmation-message"},index.h("span",null,this.trackingConfirmationMessage)," ",index.h("a",{href:"#",onClick:e=>{e.preventDefault(),this.scUpdateAbandonedCart.emit(!1)}},wp.i18n.__("No Thanks","surecart"))):index.h("div",{class:"tracking-confirmation-message"},index.h("span",null," ",wp.i18n.__("You won't receive further emails from us.","surecart"))):null}render(){var e;return index.h(index.Host,null,index.h("sc-input",{exportparts:"base, input, form-control, label, help-text, prefix, suffix",type:"email",name:"email",ref:e=>this.input=e,value:(null===(e=this.customer)||void 0===e?void 0:e.email)||this.value,help:this.help,label:this.label,autocomplete:"email",placeholder:this.placeholder,disabled:!!this.loggedIn,readonly:this.readonly,required:!0,invalid:this.invalid,autofocus:this.autofocus,hasFocus:this.hasFocus,onScChange:()=>this.handleChange(),onScInput:()=>this.scInput.emit(),onScFocus:()=>this.scFocus.emit(),onScBlur:()=>this.scBlur.emit()}),this.renderOptIn())}static get watchers(){return{order:["handleSessionChange"]}}};consumer.openWormhole(ScCustomerEmail,["order","customer","loggedIn","abandonedCheckoutEnabled"],!1),ScCustomerEmail.style=scCustomerEmailCss,exports.sc_customer_email=ScCustomerEmail;