import{proxyCustomElement,HTMLElement,h}from"@stencil/core/internal/client";import{d as defineCustomElement$e}from"./sc-alert2.js";import{d as defineCustomElement$d}from"./sc-button2.js";import{d as defineCustomElement$c}from"./sc-card2.js";import{d as defineCustomElement$b}from"./sc-dashboard-module2.js";import{d as defineCustomElement$a}from"./sc-form-control2.js";import{d as defineCustomElement$9}from"./sc-icon2.js";import{d as defineCustomElement$8}from"./sc-input2.js";import{d as defineCustomElement$7}from"./sc-spinner2.js";import{d as defineCustomElement$6}from"./sc-table2.js";import{d as defineCustomElement$5}from"./sc-table-cell2.js";import{d as defineCustomElement$4}from"./sc-table-row2.js";import{d as defineCustomElement$3}from"./sc-tag2.js";import{d as defineCustomElement$2}from"./sc-tooltip2.js";const scLicensesListCss=":host{display:block}",ScLicensesList$1=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.licenses=[],this.activations=[]}renderStatus(e){return"active"===e?h("sc-tag",{type:"success"},wp.i18n.__("Active","surecart")):"revoked"===e?h("sc-tag",{type:"danger"},wp.i18n.__("Revoked","surecart")):h("sc-tag",{type:"info"},"inactive"===e?wp.i18n.__("Inactive","surecart"):e)}async copyKey(e){try{await navigator.clipboard.writeText(e),this.copied=!0,setTimeout((()=>{this.copied=!1}),2e3)}catch(e){console.error(e),alert(wp.i18n.__("Error copying to clipboard","surecart"))}}render(){return h("sc-dashboard-module",{class:"purchase",part:"base"},h("span",{slot:"heading"},h("slot",{name:"heading"},this.heading||wp.i18n.__("License Keys","surecart"))),h("sc-card",{"no-padding":!0},h("sc-table",null,h("sc-table-cell",{slot:"head"},wp.i18n.__("Key","surecart")),h("sc-table-cell",{slot:"head",style:{width:"100px"}},wp.i18n.__("Status","surecart")),h("sc-table-cell",{slot:"head",style:{width:"100px"}},wp.i18n.__("Activations","surecart")),this.licenses.map((({key:e,status:s,activations:t,activation_limit:c})=>{var n;return h("sc-table-row",{style:{"--columns":"3"}},h("sc-table-cell",null,h("sc-input",{value:e,readonly:!0},h("sc-button",{type:"default",size:"small",slot:"suffix",onClick:()=>this.copyKey(e)},this.copied?wp.i18n.__("Copied!","surecart"):wp.i18n.__("Copy","surecart")))),h("sc-table-cell",null,this.renderStatus(s)),h("sc-table-cell",null,null===(n=null==t?void 0:t.pagination)||void 0===n?void 0:n.count," / ",c||h("span",null,"∞")))})))))}static get style(){return scLicensesListCss}},[1,"sc-licenses-list",{licenses:[16],activations:[16],heading:[1],copied:[4]}]);function defineCustomElement$1(){"undefined"!=typeof customElements&&["sc-licenses-list","sc-alert","sc-button","sc-card","sc-dashboard-module","sc-form-control","sc-icon","sc-input","sc-spinner","sc-table","sc-table-cell","sc-table-row","sc-tag","sc-tooltip"].forEach((e=>{switch(e){case"sc-licenses-list":customElements.get(e)||customElements.define(e,ScLicensesList$1);break;case"sc-alert":customElements.get(e)||defineCustomElement$e();break;case"sc-button":customElements.get(e)||defineCustomElement$d();break;case"sc-card":customElements.get(e)||defineCustomElement$c();break;case"sc-dashboard-module":customElements.get(e)||defineCustomElement$b();break;case"sc-form-control":customElements.get(e)||defineCustomElement$a();break;case"sc-icon":customElements.get(e)||defineCustomElement$9();break;case"sc-input":customElements.get(e)||defineCustomElement$8();break;case"sc-spinner":customElements.get(e)||defineCustomElement$7();break;case"sc-table":customElements.get(e)||defineCustomElement$6();break;case"sc-table-cell":customElements.get(e)||defineCustomElement$5();break;case"sc-table-row":customElements.get(e)||defineCustomElement$4();break;case"sc-tag":customElements.get(e)||defineCustomElement$3();break;case"sc-tooltip":customElements.get(e)||defineCustomElement$2()}}))}defineCustomElement$1();const ScLicensesList=ScLicensesList$1,defineCustomElement=defineCustomElement$1;export{ScLicensesList,defineCustomElement};