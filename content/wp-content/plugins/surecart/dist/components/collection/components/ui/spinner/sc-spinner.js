import{Component,h}from"@stencil/core";export class ScSpinner{render(){return h("span",{part:"base",class:"spinner","aria-busy":"true","aria-live":"polite"})}static get is(){return"sc-spinner"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-spinner.scss"]}}static get styleUrls(){return{$:["sc-spinner.css"]}}}