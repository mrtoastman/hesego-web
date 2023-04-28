import{r as registerInstance,h,F as Fragment}from"./index-fd4790f6.js";import{a as apiFetch}from"./fetch-34712ac6.js";import{U as Universe}from"./universe-e944e399.js";import{b as baseUrl}from"./index-93eba176.js";import{g as getOrder,s as setOrder}from"./watchers-0c79cf4e.js";import{u as uiStore}from"./ui-bfbc2b0b.js";import{a as addQueryArgs}from"./add-query-args-f4c5962b.js";import"./watchers-0c38e1b1.js";import"./watchers-e86a5dda.js";import"./index-26bbcef3.js";import"./getters-c6fb954d.js";import"./util-1396ff7b.js";import"./get-query-arg-cb6b8763.js";const scCartCss=":host{--sc-drawer-header-spacing:var(--sc-spacing-large);--sc-drawer-body-spacing:var(--sc-spacing-large);--sc-drawer-footer-spacing:var(--sc-spacing-large)}.cart{font-size:16px}.cart__header{display:flex;align-items:center;justify-content:space-between;width:100%;font-size:1em}.cart__close{opacity:0.75;transition:opacity 0.25s ease;cursor:pointer}.cart__close:hover{opacity:1}::slotted(*){padding:var(--sc-drawer-header-spacing);background:var(--sc-panel-background-color);position:relative}::slotted(sc-line-items){flex:1 1 auto;overflow:auto;-webkit-overflow-scrolling:touch;min-height:200px}::slotted(:last-child){border-bottom:0 !important}sc-drawer::part(body){display:flex;flex-direction:column;box-sizing:border-box;padding:0;overflow:hidden}",ScCart=class{constructor(t){registerInstance(this,t),this.open=null,this.mode="live",this.uiState="idle"}handleOpenChange(){uiStore.set("cart",{...uiStore.state.cart,open:this.open}),!0===this.open&&this.fetchOrder()}order(){return getOrder(this.formId,this.mode)}setOrder(t){setOrder(t,this.formId)}pageHasForm(){return!!document.querySelector("sc-checkout")}getItemsCount(){var t,e;const r=null===(e=null===(t=this.order())||void 0===t?void 0:t.line_items)||void 0===e?void 0:e.data;let i=0;return(r||[]).forEach((t=>{i+=null==t?void 0:t.quantity})),i}handleSetState(t){this.uiState=t.detail}handleErrorEvent(t){this.error=t.detail,this.uiState="idle"}handleCloseCart(){this.open=!1}async fetchOrder(){var t;try{this.uiState="loading";const e=await apiFetch({method:"GET",path:addQueryArgs(`${baseUrl}${null===(t=this.order())||void 0===t?void 0:t.id}`,{expand:["line_items","line_item.price","price.product","customer","customer.shipping_address","payment_intent","discount","discount.promotion","discount.coupon","recommended_bumps","bump.price","shipping_address","tax_identifier"]})});this.setOrder(e)}catch(t){throw console.error(t),t}finally{this.uiState="idle"}}componentWillLoad(){Universe.create(this,this.state()),this.open=!!uiStore.state.cart.open,uiStore.onChange("cart",(t=>{this.open=t.open}))}state(){var t,e,r,i,s,o,a,d,n,c,h,l;return{processor_data:null===(t=this.order())||void 0===t?void 0:t.processor_data,uiState:this.uiState,checkoutLink:this.checkoutLink,loading:"loading"===this.uiState,busy:"busy"===this.uiState,navigating:"navigating"===this.uiState,empty:!(null===(i=null===(r=null===(e=this.order())||void 0===e?void 0:e.line_items)||void 0===r?void 0:r.pagination)||void 0===i?void 0:i.count),error:this.error,order:this.order(),lineItems:(null===(o=null===(s=this.order())||void 0===s?void 0:s.line_items)||void 0===o?void 0:o.data)||[],tax_status:null===(a=this.order())||void 0===a?void 0:a.tax_status,customerShippingAddress:"string"!=typeof(null===(d=this.order())||void 0===d?void 0:d.customer)?null===(c=null===(n=this.order())||void 0===n?void 0:n.customer)||void 0===c?void 0:c.shipping_address:{},shippingAddress:null===(h=this.order())||void 0===h?void 0:h.shipping_address,taxStatus:null===(l=this.order())||void 0===l?void 0:l.tax_status,formId:this.formId}}render(){return h(Fragment,null,this.order()&&h(Universe.Provider,{state:this.state()},h("sc-cart-session-provider",{order:this.order(),"form-id":this.formId,"group-id":this.formId,onScUpdateOrderState:t=>this.setOrder(t.detail),onScError:t=>this.error=t.detail},h("sc-cart-icon",{count:this.getItemsCount(),onClick:()=>this.open=!this.open}),h("sc-drawer",{open:this.open,onScAfterHide:()=>this.open=!1,onScAfterShow:()=>this.open=!0},!0===this.open&&h(Fragment,null,h("div",{class:"cart__header-suffix",slot:"header"},h("slot",{name:"cart-header"}),h("sc-error",{style:{"--sc-alert-border-radius":"0"},slot:"header",error:this.error,onScUpdateError:t=>this.error=t.detail})),h("slot",null)),"busy"===this.uiState&&h("sc-block-ui",{"z-index":9})))))}static get watchers(){return{open:["handleOpenChange"]}}};ScCart.style=scCartCss;export{ScCart as sc_cart};