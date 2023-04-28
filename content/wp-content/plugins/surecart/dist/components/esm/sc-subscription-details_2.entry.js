import{r as registerInstance,h,F as Fragment}from"./index-fd4790f6.js";import{a as apiFetch}from"./fetch-34712ac6.js";import{i as intervalString}from"./price-a4ea8b5f.js";import{a as addQueryArgs}from"./add-query-args-f4c5962b.js";const scSubscriptionDetailsCss=":host{display:block}.subscription-details{display:grid;gap:0.25em;color:var(--sc-input-label-color)}",ScSubscriptionDetails=class{constructor(i){registerInstance(this,i)}renderName(){var i,t,e,s,n;return"string"!=typeof(null===(t=null===(i=this.subscription)||void 0===i?void 0:i.price)||void 0===t?void 0:t.product)?null===(n=null===(s=null===(e=this.subscription)||void 0===e?void 0:e.price)||void 0===s?void 0:s.product)||void 0===n?void 0:n.name:wp.i18n.__("Subscription","surecart")}async handleSubscriptionChange(){var i,t,e,s;this.hasPendingUpdate=!!(null===(t=Object.keys((null===(i=null==this?void 0:this.subscription)||void 0===i?void 0:i.pending_update)||{}))||void 0===t?void 0:t.length),!(null===(s=null===(e=null==this?void 0:this.subscription)||void 0===e?void 0:e.pending_update)||void 0===s?void 0:s.price)||(null==this?void 0:this.pendingPrice)||this.hideRenewalText||(this.pendingPrice=await this.fetchPrice(this.subscription.pending_update.price))}componentWillLoad(){this.handleSubscriptionChange()}async fetchPrice(i){try{return this.loading=!0,await apiFetch({path:addQueryArgs(`surecart/v1/prices/${i}`,{expand:["product"]})})}catch(i){console.error(i)}finally{this.loading=!1}}renderRenewalText(){var i,t,e,s,n,r,o,a,c,l,d,u,p,v,_,g,m,b,y;const f=h("sc-subscription-status-badge",{subscription:null==this?void 0:this.subscription});return(null===(i=null==this?void 0:this.subscription)||void 0===i?void 0:i.cancel_at_period_end)&&(null===(t=null==this?void 0:this.subscription)||void 0===t?void 0:t.current_period_end_at)?h("span",null,f," ",wp.i18n.sprintf(wp.i18n.__("Your plan will be canceled on","surecart"))," ",h("sc-format-date",{date:1e3*this.subscription.current_period_end_at,month:"long",day:"numeric",year:"numeric"})):this.hasPendingUpdate?this.pendingPrice||(null===(s=null===(e=this.subscription)||void 0===e?void 0:e.pending_update)||void 0===s?void 0:s.ad_hoc_amount)?(null===(r=null===(n=this.subscription)||void 0===n?void 0:n.pending_update)||void 0===r?void 0:r.ad_hoc_amount)?h("span",null,wp.i18n.__("Your plan switches to","surecart")," ",h("strong",null,h("sc-format-number",{type:"currency",currency:(null===(o=this.pendingPrice)||void 0===o?void 0:o.currency)||(null===(c=null===(a=this.subscription)||void 0===a?void 0:a.price)||void 0===c?void 0:c.currency),value:null===(d=null===(l=this.subscription)||void 0===l?void 0:l.pending_update)||void 0===d?void 0:d.ad_hoc_amount})," ",intervalString(this.pendingPrice||(null===(u=this.subscription)||void 0===u?void 0:u.price)))," ",wp.i18n.__("on","surecart")," ",h("sc-format-date",{date:this.subscription.current_period_end_at,type:"timestamp",month:"long",day:"numeric",year:"numeric"})):h("span",null,wp.i18n.__("Your plan switches to","surecart")," ",h("strong",null,this.pendingPrice.product.name)," ",wp.i18n.__("on","surecart")," ",h("sc-format-date",{date:this.subscription.current_period_end_at,type:"timestamp",month:"long",day:"numeric",year:"numeric"})):h("sc-skeleton",null):"trialing"===(null===(p=null==this?void 0:this.subscription)||void 0===p?void 0:p.status)&&(null===(v=null==this?void 0:this.subscription)||void 0===v?void 0:v.trial_end_at)?h("span",null,f," ",wp.i18n.sprintf(wp.i18n.__("Your plan begins on","surecart"))," ",h("sc-format-date",{date:null===(_=null==this?void 0:this.subscription)||void 0===_?void 0:_.trial_end_at,type:"timestamp",month:"long",day:"numeric",year:"numeric"})):"active"===(null===(g=this.subscription)||void 0===g?void 0:g.status)&&(null===(m=this.subscription)||void 0===m?void 0:m.current_period_end_at)?h("span",null,f," ",null===(null===(b=this.subscription)||void 0===b?void 0:b.remaining_period_count)?wp.i18n.__("Your plan renews on","surecart"):wp.i18n.__("Your next payment is on","surecart")," ",h("sc-format-date",{date:null===(y=null==this?void 0:this.subscription)||void 0===y?void 0:y.current_period_end_at,type:"timestamp",month:"long",day:"numeric",year:"numeric"})):f}getActivations(){var i,t,e,s;return((null===(s=null===(e=null===(t=null===(i=this.subscription)||void 0===i?void 0:i.purchase)||void 0===t?void 0:t.license)||void 0===e?void 0:e.activations)||void 0===s?void 0:s.data)||[]).filter((i=>null==i?void 0:i.counted))}renderActivations(){var i;const t=this.getActivations();return(null==t?void 0:t.length)?h("sc-flex",{justifyContent:"flex-start",alignItems:"center"},h("sc-tag",{size:"small"},null===(i=null==t?void 0:t[0])||void 0===i?void 0:i.name),(null==t?void 0:t.length)>1&&h("sc-text",{style:{"--font-size":"var(--sc-font-size-small)",cursor:"pointer"},onClick:i=>{i.preventDefault(),i.stopImmediatePropagation(),this.activationsModal=!0}},"+ ",(null==t?void 0:t.length)-1," More")):null}render(){return h("div",{class:"subscription-details"},this.hasPendingUpdate&&h("div",null,h("sc-tag",{size:"small",type:"warning"},wp.i18n.__("Update Scheduled","surecart"))),h("sc-flex",{alignItems:"center",justifyContent:"flex-start"},h("sc-text",{style:{"--font-weight":"var(--sc-font-weight-bold)"}},this.renderName()),this.renderActivations()),!this.hideRenewalText&&h("div",null,this.renderRenewalText()," "),h("slot",null),h("sc-dialog",{label:wp.i18n.__("Activations","surecart"),onScRequestClose:()=>this.activationsModal=!1,open:!!this.activationsModal},h("sc-card",{"no-padding":!0,style:{"--overflow":"hidden"}},h("sc-stacked-list",null,(this.getActivations()||[]).map((i=>h("sc-stacked-list-row",{style:{"--columns":"2"},mobileSize:0},h("sc-text",{style:{"--line-height":"var(--sc-line-height-dense)"}},h("strong",null,null==i?void 0:i.name),h("div",null,h("sc-text",{style:{"--color":"var(--sc-color-gray-500)"}},null==i?void 0:i.fingerprint))),h("sc-text",{style:{"--color":"var(--sc-color-gray-500)"}},h("sc-format-date",{type:"timestamp",month:"short",day:"numeric",year:"numeric",date:null==i?void 0:i.created_at})))))))))}static get watchers(){return{subscription:["handleSubscriptionChange"]}}};ScSubscriptionDetails.style=scSubscriptionDetailsCss;const scSubscriptionStatusBadgeCss=":host{display:inline-block}",ScSubscriptionStatusBadge=class{constructor(i){registerInstance(this,i),this.size="medium",this.pill=!1,this.clearable=!1}getType(){var i,t,e;if(null===(i=this.subscription)||void 0===i?void 0:i.cancel_at_period_end)return"info";switch(this.status||(null===(t=this.subscription)||void 0===t?void 0:t.status)){case"incomplete":case"past_due":case"unpaid":return"warning";case"trialing":return"info";case"active":case"completed":return"success";case"canceled":return(null===(e=this.subscription)||void 0===e?void 0:e.restore_at)?"info":"danger"}}getText(){var i,t,e,s;if((null===(i=this.subscription)||void 0===i?void 0:i.cancel_at_period_end)&&this.subscription.current_period_end_at&&"canceled"!==(null===(t=this.subscription)||void 0===t?void 0:t.status))return h(Fragment,null,wp.i18n.__("Cancels","surecart")," ",h("sc-format-date",{type:"timestamp",date:this.subscription.current_period_end_at,month:"short",day:"numeric"}));switch(this.status||(null===(e=this.subscription)||void 0===e?void 0:e.status)){case"incomplete":return wp.i18n.__("Incomplete","surecart");case"trialing":return wp.i18n.__("Trialing","surecart");case"active":return wp.i18n.__("Active","surecart");case"past_due":return wp.i18n.__("Past Due","surecart");case"canceled":return(null===(s=this.subscription)||void 0===s?void 0:s.restore_at)?"Paused":wp.i18n.__("Canceled","surecart");case"completed":return wp.i18n.__("Completed","surecart");case"unpaid":return wp.i18n.__("Unpaid","surecart")}}render(){return h("sc-tag",{type:this.getType()},this.getText())}};ScSubscriptionStatusBadge.style=scSubscriptionStatusBadgeCss;export{ScSubscriptionDetails as sc_subscription_details,ScSubscriptionStatusBadge as sc_subscription_status_badge};