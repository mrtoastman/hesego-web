import{Component,Event,h,Prop,State}from"@stencil/core";import{addQueryArgs}from"@wordpress/url";import apiFetch from"../../../../functions/fetch";import{getHumanDiscount}from"../../../../functions/price";import{replaceAmount}from"./functions";export class ScCancelDiscount{replaceAmount(e){var t,o;return(null===(t=this.protocol)||void 0===t?void 0:t.preservation_coupon)?replaceAmount(e,getHumanDiscount(null===(o=this.protocol)||void 0===o?void 0:o.preservation_coupon)):e}async addDiscount(){var e,t;try{this.loading=!0,this.subscription=await apiFetch({method:"PATCH",path:addQueryArgs(`surecart/v1/subscriptions/${null===(e=this.subscription)||void 0===e?void 0:e.id}/preserve`,{cancellation_act:{...this.comment?{comment:this.comment}:{},cancellation_reason_id:null===(t=this.reason)||void 0===t?void 0:t.id}})}),this.scPreserved.emit()}catch(e){console.error(e),this.error=e}finally{this.loading=!1}}render(){var e;const{preserve_title:t,preserve_description:o,preserve_button:s,cancel_link:r}=(null===(e=this.protocol)||void 0===e?void 0:e.preservation_locales)||{};return h("div",{class:"cancel-discount"},h("sc-dashboard-module",{heading:this.replaceAmount(t),style:{"--sc-dashboard-module-spacing":"2em"}},h("span",{slot:"description"},this.replaceAmount(o)),h("sc-flex",{justifyContent:"flex-start"},h("sc-button",{type:"primary",onClick:()=>this.addDiscount()},s),h("sc-button",{class:"cancel-discount__abort-link",type:"text",onClick:()=>this.scCancel.emit()},r)),!!this.loading&&h("sc-block-ui",{spinner:!0})))}static get is(){return"sc-cancel-discount"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-cancel-discount.scss"]}}static get styleUrls(){return{$:["sc-cancel-discount.css"]}}static get properties(){return{subscription:{type:"unknown",mutable:!1,complexType:{original:"Subscription",resolved:"Subscription",references:{Subscription:{location:"import",path:"../../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:""}},reason:{type:"unknown",mutable:!1,complexType:{original:"CancellationReason",resolved:"CancellationReason",references:{CancellationReason:{location:"import",path:"../../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:""}},comment:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"comment",reflect:!1},protocol:{type:"unknown",mutable:!1,complexType:{original:"SubscriptionProtocol",resolved:"SubscriptionProtocol",references:{SubscriptionProtocol:{location:"import",path:"../../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:""}}}}static get states(){return{loading:{},error:{}}}static get events(){return[{method:"scCancel",name:"scCancel",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:""},complexType:{original:"void",resolved:"void",references:{}}},{method:"scPreserved",name:"scPreserved",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:""},complexType:{original:"void",resolved:"void",references:{}}}]}}