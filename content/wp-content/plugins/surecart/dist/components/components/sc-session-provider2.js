import{proxyCustomElement,HTMLElement,createEvent,h}from"@stencil/core/internal/client";import{a as state,r as removeQueryArgs}from"./watchers.js";import{c as clearCheckout}from"./mutations.js";import{s as state$1}from"./watchers3.js";import{u as updateFormState}from"./mutations2.js";import{p as parseFormData}from"./form-data.js";import{a as finalizeCheckout,f as fetchCheckout,c as createOrUpdateCheckout}from"./index2.js";import{d as defineCustomElement$1}from"./sc-line-items-provider2.js";import{a as addQueryArgs,g as getQueryArgs}from"./add-query-args.js";import{g as getQueryArg}from"./get-query-arg.js";const ScSessionProvider=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.scUpdateOrderState=createEvent(this,"scUpdateOrderState",7),this.scUpdateDraftState=createEvent(this,"scUpdateDraftState",7),this.scPaid=createEvent(this,"scPaid",7),this.scError=createEvent(this,"scError",7),this.scSetState=createEvent(this,"scSetState",7),this.prices=[],this.persist=!0}handlePricesChange(){let e=this.addInitialPrices()||[];if(e=this.addPriceChoices(e),null==e?void 0:e.length)return this.loadUpdate({line_items:e})}async finalize(){return await this.handleFormSubmit()}async getFormData(){let e={};const t=this.el.querySelector("sc-form");if(t){const a=await t.getFormJson();e=parseFormData(a)}return e}async handleFormSubmit(){var e,t,a,i,o,r,s,n,d;this.scError.emit({}),updateFormState("FINALIZE");let c=await this.getFormData();if((null===(e=null===window||void 0===window?void 0:window.scData)||void 0===e?void 0:e.recaptcha_site_key)&&(null===window||void 0===window?void 0:window.grecaptcha))try{c.grecaptcha=await window.grecaptcha.execute(window.scData.recaptcha_site_key,{action:"surecart_checkout_submit"})}catch(e){return console.error(e),updateFormState("REJECT"),void this.handleErrorResponse(e)}try{await this.update(c)}catch(e){console.error(e),updateFormState("REJECT"),this.handleErrorResponse(e)}try{return state.checkout=await finalizeCheckout({id:null===(t=null==state?void 0:state.checkout)||void 0===t?void 0:t.id,query:{...(null==state$1?void 0:state$1.method)?{payment_method_type:null==state$1?void 0:state$1.method}:{},return_url:addQueryArgs(window.location.href,{...(null===(a=null==state?void 0:state.checkout)||void 0===a?void 0:a.id)?{checkout_id:null===(i=null==state?void 0:state.checkout)||void 0===i?void 0:i.id}:{},is_surecart_payment_redirect:!0})},data:c,processor:{id:state$1.id,manual:state$1.manual}}),["paid","processing"].includes(null===(o=state.checkout)||void 0===o?void 0:o.status)&&this.scPaid.emit(),(null===(d=null===(n=null===(s=null===(r=state.checkout)||void 0===r?void 0:r.payment_intent)||void 0===s?void 0:s.processor_data)||void 0===n?void 0:n.mollie)||void 0===d?void 0:d.checkout_url)?(updateFormState("PAYING"),setTimeout((()=>{var e,t,a,i;return window.location.assign(null===(i=null===(a=null===(t=null===(e=state.checkout)||void 0===e?void 0:e.payment_intent)||void 0===t?void 0:t.processor_data)||void 0===a?void 0:a.mollie)||void 0===i?void 0:i.checkout_url)}),50)):(setTimeout((()=>{updateFormState("PAYING")}),50),state.checkout)}catch(e){console.error(e),this.handleErrorResponse(e)}}async handlePaid(){updateFormState("PAID")}async handlePayError(){updateFormState("REJECT")}async handleAbandonedCartUpdate(e){const t=e.detail;this.loadUpdate({abandoned_checkout_enabled:t})}async handleCouponApply(e){const t=e.detail;this.scError.emit({}),this.loadUpdate({discount:{...t?{promotion_code:t}:{}}})}componentDidLoad(){this.findOrCreateOrder()}async findOrCreateOrder(){var e;const{redirect_status:t,checkout_id:a,line_items:i,coupon:o,is_surecart_payment_redirect:r}=getQueryArgs(window.location.href);if(window.history.replaceState({},document.title,removeQueryArgs(window.location.href,"redirect_status","coupon","line_items","confirm_checkout_id","checkout_id")),r&&a)return updateFormState("FINALIZE"),updateFormState("PAYING"),this.handleCheckoutIdFromUrl(a,o);if(t)return this.handleRedirectStatus(t,a);if(a)return this.handleCheckoutIdFromUrl(a,o);if(i)return this.handleInitialLineItems(i,o);const s=null===(e=null==state?void 0:state.checkout)||void 0===e?void 0:e.id;return s&&this.persist?this.handleExistingCheckout(s,o):this.handleNewCheckout(o)}async handleRedirectStatus(e,t){var a,i;if(console.info("Handling payment redirect."),"failed"===e)return this.scError.emit({message:wp.i18n.__("Payment unsuccessful. Please try again.","surecart")});if(!t)return this.scError.emit({message:wp.i18n.__("Could not find checkout. Please contact us before attempting to purchase again.","surecart")});try{updateFormState("FINALIZE"),updateFormState("PAID"),state.checkout=await fetchCheckout({id:t,query:{refresh_status:!0}}),(null===(a=state.checkout)||void 0===a?void 0:a.status)&&["paid","processing"].includes(null===(i=state.checkout)||void 0===i?void 0:i.status)&&setTimeout((()=>{this.scPaid.emit()}),100)}catch(e){this.handleErrorResponse(e)}}async handleCheckoutIdFromUrl(e,t=""){var a;if(console.info("Handling existing checkout from url.",t,e),t)return this.loadUpdate({id:e,discount:{promotion_code:t}});try{updateFormState("FETCH"),state.checkout=await fetchCheckout({id:e,query:{refresh_status:!0}}),updateFormState("RESOLVE")}catch(e){this.handleErrorResponse(e)}switch(null===(a=state.checkout)||void 0===a?void 0:a.status){case"paid":case"processing":return setTimeout((()=>{updateFormState("FINALIZE"),updateFormState("PAID"),this.scPaid.emit()}),100);case"payment_failed":return clearCheckout(),this.scError.emit({message:wp.i18n.__("Payment unsuccessful. Please try again.","surecart")});case"payment_intent_canceled":case"canceled":return clearCheckout(),this.scError.emit({message:wp.i18n.__("Payment canceled. Please try again.","surecart")});case"finalized":this.scError.emit({message:wp.i18n.__("Payment unsuccessful. Please try again.","surecart")}),updateFormState("REJECT")}}async handleInitialLineItems(e,t){console.info("Handling initial line items.");const a=this.el.querySelector("sc-order-shipping-address");return clearCheckout(),this.loadUpdate({line_items:e,...t?{discount:{promotion_code:t}}:{},...(null==a?void 0:a.defaultCountry)?{shipping_address:{country:null==a?void 0:a.defaultCountry}}:{}})}async handleNewCheckout(e){console.info("Handling new checkout.");const t=this.getFormData(),a=this.addPriceChoices(this.addInitialPrices()||[]),i=this.el.querySelector("sc-order-shipping-address");try{updateFormState("FETCH"),state.checkout=await createOrUpdateCheckout({data:{...t,...e?{discount:{promotion_code:e}}:{},...(null==i?void 0:i.defaultCountry)?{shipping_address:{country:null==i?void 0:i.defaultCountry}}:{},line_items:a}}),updateFormState("RESOLVE")}catch(e){console.error(e),this.handleErrorResponse(e)}}async handleExistingCheckout(e,t){if(!e)return this.handleNewCheckout(t);console.info("Handling existing checkout.");try{updateFormState("FETCH"),state.checkout=await createOrUpdateCheckout({id:e,data:{...t?{discount:{promotion_code:t}}:{}}}),updateFormState("RESOLVE")}catch(e){console.error(e),this.handleErrorResponse(e)}}async handleErrorResponse(e){var t,a,i,o;if(["checkout.not_found"].includes(null==e?void 0:e.code))return window.history.replaceState({},document.title,removeQueryArgs(window.location.href,"checkout_id")),clearCheckout(),this.handleNewCheckout(!1);if("order.line_items.old_price_versions"!==(null===(a=null===(t=null==e?void 0:e.additional_errors)||void 0===t?void 0:t[0])||void 0===a?void 0:a.code)){if(["order.invalid_status_transition"].includes(null==e?void 0:e.code))return await this.loadUpdate({id:null===(o=null==state?void 0:state.checkout)||void 0===o?void 0:o.id,data:{status:"draft"}}),void this.handleFormSubmit();if("rest_cookie_invalid_nonce"!==(null==e?void 0:e.code)){if("readonly"===(null==e?void 0:e.code))return clearCheckout(),void window.location.assign(removeQueryArgs(window.location.href,"order"));console.log("emit",e),this.scError.emit(e),updateFormState("REJECT")}else updateFormState("EXPIRE")}else await this.loadUpdate({id:null===(i=null==state?void 0:state.checkout)||void 0===i?void 0:i.id,data:{status:"draft",refresh_price_versions:!0}})}async initialize(e={}){let t=this.addInitialPrices()||[];return t=this.addPriceChoices(t),(null==t?void 0:t.length)?this.loadUpdate({line_items:t,...e}):this.loadUpdate({...e})}addInitialPrices(){var e;return(null===(e=null==this?void 0:this.prices)||void 0===e?void 0:e.length)?this.prices.some((e=>!(null==e?void 0:e.id)))?void 0:this.prices.map((e=>({price_id:e.id,quantity:e.quantity}))):[]}addPriceChoices(e=[]){return this.el.querySelectorAll("[price-id]").forEach((t=>{t.checked&&e.push({quantity:t.quantity||1,price_id:t.priceId,...t.defaultAmount?{ad_hoc_amount:t.defaultAmount}:{}}),t.defaultAmount&&e.push({quantity:t.quantity||1,price_id:t.priceId,ad_hoc_amount:t.defaultAmount})})),e}getSessionId(){var e,t;return getQueryArg(window.location.href,"checkout_id")||((null===(e=null==state?void 0:state.checkout)||void 0===e?void 0:e.id)?null===(t=null==state?void 0:state.checkout)||void 0===t?void 0:t.id:null)}async fetchCheckout(e,{query:t={},data:a={}}={}){try{updateFormState("FETCH");const i=await createOrUpdateCheckout({id:e,query:t,data:a});return updateFormState("RESOLVE"),i}catch(e){this.handleErrorResponse(e)}}async fetch(e={}){try{updateFormState("FETCH"),state.checkout=await fetchCheckout({id:this.getSessionId(),query:e}),updateFormState("RESOLVE")}catch(e){this.handleErrorResponse(e)}}async update(e={},t={}){try{state.checkout=await createOrUpdateCheckout({id:(null==e?void 0:e.id)?e.id:this.getSessionId(),data:e,query:t})}catch(e){if(["checkout.not_found"].includes(null==e?void 0:e.code))return clearCheckout(),this.initialize();throw console.error(e),e}}async loadUpdate(e={}){try{updateFormState("FETCH"),await this.update(e),updateFormState("RESOLVE")}catch(e){this.handleErrorResponse(e)}}render(){return h("sc-line-items-provider",{order:null==state?void 0:state.checkout,onScUpdateLineItems:e=>this.loadUpdate({line_items:e.detail})},h("slot",null))}get el(){return this}static get watchers(){return{prices:["handlePricesChange"]}}},[1,"sc-session-provider",{prices:[16],persist:[4],finalize:[64]},[[0,"scFormSubmit","handleFormSubmit"],[0,"scPaid","handlePaid"],[0,"scPayError","handlePayError"],[0,"scUpdateAbandonedCart","handleAbandonedCartUpdate"],[0,"scApplyCoupon","handleCouponApply"]]]);function defineCustomElement(){"undefined"!=typeof customElements&&["sc-session-provider","sc-line-items-provider"].forEach((e=>{switch(e){case"sc-session-provider":customElements.get(e)||customElements.define(e,ScSessionProvider);break;case"sc-line-items-provider":customElements.get(e)||defineCustomElement$1()}}))}defineCustomElement();export{ScSessionProvider as S,defineCustomElement as d};