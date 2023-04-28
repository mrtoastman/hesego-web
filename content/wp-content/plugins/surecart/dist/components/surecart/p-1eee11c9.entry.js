import{r as t,h as r,c as a,g as e}from"./p-dfbe004d.js";import{u as s}from"./p-ec9ca067.js";import{g as o,a as i,s as n,c as d}from"./p-febfc8ad.js";import"./p-10aa7556.js";import"./p-35c4916d.js";import"./p-1c2e2695.js";import"./p-47d251a3.js";import"./p-ea78c070.js";import"./p-0bb69f38.js";import"./p-9b6c2663.js";import"./p-d8453138.js";import"./p-4d73f82a.js";const c=class{constructor(e){t(this,e),this.icon="shopping-bag",this.count=0}render(){return r("div",{class:{cart:!0},part:"base"},r("div",{class:"cart__container",part:"container"},r("div",{class:{cart__counter:!0}},this.count),r("slot",null,r("sc-icon",{exportparts:"base:icon__base",name:this.icon}))))}};c.style=":host{display:block}.cart{position:fixed;bottom:var(--sc-cart-icon-bottom, 30px);right:var(--sc-cart-icon-right, 30px);left:var(--sc-cart-icon-left, auto);top:var(--sc-cart-icon-top, auto);background:var(--sc-cart-icon-background, var(--sc-color-primary-500));border-radius:var(--sc-cart-icon-border-radius, var(--sc-input-border-radius-medium));width:var(--sc-cart-icon-width, 60px);height:var(--sc-cart-icon-height, 60px);color:var(--sc-cart-icon-color, var(--sc-color-white));font-family:var(--sc-cart-font-family, var(--sc-input-font-family));font-weight:var(--sc-font-weight-semibold);transition:opacity var(--sc-transition-medium) ease;box-shadow:var(--sc-shadow-small);cursor:pointer}.cart:hover{opacity:0.8}.cart__container{font-size:24px;position:relative;display:flex;align-items:center;justify-content:center;text-align:center;height:100%}.cart__counter{position:absolute;top:-8px;left:auto;bottom:auto;right:-8px;font-size:12px;border-radius:var(--sc-cart-counter-border-radius, 9999px);color:var(--sc-cart-counter-color, var(--sc-color-white));background:var(--sc-cart-counter-background, var(--sc-color-gray-900));box-shadow:var(--sc-cart-icon-box-shadow, var(--sc-shadow-x-large));padding:4px 10px;line-height:18px;z-index:1}";const l=class{constructor(e){t(this,e),this.scUpdateOrderState=a(this,"scUpdateOrderState",7),this.scError=a(this,"scError",7),this.scSetState=a(this,"scSetState",7)}handleSessionUpdate(e){this.scUpdateOrderState.emit(e)}handleUpdateSession(e){const{data:t,options:r}=e.detail;(null==r?void 0:r.silent)?this.update(t):this.loadUpdate(t)}async handleCouponApply(e){const t=e.detail;this.scError.emit({}),this.loadUpdate({discount:{...t?{promotion_code:t}:{}}})}handleErrorResponse(e){"readonly"===(null==e?void 0:e.code)&&this.scUpdateOrderState.emit(null),"rest_cookie_invalid_nonce"!==(null==e?void 0:e.code)?((null==e?void 0:e.message)&&this.scError.emit(e),"http_request_failed"===(null==e?void 0:e.code)&&this.scError.emit({message:"Something went wrong. Please reload the page and try again."}),this.scSetState.emit("idle")):this.scSetState.emit("idle")}async fetch(e={}){this.loadUpdate({status:"draft",...e})}async update(e={},t={}){var r;try{this.session=await s({id:null===(r=this.order)||void 0===r?void 0:r.id,data:{...e},query:{...t}})}catch(e){throw console.error(e),e}}async loadUpdate(e={}){try{this.scSetState.emit("busy"),await this.update(e),this.scSetState.emit("idle")}catch(e){this.handleErrorResponse(e)}}render(){return r("sc-line-items-provider",{order:this.order,onScUpdateLineItems:e=>this.loadUpdate({line_items:e.detail})},r("slot",null))}get el(){return e(this)}static get watchers(){return{session:["handleSessionUpdate"]}}},h=class{constructor(e){t(this,e),this.scInitialFocus=a(this,"scInitialFocus",7),this.scRequestClose=a(this,"scRequestClose",7),this.scShow=a(this,"scShow",7),this.scHide=a(this,"scHide",7),this.scAfterShow=a(this,"scAfterShow",7),this.scAfterHide=a(this,"scAfterHide",7),this.open=!1,this.label="",this.placement="end",this.contained=!1,this.noHeader=!1}componentDidLoad(){this.drawer.hidden=!this.open,this.open&&!this.contained&&this.lockBodyScrolling()}disconnectedCallback(){this.unLockBodyScrolling()}lockBodyScrolling(){document.body.classList.add("sc-scroll-lock")}unLockBodyScrolling(){document.body.classList.remove("sc-scroll-lock")}async show(){this.open||(this.open=!0)}async hide(){this.open&&(this.open=!1)}requestClose(e){if(this.scRequestClose.emit(e).defaultPrevented){const e=o(this.el,"drawer.denyClose");i(this.panel,e.keyframes,e.options)}else this.hide()}handleKeyDown(e){"Escape"===e.key&&(e.stopPropagation(),this.requestClose("keyboard"))}async handleOpenChange(){if(this.open){this.scShow.emit(),this.originalTrigger=document.activeElement,this.contained||this.lockBodyScrolling();const e=this.el.querySelector("[autofocus]");e&&e.removeAttribute("autofocus"),await Promise.all([n(this.drawer),n(this.overlay)]),this.drawer.hidden=!1,requestAnimationFrame((()=>{this.scInitialFocus.emit().defaultPrevented||(e?e.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),e&&e.setAttribute("autofocus","")}));const t=o(this.el,`drawer.show${this.placement.charAt(0).toUpperCase()+this.placement.slice(1)}`),r=o(this.el,"drawer.overlay.show");await Promise.all([i(this.panel,t.keyframes,t.options),i(this.overlay,r.keyframes,r.options)]),this.scAfterShow.emit()}else{this.scHide.emit(),this.unLockBodyScrolling(),await Promise.all([n(this.drawer),n(this.overlay)]);const e=o(this.el,`drawer.hide${this.placement.charAt(0).toUpperCase()+this.placement.slice(1)}`),t=o(this.el,"drawer.overlay.hide");await Promise.all([i(this.panel,e.keyframes,e.options),i(this.overlay,t.keyframes,t.options)]),this.drawer.hidden=!0;const r=this.originalTrigger;"function"==typeof(null==r?void 0:r.focus)&&setTimeout((()=>r.focus())),this.scAfterHide.emit()}}render(){return r("div",{part:"base",class:{drawer:!0,"drawer--open":this.open,"drawer--top":"top"===this.placement,"drawer--end":"end"===this.placement,"drawer--bottom":"bottom"===this.placement,"drawer--start":"start"===this.placement,"drawer--contained":this.contained,"drawer--fixed":!this.contained,"drawer--has-footer":null!==this.el.querySelector('[slot="footer"]')},ref:e=>this.drawer=e,onKeyDown:e=>this.handleKeyDown(e)},r("div",{part:"overlay",class:"drawer__overlay",onClick:()=>this.requestClose("overlay"),tabindex:"-1",ref:e=>this.overlay=e}),r("div",{part:"panel",class:"drawer__panel",role:"dialog","aria-modal":"true","aria-hidden":this.open?"false":"true","aria-label":this.noHeader?this.label:void 0,"aria-labelledby":this.noHeader?void 0:"title",tabindex:"0",ref:e=>this.panel=e},!this.noHeader&&r("header",{part:"header"},r("slot",{name:"header"},r("div",{class:"drawer__header"},r("h2",{part:"title",class:"drawer__title",id:"title"},r("slot",{name:"label"},this.label.length>0?this.label:" "," ")),r("sc-icon",{part:"close-button",exportparts:"base:close-button__base",class:"drawer__close",name:"x",label:wp.i18n.__("Close","surecart"),onClick:()=>this.requestClose("close-button")})))),r("footer",{part:"header-suffix",class:"drawer__header-suffix"},r("slot",{name:"header-suffix"})),r("div",{part:"body",class:"drawer__body"},r("slot",null)),r("footer",{part:"footer",class:"drawer__footer"},r("slot",{name:"footer"}))))}get el(){return e(this)}static get watchers(){return{open:["handleOpenChange"]}}};d("drawer.showTop",{keyframes:[{opacity:0,transform:"translateY(-100%)"},{opacity:1,transform:"translateY(0)"}],options:{duration:250,easing:"ease"}}),d("drawer.hideTop",{keyframes:[{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(-100%)"}],options:{duration:250,easing:"ease"}}),d("drawer.showEnd",{keyframes:[{opacity:0,transform:"translateX(100%)"},{opacity:1,transform:"translateX(0)"}],options:{duration:250,easing:"ease"}}),d("drawer.hideEnd",{keyframes:[{opacity:1,transform:"translateX(0)"},{opacity:0,transform:"translateX(100%)"}],options:{duration:250,easing:"ease"}}),d("drawer.showBottom",{keyframes:[{opacity:0,transform:"translateY(100%)"},{opacity:1,transform:"translateY(0)"}],options:{duration:250,easing:"ease"}}),d("drawer.hideBottom",{keyframes:[{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(100%)"}],options:{duration:250,easing:"ease"}}),d("drawer.showStart",{keyframes:[{opacity:0,transform:"translateX(-100%)"},{opacity:1,transform:"translateX(0)"}],options:{duration:250,easing:"ease"}}),d("drawer.hideStart",{keyframes:[{opacity:1,transform:"translateX(0)"},{opacity:0,transform:"translateX(-100%)"}],options:{duration:250,easing:"ease"}}),d("drawer.denyClose",{keyframes:[{transform:"scale(1)"},{transform:"scale(1.01)"},{transform:"scale(1)"}],options:{duration:250}}),d("drawer.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250,easing:"ease"}}),d("drawer.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250,easing:"ease"}}),h.style=":host{display:contents}.drawer{top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;font-family:var(--sc-font-sans);font-weight:var(--sc-font-weight-normal)}.drawer--contained{position:absolute;z-index:initial}.drawer--fixed{position:fixed;z-index:var(--sc-z-index-drawer)}.drawer__panel{position:absolute;display:flex;flex-direction:column;z-index:2;max-width:100%;max-height:100%;background-color:var(--sc-panel-background-color);box-shadow:var(--sc-shadow-x-large);transition:var(--sc-transition-medium) transform;overflow:auto;pointer-events:all}.drawer__panel:focus{outline:none}.drawer--top .drawer__panel{top:0;right:auto;bottom:auto;left:0;width:100%;height:var(--sc-drawer-size, 400px)}.drawer--end .drawer__panel{top:0;right:0;bottom:auto;left:auto;width:100%;max-width:var(--sc-drawer-size, 400px);height:100%}.drawer--bottom .drawer__panel{top:auto;right:auto;bottom:0;left:0;width:100%;height:var(--sc-drawer-size, 400px)}.drawer--start .drawer__panel{top:0;right:auto;bottom:auto;left:0;width:var(--sc-drawer-size, 400px);height:100%}.drawer__header{display:flex;align-items:center;padding:var(--sc-drawer-header-spacing);border-bottom:var(--sc-drawer-border)}.drawer__title{flex:1 1 auto;font:inherit;font-size:var(--sc-font-size-large);line-height:var(--sc-line-height-dense);margin:0}.drawer__close{flex:0 0 auto;display:flex;align-items:center;font-size:var(--sc-font-size-x-large);color:var(--sc-color-gray-500);cursor:pointer}.drawer__body{flex:1 1 auto}.drawer--has-footer .drawer__footer{border-top:var(--sc-drawer-border);padding:var(--sc-drawer-footer-spacing)}.drawer__overlay{display:block;position:fixed;top:0;right:0;bottom:0;left:0;background-color:var(--sc-overlay-background-color);pointer-events:all}.drawer--contained .drawer__overlay{position:absolute}";const p=class{constructor(e){t(this,e),this.scUpdateError=a(this,"scUpdateError",7)}handleErrorUpdate(e){this.scUpdateError.emit(e)}handleErrorEvent(e){this.error=e.detail}getErrorMessage(e){return"order.line_items.price.blank"===e.code?wp.i18n.__("This product is no longer purchasable.","surecart"):null==e?void 0:e.message}errorMessage(){var e,t,r,a,s,o;return(null===(r=null===(t=null===(e=this.error)||void 0===e?void 0:e.additional_errors)||void 0===t?void 0:t[0])||void 0===r?void 0:r.message)?this.getErrorMessage(null===(s=null===(a=this.error)||void 0===a?void 0:a.additional_errors)||void 0===s?void 0:s[0]):(null===(o=null==this?void 0:this.error)||void 0===o?void 0:o.message)?this.getErrorMessage(null==this?void 0:this.error):""}render(){return this.errorMessage()?r("sc-alert",{exportparts:"base, icon, text, title, message, close",type:"danger",scrollOnOpen:!0,open:!!this.errorMessage()},r("span",{slot:"title"},this.errorMessage())):null}static get watchers(){return{error:["handleErrorUpdate"]}}};export{c as sc_cart_icon,l as sc_cart_session_provider,h as sc_drawer,p as sc_error};