"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const index=require("./index-9c866aeb.js"),fetch=require("./fetch-b673a242.js"),lazy=require("./lazy-bc8baeab.js"),addQueryArgs=require("./add-query-args-17c551b6.js"),scSubscriptionPaymentMethodCss=":host{display:block}",ScSubscriptionPaymentMethod=class{constructor(e){index.registerInstance(this,e)}renderLoading(){return index.h("sc-card",{noPadding:!0},index.h("sc-stacked-list",null,index.h("sc-stacked-list-row",{style:{"--columns":"4"},"mobile-size":500},[...Array(4)].map((()=>index.h("sc-skeleton",{style:{width:"100px",display:"inline-block"}}))))))}renderEmpty(){return index.h("slot",{name:"empty"},index.h("sc-card",null,index.h("sc-empty",{icon:"credit-card"},wp.i18n.__("You do not have any payment methods.","surecart"))))}componentWillLoad(){lazy.onFirstVisible(this.el,(()=>{this.getPaymentMethods()}))}async getPaymentMethods(){var e,t,i,s;if(null===(e=this.paymentMethods)||void 0===e?void 0:e.length)return;const n=(null===(i=null===(t=this.subscription)||void 0===t?void 0:t.customer)||void 0===i?void 0:i.id)||(null===(s=this.subscription)||void 0===s?void 0:s.customer);if(n)try{this.loading=!0,this.paymentMethods=await this.fetchMethods(n)}catch(e){this.error=(null==e?void 0:e.messsage)||wp.i18n.__("Something went wrong","surecart"),console.error(this.error)}finally{this.loading=!1}}async fetchMethods(e){var t;return await fetch.apiFetch({path:addQueryArgs.addQueryArgs("surecart/v1/payment_methods",{expand:["card","customer","billing_agreement","paypal_account","payment_instrument","bank_account"],customer_ids:[e],reusable:!0,live_mode:null===(t=this.subscription)||void 0===t?void 0:t.live_mode})})}async deleteMethod(e){if(confirm(wp.i18n.__("Are you sure you want to remove this payment method?","surecart")))try{this.busy=!0,await fetch.apiFetch({path:`surecart/v1/payment_methods/${null==e?void 0:e.id}/detach`,method:"PATCH"}),this.paymentMethods=this.paymentMethods.filter((t=>t.id!==e.id))}catch(e){this.error=(null==e?void 0:e.messsage)||wp.i18n.__("Something went wrong","surecart"),console.error(this.error)}finally{this.busy=!1}}async updateMethod(e){var t,i,s,n;const{payment_method:o}=await e.target.getFormJson();if(o!==((null===(i=null===(t=this.subscription)||void 0===t?void 0:t.payment_method)||void 0===i?void 0:i.id)||(null===(s=this.subscription)||void 0===s?void 0:s.payment_method)))try{this.busy=!0,this.subscription=await fetch.apiFetch({path:`surecart/v1/subscriptions/${null===(n=this.subscription)||void 0===n?void 0:n.id}`,method:"PATCH",data:{payment_method:o}})}catch(e){this.error=(null==e?void 0:e.messsage)||wp.i18n.__("Something went wrong","surecart"),console.error(this.error)}finally{this.busy=!1}}renderContent(){var e,t,i;return this.loading?this.renderLoading():(null===(e=this.paymentMethods)||void 0===e?void 0:e.length)?index.h("sc-form",{onScSubmit:e=>this.updateMethod(e)},index.h("sc-choices",null,this.renderList()),(null===(t=this.paymentMethods)||void 0===t?void 0:t.length)>1?index.h("sc-button",{type:"primary",submit:!0,full:!0,size:"large",busy:this.busy,disabled:this.busy},wp.i18n.__("Update Payment Method","surecart")):index.h("sc-button",{type:"link",full:!0,href:addQueryArgs.addQueryArgs(window.location.href,{action:"create",model:"payment_method",...!1===(null===(i=this.subscription)||void 0===i?void 0:i.live_mode)?{live_mode:!1}:{},success_url:window.location.href})},index.h("sc-icon",{name:"plus",slot:"prefix"}),wp.i18n.__("Add New","surecart"))):this.renderEmpty()}renderList(){return this.paymentMethods.map((e=>{var t,i,s;const n=(null===(i=null===(t=this.subscription)||void 0===t?void 0:t.payment_method)||void 0===i?void 0:i.id)||(null===(s=this.subscription)||void 0===s?void 0:s.payment_method),{id:o,card:r,live_mode:d,paypal_account:a}=e;return index.h("sc-choice",{checked:n===o,name:"payment_method",value:o,required:!0},index.h("sc-flex",{justifyContent:"flex-start","align-items":"center"},index.h("sc-payment-method",{paymentMethod:e})," ",!d&&index.h("sc-tag",{type:"warning",size:"small"},wp.i18n.__("Test","surecart"))),index.h("div",{slot:"description"},!!(null==r?void 0:r.exp_month)&&index.h("span",null,
/** Translators: Credit Card Expires (Exp. 11/27) */
wp.i18n.__("Exp.","surecart"),null==r?void 0:r.exp_month,"/",null==r?void 0:r.exp_year),!!a&&(null==a?void 0:a.email)),n===o&&index.h("sc-tag",{type:"info",slot:"price"},wp.i18n.__("Current Payment Method","surecart")))}))}render(){var e,t;return index.h("sc-dashboard-module",{heading:this.heading||wp.i18n.__("Update Payment Method","surecart"),class:"subscription",error:this.error},(null===(e=this.paymentMethods)||void 0===e?void 0:e.length)>1&&index.h("sc-button",{slot:"end",type:"link",href:addQueryArgs.addQueryArgs(window.location.href,{action:"create",model:"payment_method",...!1===(null===(t=this.subscription)||void 0===t?void 0:t.live_mode)?{live_mode:!1}:{},success_url:window.location.href})},index.h("sc-icon",{name:"plus",slot:"prefix"}),wp.i18n.__("Add New","surecart")),this.renderContent(),this.busy&&index.h("sc-block-ui",{spinner:!0}))}get el(){return index.getElement(this)}};ScSubscriptionPaymentMethod.style=":host{display:block}",exports.sc_subscription_payment_method=ScSubscriptionPaymentMethod;