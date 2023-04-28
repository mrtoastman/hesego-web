import{Component,h,Prop,Watch,State,Element,Listen,Event,Method}from"@stencil/core";import{__}from"@wordpress/i18n";import{openWormhole}from"stencil-wormhole";export class ScDonationChoices{constructor(){this.currencyCode="usd",this.lineItems=[],this.removeInvalid=!0}async reportValidity(){return!this.input||this.input.shadowRoot.querySelector("sc-input").reportValidity()}handleChange(){const e=Array.from(this.getChoices()).find((e=>e.checked));this.showCustomAmount="ad_hoc"===e.value,isNaN(parseInt(e.value))||this.scUpdateLineItem.emit({price_id:this.priceId,quantity:1,ad_hoc_amount:parseInt(e.value)})}handleCustomAmountToggle(e){e&&setTimeout((()=>{var e,t;null===(t=null===(e=this.input)||void 0===e?void 0:e.triggerFocus)||void 0===t||t.call(e)}),50)}handleLineItemsChange(){var e;(null===(e=this.lineItems)||void 0===e?void 0:e.length)&&(this.lineItem=(this.lineItems||[]).find((e=>e.price.id===this.priceId)))}handleLineItemChange(e){this.removeInvalid&&this.removeInvalidPrices();const t=this.getChoices();let i=!1;t.forEach((t=>{isNaN(parseInt(t.value))||t.disabled||(parseInt(t.value)===(null==e?void 0:e.ad_hoc_amount)?(t.checked=!0,i=!0):t.checked=!1)})),this.showCustomAmount=!i,i||(this.el.querySelector('sc-choice[value="ad_hoc"]').checked=!0)}componentWillLoad(){this.handleLineItemsChange()}selectDefaultChoice(){const e=this.getChoices();e.length&&(e[0].checked=!0)}getChoices(){return this.el.querySelectorAll("sc-choice")||[]}removeInvalidPrices(){this.lineItem&&this.getChoices().forEach((e=>{var t,i,o,n,s,l,a,r;return(null===(i=null===(t=this.lineItem)||void 0===t?void 0:t.price)||void 0===i?void 0:i.ad_hoc_max_amount)&&parseInt(e.value)>(null===(n=null===(o=this.lineItem)||void 0===o?void 0:o.price)||void 0===n?void 0:n.ad_hoc_max_amount)||(null===(l=null===(s=this.lineItem)||void 0===s?void 0:s.price)||void 0===l?void 0:l.ad_hoc_min_amount)&&parseInt(e.value)<(null===(r=null===(a=this.lineItem)||void 0===a?void 0:a.price)||void 0===r?void 0:r.ad_hoc_min_amount)?(e.style.display="none",void(e.disabled=!0)):(e.style.display="flex",void(e.disabled=!1))}))}updateCustomAmount(){var e,t,i;this.input.value!==(null===(i=null===(t=null===(e=this.lineItem)||void 0===e?void 0:e.ad_hoc_amount)||void 0===t?void 0:t.toString)||void 0===i?void 0:i.call(t))&&(this.input.value?this.scUpdateLineItem.emit({price_id:this.priceId,quantity:1,ad_hoc_amount:parseInt(this.input.value)}):this.scRemoveLineItem.emit({price_id:this.priceId,quantity:1}))}render(){var e,t,i;return this.loading?h("div",{class:"sc-donation-choices"},h("sc-skeleton",{style:{width:"20%",display:"inline-block"}}),h("sc-skeleton",{style:{width:"60%",display:"inline-block"}}),h("sc-skeleton",{style:{width:"40%",display:"inline-block"}})):h("div",{class:"sc-donation-choices"},h("sc-choices",{label:this.label,"auto-width":!0},h("slot",null)),this.showCustomAmount&&h("div",{class:"sc-donation-choices__form"},h("sc-price-input",{ref:e=>this.input=e,required:!0,currencyCode:this.currencyCode,label:"Enter an amount",value:null===(i=null===(t=null===(e=this.lineItem)||void 0===e?void 0:e.ad_hoc_amount)||void 0===t?void 0:t.toString)||void 0===i?void 0:i.call(t)}),h("sc-button",{type:"primary",onClick:()=>this.updateCustomAmount(),full:!0,busy:this.busy},__("Update","surecart"))),this.busy&&h("sc-block-ui",{style:{zIndex:"9"}}))}static get is(){return"sc-donation-choices"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-donation-choices.scss"]}}static get styleUrls(){return{$:["sc-donation-choices.css"]}}static get properties(){return{priceId:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"The price id for the fields."},attribute:"price-id",reflect:!0},defaultAmount:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"The default amount to load the page with."},attribute:"default-amount",reflect:!1},currencyCode:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Currency code for the donation."},attribute:"currency-code",reflect:!1,defaultValue:"'usd'"},lineItems:{type:"unknown",mutable:!1,complexType:{original:"LineItem[]",resolved:"LineItem[]",references:{LineItem:{location:"import",path:"../../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:"Order line items."},defaultValue:"[]"},loading:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Is this loading"},attribute:"loading",reflect:!1},busy:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"busy",reflect:!1},removeInvalid:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"remove-invalid",reflect:!1,defaultValue:"true"},label:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"The label for the field."},attribute:"label",reflect:!1}}}static get states(){return{lineItem:{},error:{},showCustomAmount:{}}}static get events(){return[{method:"scRemoveLineItem",name:"scRemoveLineItem",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"Toggle line item event"},complexType:{original:"LineItemData",resolved:"LineItemData",references:{LineItemData:{location:"import",path:"../../../../types"}}}},{method:"scUpdateLineItem",name:"scUpdateLineItem",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"Toggle line item event"},complexType:{original:"LineItemData",resolved:"LineItemData",references:{LineItemData:{location:"import",path:"../../../../types"}}}},{method:"scAddLineItem",name:"scAddLineItem",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"Toggle line item event"},complexType:{original:"LineItemData",resolved:"LineItemData",references:{LineItemData:{location:"import",path:"../../../../types"}}}}]}static get methods(){return{reportValidity:{complexType:{signature:"() => Promise<boolean>",parameters:[],references:{Promise:{location:"global"}},return:"Promise<boolean>"},docs:{text:"",tags:[]}}}}static get elementRef(){return"el"}static get watchers(){return[{propName:"showCustomAmount",methodName:"handleCustomAmountToggle"},{propName:"lineItems",methodName:"handleLineItemsChange"},{propName:"lineItem",methodName:"handleLineItemChange"}]}static get listeners(){return[{name:"scChange",method:"handleChange",target:void 0,capture:!1,passive:!1}]}}openWormhole(ScDonationChoices,["lineItems","loading","busy","currencyCode"],!1);