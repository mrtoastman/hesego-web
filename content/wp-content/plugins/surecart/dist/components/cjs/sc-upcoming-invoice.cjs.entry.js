"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const index=require("./index-9c866aeb.js"),fetch=require("./fetch-b673a242.js"),lazy=require("./lazy-bc8baeab.js"),price=require("./price-d3e21aa4.js"),tax=require("./tax-39abdb3c.js"),addQueryArgs=require("./add-query-args-17c551b6.js"),scUpcomingInvoiceCss=":host{display:block;position:relative}.upcoming-invoice{display:grid;gap:var(--sc-spacing-large)}.upcoming-invoice>*{display:grid;gap:var(--sc-spacing-medium)}.new-plan{display:grid;gap:0.25em;color:var(--sc-input-label-color)}.new-plan__heading{font-weight:var(--sc-font-weight-bold)}",ScUpcomingInvoice=class{constructor(e){index.registerInstance(this,e),this.quantityUpdatesEnabled=!0}componentWillLoad(){lazy.onFirstVisible(this.el,(()=>{this.fetchItems()}))}isFutureInvoice(){return this.invoice.start_at>=(new Date).getTime()/1e3}async fetchItems(){var e,i;try{this.loading=!0,await Promise.all([this.getInvoice(),this.getPrice()])}catch(n){console.error(n),this.error=(null===(i=null===(e=null==n?void 0:n.additional_errors)||void 0===e?void 0:e[0])||void 0===i?void 0:i.message)||(null==n?void 0:n.message)||wp.i18n.__("Something went wrong","surecart")}finally{this.loading=!1}}async getPrice(){this.priceId&&(this.price=await fetch.apiFetch({path:addQueryArgs.addQueryArgs(`surecart/v1/prices/${this.priceId}`,{expand:["product"]})}))}async getInvoice(){if(this.subscriptionId)return this.invoice=await fetch.apiFetch({method:"PATCH",path:addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${this.subscriptionId}/upcoming_period/`,{expand:["period.checkout","checkout.line_items","line_item.price","price.product","checkout.payment_method","checkout.discount","discount.promotion","discount.coupon","payment_method.card","payment_method.payment_instrument","payment_method.paypal_account","payment_method.bank_account"]}),data:{price:this.priceId,quantity:this.quantity,...this.adHocAmount?{ad_hoc_amount:this.adHocAmount}:{},...this.discount?{discount:this.discount}:{}}}),this.invoice}async applyCoupon(e){try{this.couponError="",this.busy=!0,this.discount={promotion_code:e.detail},await this.getInvoice()}catch(e){this.couponError=(null==e?void 0:e.message)||wp.i18n.__("Something went wrong","surecart")}finally{this.busy=!1}}async updateQuantity(e){try{this.error="",this.busy=!0,this.quantity=e.detail,await this.getInvoice()}catch(e){this.error=(null==e?void 0:e.message)||wp.i18n.__("Something went wrong","surecart")}finally{this.busy=!1}}async onSubmit(){try{this.error="",this.busy=!0,await fetch.apiFetch({path:`surecart/v1/subscriptions/${this.subscriptionId}`,method:"PATCH",data:{price:this.priceId,quantity:this.quantity,...this.adHocAmount?{ad_hoc_amount:this.adHocAmount}:{},...this.discount?{discount:this.discount}:{}}}),this.successUrl?window.location.assign(this.successUrl):this.busy=!1}catch(e){this.error=(null==e?void 0:e.message)||wp.i18n.__("Something went wrong","surecart"),this.busy=!1}}renderName(e){var i;return"string"!=typeof(null==e?void 0:e.product)?null===(i=null==e?void 0:e.product)||void 0===i?void 0:i.name:wp.i18n.__("Plan","surecart")}renderRenewalText(){var e;return this.isFutureInvoice()?index.h("div",null,wp.i18n.__("You'll be switched to this plan","surecart")," ",index.h("strong",null,wp.i18n.__("at the end of your billing cycle on","surecart")," ",index.h("sc-format-date",{type:"timestamp",date:null===(e=this.invoice)||void 0===e?void 0:e.start_at,month:"short",day:"numeric",year:"numeric"}))):index.h("div",null,wp.i18n.__("You'll be switched to this plan","surecart")," ",index.h("strong",null,wp.i18n.__("immediately","surecart")))}renderEmpty(){return index.h("slot",{name:"empty"},wp.i18n.__("Something went wrong.","surecart"))}renderLoading(){return index.h("div",null,index.h("sc-skeleton",{style:{width:"30%",marginBottom:"0.75em"}}),index.h("sc-skeleton",{style:{width:"20%",marginBottom:"0.75em"}}),index.h("sc-skeleton",{style:{width:"40%"}}))}renderContent(){var e;if(this.loading)return this.renderLoading();if(!(null===(e=this.invoice)||void 0===e?void 0:e.checkout))return this.renderEmpty();const i=this.invoice.checkout;return index.h("div",{class:"new-plan"},index.h("div",{class:"new-plan__heading"},this.renderName(this.price)),index.h("div",null,index.h("sc-format-number",{type:"currency",currency:null==i?void 0:i.currency,value:null==i?void 0:i.total_amount})," ",price.intervalString(this.price)),index.h("div",{style:{fontSize:"var(--sc-font-size-small)"}},this.renderRenewalText()))}renderSummary(){var e,i;if(this.loading)return this.renderLoading();if(!this.invoice)return this.renderEmpty();const n=null===(e=this.invoice)||void 0===e?void 0:e.checkout;return index.h(index.Fragment,null,null===(i=null==n?void 0:n.line_items)||void 0===i?void 0:i.data.map((e=>{var i,n,t,r,o;return index.h("sc-product-line-item",{imageUrl:null===(n=null===(i=e.price)||void 0===i?void 0:i.product)||void 0===n?void 0:n.image_url,name:null===(r=null===(t=e.price)||void 0===t?void 0:t.product)||void 0===r?void 0:r.name,editable:this.quantityUpdatesEnabled,removable:!1,quantity:null==e?void 0:e.quantity,amount:null==e?void 0:e.total_amount,currency:null===(o=null==e?void 0:e.price)||void 0===o?void 0:o.currency,interval:price.intervalString(null==e?void 0:e.price),onScUpdateQuantity:e=>this.updateQuantity(e)})})),index.h("sc-line-item",null,index.h("span",{slot:"description"},wp.i18n.__("Subtotal","surecart")),index.h("sc-format-number",{slot:"price",type:"currency",currency:null==n?void 0:n.currency,value:null==n?void 0:n.subtotal_amount})),!!n.proration_amount&&index.h("sc-line-item",null,index.h("span",{slot:"description"},wp.i18n.__("Proration Credit","surecart")),index.h("sc-format-number",{slot:"price",type:"currency",currency:null==n?void 0:n.currency,value:-(null==n?void 0:n.proration_amount)})),!!n.applied_balance_amount&&index.h("sc-line-item",null,index.h("span",{slot:"description"},wp.i18n.__("Applied Balance","surecart")),index.h("sc-format-number",{slot:"price",type:"currency",currency:null==n?void 0:n.currency,value:-(null==n?void 0:n.applied_balance_amount)})),!!n.trial_amount&&index.h("sc-line-item",null,index.h("span",{slot:"description"},wp.i18n.__("Free Trial","surecart")),index.h("sc-format-number",{slot:"price",type:"currency",currency:null==n?void 0:n.currency,value:null==n?void 0:n.trial_amount})),index.h("sc-coupon-form",{discount:null==n?void 0:n.discount,label:wp.i18n.__("Add Coupon Code"),onScApplyCoupon:e=>this.applyCoupon(e),error:this.couponError,collapsed:!0,buttonText:wp.i18n.__("Add Coupon Code")}),!!n.tax_amount&&index.h("sc-line-item",null,index.h("span",{slot:"description"},tax.formatTaxDisplay(null==n?void 0:n.tax_label)),index.h("sc-format-number",{slot:"price",type:"currency",currency:null==n?void 0:n.currency,value:null==n?void 0:n.tax_amount})),index.h("sc-divider",{style:{"--spacing":"0"}}),index.h("sc-line-item",null,index.h("span",{slot:"description"},wp.i18n.__("Payment","surecart")),index.h("a",{href:addQueryArgs.addQueryArgs(window.location.href,{action:"payment"}),slot:"price-description"},index.h("sc-flex",{"justify-content":"flex-start","align-items":"center",style:{"--spacing":"0.5em"}},index.h("sc-payment-method",{paymentMethod:null==n?void 0:n.payment_method}),index.h("sc-icon",{name:"edit-3"})))),index.h("sc-line-item",{style:{"--price-size":"var(--sc-font-size-x-large)"}},index.h("span",{slot:"title"},wp.i18n.__("Total Due","surecart")),index.h("sc-format-number",{slot:"price",type:"currency",currency:null==n?void 0:n.currency,value:null==n?void 0:n.amount_due}),index.h("span",{slot:"currency"},n.currency)))}render(){return index.h("div",{class:"upcoming-invoice"},this.error&&index.h("sc-alert",{open:!!this.error,type:"danger"},index.h("span",{slot:"title"},wp.i18n.__("Error","surecart")),this.error),index.h(index.Fragment,null,index.h("sc-dashboard-module",{heading:wp.i18n.__("New Plan","surecart"),class:"plan-preview",error:this.error},index.h("sc-card",null,this.renderContent())),index.h("sc-dashboard-module",{heading:wp.i18n.__("Summary","surecart"),class:"plan-summary"},index.h("sc-form",{onScFormSubmit:()=>this.onSubmit()},index.h("sc-card",null,this.renderSummary()),index.h("sc-button",{type:"primary",full:!0,submit:!0,loading:this.loading||this.busy,disabled:this.loading||this.busy},wp.i18n.__("Confirm","surecart")))),index.h("sc-text",{style:{"--text-align":"center","--font-size":"var(--sc-font-size-small)","--line-height":"var(--sc-line-height-normal)"}},index.h("slot",{name:"terms"}))),this.busy&&index.h("sc-block-ui",null))}get el(){return index.getElement(this)}};ScUpcomingInvoice.style=scUpcomingInvoiceCss,exports.sc_upcoming_invoice=ScUpcomingInvoice;