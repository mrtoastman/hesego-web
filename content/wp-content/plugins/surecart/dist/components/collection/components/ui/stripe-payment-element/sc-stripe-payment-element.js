import{Component,Element,Event,h,Method,Prop,State,Watch}from"@stencil/core";import{loadStripe}from"@stripe/stripe-js/pure";import{__}from"@wordpress/i18n";import{addQueryArgs}from"@wordpress/url";import{openWormhole}from"stencil-wormhole";import{state as selectedProcessor}from"@store/selected-processor";export class ScStripePaymentElement{constructor(){this.loaded=!1,this.confirming=!1}async componentDidLoad(){this.initialize()}handleUpdatedChange(e,t){var r,o,i,s;if(this.error="",(null===(o=null===(r=null==e?void 0:e.processor_data)||void 0===r?void 0:r.stripe)||void 0===o?void 0:o.client_secret)!==(null===(s=null===(i=null==t?void 0:t.processor_data)||void 0===i?void 0:i.stripe)||void 0===s?void 0:s.client_secret))return this.initialize();this.elements.fetchUpdates()}async initialize(){var e,t,r,o,i,s,l,n,a,d,c,p;if((null===(r=null===(t=null===(e=this.stripePaymentIntent)||void 0===e?void 0:e.processor_data)||void 0===t?void 0:t.stripe)||void 0===r?void 0:r.publishable_key)&&(null===(s=null===(i=null===(o=this.stripePaymentIntent)||void 0===o?void 0:o.processor_data)||void 0===i?void 0:i.stripe)||void 0===s?void 0:s.account_id)){if(!this.stripe)try{this.stripe=await loadStripe(null===(a=null===(n=null===(l=this.stripePaymentIntent)||void 0===l?void 0:l.processor_data)||void 0===n?void 0:n.stripe)||void 0===a?void 0:a.publishable_key,{stripeAccount:null===(p=null===(c=null===(d=this.stripePaymentIntent)||void 0===d?void 0:d.processor_data)||void 0===c?void 0:c.stripe)||void 0===p?void 0:p.account_id})}catch(e){return void(this.error=(null==e?void 0:e.message)||__("Stripe could not be loaded","surecart"))}this.loadElement()}}handleUpdateElement(){var e,t;if(!this.element)return;if("draft"!==(null===(e=this.order)||void 0===e?void 0:e.status))return;const{name:r,email:o}=this.order,{line_1:i,line_2:s,city:l,state:n,country:a,postal_code:d}=(null===(t=this.order)||void 0===t?void 0:t.shipping_address)||{};this.element.update({defaultValues:{billingDetails:{name:r,email:o,address:{line1:i,line2:s,city:l,state:n,country:a,postal_code:d}}},fields:{billingDetails:{email:"never"}}}),this.elements.fetchUpdates()}async maybeConfirmOrder(e){var t,r,o,i,s,l,n,a,d,c;if("paying"===e&&"stripe"===(null==selectedProcessor?void 0:selectedProcessor.id)&&"stripe"===(null===(r=null===(t=this.order)||void 0===t?void 0:t.payment_intent)||void 0===r?void 0:r.processor_type)&&(null===(l=null===(s=null===(i=null===(o=this.order)||void 0===o?void 0:o.payment_intent)||void 0===i?void 0:i.processor_data)||void 0===s?void 0:s.stripe)||void 0===l?void 0:l.type))return await this.confirm(null===(c=null===(d=null===(a=null===(n=this.order)||void 0===n?void 0:n.payment_intent)||void 0===a?void 0:a.processor_data)||void 0===d?void 0:d.stripe)||void 0===c?void 0:c.type)}async confirm(e,t={}){const r={elements:this.elements,confirmParams:{return_url:addQueryArgs(window.location.href,{...this.order.id?{checkout_id:this.order.id}:{}}),payment_method_data:{billing_details:{email:this.order.email}}},redirect:"if_required",...t};if(!this.confirming&&this.stripe)try{this.scSetState.emit("PAYING");const t="setup"===e?await this.stripe.confirmSetup(r):await this.stripe.confirmPayment(r);if(null==t?void 0:t.error)throw this.error=t.error.message,t.error;this.scSetState.emit("PAID"),this.scPaid.emit()}catch(e){console.error(e),this.scPayError.emit(e),e.message&&(this.error=e.message)}finally{this.confirming=!1}}loadElement(){var e,t,r,o,i,s,l,n,a;if(!this.stripe||!(null===(r=null===(t=null===(e=this.stripePaymentIntent)||void 0===e?void 0:e.processor_data)||void 0===t?void 0:t.stripe)||void 0===r?void 0:r.client_secret)||!this.container)return void console.log("do not have stripe or");const d=getComputedStyle(this.el);this.elements=this.stripe.elements({clientSecret:null===(s=null===(i=null===(o=this.stripePaymentIntent)||void 0===o?void 0:o.processor_data)||void 0===i?void 0:i.stripe)||void 0===s?void 0:s.client_secret,appearance:{variables:{colorPrimary:d.getPropertyValue("--sc-color-primary-500"),colorText:d.getPropertyValue("--sc-input-label-color"),borderRadius:d.getPropertyValue("--sc-input-border-radius-medium"),colorBackground:d.getPropertyValue("--sc-input-background-color"),fontSizeBase:d.getPropertyValue("--sc-input-font-size-medium"),colorLogo:d.getPropertyValue("--sc-stripe-color-logo"),colorLogoTab:d.getPropertyValue("--sc-stripe-color-logo-tab"),colorLogoTabSelected:d.getPropertyValue("--sc-stripe-color-logo-tab-selected"),colorTextPlaceholder:d.getPropertyValue("--sc-input-placeholder-color")},rules:{".Input":{border:d.getPropertyValue("--sc-input-border")}}}});const{line_1:c,line_2:p,city:m,state:u,country:h,postal_code:v}=(null===(l=this.order)||void 0===l?void 0:l.shipping_address)||{};this.elements.create("payment",{defaultValues:{billingDetails:{name:null===(n=this.order)||void 0===n?void 0:n.name,email:null===(a=this.order)||void 0===a?void 0:a.email,address:{line1:c,line2:p,city:m,state:u,country:h,postal_code:v}}},fields:{billingDetails:{email:"never"}}}).mount(".sc-payment-element-container"),this.element=this.elements.getElement("payment"),this.element.on("ready",(()=>this.loaded=!0))}render(){return h("div",{class:"sc-stripe-payment-element","data-testid":"stripe-payment-element"},!!this.error&&h("sc-text",{style:{color:"var(--sc-color-danger-500)","--font-size":"var(--sc-font-size-small)",marginBottom:"0.5em"}},this.error),h("div",{class:"loader",hidden:this.loaded},h("div",{class:"loader__row"},h("div",{style:{width:"50%"}},h("sc-skeleton",{style:{width:"50%",marginBottom:"0.5em"}}),h("sc-skeleton",null)),h("div",{style:{flex:"1"}},h("sc-skeleton",{style:{width:"50%",marginBottom:"0.5em"}}),h("sc-skeleton",null)),h("div",{style:{flex:"1"}},h("sc-skeleton",{style:{width:"50%",marginBottom:"0.5em"}}),h("sc-skeleton",null))),h("div",{class:"loader__details"},h("sc-skeleton",{style:{height:"1rem"}}),h("sc-skeleton",{style:{height:"1rem",width:"30%"}}))),h("div",{hidden:!this.loaded,class:"sc-payment-element-container",ref:e=>this.container=e}))}static get is(){return"sc-stripe-payment-element"}static get originalStyleUrls(){return{$:["sc-stripe-payment-element.scss"]}}static get styleUrls(){return{$:["sc-stripe-payment-element.css"]}}static get properties(){return{stripePaymentIntent:{type:"unknown",mutable:!1,complexType:{original:"PaymentIntent",resolved:"PaymentIntent",references:{PaymentIntent:{location:"import",path:"../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:"The Payment Intent"}},order:{type:"unknown",mutable:!1,complexType:{original:"Checkout",resolved:"Checkout",references:{Checkout:{location:"import",path:"../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:"Order to watch"}},address:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Should we collect an address?"},attribute:"address",reflect:!1},successUrl:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Success url to redirect."},attribute:"success-url",reflect:!1},formState:{type:"string",mutable:!1,complexType:{original:"FormState",resolved:'"confirmed" | "confirming" | "draft" | "expired" | "failure" | "finalizing" | "idle" | "loading" | "paid" | "paying" | "redirecting" | "updating"',references:{FormState:{location:"import",path:"../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:"The current form state."},attribute:"form-state",reflect:!1},selectedProcessorId:{type:"string",mutable:!1,complexType:{original:"ProcessorName",resolved:'"paypal" | "paypal-card" | "stripe"',references:{ProcessorName:{location:"import",path:"../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:"The selected processor name."},attribute:"selected-processor-id",reflect:!1}}}static get states(){return{error:{},loaded:{},confirming:{}}}static get events(){return[{method:"scPaid",name:"scPaid",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"The order/invoice was paid for."},complexType:{original:"void",resolved:"void",references:{}}},{method:"scPayError",name:"scPayError",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"There was a payment error."},complexType:{original:"any",resolved:"any",references:{}}},{method:"scSetState",name:"scSetState",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"Set the state"},complexType:{original:"FormStateSetter",resolved:'"EXPIRE" | "FETCH" | "FINALIZE" | "PAID" | "PAYING" | "REJECT" | "RESOLVE"',references:{FormStateSetter:{location:"import",path:"../../../types"}}}}]}static get methods(){return{confirm:{complexType:{signature:"(type: any, args?: {}) => Promise<void>",parameters:[{tags:[],text:""},{tags:[],text:""}],references:{Promise:{location:"global"}},return:"Promise<void>"},docs:{text:"",tags:[]}}}}static get elementRef(){return"el"}static get watchers(){return[{propName:"stripePaymentIntent",methodName:"handleUpdatedChange"},{propName:"order",methodName:"handleUpdateElement"},{propName:"error",methodName:"handleUpdateElement"},{propName:"formState",methodName:"maybeConfirmOrder"}]}}openWormhole(ScStripePaymentElement,["order","selectedProcessorId","stripePaymentIntent","formState"],!0);