import{Component,State,Element,h}from"@stencil/core";export class ScFormRow{componentDidLoad(){"ResizeObserver"in window&&(this.observer=new window.ResizeObserver((t=>{this.width=null==t?void 0:t[0].contentRect.width})),this.observer.observe(this.el))}render(){return h("div",{part:"base",class:{"form-row":!0,"breakpoint-sm":this.width<384,"breakpoint-md":this.width>=384&&this.width<576,"breakpoint-lg":this.width>=576&&this.width<768,"breakpoint-xl":this.width>=768}},h("slot",null))}static get is(){return"sc-form-row"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-form-row.scss"]}}static get styleUrls(){return{$:["sc-form-row.css"]}}static get states(){return{width:{}}}static get elementRef(){return"el"}}