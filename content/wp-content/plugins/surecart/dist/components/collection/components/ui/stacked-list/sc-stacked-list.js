import{Component,h}from"@stencil/core";export class ScStackedList{render(){return h("slot",null)}static get is(){return"sc-stacked-list"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-stacked-list.scss"]}}static get styleUrls(){return{$:["sc-stacked-list.css"]}}}