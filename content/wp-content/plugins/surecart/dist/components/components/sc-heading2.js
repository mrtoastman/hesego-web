import{proxyCustomElement,HTMLElement,h}from"@stencil/core/internal/client";const scHeadingCss=":host{display:block}.heading{font-family:var(--sc-font-sans);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between}.heading--small .heading__title{font-size:var(--sc-font-size-small);text-transform:uppercase}.heading__text{width:100%}.heading__title{font-size:var(--sc-font-size-x-large);font-weight:var(--sc-font-weight-bold);line-height:var(--sc-line-height-dense);white-space:nowrap}.heading__description{font-size:var(--sc-font-size-normal);line-height:var(--sc-line-height-dense);color:var(--sc-color-gray-500)}",ScHeading=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.size="medium"}render(){return h("div",{part:"base",class:{heading:!0,"heading--small":"small"===this.size,"heading--medium":"medium"===this.size,"heading--large":"large"===this.size}},h("div",{class:{heading__text:!0}},h("div",{class:"heading__title",part:"title"},h("slot",null)),h("div",{class:"heading__description",part:"description"},h("slot",{name:"description"}))),h("slot",{name:"end"}))}get el(){return this}static get style(){return scHeadingCss}},[1,"sc-heading",{size:[1]}]);function defineCustomElement(){"undefined"!=typeof customElements&&["sc-heading"].forEach((e=>{"sc-heading"===e&&(customElements.get(e)||customElements.define(e,ScHeading))}))}defineCustomElement();export{ScHeading as S,defineCustomElement as d};