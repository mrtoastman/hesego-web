import{Component,Host,h}from"@stencil/core";export class ScTable{render(){return h(Host,null,h("slot",{name:"head"}),h("slot",null),h("slot",{name:"footer"}))}static get is(){return"sc-table"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-table.scss"]}}static get styleUrls(){return{$:["sc-table.css"]}}}