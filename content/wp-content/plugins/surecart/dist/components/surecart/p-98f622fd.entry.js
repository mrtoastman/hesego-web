import{r as e,h as t,g as s}from"./p-dfbe004d.js";const i=class{constructor(t){e(this,t),this.size="medium"}render(){return t("div",{part:"base",class:{heading:!0,"heading--small":"small"===this.size,"heading--medium":"medium"===this.size,"heading--large":"large"===this.size}},t("div",{class:{heading__text:!0}},t("div",{class:"heading__title",part:"title"},t("slot",null)),t("div",{class:"heading__description",part:"description"},t("slot",{name:"description"}))),t("slot",{name:"end"}))}get el(){return s(this)}};i.style=":host{display:block}.heading{font-family:var(--sc-font-sans);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between}.heading--small .heading__title{font-size:var(--sc-font-size-small);text-transform:uppercase}.heading__text{width:100%}.heading__title{font-size:var(--sc-font-size-x-large);font-weight:var(--sc-font-weight-bold);line-height:var(--sc-line-height-dense);white-space:nowrap}.heading__description{font-size:var(--sc-font-size-normal);line-height:var(--sc-line-height-dense);color:var(--sc-color-gray-500)}";const n=class{constructor(t){e(this,t)}handleOrderChange(){var e;(null===(e=this.checkout)||void 0===e?void 0:e.manual_payment)&&this.addManualPaymentInstructions()}addManualPaymentInstructions(){var e,t;if(this.hasManualInstructions)return;const s=this.el.shadowRoot.querySelector("slot").assignedElements({flatten:!0}).find((e=>"SC-ORDER-CONFIRMATION-DETAILS"===e.tagName)),n=document.createElement("sc-order-manual-instructions");null===(t=null===(e=null==s?void 0:s.parentNode)||void 0===e?void 0:e.insertBefore)||void 0===t||t.call(e,n,s),this.hasManualInstructions=!0}componentWillLoad(){this.hasManualInstructions=!!this.el.querySelector("sc-order-manual-instructions")}render(){return t("slot",null)}get el(){return s(this)}static get watchers(){return{checkout:["handleOrderChange"]}}};export{i as sc_heading,n as sc_order_confirm_components_validator};