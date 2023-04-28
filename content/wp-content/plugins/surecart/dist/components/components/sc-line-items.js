import{proxyCustomElement,HTMLElement,createEvent,h}from"@stencil/core/internal/client";import{o as openWormhole}from"./consumer.js";import{h as hasSubscription}from"./index3.js";import{i as intervalString}from"./price.js";import{d as defineCustomElement$7}from"./sc-format-number2.js";import{d as defineCustomElement$6}from"./sc-icon2.js";import{d as defineCustomElement$5}from"./sc-line-item2.js";import{d as defineCustomElement$4}from"./sc-product-line-item2.js";import{d as defineCustomElement$3}from"./sc-quantity-select2.js";import{d as defineCustomElement$2}from"./sc-skeleton2.js";const scLineItemsCss=":host{display:block}:slotted(*~*){margin-top:20px}.line-items{display:grid;gap:var(--sc-form-row-spacing)}.line-item{display:grid;gap:var(--sc-spacing-small)}.fee__description{opacity:0.75}",ScLineItems$1=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.scUpdateLineItem=createEvent(this,"scUpdateLineItem",7),this.scRemoveLineItem=createEvent(this,"scRemoveLineItem",7),this.editLineItems=!0,this.removeLineItems=!0,this.lockedChoices=[]}updateQuantity(e,i){this.scUpdateLineItem.emit({price_id:e.price.id,quantity:i})}removeLineItem(e){this.scRemoveLineItem.emit({price_id:e.price.id,quantity:1})}getName(e){var i,t,s,n,o;let l="";return l=Object.keys(this.prices||{}).filter((i=>this.prices[i].product===e.price.product.id)).length>1?`${null===(t=null===(i=null==e?void 0:e.price)||void 0===i?void 0:i.product)||void 0===t?void 0:t.name} – ${null===(s=null==e?void 0:e.price)||void 0===s?void 0:s.name}`:null===(o=null===(n=null==e?void 0:e.price)||void 0===n?void 0:n.product)||void 0===o?void 0:o.name,l}isLocked(e){return this.lockedChoices.some((i=>i.id===e.price.id))}isEditable(e){var i;return!(null===(i=null==e?void 0:e.price)||void 0===i?void 0:i.ad_hoc)&&!(null==e?void 0:e.bump_amount)&&(null!==this.editable?this.editable:this.editLineItems)}isRemovable(){return null!==this.removable?this.removable:this.removeLineItems}render(){var e,i,t,s,n;return this.busy&&!(null===(t=null===(i=null===(e=this.order)||void 0===e?void 0:e.line_items)||void 0===i?void 0:i.data)||void 0===t?void 0:t.length)?h("sc-line-item",null,h("sc-skeleton",{style:{width:"50px",height:"50px","--border-radius":"0"},slot:"image"}),h("sc-skeleton",{slot:"title",style:{width:"120px",display:"inline-block"}}),h("sc-skeleton",{slot:"description",style:{width:"60px",display:"inline-block"}}),h("sc-skeleton",{style:{width:"120px",display:"inline-block"},slot:"price"}),h("sc-skeleton",{style:{width:"60px",display:"inline-block"},slot:"price-description"})):h("div",{class:"line-items"},((null===(n=null===(s=this.order)||void 0===s?void 0:s.line_items)||void 0===n?void 0:n.data)||[]).sort(((e,i)=>{var t,s,n,o;return(null===(t=e.price)||void 0===t?void 0:t.id)<(null===(s=i.price)||void 0===s?void 0:s.id)?-1:(null===(n=e.price)||void 0===n?void 0:n.id)>(null===(o=i.price)||void 0===o?void 0:o.id)?1:0})).map((e=>{var i,t,s,n,o,l,d,m,r,c;return h("div",{class:"line-item"},h("sc-product-line-item",{key:e.id,imageUrl:null===(t=null===(i=null==e?void 0:e.price)||void 0===i?void 0:i.product)||void 0===t?void 0:t.image_url,name:null===(n=null===(s=null==e?void 0:e.price)||void 0===s?void 0:s.product)||void 0===n?void 0:n.name,max:null===(l=null===(o=null==e?void 0:e.price)||void 0===o?void 0:o.product)||void 0===l?void 0:l.purchase_limit,editable:this.isEditable(e),removable:this.isRemovable(),quantity:e.quantity,fees:null===(d=null==e?void 0:e.fees)||void 0===d?void 0:d.data,setupFeeTrialEnabled:null===(m=null==e?void 0:e.price)||void 0===m?void 0:m.setup_fee_trial_enabled,amount:null!==e.ad_hoc_amount?e.ad_hoc_amount:e.subtotal_amount,scratchAmount:null==e.ad_hoc_amount&&(null==e?void 0:e.scratch_amount),currency:null===(r=this.order)||void 0===r?void 0:r.currency,trialDurationDays:null===(c=null==e?void 0:e.price)||void 0===c?void 0:c.trial_duration_days,interval:!!(null==e?void 0:e.price)&&intervalString(null==e?void 0:e.price,{showOnce:hasSubscription(this.order)}),onScUpdateQuantity:i=>this.updateQuantity(e,i.detail),onScRemove:()=>this.removeLineItem(e)}))})))}static get style(){return scLineItemsCss}},[1,"sc-line-items",{order:[16],busy:[4],prices:[16],editable:[4],removable:[4],editLineItems:[4,"edit-line-items"],removeLineItems:[4,"remove-line-items"],lockedChoices:[16]}]);function defineCustomElement$1(){"undefined"!=typeof customElements&&["sc-line-items","sc-format-number","sc-icon","sc-line-item","sc-product-line-item","sc-quantity-select","sc-skeleton"].forEach((e=>{switch(e){case"sc-line-items":customElements.get(e)||customElements.define(e,ScLineItems$1);break;case"sc-format-number":customElements.get(e)||defineCustomElement$7();break;case"sc-icon":customElements.get(e)||defineCustomElement$6();break;case"sc-line-item":customElements.get(e)||defineCustomElement$5();break;case"sc-product-line-item":customElements.get(e)||defineCustomElement$4();break;case"sc-quantity-select":customElements.get(e)||defineCustomElement$3();break;case"sc-skeleton":customElements.get(e)||defineCustomElement$2()}}))}openWormhole(ScLineItems$1,["order","busy","prices","lockedChoices","editLineItems","removeLineItems"],!1),defineCustomElement$1();const ScLineItems=ScLineItems$1,defineCustomElement=defineCustomElement$1;export{ScLineItems,defineCustomElement};