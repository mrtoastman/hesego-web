"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const index=require("./index-9c866aeb.js"),consumer=require("./consumer-3f5ce850.js"),scCustomerFirstnameCss=":host{display:block}",ScCustomerFirstname=class{constructor(e){index.registerInstance(this,e),this.scChange=index.createEvent(this,"scChange",7),this.scUpdateOrderState=index.createEvent(this,"scUpdateOrderState",7),this.scClear=index.createEvent(this,"scClear",7),this.scInput=index.createEvent(this,"scInput",7),this.scFocus=index.createEvent(this,"scFocus",7),this.scBlur=index.createEvent(this,"scBlur",7),this.scUpdateCustomer=index.createEvent(this,"scUpdateCustomer",7),this.size="medium",this.value="",this.pill=!1,this.showLabel=!0,this.help="",this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}async reportValidity(){var e,t,s,i,r;null===(t=null===(e=this.input)||void 0===e?void 0:e.setCustomValidity)||void 0===t||t.call(e,""),(null===(s=this.input)||void 0===s?void 0:s.value.trim().length)||this.input.setCustomValidity(wp.i18n.__("Field must not be empty.","surecart"));return await(null===(r=null===(i=this.input)||void 0===i?void 0:i.reportValidity)||void 0===r?void 0:r.call(i))||!1}handleSessionChange(e){(null==e?void 0:e.first_name)&&e.first_name!==this.value&&(this.value=null==e?void 0:e.first_name)}render(){var e;return index.h("sc-input",{type:"text",name:"first_name",ref:e=>this.input=e,value:(null===(e=this.customer)||void 0===e?void 0:e.first_name)||this.value,disabled:!!this.loggedIn,label:this.label,help:this.help,autocomplete:"first_name",placeholder:this.placeholder,readonly:this.readonly,required:this.required,invalid:this.invalid,autofocus:this.autofocus,hasFocus:this.hasFocus,onScInput:()=>this.scInput.emit(),onScFocus:()=>this.scFocus.emit(),onScBlur:()=>this.scBlur.emit()})}static get watchers(){return{order:["handleSessionChange"]}}};consumer.openWormhole(ScCustomerFirstname,["order","customer"],!1),ScCustomerFirstname.style=":host{display:block}",exports.sc_customer_firstname=ScCustomerFirstname;