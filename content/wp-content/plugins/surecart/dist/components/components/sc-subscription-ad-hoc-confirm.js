import{proxyCustomElement,HTMLElement,h}from"@stencil/core/internal/client";import{i as intervalString}from"./price.js";import{d as defineCustomElement$d}from"./sc-alert2.js";import{d as defineCustomElement$c}from"./sc-block-ui2.js";import{d as defineCustomElement$b}from"./sc-button2.js";import{d as defineCustomElement$a}from"./sc-card2.js";import{d as defineCustomElement$9}from"./sc-dashboard-module2.js";import{d as defineCustomElement$8}from"./sc-form2.js";import{d as defineCustomElement$7}from"./sc-form-control2.js";import{d as defineCustomElement$6}from"./sc-icon2.js";import{d as defineCustomElement$5}from"./sc-input2.js";import{d as defineCustomElement$4}from"./sc-price-input2.js";import{d as defineCustomElement$3}from"./sc-spinner2.js";import{d as defineCustomElement$2}from"./sc-tooltip2.js";import{a as addQueryArgs}from"./add-query-args.js";const scSubscriptionAdHocConfirmCss=":host{display:block}",ScSubscriptionAdHocConfirm$1=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.busy=!1}async handleSubmit(e){const{ad_hoc_amount:s}=await e.target.getFormJson();return this.busy=!0,window.location.assign(addQueryArgs(window.location.href,{action:"confirm",ad_hoc_amount:s}))}render(){return h("sc-dashboard-module",{heading:this.heading||wp.i18n.__("Enter An Amount","surecart"),class:"subscription-switch"},h("sc-card",null,h("sc-form",{onScSubmit:e=>this.handleSubmit(e)},h("sc-price-input",{label:"Amount",name:"ad_hoc_amount",autofocus:!0,required:!0},h("span",{slot:"suffix",style:{opacity:"0.75"}},intervalString(this.price))),h("sc-button",{type:"primary",full:!0,submit:!0,loading:this.busy},wp.i18n.__("Next","surecart")," ",h("sc-icon",{name:"arrow-right",slot:"suffix"})))),this.busy&&h("sc-block-ui",{style:{zIndex:"9"}}))}static get style(){return":host{display:block}"}},[0,"sc-subscription-ad-hoc-confirm",{heading:[1],price:[16],busy:[32]}]);function defineCustomElement$1(){"undefined"!=typeof customElements&&["sc-subscription-ad-hoc-confirm","sc-alert","sc-block-ui","sc-button","sc-card","sc-dashboard-module","sc-form","sc-form-control","sc-icon","sc-input","sc-price-input","sc-spinner","sc-tooltip"].forEach((e=>{switch(e){case"sc-subscription-ad-hoc-confirm":customElements.get(e)||customElements.define(e,ScSubscriptionAdHocConfirm$1);break;case"sc-alert":customElements.get(e)||defineCustomElement$d();break;case"sc-block-ui":customElements.get(e)||defineCustomElement$c();break;case"sc-button":customElements.get(e)||defineCustomElement$b();break;case"sc-card":customElements.get(e)||defineCustomElement$a();break;case"sc-dashboard-module":customElements.get(e)||defineCustomElement$9();break;case"sc-form":customElements.get(e)||defineCustomElement$8();break;case"sc-form-control":customElements.get(e)||defineCustomElement$7();break;case"sc-icon":customElements.get(e)||defineCustomElement$6();break;case"sc-input":customElements.get(e)||defineCustomElement$5();break;case"sc-price-input":customElements.get(e)||defineCustomElement$4();break;case"sc-spinner":customElements.get(e)||defineCustomElement$3();break;case"sc-tooltip":customElements.get(e)||defineCustomElement$2()}}))}defineCustomElement$1();const ScSubscriptionAdHocConfirm=ScSubscriptionAdHocConfirm$1,defineCustomElement=defineCustomElement$1;export{ScSubscriptionAdHocConfirm,defineCustomElement};