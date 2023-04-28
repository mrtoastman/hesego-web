"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const index=require("./index-9c866aeb.js");function serialize(t){const e=new FormData(t),r={};return e.forEach(((t,e)=>{r[e]=t})),r}const scFormCss="sc-form{display:block}:host{display:block}::slotted(*:not(:last-child)),sc-form form>*:not(:last-child){margin-bottom:var(--sc-form-row-spacing, 0.75em)}::slotted(*:not(:last-child)).wp-block-spacer,sc-form form>*:not(:last-child).wp-block-spacer{margin-bottom:0}",ScForm=class{constructor(t){index.registerInstance(this,t),this.scSubmit=index.createEvent(this,"scSubmit",7),this.scFormSubmit=index.createEvent(this,"scFormSubmit",7),this.scFormChange=index.createEvent(this,"scFormChange",7),this.novalidate=!1}async getFormData(){return new FormData(this.formElement)}async getFormJson(){return serialize(this.formElement)}async handleChange(){this.scFormChange.emit(serialize(this.formElement))}async submit(){return this.submitForm()}getFormControls(){return[...this.form.querySelectorAll("*")]}async validate(){const t=this.getFormControls().filter((t=>"function"==typeof t.reportValidity));if(!this.novalidate)for(const e of t)if(null!==e.offsetParent&&!await e.reportValidity())return!1;return!0}submitForm(){const t=document.createElement("button");this.formElement&&(t.type="submit",t.style.position="absolute",t.style.width="0",t.style.height="0",t.style.clip="rect(0 0 0 0)",t.style.clipPath="inset(50%)",t.style.overflow="hidden",t.style.whiteSpace="nowrap",this.formElement.append(t),t.click(),t.remove())}render(){return index.h("div",{part:"base",class:"form",role:"form"},index.h("form",{part:"form",ref:t=>this.formElement=t,onSubmit:async t=>{if(t.preventDefault(),!await this.validate())return!1;this.scSubmit.emit(),this.scFormSubmit.emit()},novalidate:this.novalidate},index.h("slot",null)))}get form(){return index.getElement(this)}};ScForm.style=scFormCss,exports.sc_form=ScForm;