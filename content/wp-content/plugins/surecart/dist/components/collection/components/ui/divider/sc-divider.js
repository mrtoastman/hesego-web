import{Component,h}from"@stencil/core";export class ScDivider{render(){return h("div",{class:"divider",part:"base"},h("div",{class:"line__container","aria-hidden":"true",part:"line-container"},h("div",{class:"line",part:"line"})),h("div",{class:"text__container",part:"text-container"},h("span",{class:"text",part:"text"},h("slot",null))))}static get is(){return"sc-divider"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-divider.scss"]}}static get styleUrls(){return{$:["sc-divider.css"]}}}