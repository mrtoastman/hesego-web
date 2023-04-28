"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const index=require("./index-9c866aeb.js"),watchers=require("./watchers-203d7acd.js"),getters=require("./getters-fd8a6c1d.js"),animationRegistry=require("./animation-registry-58bec802.js");require("./index-f6f80680.js"),require("./add-query-args-17c551b6.js"),require("./store-6708f186.js");const scOrderSummaryCss=":host{display:block;font-family:var(--sc-font-sans);font-size:var(--sc-checkout-font-size, 16px)}.collapse-link{display:flex;align-items:center;gap:0.35em}.summary__content--empty{display:none}.collapse-link__icon{width:18px;height:18px;color:var(--sc-order-collapse-link-icon-color, var(--sc-color-gray-500))}.item__product+.item__product{margin-top:20px}.empty{color:var(--sc-order-summary-color, var(--sc-color-gray-500))}.price{display:inline-block;opacity:0;visibility:hidden;transform:translateY(5px);transition:var(--sc-input-transition, var(--sc-transition-medium)) visibility ease, var(--sc-input-transition, var(--sc-transition-medium)) opacity ease, var(--sc-input-transition, var(--sc-transition-medium)) transform ease}.price--collapsed{opacity:1;visibility:visible;transform:translateY(0)}.summary{position:relative;user-select:none;cursor:pointer}.summary .collapse-link__icon{transition:transform 0.25s ease-in-out}.summary .scratch-price{text-decoration:line-through;color:var(--sc-color-gray-500);font-size:var(--sc-font-size-small);margin-right:var(--sc-spacing-xx-small)}.summary--open .collapse-link__icon{transform:rotate(180deg)}::slotted(*){margin:4px 0 !important}::slotted(sc-divider){margin:16px 0 !important}sc-line-item~sc-line-item{margin-top:14px}",ScOrderSummary=class{constructor(e){index.registerInstance(this,e),this.scShow=index.createEvent(this,"scShow",7),this.scHide=index.createEvent(this,"scHide",7),this.closedText=wp.i18n.__("Show Summary","surecart"),this.openText=wp.i18n.__("Summary","surecart"),this.collapsible=!1,this.collapsedOnMobile=!1}componentWillLoad(){var e;if(this.collapsedOnMobile){const t=document.body.getClientRects();t.length&&(this.collapsed=(null===(e=t[0])||void 0===e?void 0:e.width)<781)}this.handleOpenChange()}handleClick(e){e.preventDefault(),this.empty()&&!getters.formBusy()||(this.collapsed=!this.collapsed)}empty(){var e,t,i,s;return!(null===(i=null===(t=null===(e=watchers.state.checkout)||void 0===e?void 0:e.line_items)||void 0===t?void 0:t.pagination)||void 0===i?void 0:i.count)||((null===(s=null===watchers.state||void 0===watchers.state?void 0:watchers.state.checkout)||void 0===s?void 0:s.live_mode)?"test"===(null===watchers.state||void 0===watchers.state?void 0:watchers.state.mode):"live"===(null===watchers.state||void 0===watchers.state?void 0:watchers.state.mode))}renderHeader(){var e,t,i,s,o,a,r,n,l,c,d;return!getters.formBusy()&&!getters.formLoading()||(null===(i=null===(t=null===(e=watchers.state.checkout)||void 0===e?void 0:e.line_items)||void 0===t?void 0:t.data)||void 0===i?void 0:i.length)?index.h("sc-line-item",{style:{"--price-size":"var(--sc-font-size-x-large)"}},index.h("span",{class:"collapse-link",slot:"title",onClick:e=>this.handleClick(e)},this.collapsed?this.closedText||wp.i18n.__("Order Summary","surecart"):this.openText||wp.i18n.__("Order Summary","surecart"),index.h("svg",{xmlns:"http://www.w3.org/2000/svg",class:"collapse-link__icon",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},index.h("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 9l-7 7-7-7"}))),index.h("span",{slot:"description"},index.h("slot",{name:"description"})),(null===(s=watchers.state.checkout)||void 0===s?void 0:s.total_amount)!==(null===(o=watchers.state.checkout)||void 0===o?void 0:o.amount_due)?index.h("span",{slot:"price",class:{price:!0,"price--collapsed":this.collapsed}},index.h("sc-format-number",{type:"currency",currency:null===(a=watchers.state.checkout)||void 0===a?void 0:a.currency,value:null===(r=watchers.state.checkout)||void 0===r?void 0:r.amount_due})):index.h("span",{slot:"price",class:{price:!0,"price--collapsed":this.collapsed}},!!(null===(n=watchers.state.checkout)||void 0===n?void 0:n.total_savings_amount)&&index.h("sc-format-number",{class:"scratch-price",type:"currency",value:-(null===(l=watchers.state.checkout)||void 0===l?void 0:l.total_savings_amount)+(null===(c=watchers.state.checkout)||void 0===c?void 0:c.total_amount),currency:(null===(d=watchers.state.checkout)||void 0===d?void 0:d.currency)||"usd"}),index.h("sc-total",{total:"total",order:watchers.state.checkout}))):index.h("sc-line-item",null,index.h("sc-skeleton",{slot:"title",style:{width:"120px",display:"inline-block"}}),index.h("sc-skeleton",{slot:"price",style:{width:"70px",display:"inline-block","--border-radius":"6px"}}),index.h("sc-skeleton",{slot:"currency",style:{width:"30px",display:"inline-block"}}))}async handleOpenChange(){if(this.collapsed){this.scHide.emit(),await animationRegistry.stopAnimations(this.body),this.body.style.overflow="hidden";const{keyframes:e,options:t}=animationRegistry.getAnimation(this.el,"summary.hide");await animationRegistry.animateTo(this.body,animationRegistry.shimKeyframesHeightAuto(e,this.body.scrollHeight),t),this.body.hidden=!0,this.body.style.height="auto",this.body.style.overflow="visible"}else{this.scShow.emit(),await animationRegistry.stopAnimations(this.body),this.body.hidden=!1,this.body.style.overflow="hidden";const{keyframes:e,options:t}=animationRegistry.getAnimation(this.el,"summary.show");await animationRegistry.animateTo(this.body,animationRegistry.shimKeyframesHeightAuto(e,this.body.scrollHeight),t),this.body.style.height="auto",this.body.style.overflow="visible"}}render(){return index.h("div",{class:{summary:!0,"summary--open":!this.collapsed}},this.collapsible&&this.renderHeader(),index.h("div",{ref:e=>this.body=e,class:{summary__content:!0,"summary__content--empty":this.empty()&&!getters.formBusy()}},index.h("slot",null)),this.empty()&&!getters.formBusy()&&index.h("p",{class:"empty"},wp.i18n.__("Your cart is empty.","surecart")))}get el(){return index.getElement(this)}static get watchers(){return{collapsed:["handleOpenChange"]}}};animationRegistry.setDefaultAnimation("summary.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"ease"}}),animationRegistry.setDefaultAnimation("summary.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"ease"}}),ScOrderSummary.style=scOrderSummaryCss,exports.sc_order_summary=ScOrderSummary;