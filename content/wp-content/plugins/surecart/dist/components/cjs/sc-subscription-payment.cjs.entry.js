"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const index=require("./index-9c866aeb.js"),fetch=require("./fetch-b673a242.js"),addQueryArgs=require("./add-query-args-17c551b6.js"),scSubscriptionPaymentCss=":host{display:block;position:relative}.subscription-payment{display:grid;gap:0.5em}",ScSubscriptionPayment=class{constructor(i){index.registerInstance(this,i),this.paymentMethods=[],this.customerIds=[]}componentWillLoad(){this.fetchItems()}async fetchItems(){try{this.loading=!0,await Promise.all([this.fetchSubscription(),this.fetchPaymentMethods()])}catch(i){console.error(i),this.error=(null==i?void 0:i.message)||wp.i18n.__("Something went wrong","surecart")}finally{this.loading=!1}}async fetchSubscription(){this.subscriptionId&&(this.subscription=await fetch.apiFetch({path:addQueryArgs.addQueryArgs(`/surecart/v1/subscriptions/${this.subscriptionId}`,{expand:["price","price.product","current_period","product"]})}))}async fetchPaymentMethods(){var i;this.paymentMethods=await fetch.apiFetch({path:addQueryArgs.addQueryArgs("/surecart/v1/payment_methods",{expand:["card","customer","billing_agreement","paypal_account","payment_instrument","bank_account"],customer_ids:this.customerIds,reusable:!0,...null!==(null===(i=this.subscription)||void 0===i?void 0:i.live_mode)?{live_mode:this.subscription.live_mode}:{}})})}async handleSubmit(i){var e;const{method:t}=await i.target.getFormJson();try{this.error="",this.busy=!0,await fetch.apiFetch({path:`/surecart/v1/subscriptions/${null===(e=this.subscription)||void 0===e?void 0:e.id}`,method:"PATCH",data:{payment_method:t}}),this.successUrl?window.location.assign(this.successUrl):this.busy=!1}catch(i){this.error=(null==i?void 0:i.message)||wp.i18n.__("Something went wrong","surecart"),this.busy=!1}}renderLoading(){return index.h(index.Fragment,null,index.h("sc-choice",{name:"loading",disabled:!0},index.h("sc-skeleton",{style:{width:"60px",display:"inline-block"}}),index.h("sc-skeleton",{style:{width:"80px",display:"inline-block"},slot:"price"}),index.h("sc-skeleton",{style:{width:"120px",display:"inline-block"},slot:"description"})),index.h("sc-button",{type:"primary",full:!0,submit:!0,loading:!0,busy:!0}),!!this.backUrl&&index.h("sc-button",{href:this.backUrl,full:!0,loading:!0,busy:!0}))}renderContent(){if(this.loading)return this.renderLoading();const i=this.paymentMethods.filter((i=>{var e;return(null==i?void 0:i.live_mode)===(null===(e=this.subscription)||void 0===e?void 0:e.live_mode)}));return(null==i?void 0:i.length)?index.h(index.Fragment,null,index.h("sc-choices",null,index.h("div",null,(this.paymentMethods||[]).map((i=>{var e,t;return(null==i?void 0:i.live_mode)!==(null===(e=null==this?void 0:this.subscription)||void 0===e?void 0:e.live_mode)?null:index.h("sc-choice",{checked:(null===(t=this.subscription)||void 0===t?void 0:t.payment_method)===(null==i?void 0:i.id),name:"method",value:null==i?void 0:i.id},index.h("sc-payment-method",{paymentMethod:i,full:!0}))})))),index.h("sc-button",{type:"primary",full:!0,submit:!0,loading:this.loading||this.busy,disabled:this.loading||this.busy},wp.i18n.__("Update","surecart")),!!this.backUrl&&index.h("sc-button",{href:this.backUrl,full:!0,loading:this.loading||this.busy,disabled:this.loading||this.busy},wp.i18n.__("Go Back","surecart"))):index.h(index.Fragment,null,index.h("sc-empty",{icon:"credit-card"},wp.i18n.__("You have no saved payment methods.","surecart")),!!this.backUrl&&index.h("sc-button",{href:this.backUrl,full:!0},wp.i18n.__("Go Back","surecart")))}render(){return index.h("sc-dashboard-module",{heading:wp.i18n.__("Select a payment method","surecart"),class:"subscription-payment",error:this.error},index.h("sc-form",{onScFormSubmit:i=>this.handleSubmit(i)},index.h("sc-card",null,this.renderContent())),this.busy&&index.h("sc-block-ui",null))}};ScSubscriptionPayment.style=scSubscriptionPaymentCss,exports.sc_subscription_payment=ScSubscriptionPayment;