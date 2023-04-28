import{r as t,c as e,h as s}from"./p-dfbe004d.js";import{c as i}from"./p-afcbd440.js";const n=class{constructor(s){t(this,s),this.scUpdateLineItems=e(this,"scUpdateLineItems",7),this.syncItems=[]}handleLineItemToggle(e){this.addSyncItem("toggle",e.detail)}handleLineItemRemove(e){this.addSyncItem("remove",e.detail)}handleLineItemAdd(e){this.addSyncItem("add",e.detail)}handleLineItemUpdate(e){this.addSyncItem("update",e.detail)}async syncItemsHandler(e){(null==e?void 0:e.length)&&setTimeout((()=>{var e;if(!(null===(e=this.syncItems)||void 0===e?void 0:e.length))return;const t=this.processSyncItems();this.scUpdateLineItems.emit(t),this.syncItems=[]}),100)}addSyncItem(e,t){this.syncItems=[...this.syncItems,{type:e,payload:t}]}processSyncItems(){var e;let t=i((null===(e=null==this?void 0:this.order)||void 0===e?void 0:e.line_items)||[]);const s={toggle:this.toggleItem,add:this.addItem,remove:this.removeItem,update:this.updateItem};return(this.syncItems||[]).forEach((e=>{t=s[e.type](e.payload,t)})),t}addItem(e,t){return[...t,e]}toggleItem(e,t){var s;const i=null===(s=t.find((t=>t.price_id===e.price_id)))||void 0===s?void 0:s.price_id;return i?t.filter((e=>i!==e.price_id)):[...t,e]}removeItem(e,t){return e.price_id?t.filter((t=>t.price_id!==e.price_id)):t}updateItem(e,t){const s=t.findIndex((t=>t.price_id===e.price_id));return-1===s?[...t,e]:(t[s]=e,t)}render(){return s("slot",null)}static get watchers(){return{syncItems:["syncItemsHandler"]}}};export{n as sc_line_items_provider};