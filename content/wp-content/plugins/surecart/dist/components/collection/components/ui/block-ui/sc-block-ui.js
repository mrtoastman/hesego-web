import{Component,h,Prop}from"@stencil/core";export class ScBlockUi{constructor(){this.zIndex=1}render(){return h("div",{part:"base",class:{overlay:!0,transparent:this.transparent},style:{"z-index":this.zIndex.toString()}},h("div",{class:"overlay__content",part:"content"},h("slot",{name:"spinner"},!this.transparent&&this.spinner&&h("sc-spinner",null)),h("slot",null)))}static get is(){return"sc-block-ui"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-block-ui.scss"]}}static get styleUrls(){return{$:["sc-block-ui.css"]}}static get properties(){return{zIndex:{type:"number",mutable:!1,complexType:{original:"number",resolved:"number",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"z-index",reflect:!1,defaultValue:"1"},transparent:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"transparent",reflect:!1},spinner:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"spinner",reflect:!1}}}}