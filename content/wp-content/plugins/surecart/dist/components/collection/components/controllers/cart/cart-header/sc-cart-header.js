import{Component,h,Event,Prop}from"@stencil/core";import{openWormhole}from"stencil-wormhole";export class ScCartHeader{getItemsCount(){const e=this.lineItems||[];let t=0;return e.forEach((e=>{t+=null==e?void 0:e.quantity})),t}render(){var e;return h("div",{class:"cart-header"},h("sc-icon",{class:"cart__close",name:"arrow-right",onClick:()=>this.scCloseCart.emit()}),h("div",{class:"cart-title"},h("slot",null)),h("sc-tag",{size:"small"},(null===(e=null==this?void 0:this.getItemsCount)||void 0===e?void 0:e.call(this))||0))}static get is(){return"sc-cart-header"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-cart-header.scss"]}}static get styleUrls(){return{$:["sc-cart-header.css"]}}static get properties(){return{lineItems:{type:"unknown",mutable:!1,complexType:{original:"Array<LineItem>",resolved:"LineItem[]",references:{Array:{location:"global"},LineItem:{location:"import",path:"../../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:""}}}}static get events(){return[{method:"scCloseCart",name:"scCloseCart",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:""},complexType:{original:"void",resolved:"void",references:{}}}]}}openWormhole(ScCartHeader,["lineItems"],!1);