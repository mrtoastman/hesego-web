"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const index=require("./index-9c866aeb.js"),fetch=require("./fetch-b673a242.js"),price=require("./price-d3e21aa4.js"),addQueryArgs=require("./add-query-args-17c551b6.js"),scSubscriptionDetailsCss=":host{display:block}.subscription-details{display:grid;gap:0.25em;color:var(--sc-input-label-color)}",ScSubscriptionDetails=class{constructor(i){index.registerInstance(this,i)}renderName(){var i,t,e,n,s;return"string"!=typeof(null===(t=null===(i=this.subscription)||void 0===i?void 0:i.price)||void 0===t?void 0:t.product)?null===(s=null===(n=null===(e=this.subscription)||void 0===e?void 0:e.price)||void 0===n?void 0:n.product)||void 0===s?void 0:s.name:wp.i18n.__("Subscription","surecart")}async handleSubscriptionChange(){var i,t,e,n;this.hasPendingUpdate=!!(null===(t=Object.keys((null===(i=null==this?void 0:this.subscription)||void 0===i?void 0:i.pending_update)||{}))||void 0===t?void 0:t.length),!(null===(n=null===(e=null==this?void 0:this.subscription)||void 0===e?void 0:e.pending_update)||void 0===n?void 0:n.price)||(null==this?void 0:this.pendingPrice)||this.hideRenewalText||(this.pendingPrice=await this.fetchPrice(this.subscription.pending_update.price))}componentWillLoad(){this.handleSubscriptionChange()}async fetchPrice(i){try{return this.loading=!0,await fetch.apiFetch({path:addQueryArgs.addQueryArgs(`surecart/v1/prices/${i}`,{expand:["product"]})})}catch(i){console.error(i)}finally{this.loading=!1}}renderRenewalText(){var i,t,e,n,s,r,o,d,a,c,l,u,p,h,v,_,g,m,b;const x=index.h("sc-subscription-status-badge",{subscription:null==this?void 0:this.subscription});return(null===(i=null==this?void 0:this.subscription)||void 0===i?void 0:i.cancel_at_period_end)&&(null===(t=null==this?void 0:this.subscription)||void 0===t?void 0:t.current_period_end_at)?index.h("span",null,x," ",wp.i18n.sprintf(wp.i18n.__("Your plan will be canceled on","surecart"))," ",index.h("sc-format-date",{date:1e3*this.subscription.current_period_end_at,month:"long",day:"numeric",year:"numeric"})):this.hasPendingUpdate?this.pendingPrice||(null===(n=null===(e=this.subscription)||void 0===e?void 0:e.pending_update)||void 0===n?void 0:n.ad_hoc_amount)?(null===(r=null===(s=this.subscription)||void 0===s?void 0:s.pending_update)||void 0===r?void 0:r.ad_hoc_amount)?index.h("span",null,wp.i18n.__("Your plan switches to","surecart")," ",index.h("strong",null,index.h("sc-format-number",{type:"currency",currency:(null===(o=this.pendingPrice)||void 0===o?void 0:o.currency)||(null===(a=null===(d=this.subscription)||void 0===d?void 0:d.price)||void 0===a?void 0:a.currency),value:null===(l=null===(c=this.subscription)||void 0===c?void 0:c.pending_update)||void 0===l?void 0:l.ad_hoc_amount})," ",price.intervalString(this.pendingPrice||(null===(u=this.subscription)||void 0===u?void 0:u.price)))," ",wp.i18n.__("on","surecart")," ",index.h("sc-format-date",{date:this.subscription.current_period_end_at,type:"timestamp",month:"long",day:"numeric",year:"numeric"})):index.h("span",null,wp.i18n.__("Your plan switches to","surecart")," ",index.h("strong",null,this.pendingPrice.product.name)," ",wp.i18n.__("on","surecart")," ",index.h("sc-format-date",{date:this.subscription.current_period_end_at,type:"timestamp",month:"long",day:"numeric",year:"numeric"})):index.h("sc-skeleton",null):"trialing"===(null===(p=null==this?void 0:this.subscription)||void 0===p?void 0:p.status)&&(null===(h=null==this?void 0:this.subscription)||void 0===h?void 0:h.trial_end_at)?index.h("span",null,x," ",wp.i18n.sprintf(wp.i18n.__("Your plan begins on","surecart"))," ",index.h("sc-format-date",{date:null===(v=null==this?void 0:this.subscription)||void 0===v?void 0:v.trial_end_at,type:"timestamp",month:"long",day:"numeric",year:"numeric"})):"active"===(null===(_=this.subscription)||void 0===_?void 0:_.status)&&(null===(g=this.subscription)||void 0===g?void 0:g.current_period_end_at)?index.h("span",null,x," ",null===(null===(m=this.subscription)||void 0===m?void 0:m.remaining_period_count)?wp.i18n.__("Your plan renews on","surecart"):wp.i18n.__("Your next payment is on","surecart")," ",index.h("sc-format-date",{date:null===(b=null==this?void 0:this.subscription)||void 0===b?void 0:b.current_period_end_at,type:"timestamp",month:"long",day:"numeric",year:"numeric"})):x}getActivations(){var i,t,e,n;return((null===(n=null===(e=null===(t=null===(i=this.subscription)||void 0===i?void 0:i.purchase)||void 0===t?void 0:t.license)||void 0===e?void 0:e.activations)||void 0===n?void 0:n.data)||[]).filter((i=>null==i?void 0:i.counted))}renderActivations(){var i;const t=this.getActivations();return(null==t?void 0:t.length)?index.h("sc-flex",{justifyContent:"flex-start",alignItems:"center"},index.h("sc-tag",{size:"small"},null===(i=null==t?void 0:t[0])||void 0===i?void 0:i.name),(null==t?void 0:t.length)>1&&index.h("sc-text",{style:{"--font-size":"var(--sc-font-size-small)",cursor:"pointer"},onClick:i=>{i.preventDefault(),i.stopImmediatePropagation(),this.activationsModal=!0}},"+ ",(null==t?void 0:t.length)-1," More")):null}render(){return index.h("div",{class:"subscription-details"},this.hasPendingUpdate&&index.h("div",null,index.h("sc-tag",{size:"small",type:"warning"},wp.i18n.__("Update Scheduled","surecart"))),index.h("sc-flex",{alignItems:"center",justifyContent:"flex-start"},index.h("sc-text",{style:{"--font-weight":"var(--sc-font-weight-bold)"}},this.renderName()),this.renderActivations()),!this.hideRenewalText&&index.h("div",null,this.renderRenewalText()," "),index.h("slot",null),index.h("sc-dialog",{label:wp.i18n.__("Activations","surecart"),onScRequestClose:()=>this.activationsModal=!1,open:!!this.activationsModal},index.h("sc-card",{"no-padding":!0,style:{"--overflow":"hidden"}},index.h("sc-stacked-list",null,(this.getActivations()||[]).map((i=>index.h("sc-stacked-list-row",{style:{"--columns":"2"},mobileSize:0},index.h("sc-text",{style:{"--line-height":"var(--sc-line-height-dense)"}},index.h("strong",null,null==i?void 0:i.name),index.h("div",null,index.h("sc-text",{style:{"--color":"var(--sc-color-gray-500)"}},null==i?void 0:i.fingerprint))),index.h("sc-text",{style:{"--color":"var(--sc-color-gray-500)"}},index.h("sc-format-date",{type:"timestamp",month:"short",day:"numeric",year:"numeric",date:null==i?void 0:i.created_at})))))))))}static get watchers(){return{subscription:["handleSubscriptionChange"]}}};ScSubscriptionDetails.style=scSubscriptionDetailsCss;const scSubscriptionStatusBadgeCss=":host{display:inline-block}",ScSubscriptionStatusBadge=class{constructor(i){index.registerInstance(this,i),this.size="medium",this.pill=!1,this.clearable=!1}getType(){var i,t,e;if(null===(i=this.subscription)||void 0===i?void 0:i.cancel_at_period_end)return"info";switch(this.status||(null===(t=this.subscription)||void 0===t?void 0:t.status)){case"incomplete":case"past_due":case"unpaid":return"warning";case"trialing":return"info";case"active":case"completed":return"success";case"canceled":return(null===(e=this.subscription)||void 0===e?void 0:e.restore_at)?"info":"danger"}}getText(){var i,t,e,n;if((null===(i=this.subscription)||void 0===i?void 0:i.cancel_at_period_end)&&this.subscription.current_period_end_at&&"canceled"!==(null===(t=this.subscription)||void 0===t?void 0:t.status))return index.h(index.Fragment,null,wp.i18n.__("Cancels","surecart")," ",index.h("sc-format-date",{type:"timestamp",date:this.subscription.current_period_end_at,month:"short",day:"numeric"}));switch(this.status||(null===(e=this.subscription)||void 0===e?void 0:e.status)){case"incomplete":return wp.i18n.__("Incomplete","surecart");case"trialing":return wp.i18n.__("Trialing","surecart");case"active":return wp.i18n.__("Active","surecart");case"past_due":return wp.i18n.__("Past Due","surecart");case"canceled":return(null===(n=this.subscription)||void 0===n?void 0:n.restore_at)?"Paused":wp.i18n.__("Canceled","surecart");case"completed":return wp.i18n.__("Completed","surecart");case"unpaid":return wp.i18n.__("Unpaid","surecart")}}render(){return index.h("sc-tag",{type:this.getType()},this.getText())}};ScSubscriptionStatusBadge.style=scSubscriptionStatusBadgeCss,exports.sc_subscription_details=ScSubscriptionDetails,exports.sc_subscription_status_badge=ScSubscriptionStatusBadge;