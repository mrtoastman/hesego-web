import{r as i,c as t,h as s,g as o}from"./p-dfbe004d.js";import{a as e}from"./p-10aa7556.js";import"./p-47d251a3.js";import{s as n}from"./p-0bb69f38.js";import{s as r}from"./p-75c9e181.js";import{U as c}from"./p-c7dd942d.js";import"./p-35c4916d.js";import"./p-1c2e2695.js";import"./p-ea78c070.js";import"./p-9b6c2663.js";const d=class{constructor(e){i(this,e),this.scOrderUpdated=t(this,"scOrderUpdated",7),this.scOrderFinalized=t(this,"scOrderFinalized",7),this.scOrderError=t(this,"scOrderError",7),this.prices=[],this.mode="live",this.currencyCode="usd",this.persistSession=!0,this.successUrl="",this.editLineItems=!0,this.removeLineItems=!0,this.stripePaymentElement=!1,this.pricesEntities={},this.productsEntities={},this.checkoutState="idle",this.processor="stripe",this.paymentIntents={}}handleOrderStateUpdate(t){e.checkout=t.detail}handleMethodChange(t){this.method=t.detail}handleAddEntities(t){const{products:e,prices:i}=t.detail;Object.keys((null==e?void 0:e.length)||{})&&(this.productsEntities={...this.productsEntities,...e}),Object.keys((null==i?void 0:i.length)||{})&&(this.pricesEntities={...this.pricesEntities,...i})}async submit({skip_validation:t}={skip_validation:!1}){return t||await this.validate(),await this.sessionProvider.finalize()}async validate(){const t=this.el.querySelector("sc-form");return await t.validate()}componentWillLoad(){const t=document.querySelector("sc-checkout");this.isDuplicate=!!t&&t!==this.el,this.isDuplicate||(c.create(this,this.state()),n.processors=this.processors,n.manualPaymentMethods=this.manualPaymentMethods,n.config.stripe.paymentElement=this.stripePaymentElement,e.formId=this.formId,e.mode=this.mode,e.product=this.product||null,e.currencyCode=this.currencyCode,e.groupId=this.el.id,e.abandonedCheckoutReturnUrl=this.abandonedCheckoutReturnUrl)}state(){var t,i,s,o,n,c,a,d,l,u,h,p,m,v,g,f,k,y,b,S,_,x;return{processor:this.processor,method:this.method,selectedProcessorId:this.processor,manualPaymentMethods:this.manualPaymentMethods,processor_data:null===(t=e.checkout)||void 0===t?void 0:t.processor_data,state:this.checkoutState,formState:r.formState.value,paymentIntents:this.paymentIntents,successUrl:this.successUrl,bumps:null===(s=null===(i=e.checkout)||void 0===i?void 0:i.recommended_bumps)||void 0===s?void 0:s.data,order:e.checkout,abandonedCheckoutEnabled:null===(o=e.checkout)||void 0===o?void 0:o.abandoned_checkout_enabled,checkout:e.checkout,shippingEnabled:null===(n=e.checkout)||void 0===n?void 0:n.shipping_enabled,lineItems:(null===(a=null===(c=e.checkout)||void 0===c?void 0:c.line_items)||void 0===a?void 0:a.data)||[],editLineItems:this.editLineItems,removeLineItems:this.removeLineItems,loading:"loading"===r.formState.value,busy:["updating","finalizing","paying","confirming"].includes(r.formState.value),paying:["finalizing","paying","confirming"].includes(r.formState.value),empty:!["loading","updating"].includes(r.formState.value)&&!(null===(u=null===(l=null===(d=e.checkout)||void 0===d?void 0:d.line_items)||void 0===l?void 0:l.pagination)||void 0===u?void 0:u.count),stripePaymentElement:this.stripePaymentElement,stripePaymentIntent:((null===(p=null===(h=e.checkout)||void 0===h?void 0:h.staged_payment_intents)||void 0===p?void 0:p.data)||[]).find((t=>"stripe"===t.processor_type)),error:this.error,customer:this.customer,tax_status:null===(m=e.checkout)||void 0===m?void 0:m.tax_status,taxEnabled:null===(v=e.checkout)||void 0===v?void 0:v.tax_enabled,customerShippingAddress:"string"!=typeof(null===(g=e.checkout)||void 0===g?void 0:g.customer)?null===(k=null===(f=e.checkout)||void 0===f?void 0:f.customer)||void 0===k?void 0:k.shipping_address:{},shippingAddress:null===(y=e.checkout)||void 0===y?void 0:y.shipping_address,taxStatus:null===(b=e.checkout)||void 0===b?void 0:b.tax_status,taxIdentifier:null===(S=e.checkout)||void 0===S?void 0:S.tax_identifier,totalAmount:null===(_=e.checkout)||void 0===_?void 0:_.total_amount,taxProtocol:this.taxProtocol,lockedChoices:this.prices,products:this.productsEntities,prices:this.pricesEntities,country:"US",loggedIn:this.loggedIn,emailExists:null===(x=e.checkout)||void 0===x?void 0:x.email_exists,formId:this.formId,mode:this.mode,currencyCode:this.currencyCode}}render(){var t,i,o,n;return this.isDuplicate?s("sc-alert",{open:!0},wp.i18n.__("Due to processor restrictions, only one checkout form is allowed on the page.","surecart")):s("div",{class:{"sc-checkout-container":!0,"sc-align-center":"center"===this.alignment,"sc-align-wide":"wide"===this.alignment,"sc-align-full":"full"===this.alignment}},s("sc-checkout-unsaved-changes-warning",{state:this.checkoutState}),s(c.Provider,{state:this.state()},s("sc-login-provider",{loggedIn:this.loggedIn,onScSetCustomer:t=>this.customer=t.detail,onScSetLoggedIn:t=>this.loggedIn=t.detail,order:e.checkout},s("sc-form-state-provider",{onScSetCheckoutFormState:t=>this.checkoutState=t.detail},s("sc-form-error-provider",{checkoutState:r.formState.value,onScUpdateError:t=>this.error=t.detail},s("sc-form-components-validator",{order:e.checkout,disabled:this.disableComponentsValidation,taxProtocol:this.taxProtocol},s("sc-order-confirm-provider",{"success-url":this.successUrl,successText:this.successText},s("sc-session-provider",{ref:t=>this.sessionProvider=t,prices:this.prices,persist:this.persistSession,onScError:t=>this.error=t.detail},s("slot",null))))))),this.state().busy&&s("sc-block-ui",{class:"busy-block-ui","z-index":30}),"finalizing"===r.formState.value&&s("sc-block-ui",{"z-index":30,spinner:!0,style:{"--sc-block-ui-opacity":"0.75"}},(null===(t=this.loadingText)||void 0===t?void 0:t.finalizing)||wp.i18n.__("Submitting order...","surecart")),"paying"===r.formState.value&&s("sc-block-ui",{"z-index":30,spinner:!0,style:{"--sc-block-ui-opacity":"0.75"}},(null===(i=this.loadingText)||void 0===i?void 0:i.paying)||wp.i18n.__("Processing payment...","surecart")),"confirming"===r.formState.value&&s("sc-block-ui",{"z-index":30,spinner:!0,style:{"--sc-block-ui-opacity":"0.75"}},(null===(o=this.loadingText)||void 0===o?void 0:o.confirming)||wp.i18n.__("Finalizing order...","surecart")),"redirecting"===r.formState.value&&s("sc-block-ui",{"z-index":30,spinner:!0,style:{"--sc-block-ui-opacity":"0.75"}},(null===(n=this.loadingText)||void 0===n?void 0:n.confirmed)||wp.i18n.__("Success! Redirecting...","surecart"))))}get el(){return o(this)}};d.style="sc-checkout{display:block;font-family:var(--sc-font-sans);font-size:var(--sc-checkout-font-size, 16px);position:relative}sc-checkout h3{font-size:var(--sc-input-label-font-size-medium)}sc-alert{margin-bottom:var(--sc-form-row-spacing)}.sc-checkout-container.sc-align-center{max-width:500px;margin-left:auto;margin-right:auto}.sc-checkout-container.sc-align-wide{max-width:800px;margin-left:auto;margin-right:auto}::slotted(*){font-family:var(--sc-font-sans)}";export{d as sc_checkout};