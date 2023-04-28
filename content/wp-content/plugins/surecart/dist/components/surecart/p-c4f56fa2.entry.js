import{r as t,h as s}from"./p-dfbe004d.js";import{a as o}from"./p-d8453138.js";import{a as i}from"./p-1c2e2695.js";const e=class{constructor(e){t(this,e),this.methods=[]}componentWillLoad(){this.fetchMethods()}async createPaymentIntent(){var t,e,s,i;try{this.loading=!0,this.error="",this.paymentIntent=await o({method:"POST",path:"surecart/v1/payment_intents",data:{processor_type:"mollie",live_mode:this.liveMode,customer_id:this.customerId,return_url:this.successUrl,payment_method_type:this.selectedMethodId,currency:this.currency}}),console.log(this.paymentIntent),(null===(e=null===(t=this.paymentIntent.processor_data)||void 0===t?void 0:t.mollie)||void 0===e?void 0:e.checkout_url)&&window.location.assign(null===(i=null===(s=this.paymentIntent.processor_data)||void 0===s?void 0:s.mollie)||void 0===i?void 0:i.checkout_url)}catch(t){console.error(t),this.error=(null==t?void 0:t.message)||wp.i18n.__("Something went wrong","surecart"),this.loading=!1}}async fetchMethods(){var t,e,s;try{this.loading=!0;const n=await o({path:i(`surecart/v1/processors/${this.processorId}/payment_method_types`,{amount:0,country:this.country,currency:this.currency,reusable:!0})});this.methods=(null==n?void 0:n.data)||[],(null===(t=this.methods)||void 0===t?void 0:t.length)&&(this.selectedMethodId=null===(s=null===(e=this.methods)||void 0===e?void 0:e[0])||void 0===s?void 0:s.id)}catch(t){this.error=(null==t?void 0:t.message)||wp.i18n.__("Something went wrong","surecart"),console.error(t)}finally{this.loading=!1}}handleSubmit(){this.createPaymentIntent()}renderLoading(){return s("sc-card",null,s("sc-skeleton",{style:{width:"50%",marginBottom:"0.5em"}}),s("sc-skeleton",{style:{width:"30%",marginBottom:"0.5em"}}),s("sc-skeleton",{style:{width:"60%",marginBottom:"0.5em"}}))}render(){var t;return this.loading&&!(null===(t=this.methods)||void 0===t?void 0:t.length)?this.renderLoading():s("sc-form",{onScFormSubmit:()=>this.handleSubmit(),style:{position:"relative"}},s("sc-toggles",{collapsible:!1,theme:"container"},(this.methods||[]).map((t=>s("sc-toggle",{"show-control":!0,shady:!0,borderless:!0,open:this.selectedMethodId===(null==t?void 0:t.id),onScShow:()=>this.selectedMethodId=null==t?void 0:t.id},s("span",{slot:"summary",class:"sc-payment-toggle-summary"},!!(null==t?void 0:t.image)&&s("img",{src:null==t?void 0:t.image}),s("span",null,null==t?void 0:t.description)),s("sc-card",null,s("sc-payment-selected",{label:wp.i18n.sprintf(wp.i18n.__("%s selected.","surecart"),null==t?void 0:t.description)},!!(null==t?void 0:t.image)&&s("img",{slot:"icon",src:null==t?void 0:t.image,style:{width:"32px"}}),wp.i18n.__("Another step will appear after submitting your order to add this payment method.","surecart"))))))),s("sc-button",{type:"primary",submit:!0,full:!0,loading:this.loading},wp.i18n.__("Add Payment Method","surecart")),this.loading&&s("sc-block-ui",{"z-index":9,style:{"--sc-block-ui-opacity":"0.75"}}))}};e.style=":host{display:block}";export{e as sc_mollie_add_method};