import{r as registerInstance,h}from"./index-fd4790f6.js";import{o as openWormhole}from"./consumer-b5087188.js";import{h as hasSubscription}from"./index-1ef9aa85.js";import{i as intervalString,g as getHumanDiscount}from"./price-a4ea8b5f.js";import{f as formatTaxDisplay}from"./tax-83f264de.js";const scOrderConfirmationLineItemsCss=":host{display:block}.line-items{display:grid;gap:var(--sc-spacing-small)}.line-item{display:grid;gap:var(--sc-spacing-small)}.fee__description{opacity:0.75}",ScOrderConfirmationLineItems=class{constructor(i){registerInstance(this,i)}render(){var i,o;return this.loading?h("sc-line-item",null,h("sc-skeleton",{style:{width:"50px",height:"50px","--border-radius":"0"},slot:"image"}),h("sc-skeleton",{slot:"title",style:{width:"120px",display:"inline-block"}}),h("sc-skeleton",{slot:"description",style:{width:"60px",display:"inline-block"}}),h("sc-skeleton",{style:{width:"120px",display:"inline-block"},slot:"price"}),h("sc-skeleton",{style:{width:"60px",display:"inline-block"},slot:"price-description"})):h("div",{class:{"confirmation-summary":!0}},h("div",{class:"line-items",part:"line-items"},null===(o=null===(i=this.order)||void 0===i?void 0:i.line_items)||void 0===o?void 0:o.data.map((i=>{var o,r,e,t,s,n,l;return h("div",{class:"line-item"},h("sc-product-line-item",{key:i.id,imageUrl:null===(r=null===(o=null==i?void 0:i.price)||void 0===o?void 0:o.product)||void 0===r?void 0:r.image_url,name:`${null===(t=null===(e=null==i?void 0:i.price)||void 0===e?void 0:e.product)||void 0===t?void 0:t.name}`,editable:!1,removable:!1,quantity:i.quantity,fees:null===(s=null==i?void 0:i.fees)||void 0===s?void 0:s.data,amount:null!==i.ad_hoc_amount?i.ad_hoc_amount:i.subtotal_amount,currency:null===(n=this.order)||void 0===n?void 0:n.currency,trialDurationDays:null===(l=null==i?void 0:i.price)||void 0===l?void 0:l.trial_duration_days,interval:intervalString(null==i?void 0:i.price,{showOnce:hasSubscription(this.order)})}))}))))}};openWormhole(ScOrderConfirmationLineItems,["order","busy","loading","empty"],!1),ScOrderConfirmationLineItems.style=scOrderConfirmationLineItemsCss;const scOrderConfirmationTotalsCss=":host{display:block}",ScOrderConfirmationTotals=class{constructor(i){registerInstance(this,i)}renderDiscountLine(){var i,o,r,e,t,s,n,l,d,a,c,u,m,p,v;if(!(null===(r=null===(o=null===(i=this.order)||void 0===i?void 0:i.discount)||void 0===o?void 0:o.promotion)||void 0===r?void 0:r.code))return null;let y="";return(null===(t=null===(e=this.order)||void 0===e?void 0:e.discount)||void 0===t?void 0:t.coupon)&&(y=getHumanDiscount(null===(n=null===(s=this.order)||void 0===s?void 0:s.discount)||void 0===n?void 0:n.coupon)),h("sc-line-item",{style:{marginTop:"var(--sc-spacing-small)"}},h("span",{slot:"description"},wp.i18n.__("Discount","surecart"),h("br",null),(null===(a=null===(d=null===(l=this.order)||void 0===l?void 0:l.discount)||void 0===d?void 0:d.promotion)||void 0===a?void 0:a.code)&&h("sc-tag",{type:"success",size:"small"},null===(m=null===(u=null===(c=this.order)||void 0===c?void 0:c.discount)||void 0===u?void 0:u.promotion)||void 0===m?void 0:m.code)),y&&h("span",{class:"coupon-human-discount",slot:"price-description"},"(",y,")"),h("sc-format-number",{slot:"price",type:"currency",currency:null===(p=this.order)||void 0===p?void 0:p.currency,value:-(null===(v=this.order)||void 0===v?void 0:v.discount_amount)}))}render(){var i,o,r,e,t,s,n;return h("div",{class:{"line-item-totals":!0}},h("sc-line-item-total",{order:this.order,total:"subtotal"},h("span",{slot:"description"},wp.i18n.__("Subtotal","surecart"))),this.renderDiscountLine(),!!(null===(i=this.order)||void 0===i?void 0:i.bump_amount)&&h("sc-line-item",{style:{marginTop:"var(--sc-spacing-small)"}},h("span",{slot:"description"},wp.i18n.__("Bundle Discount","surecart")),h("sc-format-number",{slot:"price",type:"currency",currency:null===(o=this.order)||void 0===o?void 0:o.currency,value:null===(r=this.order)||void 0===r?void 0:r.bump_amount})),!!(null===(e=this.order)||void 0===e?void 0:e.tax_amount)&&h("sc-line-item",{style:{marginTop:"var(--sc-spacing-small)"}},h("span",{slot:"description"},formatTaxDisplay(null===(t=this.order)||void 0===t?void 0:t.tax_label)," ",`(${this.order.tax_percent}%)`),h("sc-format-number",{slot:"price",type:"currency",currency:null===(s=this.order)||void 0===s?void 0:s.currency,value:null===(n=this.order)||void 0===n?void 0:n.tax_amount})),h("sc-divider",{style:{"--spacing":"var(--sc-spacing-small)"}}),h("sc-line-item-total",{order:this.order,size:"large","show-currency":!0},h("span",{slot:"description"},wp.i18n.__("Total","surecart"))))}};openWormhole(ScOrderConfirmationTotals,["order","busy","loading","empty"],!1),ScOrderConfirmationTotals.style=":host{display:block}";export{ScOrderConfirmationLineItems as sc_order_confirmation_line_items,ScOrderConfirmationTotals as sc_order_confirmation_totals};