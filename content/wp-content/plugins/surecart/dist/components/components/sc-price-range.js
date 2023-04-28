import{proxyCustomElement,HTMLElement,h,Host}from"@stencil/core/internal/client";import{d as defineCustomElement$2}from"./sc-format-number2.js";const scPriceRangeCss=":host{display:block}",ScPriceRange$1=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow()}handlePricesChange(){var e;let t,n;null===(e=this.prices)||void 0===e||e.forEach((e=>{(!n||e.amount>n.amount)&&(n=e),(!t||e.amount<t.amount)&&(t=e)})),this.minPrice=t,this.maxPrice=n}componentWillLoad(){this.handlePricesChange()}render(){return this.maxPrice&&this.minPrice?h(Host,null,this.maxPrice.amount==this.minPrice.amount?h("span",{class:"price-range-display"},h("sc-format-number",{type:"currency",currency:this.maxPrice.currency,value:this.maxPrice.amount})):h("span",{class:"price-range-display"},h("sc-format-number",{type:"currency",currency:this.minPrice.currency,value:this.minPrice.amount}),"-",h("sc-format-number",{type:"currency",currency:this.maxPrice.currency,value:this.maxPrice.amount}))):h(Host,null)}static get watchers(){return{prices:["handlePricesChange"]}}static get style(){return scPriceRangeCss}},[1,"sc-price-range",{prices:[16],minPrice:[32],maxPrice:[32]}]);function defineCustomElement$1(){"undefined"!=typeof customElements&&["sc-price-range","sc-format-number"].forEach((e=>{switch(e){case"sc-price-range":customElements.get(e)||customElements.define(e,ScPriceRange$1);break;case"sc-format-number":customElements.get(e)||defineCustomElement$2()}}))}defineCustomElement$1();const ScPriceRange=ScPriceRange$1,defineCustomElement=defineCustomElement$1;export{ScPriceRange,defineCustomElement};