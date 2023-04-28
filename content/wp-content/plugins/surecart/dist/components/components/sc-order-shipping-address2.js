import{proxyCustomElement,HTMLElement,createEvent,h}from"@stencil/core/internal/client";import{a as state}from"./watchers.js";import{l as lockCheckout,u as unLockCheckout}from"./mutations.js";import{c as createOrUpdateCheckout}from"./index2.js";import{o as openWormhole}from"./consumer.js";import{d as defineCustomElement$d}from"./sc-address2.js";import{d as defineCustomElement$c}from"./sc-block-ui2.js";import{d as defineCustomElement$b}from"./sc-compact-address2.js";import{d as defineCustomElement$a}from"./dropdown.js";import{d as defineCustomElement$9}from"./sc-form-control2.js";import{d as defineCustomElement$8}from"./sc-icon2.js";import{d as defineCustomElement$7}from"./sc-input2.js";import{d as defineCustomElement$6}from"./sc-menu2.js";import{d as defineCustomElement$5}from"./sc-menu-item2.js";import{d as defineCustomElement$4}from"./sc-menu-label2.js";import{d as defineCustomElement$3}from"./sc-select2.js";import{d as defineCustomElement$2}from"./sc-spinner2.js";import{d as defineCustomElement$1}from"./sc-tooltip2.js";const scOrderShippingAddressCss=":host{display:block}.sc-order-shipping__loading{display:flex;flex-direction:column;gap:0.5em}",ScOrderShippingAddress=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.scUpdateOrder=createEvent(this,"scUpdateOrder",7),this.required=!1,this.namePlaceholder=wp.i18n.__("Name or Company Name","surecart"),this.countryPlaceholder=wp.i18n.__("Country","surecart"),this.cityPlaceholder=wp.i18n.__("City","surecart"),this.line1Placeholder=wp.i18n.__("Address","surecart"),this.line2Placeholder=wp.i18n.__("Address Line 2","surecart"),this.postalCodePlaceholder=wp.i18n.__("Postal Code/Zip","surecart"),this.statePlaceholder=wp.i18n.__("State/Province/Region","surecart"),this.placeholders={name:wp.i18n.__("Name or Company Name","surecart"),country:wp.i18n.__("Country","surecart"),city:wp.i18n.__("City","surecart"),line_1:wp.i18n.__("Address","surecart"),line_2:wp.i18n.__("Address Line 2","surecart"),postal_code:wp.i18n.__("Postal Code/Zip","surecart"),state:wp.i18n.__("State/Province/Region","surecart")},this.address={country:null,city:null,line_1:null,line_2:null,postal_code:null,state:null}}handleCustomerAddressChange(e,s){(null==e?void 0:e.id)&&!s&&(this.address={...this.address,...e})}async updateAddressState(e){if(JSON.stringify(e)!==JSON.stringify(this.address)){this.address=e;try{lockCheckout("shipping-address"),state.checkout=await createOrUpdateCheckout({id:state.checkout.id,data:{shipping_address:this.address}})}catch(e){console.error(e)}finally{unLockCheckout("shipping-address")}}}async reportValidity(){return this.input.reportValidity()}componentWillLoad(){this.defaultCountry&&!this.address.country&&(this.address.country=this.defaultCountry),this.handleRequirementChange()}handleRequirementChange(){(this.shippingEnabled||this.taxEnabled)&&(this.required=!0)}render(){return this.shippingEnabled||this.full?h("sc-address",{exportparts:"label, help-text, form-control, input__base, select__base, columns, search__base, menu__base",ref:e=>this.input=e,label:this.label||wp.i18n.__("Shipping Address","surecart"),placeholders:{name:this.namePlaceholder,country:this.countryPlaceholder,city:this.cityPlaceholder,line_1:this.line1Placeholder,line_2:this.line2Placeholder,postal_code:this.postalCodePlaceholder,state:this.statePlaceholder},required:this.required,loading:this.loading,address:this.address,"show-name":this.showName,onScChangeAddress:e=>this.updateAddressState(e.detail)}):h("sc-compact-address",{ref:e=>this.input=e,required:this.required,loading:this.loading,address:this.address,placeholders:{name:this.namePlaceholder,country:this.countryPlaceholder,city:this.cityPlaceholder,line_1:this.line1Placeholder,line_2:this.line2Placeholder,postal_code:this.postalCodePlaceholder,state:this.statePlaceholder},label:this.label,onScChangeAddress:e=>this.updateAddressState(e.detail)})}static get watchers(){return{shippingAddress:["handleCustomerAddressChange"],shippingEnabled:["handleRequirementChange"],taxEnabled:["handleRequirementChange"]}}static get style(){return scOrderShippingAddressCss}},[1,"sc-order-shipping-address",{label:[1],required:[1028],loading:[4],shippingAddress:[16],taxStatus:[1,"tax-status"],taxEnabled:[4,"tax-enabled"],shippingEnabled:[4,"shipping-enabled"],full:[4],showName:[4,"show-name"],namePlaceholder:[1,"name-placeholder"],countryPlaceholder:[1,"country-placeholder"],cityPlaceholder:[1,"city-placeholder"],line1Placeholder:[1,"line-1-placeholder"],line2Placeholder:[1,"line-2-placeholder"],postalCodePlaceholder:[1,"postal-code-placeholder"],statePlaceholder:[1,"state-placeholder"],defaultCountry:[1,"default-country"],placeholders:[16],address:[32],reportValidity:[64]}]);function defineCustomElement(){"undefined"!=typeof customElements&&["sc-order-shipping-address","sc-address","sc-block-ui","sc-compact-address","sc-dropdown","sc-form-control","sc-icon","sc-input","sc-menu","sc-menu-item","sc-menu-label","sc-select","sc-spinner","sc-tooltip"].forEach((e=>{switch(e){case"sc-order-shipping-address":customElements.get(e)||customElements.define(e,ScOrderShippingAddress);break;case"sc-address":customElements.get(e)||defineCustomElement$d();break;case"sc-block-ui":customElements.get(e)||defineCustomElement$c();break;case"sc-compact-address":customElements.get(e)||defineCustomElement$b();break;case"sc-dropdown":customElements.get(e)||defineCustomElement$a();break;case"sc-form-control":customElements.get(e)||defineCustomElement$9();break;case"sc-icon":customElements.get(e)||defineCustomElement$8();break;case"sc-input":customElements.get(e)||defineCustomElement$7();break;case"sc-menu":customElements.get(e)||defineCustomElement$6();break;case"sc-menu-item":customElements.get(e)||defineCustomElement$5();break;case"sc-menu-label":customElements.get(e)||defineCustomElement$4();break;case"sc-select":customElements.get(e)||defineCustomElement$3();break;case"sc-spinner":customElements.get(e)||defineCustomElement$2();break;case"sc-tooltip":customElements.get(e)||defineCustomElement$1()}}))}openWormhole(ScOrderShippingAddress,["shippingAddress","loading","taxStatus","taxEnabled","shippingEnabled"],!1),defineCustomElement();export{ScOrderShippingAddress as S,defineCustomElement as d};