import{Component,Host,h,Prop}from"@stencil/core";export class ScTableRow{render(){return h(Host,null,h("slot",null))}static get is(){return"sc-table-row"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-table-row.scss"]}}static get styleUrls(){return{$:["sc-table-row.css"]}}static get properties(){return{href:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"href",reflect:!1}}}}