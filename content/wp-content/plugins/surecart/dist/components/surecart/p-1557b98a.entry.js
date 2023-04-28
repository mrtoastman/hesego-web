import{r as t,h as i,F as s}from"./p-dfbe004d.js";import{a as e}from"./p-d8453138.js";import{i as l}from"./p-468023a1.js";import{a as n}from"./p-1c2e2695.js";const o=class{constructor(i){t(this,i)}renderName(){var i,t,n,e,s;return"string"!=typeof(null===(t=null===(i=this.subscription)||void 0===i?void 0:i.price)||void 0===t?void 0:t.product)?null===(s=null===(e=null===(n=this.subscription)||void 0===n?void 0:n.price)||void 0===e?void 0:e.product)||void 0===s?void 0:s.name:wp.i18n.__("Subscription","surecart")}async handleSubscriptionChange(){var i,t,n,e;this.hasPendingUpdate=!!(null===(t=Object.keys((null===(i=null==this?void 0:this.subscription)||void 0===i?void 0:i.pending_update)||{}))||void 0===t?void 0:t.length),!(null===(e=null===(n=null==this?void 0:this.subscription)||void 0===n?void 0:n.pending_update)||void 0===e?void 0:e.price)||(null==this?void 0:this.pendingPrice)||this.hideRenewalText||(this.pendingPrice=await this.fetchPrice(this.subscription.pending_update.price))}componentWillLoad(){this.handleSubscriptionChange()}async fetchPrice(i){try{return this.loading=!0,await e({path:n(`surecart/v1/prices/${i}`,{expand:["product"]})})}catch(i){console.error(i)}finally{this.loading=!1}}renderRenewalText(){var t,n,e,s,r,o,a,c,d,u,p,v,h,_,m,g,b,y,w;const f=i("sc-subscription-status-badge",{subscription:null==this?void 0:this.subscription});return(null===(t=null==this?void 0:this.subscription)||void 0===t?void 0:t.cancel_at_period_end)&&(null===(n=null==this?void 0:this.subscription)||void 0===n?void 0:n.current_period_end_at)?i("span",null,f," ",wp.i18n.sprintf(wp.i18n.__("Your plan will be canceled on","surecart"))," ",i("sc-format-date",{date:1e3*this.subscription.current_period_end_at,month:"long",day:"numeric",year:"numeric"})):this.hasPendingUpdate?this.pendingPrice||(null===(s=null===(e=this.subscription)||void 0===e?void 0:e.pending_update)||void 0===s?void 0:s.ad_hoc_amount)?(null===(o=null===(r=this.subscription)||void 0===r?void 0:r.pending_update)||void 0===o?void 0:o.ad_hoc_amount)?i("span",null,wp.i18n.__("Your plan switches to","surecart")," ",i("strong",null,i("sc-format-number",{type:"currency",currency:(null===(a=this.pendingPrice)||void 0===a?void 0:a.currency)||(null===(d=null===(c=this.subscription)||void 0===c?void 0:c.price)||void 0===d?void 0:d.currency),value:null===(p=null===(u=this.subscription)||void 0===u?void 0:u.pending_update)||void 0===p?void 0:p.ad_hoc_amount})," ",l(this.pendingPrice||(null===(v=this.subscription)||void 0===v?void 0:v.price)))," ",wp.i18n.__("on","surecart")," ",i("sc-format-date",{date:this.subscription.current_period_end_at,type:"timestamp",month:"long",day:"numeric",year:"numeric"})):i("span",null,wp.i18n.__("Your plan switches to","surecart")," ",i("strong",null,this.pendingPrice.product.name)," ",wp.i18n.__("on","surecart")," ",i("sc-format-date",{date:this.subscription.current_period_end_at,type:"timestamp",month:"long",day:"numeric",year:"numeric"})):i("sc-skeleton",null):"trialing"===(null===(h=null==this?void 0:this.subscription)||void 0===h?void 0:h.status)&&(null===(_=null==this?void 0:this.subscription)||void 0===_?void 0:_.trial_end_at)?i("span",null,f," ",wp.i18n.sprintf(wp.i18n.__("Your plan begins on","surecart"))," ",i("sc-format-date",{date:null===(m=null==this?void 0:this.subscription)||void 0===m?void 0:m.trial_end_at,type:"timestamp",month:"long",day:"numeric",year:"numeric"})):"active"===(null===(g=this.subscription)||void 0===g?void 0:g.status)&&(null===(b=this.subscription)||void 0===b?void 0:b.current_period_end_at)?i("span",null,f," ",null===(null===(y=this.subscription)||void 0===y?void 0:y.remaining_period_count)?wp.i18n.__("Your plan renews on","surecart"):wp.i18n.__("Your next payment is on","surecart")," ",i("sc-format-date",{date:null===(w=null==this?void 0:this.subscription)||void 0===w?void 0:w.current_period_end_at,type:"timestamp",month:"long",day:"numeric",year:"numeric"})):f}getActivations(){var i,t,n,e;return((null===(e=null===(n=null===(t=null===(i=this.subscription)||void 0===i?void 0:i.purchase)||void 0===t?void 0:t.license)||void 0===n?void 0:n.activations)||void 0===e?void 0:e.data)||[]).filter((i=>null==i?void 0:i.counted))}renderActivations(){var t;const n=this.getActivations();return(null==n?void 0:n.length)?i("sc-flex",{justifyContent:"flex-start",alignItems:"center"},i("sc-tag",{size:"small"},null===(t=null==n?void 0:n[0])||void 0===t?void 0:t.name),(null==n?void 0:n.length)>1&&i("sc-text",{style:{"--font-size":"var(--sc-font-size-small)",cursor:"pointer"},onClick:i=>{i.preventDefault(),i.stopImmediatePropagation(),this.activationsModal=!0}},"+ ",(null==n?void 0:n.length)-1," More")):null}render(){return i("div",{class:"subscription-details"},this.hasPendingUpdate&&i("div",null,i("sc-tag",{size:"small",type:"warning"},wp.i18n.__("Update Scheduled","surecart"))),i("sc-flex",{alignItems:"center",justifyContent:"flex-start"},i("sc-text",{style:{"--font-weight":"var(--sc-font-weight-bold)"}},this.renderName()),this.renderActivations()),!this.hideRenewalText&&i("div",null,this.renderRenewalText()," "),i("slot",null),i("sc-dialog",{label:wp.i18n.__("Activations","surecart"),onScRequestClose:()=>this.activationsModal=!1,open:!!this.activationsModal},i("sc-card",{"no-padding":!0,style:{"--overflow":"hidden"}},i("sc-stacked-list",null,(this.getActivations()||[]).map((t=>i("sc-stacked-list-row",{style:{"--columns":"2"},mobileSize:0},i("sc-text",{style:{"--line-height":"var(--sc-line-height-dense)"}},i("strong",null,null==t?void 0:t.name),i("div",null,i("sc-text",{style:{"--color":"var(--sc-color-gray-500)"}},null==t?void 0:t.fingerprint))),i("sc-text",{style:{"--color":"var(--sc-color-gray-500)"}},i("sc-format-date",{type:"timestamp",month:"short",day:"numeric",year:"numeric",date:null==t?void 0:t.created_at})))))))))}static get watchers(){return{subscription:["handleSubscriptionChange"]}}};o.style=":host{display:block}.subscription-details{display:grid;gap:0.25em;color:var(--sc-input-label-color)}";const r=class{constructor(i){t(this,i),this.size="medium",this.pill=!1,this.clearable=!1}getType(){var i,t,n;if(null===(i=this.subscription)||void 0===i?void 0:i.cancel_at_period_end)return"info";switch(this.status||(null===(t=this.subscription)||void 0===t?void 0:t.status)){case"incomplete":case"past_due":case"unpaid":return"warning";case"trialing":return"info";case"active":case"completed":return"success";case"canceled":return(null===(n=this.subscription)||void 0===n?void 0:n.restore_at)?"info":"danger"}}getText(){var t,n,e,r;if((null===(t=this.subscription)||void 0===t?void 0:t.cancel_at_period_end)&&this.subscription.current_period_end_at&&"canceled"!==(null===(n=this.subscription)||void 0===n?void 0:n.status))return i(s,null,wp.i18n.__("Cancels","surecart")," ",i("sc-format-date",{type:"timestamp",date:this.subscription.current_period_end_at,month:"short",day:"numeric"}));switch(this.status||(null===(e=this.subscription)||void 0===e?void 0:e.status)){case"incomplete":return wp.i18n.__("Incomplete","surecart");case"trialing":return wp.i18n.__("Trialing","surecart");case"active":return wp.i18n.__("Active","surecart");case"past_due":return wp.i18n.__("Past Due","surecart");case"canceled":return(null===(r=this.subscription)||void 0===r?void 0:r.restore_at)?"Paused":wp.i18n.__("Canceled","surecart");case"completed":return wp.i18n.__("Completed","surecart");case"unpaid":return wp.i18n.__("Unpaid","surecart")}}render(){return i("sc-tag",{type:this.getType()},this.getText())}};r.style=":host{display:inline-block}";export{o as sc_subscription_details,r as sc_subscription_status_badge};