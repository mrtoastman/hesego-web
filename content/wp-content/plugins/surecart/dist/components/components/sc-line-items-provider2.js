import{proxyCustomElement,HTMLElement,createEvent,h}from"@stencil/core/internal/client";import{c as convertLineItemsToLineItemData}from"./index3.js";const ScLineItemsProvider=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.scUpdateLineItems=createEvent(this,"scUpdateLineItems",7),this.syncItems=[]}handleLineItemToggle(e){const t=e.detail;this.addSyncItem("toggle",t)}handleLineItemRemove(e){const t=e.detail;this.addSyncItem("remove",t)}handleLineItemAdd(e){const t=e.detail;this.addSyncItem("add",t)}handleLineItemUpdate(e){const t=e.detail;this.addSyncItem("update",t)}async syncItemsHandler(e){(null==e?void 0:e.length)&&setTimeout((()=>{var e;if(!(null===(e=this.syncItems)||void 0===e?void 0:e.length))return;const t=this.processSyncItems();this.scUpdateLineItems.emit(t),this.syncItems=[]}),100)}addSyncItem(e,t){this.syncItems=[...this.syncItems,{type:e,payload:t}]}processSyncItems(){var e;let t=convertLineItemsToLineItemData((null===(e=null==this?void 0:this.order)||void 0===e?void 0:e.line_items)||[]);const n={toggle:this.toggleItem,add:this.addItem,remove:this.removeItem,update:this.updateItem};return(this.syncItems||[]).forEach((e=>{t=n[e.type](e.payload,t)})),t}addItem(e,t){return[...t,e]}toggleItem(e,t){var n;const i=null===(n=t.find((t=>t.price_id===e.price_id)))||void 0===n?void 0:n.price_id;return i?t.filter((e=>i!==e.price_id)):[...t,e]}removeItem(e,t){return e.price_id?t.filter((t=>t.price_id!==e.price_id)):t}updateItem(e,t){const n=t.findIndex((t=>t.price_id===e.price_id));return-1===n?[...t,e]:(t[n]=e,t)}render(){return h("slot",null)}static get watchers(){return{syncItems:["syncItemsHandler"]}}},[1,"sc-line-items-provider",{order:[16],syncItems:[32]},[[0,"scToggleLineItem","handleLineItemToggle"],[0,"scRemoveLineItem","handleLineItemRemove"],[0,"scAddLineItem","handleLineItemAdd"],[0,"scUpdateLineItem","handleLineItemUpdate"]]]);function defineCustomElement(){"undefined"!=typeof customElements&&["sc-line-items-provider"].forEach((e=>{"sc-line-items-provider"===e&&(customElements.get(e)||customElements.define(e,ScLineItemsProvider))}))}defineCustomElement();export{ScLineItemsProvider as S,defineCustomElement as d};