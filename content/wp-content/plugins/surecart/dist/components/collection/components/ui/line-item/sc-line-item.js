import{Component,Prop,h,Element,State}from"@stencil/core";import{isRtl}from"../../../functions/page-align";export class ScLineItem{componentWillLoad(){this.hasImageSlot=!!this.hostElement.querySelector('[slot="image"]'),this.hasTitleSlot=!!this.hostElement.querySelector('[slot="title"]'),this.hasDescriptionSlot=!!this.hostElement.querySelector('[slot="description"]'),this.hasPriceSlot=!!this.hostElement.querySelector('[slot="price"]'),this.hasPriceDescriptionSlot=!!this.hostElement.querySelector('[slot="price-description"]'),this.hasCurrencySlot=!!this.hostElement.querySelector('[slot="currency"]')}render(){return h("div",{part:"base",class:{item:!0,"item--has-image":this.hasImageSlot,"item--has-title":this.hasTitleSlot,"item--has-description":this.hasDescriptionSlot,"item--has-price":this.hasPriceSlot,"item--has-price-description":this.hasPriceDescriptionSlot,"item--has-price-currency":this.hasCurrencySlot,"item--is-rtl":isRtl()}},h("div",{class:"item__image",part:"image"},h("slot",{name:"image"})),h("div",{class:"item__text",part:"text"},h("div",{class:"item__title",part:"title"},h("slot",{name:"title"})),h("div",{class:"item__description",part:"description"},h("slot",{name:"description"}))),h("div",{class:"item__end",part:"price"},h("div",{class:"item__price-currency",part:"currency"},h("slot",{name:"currency"})),h("div",{class:"item__price-text",part:"price-text"},h("div",{class:"item__price",part:"price"},h("slot",{name:"price"})),h("div",{class:"item__price-description",part:"price-description"},h("slot",{name:"price-description"})))))}static get is(){return"sc-line-item"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-line-item.scss"]}}static get styleUrls(){return{$:["sc-line-item.css"]}}static get properties(){return{price:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Price of the item"},attribute:"price",reflect:!1},currency:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Currency symbol"},attribute:"currency",reflect:!1}}}static get states(){return{hasImageSlot:{},hasTitleSlot:{},hasDescriptionSlot:{},hasPriceSlot:{},hasPriceDescriptionSlot:{},hasCurrencySlot:{}}}static get elementRef(){return"hostElement"}}