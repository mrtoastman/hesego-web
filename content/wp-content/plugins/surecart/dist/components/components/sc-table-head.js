import{proxyCustomElement,HTMLElement,h,Host}from"@stencil/core/internal/client";const scTableHeadCss=":host{display:table-header-group}::slotted(*){display:table-row}",ScTable=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow()}render(){return h(Host,null,h("slot",null))}static get style(){return scTableHeadCss}},[1,"sc-table-head"]);function defineCustomElement$1(){"undefined"!=typeof customElements&&["sc-table-head"].forEach((e=>{"sc-table-head"===e&&(customElements.get(e)||customElements.define(e,ScTable))}))}defineCustomElement$1();const ScTableHead=ScTable,defineCustomElement=defineCustomElement$1;export{ScTableHead,defineCustomElement};