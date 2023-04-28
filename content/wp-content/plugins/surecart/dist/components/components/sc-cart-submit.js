import{proxyCustomElement,HTMLElement,h}from"@stencil/core/internal/client";import{o as openWormhole}from"./consumer.js";import{d as defineCustomElement$4}from"./sc-button2.js";import{d as defineCustomElement$3}from"./sc-icon2.js";import{d as defineCustomElement$2}from"./sc-spinner2.js";const scCartSubmitCss="sc-order-submit{display:block;width:auto}",ScCartSubmit$1=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.type="primary",this.size="medium",this.full=!0}render(){return h("sc-button",{href:this.checkoutLink,type:this.type,size:this.size,full:this.full,loading:this.busy,disabled:this.busy,onClick:()=>(this.busy=!0,!0)},!!this.icon&&h("sc-icon",{name:this.icon,slot:"prefix"}),h("slot",null))}static get style(){return scCartSubmitCss}},[4,"sc-cart-submit",{busy:[4],type:[513],size:[513],full:[4],checkoutLink:[1,"checkout-link"],icon:[1]}]);function defineCustomElement$1(){"undefined"!=typeof customElements&&["sc-cart-submit","sc-button","sc-icon","sc-spinner"].forEach((t=>{switch(t){case"sc-cart-submit":customElements.get(t)||customElements.define(t,ScCartSubmit$1);break;case"sc-button":customElements.get(t)||defineCustomElement$4();break;case"sc-icon":customElements.get(t)||defineCustomElement$3();break;case"sc-spinner":customElements.get(t)||defineCustomElement$2()}}))}openWormhole(ScCartSubmit$1,["busy","checkoutLink"],!1),defineCustomElement$1();const ScCartSubmit=ScCartSubmit$1,defineCustomElement=defineCustomElement$1;export{ScCartSubmit,defineCustomElement};