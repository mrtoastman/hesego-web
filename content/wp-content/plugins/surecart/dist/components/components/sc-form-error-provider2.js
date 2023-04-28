import{proxyCustomElement,HTMLElement,createEvent,h}from"@stencil/core/internal/client";import{d as defineCustomElement$3}from"./sc-alert2.js";import{d as defineCustomElement$2}from"./sc-checkout-form-errors2.js";import{d as defineCustomElement$1}from"./sc-icon2.js";const ScFormErrorProvider=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.scUpdateError=createEvent(this,"scUpdateError",7),this.scSetState=createEvent(this,"scSetState",7)}handleErrorUpdate(e){this.scUpdateError.emit(e)}handleStateChange(e){["finalizing","updating"].includes(e)&&(this.error=null)}handleErrorEvent(e){this.error=e.detail,Object.keys((null==e?void 0:e.detail)||{}).length&&this.scSetState.emit("REJECT")}handlePayError(e){var r;this.error=(null===(r=e.detail)||void 0===r?void 0:r.message)||{code:"",message:"Something went wrong with your payment."}}componentWillLoad(){this.maybeAddErrorsComponent()}maybeAddErrorsComponent(){if(this.el.querySelector("sc-checkout-form-errors"))return;const e=document.createElement("sc-checkout-form-errors");console.log(this.el.querySelector("sc-form")),this.el.querySelector("sc-form").prepend(e)}render(){return h("slot",null)}get el(){return this}static get watchers(){return{error:["handleErrorUpdate"],checkoutState:["handleStateChange"]}}},[1,"sc-form-error-provider",{checkoutState:[1,"checkout-state"],error:[32]},[[0,"scError","handleErrorEvent"],[0,"scPayError","handlePayError"]]]);function defineCustomElement(){"undefined"!=typeof customElements&&["sc-form-error-provider","sc-alert","sc-checkout-form-errors","sc-icon"].forEach((e=>{switch(e){case"sc-form-error-provider":customElements.get(e)||customElements.define(e,ScFormErrorProvider);break;case"sc-alert":customElements.get(e)||defineCustomElement$3();break;case"sc-checkout-form-errors":customElements.get(e)||defineCustomElement$2();break;case"sc-icon":customElements.get(e)||defineCustomElement$1()}}))}defineCustomElement();export{ScFormErrorProvider as S,defineCustomElement as d};