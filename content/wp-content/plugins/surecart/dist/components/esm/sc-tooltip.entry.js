import{r as registerInstance,h,g as getElement}from"./index-fd4790f6.js";const scTooltipCss='.tooltip{position:relative}.tooltip--has-width .tooltip-text{white-space:normal;min-width:var(--sc-tooltip-width);max-width:var(--sc-tooltip-width)}.tooltip-text{position:fixed;background:var(--sc-color-gray-900);border-radius:var(--sc-border-radius-small);padding:var(--sc-spacing-small);font-family:var(--sc-input-font-family);font-size:var(--sc-input-font-size-small);white-space:nowrap;line-height:1.2;color:var(--sc-color-white);z-index:99999}.tooltip-text:after{content:"";position:absolute;transform:translateX(-50%);top:calc(100% - 1px);left:50%;height:0;width:0;border:7px solid transparent;border-top-color:var(--sc-color-gray-900)}.tooltip--primary .tooltip-text{background:var(--sc-color-primary-500)}.tooltip--primary .tooltip-text:after{border-top-color:var(--sc-color-primary-500)}.tooltip--success .tooltip-text{background:var(--sc-color-success-500)}.tooltip--success .tooltip-text:after{border-top-color:var(--sc-color-success-500)}.tooltip--info .tooltip-text{background:var(--sc-color-info-500)}.tooltip--info .tooltip-text:after{border-top-color:var(--sc-color-info-500)}.tooltip--warning .tooltip-text{background:var(--sc-color-warning-500)}.tooltip--warning .tooltip-text:after{border-top-color:var(--sc-color-warning-500)}.tooltip--danger .tooltip-text{background:var(--sc-color-danger-500)}.tooltip--danger .tooltip-text:after{border-top-color:var(--sc-color-danger-500)}',ScTooltip=class{constructor(t){registerInstance(this,t),this.padding=5,this.type="info",this.top=-1e4,this.left=-1e4}componentDidLoad(){this.handleWindowScroll()}handleWindowScroll(){if(!this.open)return;if(!this.tooltip)return;var t=this.tooltip.getBoundingClientRect(),o=this.el.getBoundingClientRect();this.top=o.top-(t.height+this.padding);const i=Math.max(o.left+o.width/2-t.width/2+this.padding,0);this.left=Math.min(i,window.innerWidth-t.width)}handleOpenChange(){setTimeout((()=>this.handleWindowScroll()),0)}handleBlur(){this.freeze||(this.open=!1)}handleClick(){this.freeze||(this.open=!0)}handleFocus(){this.freeze||(this.open=!0)}handleMouseOver(){this.freeze||(this.open=!0)}handleMouseOut(){this.freeze||(this.open=!1)}render(){return this.text?h("span",{part:"base",class:{tooltip:!0,"tooltip--primary":"primary"===this.type,"tooltip--success":"success"===this.type,"tooltip--info":"info"===this.type,"tooltip--warning":"warning"===this.type,"tooltip--danger":"danger"===this.type,"tooltip--has-width":!!this.width},onClick:()=>this.handleClick(),onBlur:()=>this.handleBlur(),onFocus:()=>this.handleFocus(),onMouseOver:()=>this.handleMouseOver(),onMouseOut:()=>this.handleMouseOut()},h("slot",null),!!this.open&&h("div",{part:"text",ref:t=>this.tooltip=t,class:"tooltip-text",style:{top:`${this.top}px`,left:`${this.left}px`,...this.width?{"--sc-tooltip-width":this.width}:{}}},this.text)):h("slot",null)}get el(){return getElement(this)}static get watchers(){return{open:["handleOpenChange"]}}};ScTooltip.style=scTooltipCss;export{ScTooltip as sc_tooltip};