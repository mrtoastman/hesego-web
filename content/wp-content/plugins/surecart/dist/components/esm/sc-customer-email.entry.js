import{r as registerInstance,c as createEvent,h,H as Host}from"./index-fd4790f6.js";import{o as openWormhole}from"./consumer-b5087188.js";import{c as createOrUpdateCheckout}from"./index-93eba176.js";import"./watchers-0c79cf4e.js";import"./index-26bbcef3.js";import"./add-query-args-f4c5962b.js";import"./watchers-0c38e1b1.js";import"./watchers-e86a5dda.js";import"./getters-c6fb954d.js";import"./util-1396ff7b.js";import"./fetch-34712ac6.js";import"./get-query-arg-cb6b8763.js";const scCustomerEmailCss=":host{display:block}a{color:var(--sc-color-primary-500)}a.customer-email__login-link{color:var(--sc-customer-login-link-color, var(--sc-input-placeholder-color));text-decoration:none;font-size:var(--sc-font-size-small)}.tracking-confirmation-message{font-size:var(--sc-font-size-xx-small)}.tracking-confirmation-message span{opacity:0.75}",ScCustomerEmail=class{constructor(e){registerInstance(this,e),this.scChange=createEvent(this,"scChange",7),this.scClear=createEvent(this,"scClear",7),this.scInput=createEvent(this,"scInput",7),this.scFocus=createEvent(this,"scFocus",7),this.scBlur=createEvent(this,"scBlur",7),this.scUpdateOrderState=createEvent(this,"scUpdateOrderState",7),this.scUpdateAbandonedCart=createEvent(this,"scUpdateAbandonedCart",7),this.scLoginPrompt=createEvent(this,"scLoginPrompt",7),this.size="medium",this.value="",this.pill=!1,this.showLabel=!0,this.help="",this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}async handleChange(){var e;this.value=this.input.value,this.scChange.emit();try{const t=await createOrUpdateCheckout({id:null===(e=this.order)||void 0===e?void 0:e.id,data:{email:this.input.value}});this.scUpdateOrderState.emit(t)}catch(e){console.error(e)}}handleSessionChange(e){(null==e?void 0:e.email)&&e.email!==this.value&&(this.value=e.email)}async reportValidity(){var e,t;return null===(t=null===(e=this.input)||void 0===e?void 0:e.reportValidity)||void 0===t?void 0:t.call(e)}renderOptIn(){return this.trackingConfirmationMessage?!1!==this.abandonedCheckoutEnabled?h("div",{class:"tracking-confirmation-message"},h("span",null,this.trackingConfirmationMessage)," ",h("a",{href:"#",onClick:e=>{e.preventDefault(),this.scUpdateAbandonedCart.emit(!1)}},wp.i18n.__("No Thanks","surecart"))):h("div",{class:"tracking-confirmation-message"},h("span",null," ",wp.i18n.__("You won't receive further emails from us.","surecart"))):null}render(){var e;return h(Host,null,h("sc-input",{exportparts:"base, input, form-control, label, help-text, prefix, suffix",type:"email",name:"email",ref:e=>this.input=e,value:(null===(e=this.customer)||void 0===e?void 0:e.email)||this.value,help:this.help,label:this.label,autocomplete:"email",placeholder:this.placeholder,disabled:!!this.loggedIn,readonly:this.readonly,required:!0,invalid:this.invalid,autofocus:this.autofocus,hasFocus:this.hasFocus,onScChange:()=>this.handleChange(),onScInput:()=>this.scInput.emit(),onScFocus:()=>this.scFocus.emit(),onScBlur:()=>this.scBlur.emit()}),this.renderOptIn())}static get watchers(){return{order:["handleSessionChange"]}}};openWormhole(ScCustomerEmail,["order","customer","loggedIn","abandonedCheckoutEnabled"],!1),ScCustomerEmail.style=scCustomerEmailCss;export{ScCustomerEmail as sc_customer_email};