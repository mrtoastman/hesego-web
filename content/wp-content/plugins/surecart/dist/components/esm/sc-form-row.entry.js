import{r as registerInstance,h,g as getElement}from"./index-fd4790f6.js";const scFormRowCss=".form-row{display:flex;align-items:flex-start;justify-content:space-between;gap:calc(var(--sc-form-row-spacing, 0.75em) * 2.5)}::slotted(*){flex:1;width:0}",ScFormRow=class{constructor(t){registerInstance(this,t)}componentDidLoad(){"ResizeObserver"in window&&(this.observer=new window.ResizeObserver((t=>{this.width=null==t?void 0:t[0].contentRect.width})),this.observer.observe(this.el))}render(){return h("div",{part:"base",class:{"form-row":!0,"breakpoint-sm":this.width<384,"breakpoint-md":this.width>=384&&this.width<576,"breakpoint-lg":this.width>=576&&this.width<768,"breakpoint-xl":this.width>=768}},h("slot",null))}get el(){return getElement(this)}};ScFormRow.style=scFormRowCss;export{ScFormRow as sc_form_row};