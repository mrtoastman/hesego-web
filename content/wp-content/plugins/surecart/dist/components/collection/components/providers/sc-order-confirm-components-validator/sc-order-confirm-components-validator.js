import{Component,h,State,Element,Watch,Prop}from"@stencil/core";export class ScOrderConfirmComponentsValidator{handleOrderChange(){var t;(null===(t=this.checkout)||void 0===t?void 0:t.manual_payment)&&this.addManualPaymentInstructions()}addManualPaymentInstructions(){var t,e;if(this.hasManualInstructions)return;const n=this.el.shadowRoot.querySelector("slot").assignedElements({flatten:!0}).find((t=>"SC-ORDER-CONFIRMATION-DETAILS"===t.tagName)),a=document.createElement("sc-order-manual-instructions");null===(e=null===(t=null==n?void 0:n.parentNode)||void 0===t?void 0:t.insertBefore)||void 0===e||e.call(t,a,n),this.hasManualInstructions=!0}componentWillLoad(){this.hasManualInstructions=!!this.el.querySelector("sc-order-manual-instructions")}render(){return h("slot",null)}static get is(){return"sc-order-confirm-components-validator"}static get encapsulation(){return"shadow"}static get properties(){return{checkout:{type:"unknown",mutable:!1,complexType:{original:"Checkout",resolved:"Checkout",references:{Checkout:{location:"import",path:"../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:"The checkout"}}}}static get states(){return{hasManualInstructions:{}}}static get elementRef(){return"el"}static get watchers(){return[{propName:"checkout",methodName:"handleOrderChange"}]}}