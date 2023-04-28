import{Component,h,Prop}from"@stencil/core";import{openWormhole}from"stencil-wormhole";import{hasSubscription}from"../../../../functions/line-items";import{intervalString}from"../../../../functions/price";export class ScOrderConfirmationLineItems{render(){var e,i;return this.loading?h("sc-line-item",null,h("sc-skeleton",{style:{width:"50px",height:"50px","--border-radius":"0"},slot:"image"}),h("sc-skeleton",{slot:"title",style:{width:"120px",display:"inline-block"}}),h("sc-skeleton",{slot:"description",style:{width:"60px",display:"inline-block"}}),h("sc-skeleton",{style:{width:"120px",display:"inline-block"},slot:"price"}),h("sc-skeleton",{style:{width:"60px",display:"inline-block"},slot:"price-description"})):h("div",{class:{"confirmation-summary":!0}},h("div",{class:"line-items",part:"line-items"},null===(i=null===(e=this.order)||void 0===e?void 0:e.line_items)||void 0===i?void 0:i.data.map((e=>{var i,t,o,l,n,r,s;return h("div",{class:"line-item"},h("sc-product-line-item",{key:e.id,imageUrl:null===(t=null===(i=null==e?void 0:e.price)||void 0===i?void 0:i.product)||void 0===t?void 0:t.image_url,name:`${null===(l=null===(o=null==e?void 0:e.price)||void 0===o?void 0:o.product)||void 0===l?void 0:l.name}`,editable:!1,removable:!1,quantity:e.quantity,fees:null===(n=null==e?void 0:e.fees)||void 0===n?void 0:n.data,amount:null!==e.ad_hoc_amount?e.ad_hoc_amount:e.subtotal_amount,currency:null===(r=this.order)||void 0===r?void 0:r.currency,trialDurationDays:null===(s=null==e?void 0:e.price)||void 0===s?void 0:s.trial_duration_days,interval:intervalString(null==e?void 0:e.price,{showOnce:hasSubscription(this.order)})}))}))))}static get is(){return"sc-order-confirmation-line-items"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-order-confirmation-line-items.scss"]}}static get styleUrls(){return{$:["sc-order-confirmation-line-items.css"]}}static get properties(){return{order:{type:"unknown",mutable:!1,complexType:{original:"Checkout",resolved:"Checkout",references:{Checkout:{location:"import",path:"../../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:""}},loading:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"loading",reflect:!1}}}}openWormhole(ScOrderConfirmationLineItems,["order","busy","loading","empty"],!1);