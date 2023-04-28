import{proxyCustomElement,HTMLElement,createEvent,h}from"@stencil/core/internal/client";import{o as openWormhole}from"./consumer.js";import{d as defineCustomElement$4}from"./sc-form-control2.js";import{d as defineCustomElement$3}from"./sc-input2.js";import{d as defineCustomElement$2}from"./sc-tooltip2.js";const scCustomerFirstnameCss=":host{display:block}",ScCustomerFirstname$1=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.scChange=createEvent(this,"scChange",7),this.scUpdateOrderState=createEvent(this,"scUpdateOrderState",7),this.scClear=createEvent(this,"scClear",7),this.scInput=createEvent(this,"scInput",7),this.scFocus=createEvent(this,"scFocus",7),this.scBlur=createEvent(this,"scBlur",7),this.scUpdateCustomer=createEvent(this,"scUpdateCustomer",7),this.size="medium",this.value="",this.pill=!1,this.showLabel=!0,this.help="",this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}async reportValidity(){var e,t,s,i,o;null===(t=null===(e=this.input)||void 0===e?void 0:e.setCustomValidity)||void 0===t||t.call(e,""),(null===(s=this.input)||void 0===s?void 0:s.value.trim().length)||this.input.setCustomValidity(wp.i18n.__("Field must not be empty.","surecart"));return await(null===(o=null===(i=this.input)||void 0===i?void 0:i.reportValidity)||void 0===o?void 0:o.call(i))||!1}handleSessionChange(e){(null==e?void 0:e.first_name)&&e.first_name!==this.value&&(this.value=null==e?void 0:e.first_name)}render(){var e;return h("sc-input",{type:"text",name:"first_name",ref:e=>this.input=e,value:(null===(e=this.customer)||void 0===e?void 0:e.first_name)||this.value,disabled:!!this.loggedIn,label:this.label,help:this.help,autocomplete:"first_name",placeholder:this.placeholder,readonly:this.readonly,required:this.required,invalid:this.invalid,autofocus:this.autofocus,hasFocus:this.hasFocus,onScInput:()=>this.scInput.emit(),onScFocus:()=>this.scFocus.emit(),onScBlur:()=>this.scBlur.emit()})}static get watchers(){return{order:["handleSessionChange"]}}static get style(){return":host{display:block}"}},[1,"sc-customer-firstname",{loggedIn:[4,"logged-in"],order:[16],customer:[16],size:[513],value:[1025],pill:[516],label:[1],showLabel:[4,"show-label"],help:[1],placeholder:[1],disabled:[516],readonly:[516],required:[516],invalid:[1540],autofocus:[4],hasFocus:[1540,"has-focus"],reportValidity:[64]}]);function defineCustomElement$1(){"undefined"!=typeof customElements&&["sc-customer-firstname","sc-form-control","sc-input","sc-tooltip"].forEach((e=>{switch(e){case"sc-customer-firstname":customElements.get(e)||customElements.define(e,ScCustomerFirstname$1);break;case"sc-form-control":customElements.get(e)||defineCustomElement$4();break;case"sc-input":customElements.get(e)||defineCustomElement$3();break;case"sc-tooltip":customElements.get(e)||defineCustomElement$2()}}))}openWormhole(ScCustomerFirstname$1,["order","customer"],!1),defineCustomElement$1();const ScCustomerFirstname=ScCustomerFirstname$1,defineCustomElement=defineCustomElement$1;export{ScCustomerFirstname,defineCustomElement};