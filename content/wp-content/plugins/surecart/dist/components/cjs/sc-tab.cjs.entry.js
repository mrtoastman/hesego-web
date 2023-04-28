"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const index=require("./index-9c866aeb.js"),pageAlign=require("./page-align-bf197eb4.js"),scTabCss=":host{display:block}.tab{font-family:var(--sc-font-sans);color:var(--sc-color-gray-600);display:flex;align-items:center;justify-content:flex-start;line-height:1;padding:var(--sc-spacing-small) var(--sc-spacing-small);font-size:var(--sc-font-size-medium);font-weight:var(--sc-font-weight-semibold);border-radius:var(--sc-border-radius-small);cursor:pointer;transition:color 0.35s ease, background-color 0.35s ease;user-select:none;text-decoration:none}.tab.tab--active,.tab:hover{color:var(--sc-tab-active-color, var(--sc-color-gray-900));background-color:var(--sc-tab-active-background, var(--sc-color-gray-100))}.tab.tab--disabled{cursor:not-allowed;color:var(--sc-color-gray-400)}.tab__content{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:var(--sc-line-height-dense)}.tab__prefix,.tab__suffix{flex:0 0 auto;display:flex;align-items:center}.tab__suffix{margin-left:auto}.tab__counter{background:var(--sc-color-gray-200);display:inline-block;padding:var(--sc-spacing-xx-small) var(--sc-spacing-small);border-radius:var(--sc-border-radius-pill);font-size:var(--sc-font-size-small);text-align:center;line-height:1;transition:color 0.35s ease, background-color 0.35s ease}.tab.tab--active .tab__counter,.tab:hover .tab__counter{background:var(--sc-color-white)}.tab--has-prefix{padding-left:var(--sc-spacing-small)}.tab--has-prefix .tab__content{padding-left:var(--sc-spacing-small)}.tab--has-suffix{padding-right:var(--sc-spacing-small)}.tab--has-suffix .tab__label{padding-right:var(--sc-spacing-small)}.tab--is-rtl.tab--has-prefix .tab__content{padding-left:0;padding-right:var(--sc-spacing-small)}";let id=0;const ScTab=class{constructor(a){index.registerInstance(this,a),this.scClose=index.createEvent(this,"scClose",7),this.componentId="tab-"+ ++id,this.panel="",this.active=!1,this.disabled=!1,this.hasPrefix=!1,this.hasSuffix=!1}async triggerFocus(a){this.tab.focus(a)}async triggerBlur(){this.tab.blur()}handleSlotChange(){this.hasPrefix=!!this.el.querySelector('[slot="prefix"]'),this.hasSuffix=!!this.el.querySelector('[slot="suffix"]')}render(){this.el.id=this.el.id||this.componentId;const a=this.href?"a":"div";return index.h(a,{part:"base "+(this.active?"active":""),href:this.href,class:{tab:!0,"tab--active":this.active,"tab--disabled":this.disabled,"tab--has-prefix":this.hasPrefix,"tab--has-suffix":this.hasSuffix,"tab--is-rtl":pageAlign.isRtl()},ref:a=>this.tab=a,role:"tab","aria-disabled":this.disabled?"true":"false","aria-selected":this.active?"true":"false",tabindex:this.disabled||!this.active?"-1":"0"},index.h("span",{part:"prefix",class:"tab__prefix"},index.h("slot",{onSlotchange:()=>this.handleSlotChange(),name:"prefix"})),index.h("div",{class:"tab__content",part:"content"},index.h("slot",null)),index.h("span",{part:"suffix",class:"tab__suffix"},index.h("slot",{onSlotchange:()=>this.handleSlotChange(),name:"suffix"})),index.h("slot",{name:"suffix"},!!this.count&&index.h("div",{class:"tab__counter",part:"counter"},this.count)))}get el(){return index.getElement(this)}};ScTab.style=scTabCss,exports.sc_tab=ScTab;