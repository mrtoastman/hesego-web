import{Component,h,Prop}from"@stencil/core";import dotProp from"dot-prop-immutable";import{openWormhole}from"stencil-wormhole";export class ScSessionDetail{getPropByPath(e,t,r){return e&&t.length?this.getPropByPath(e[t.shift()],t,r):void 0===e?r:e}getValue(){var e,t;if(!this.value)return;let r="";return"metadata"===this.value?dotProp.get(null===(e=null==this?void 0:this.order)||void 0===e?void 0:e.metadata,this.value||""):(r=dotProp.get(null==this?void 0:this.order,this.value||""),"number"==typeof r&&(r=h("sc-format-number",{type:"currency",currency:null===(t=null==this?void 0:this.order)||void 0===t?void 0:t.currency,value:r})),r)}render(){if(this.loading)return h("div",{part:"base",class:{"order-detail":!0}},h("span",{part:"label",class:"order-detail__label"},h("sc-skeleton",{style:{width:"60px",height:"8px",display:"inline-block"}})),h("span",{part:"value",class:"order-detail__value"},h("sc-skeleton",{style:{width:"120px",display:"inline-block"}})));const e=this.getValue();return e||this.fallback?h("div",{part:"base",class:{"order-detail":!0}},h("span",{part:"label",class:"order-detail__label"},h("slot",{name:"label"},this.label)),h("span",{part:"value",class:"order-detail__value"},h("slot",{name:"value"},e||this.fallback))):void 0}static get is(){return"sc-order-detail"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-order-detail.scss"]}}static get styleUrls(){return{$:["sc-order-detail.css"]}}static get properties(){return{order:{type:"unknown",mutable:!1,complexType:{original:"Checkout",resolved:"Checkout",references:{Checkout:{location:"import",path:"../../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:""}},value:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"value",reflect:!1},fallback:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"fallback",reflect:!1},metaKey:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"meta-key",reflect:!1},loading:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"loading",reflect:!1},label:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"label",reflect:!1}}}}openWormhole(ScSessionDetail,["order","loading"],!1);