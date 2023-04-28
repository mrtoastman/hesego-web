"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const index=require("./index-9c866aeb.js"),pure=require("./pure-5be33f24.js"),fetch=require("./fetch-b673a242.js");require("./_commonjsHelpers-537d719a.js"),require("./add-query-args-17c551b6.js");const scStripeAddMethodCss="sc-stripe-add-method{display:block}sc-stripe-add-method [hidden]{display:none}.loader{display:grid;height:128px;gap:2em}.loader__row{display:flex;align-items:flex-start;justify-content:space-between;gap:1em}.loader__details{display:grid;gap:0.5em}",ScStripeAddMethod=class{constructor(e){index.registerInstance(this,e),this.liveMode=!0}componentWillLoad(){this.createPaymentIntent()}async handlePaymentIntentCreate(){var e,t,i,r,n,s,o,d,l,a,c,h,p,u,m,y,v,g;if(!(null===(i=null===(t=null===(e=this.paymentIntent)||void 0===e?void 0:e.processor_data)||void 0===t?void 0:t.stripe)||void 0===i?void 0:i.publishable_key)||!(null===(s=null===(n=null===(r=this.paymentIntent)||void 0===r?void 0:r.processor_data)||void 0===n?void 0:n.stripe)||void 0===s?void 0:s.account_id))return;if(!this.stripe)try{this.stripe=await pure.pure.loadStripe(null===(l=null===(d=null===(o=this.paymentIntent)||void 0===o?void 0:o.processor_data)||void 0===d?void 0:d.stripe)||void 0===l?void 0:l.publishable_key,{stripeAccount:null===(h=null===(c=null===(a=this.paymentIntent)||void 0===a?void 0:a.processor_data)||void 0===c?void 0:c.stripe)||void 0===h?void 0:h.account_id})}catch(e){return void(this.error=(null==e?void 0:e.message)||wp.i18n.__("Stripe could not be loaded","surecart"))}if(!(null===(m=null===(u=null===(p=this.paymentIntent)||void 0===p?void 0:p.processor_data)||void 0===u?void 0:u.stripe)||void 0===m?void 0:m.client_secret)||!this.container)return void console.warn("do not have client secret or container");const _=getComputedStyle(document.body);this.elements=this.stripe.elements({clientSecret:null===(g=null===(v=null===(y=this.paymentIntent)||void 0===y?void 0:y.processor_data)||void 0===v?void 0:v.stripe)||void 0===g?void 0:g.client_secret,appearance:{variables:{colorPrimary:_.getPropertyValue("--sc-color-primary-500"),colorText:_.getPropertyValue("--sc-input-label-color"),borderRadius:_.getPropertyValue("--sc-input-border-radius-medium"),colorBackground:_.getPropertyValue("--sc-input-background-color"),fontSizeBase:_.getPropertyValue("--sc-input-font-size-medium")},rules:{".Input":{border:_.getPropertyValue("--sc-input-border")},".Input::placeholder":{color:_.getPropertyValue("--sc-input-placeholder-color")}}}}),this.elements.create("payment",{wallets:{applePay:"never",googlePay:"never"}}).mount(".sc-payment-element-container"),this.element=this.elements.getElement("payment"),this.element.on("ready",(()=>this.loaded=!0))}async createPaymentIntent(){try{this.loading=!0,this.error="",this.paymentIntent=await fetch.apiFetch({method:"POST",path:"surecart/v1/payment_intents",data:{processor_type:"stripe",live_mode:this.liveMode,customer_id:this.customerId}})}catch(e){this.error=(null==e?void 0:e.message)||wp.i18n.__("Something went wrong","surecart")}finally{this.loading=!1}}async handleSubmit(e){e.preventDefault(),this.loading=!0;try{const e=await this.stripe.confirmSetup({elements:this.elements,confirmParams:{return_url:this.successUrl},redirect:"always"});if(null==e?void 0:e.error)throw this.error=e.error.message,e.error}catch(e){console.error(e),this.error=(null==e?void 0:e.message)||wp.i18n.__("Something went wrong","surecart"),this.loading=!1}}render(){return index.h("sc-form",{onScFormSubmit:e=>this.handleSubmit(e)},this.error&&index.h("sc-alert",{open:!!this.error,type:"danger"},index.h("span",{slot:"title"},wp.i18n.__("Error","surecart")),this.error),index.h("div",{class:"loader",hidden:this.loaded},index.h("div",{class:"loader__row"},index.h("div",{style:{width:"50%"}},index.h("sc-skeleton",{style:{width:"50%",marginBottom:"0.5em"}}),index.h("sc-skeleton",null)),index.h("div",{style:{flex:"1"}},index.h("sc-skeleton",{style:{width:"50%",marginBottom:"0.5em"}}),index.h("sc-skeleton",null)),index.h("div",{style:{flex:"1"}},index.h("sc-skeleton",{style:{width:"50%",marginBottom:"0.5em"}}),index.h("sc-skeleton",null))),index.h("div",{class:"loader__details"},index.h("sc-skeleton",{style:{height:"1rem"}}),index.h("sc-skeleton",{style:{height:"1rem",width:"30%"}}))),index.h("div",{hidden:!this.loaded,class:"sc-payment-element-container",ref:e=>this.container=e}),index.h("sc-button",{type:"primary",submit:!0,full:!0,loading:this.loading},wp.i18n.__("Save Payment Method","surecart")))}static get watchers(){return{paymentIntent:["handlePaymentIntentCreate"]}}};ScStripeAddMethod.style=scStripeAddMethodCss,exports.sc_stripe_add_method=ScStripeAddMethod;