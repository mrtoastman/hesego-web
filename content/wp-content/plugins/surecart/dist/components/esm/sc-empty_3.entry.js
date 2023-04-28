import{r as registerInstance,h,g as getElement}from"./index-fd4790f6.js";import{i as isRtl}from"./page-align-8602c4c7.js";const scEmptyCss=":host{display:block}.empty{display:flex;flex-direction:column;align-items:center;padding:var(--sc-spacing-large);text-align:center;gap:var(--sc-spacing-x-small);color:var(--sc-empty-color, var(--sc-color-gray-500))}.empty sc-icon{font-size:var(--sc-font-size-xx-large);color:var(--sc-empty-icon-color, var(--sc-color-gray-700))}",ScEmpty=class{constructor(s){registerInstance(this,s)}render(){return h("div",{part:"base",class:"empty"},!!this.icon&&h("sc-icon",{exportparts:"base:icon",name:this.icon}),h("slot",null))}};ScEmpty.style=scEmptyCss;const scStackedListCss=":host{display:block;font-family:var(--sc-font-sans)}:slotted(*){margin:0}",ScStackedList=class{constructor(s){registerInstance(this,s)}render(){return h("slot",null)}};ScStackedList.style=scStackedListCss;const scStackedListRowCss=":host{display:block;--column-width-min:125px;position:relative}:host(:not(:last-child)){border-bottom:1px solid var(--sc-stacked-list-border-color, var(--sc-color-gray-200))}:host(:focus-within){z-index:2}.list-row{background:var(--sc-list-row-background-color, var(--sc-color-white));color:var(--sc-list-row-color, var(--sc-color-gray-800));text-decoration:none;display:grid;justify-content:var(--sc-stacked-list-row-justify-content, space-between);align-items:var(--sc-stacked-list-row-align-items, start);grid-template-columns:repeat(auto-fit, minmax(100%, 1fr));gap:var(--sc-spacing-xx-small);padding:var(--sc-spacing-medium) var(--sc-spacing-large);transition:background-color var(--sc-transition-fast) ease;min-width:0px;min-height:0px}.list-row[href]:hover{background:var(--sc-stacked-list-row-hover-color, var(--sc-color-gray-50))}.list-row__prefix,.list-row__suffix{position:absolute;top:50%;transform:translateY(-50%);z-index:1}.list-row__prefix{left:var(--sc-spacing-large)}.list-row__suffix{right:var(--sc-spacing-large)}.list-row--has-prefix{padding-left:3.5em}.list-row--has-suffix{padding-right:3.5em;gap:var(--sc-spacing-xxxx-large)}.list-row.breakpoint-lg{grid-template-columns:repeat(calc(var(--columns) - 1), 1fr) 0.5fr;gap:var(--sc-spacing-large)}.list-row.breakpoint-lg ::slotted(:last-child:not(:first-child)){display:flex;justify-content:flex-end}.list-row--is-rtl.list-row__prefix,.list-row--is-rtl.list-row__suffix{left:20px;width:20px;transform:rotate(180deg)}.list-row--is-rtl.list-row__suffix{right:auto}.list-row--is-rtl.list-row--has-suffix{gap:var(--sc-spacing-large)}",ScStackedListRow=class{constructor(s){registerInstance(this,s),this.target="_self",this.mobileSize=600,this.hasPrefix=!1,this.hasSuffix=!1}componentDidLoad(){"ResizeObserver"in window&&new window.ResizeObserver((s=>{s.forEach((s=>{this.width=s.contentRect.width}))})).observe(this.el)}handleSlotChange(){this.hasPrefix=!!Array.from(this.el.children).some((s=>"prefix"===s.slot)),this.hasSuffix=!!Array.from(this.el.children).some((s=>"suffix"===s.slot))}render(){const s=this.href?"a":"div";return h(s,{href:this.href,target:this.target,part:"base",class:{"list-row":!0,"list-row--has-prefix":this.hasPrefix,"list-row--has-suffix":this.hasSuffix,"breakpoint-lg":this.width>=this.mobileSize,"list-row--is-rtl":isRtl()}},h("span",{class:"list-row__prefix"},h("slot",{name:"prefix",onSlotchange:()=>this.handleSlotChange()})),h("slot",{onSlotchange:()=>this.handleSlotChange()}),h("span",{class:"list-row__suffix"},h("slot",{name:"suffix",onSlotchange:()=>this.handleSlotChange()})))}get el(){return getElement(this)}};ScStackedListRow.style=scStackedListRowCss;export{ScEmpty as sc_empty,ScStackedList as sc_stacked_list,ScStackedListRow as sc_stacked_list_row};