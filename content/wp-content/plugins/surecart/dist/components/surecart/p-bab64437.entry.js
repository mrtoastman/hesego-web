import{r as t,h as s,F as i}from"./p-dfbe004d.js";import{a as e}from"./p-d8453138.js";import{a as n}from"./p-1c2e2695.js";const o=class{constructor(s){t(this,s),this.paymentMethods=[],this.customerIds=[]}componentWillLoad(){this.fetchItems()}async fetchItems(){try{this.loading=!0,await Promise.all([this.fetchSubscription(),this.fetchPaymentMethods()])}catch(s){console.error(s),this.error=(null==s?void 0:s.message)||wp.i18n.__("Something went wrong","surecart")}finally{this.loading=!1}}async fetchSubscription(){this.subscriptionId&&(this.subscription=await e({path:n(`/surecart/v1/subscriptions/${this.subscriptionId}`,{expand:["price","price.product","current_period","product"]})}))}async fetchPaymentMethods(){var s;this.paymentMethods=await e({path:n("/surecart/v1/payment_methods",{expand:["card","customer","billing_agreement","paypal_account","payment_instrument","bank_account"],customer_ids:this.customerIds,reusable:!0,...null!==(null===(s=this.subscription)||void 0===s?void 0:s.live_mode)?{live_mode:this.subscription.live_mode}:{}})})}async handleSubmit(s){var t;const{method:i}=await s.target.getFormJson();try{this.error="",this.busy=!0,await e({path:`/surecart/v1/subscriptions/${null===(t=this.subscription)||void 0===t?void 0:t.id}`,method:"PATCH",data:{payment_method:i}}),this.successUrl?window.location.assign(this.successUrl):this.busy=!1}catch(s){this.error=(null==s?void 0:s.message)||wp.i18n.__("Something went wrong","surecart"),this.busy=!1}}renderLoading(){return s(i,null,s("sc-choice",{name:"loading",disabled:!0},s("sc-skeleton",{style:{width:"60px",display:"inline-block"}}),s("sc-skeleton",{style:{width:"80px",display:"inline-block"},slot:"price"}),s("sc-skeleton",{style:{width:"120px",display:"inline-block"},slot:"description"})),s("sc-button",{type:"primary",full:!0,submit:!0,loading:!0,busy:!0}),!!this.backUrl&&s("sc-button",{href:this.backUrl,full:!0,loading:!0,busy:!0}))}renderContent(){if(this.loading)return this.renderLoading();const t=this.paymentMethods.filter((s=>{var t;return(null==s?void 0:s.live_mode)===(null===(t=this.subscription)||void 0===t?void 0:t.live_mode)}));return(null==t?void 0:t.length)?s(i,null,s("sc-choices",null,s("div",null,(this.paymentMethods||[]).map((t=>{var i,e;return(null==t?void 0:t.live_mode)!==(null===(i=null==this?void 0:this.subscription)||void 0===i?void 0:i.live_mode)?null:s("sc-choice",{checked:(null===(e=this.subscription)||void 0===e?void 0:e.payment_method)===(null==t?void 0:t.id),name:"method",value:null==t?void 0:t.id},s("sc-payment-method",{paymentMethod:t,full:!0}))})))),s("sc-button",{type:"primary",full:!0,submit:!0,loading:this.loading||this.busy,disabled:this.loading||this.busy},wp.i18n.__("Update","surecart")),!!this.backUrl&&s("sc-button",{href:this.backUrl,full:!0,loading:this.loading||this.busy,disabled:this.loading||this.busy},wp.i18n.__("Go Back","surecart"))):s(i,null,s("sc-empty",{icon:"credit-card"},wp.i18n.__("You have no saved payment methods.","surecart")),!!this.backUrl&&s("sc-button",{href:this.backUrl,full:!0},wp.i18n.__("Go Back","surecart")))}render(){return s("sc-dashboard-module",{heading:wp.i18n.__("Select a payment method","surecart"),class:"subscription-payment",error:this.error},s("sc-form",{onScFormSubmit:s=>this.handleSubmit(s)},s("sc-card",null,this.renderContent())),this.busy&&s("sc-block-ui",null))}};o.style=":host{display:block;position:relative}.subscription-payment{display:grid;gap:0.5em}";export{o as sc_subscription_payment};