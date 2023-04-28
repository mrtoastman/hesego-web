import{r as registerInstance,c as createEvent,h,H as Host,g as getElement}from"./index-fd4790f6.js";import{F as FormSubmitController}from"./form-data-2d60f23e.js";import{i as isRtl}from"./page-align-8602c4c7.js";const scChoiceCss=":host{display:flex;flex-direction:column;align-items:stretch;justify-content:stretch;min-width:0;align-self:stretch}[hidden]{border:0 !important;clip:rect(0 0 0 0) !important;height:1px !important;margin:-1px !important;overflow:hidden !important;padding:0 !important;position:absolute !important;width:1px !important}.choice{background:var(--sc-choice-background-color);font-family:var(--sc-input-font-family);font-size:var(--sc-input-font-size-medium);font-weight:var(--sc-input-font-weight);user-select:none;border:var(--sc-choice-border);border-radius:var(--sc-input-border-radius-large);box-shadow:var(--sc-choice-box-shadow);cursor:pointer;padding:1.3em 1.1em;position:relative;text-decoration:none;color:var(--sc-input-color);height:100%;transition:background-color 150ms ease, border-color 150ms ease, color 150ms ease, box-shadow 150ms ease}.choice--is-rtl{text-align:right}.choice__content{cursor:pointer;display:flex;gap:0.75em}.choice--checked{border-color:var(--sc-color-primary-500);box-shadow:0 0 0 1px var(--sc-color-primary-500);z-index:1}.choice__title{display:inline-block;font-weight:var(--sc-input-label-font-weight);font-size:var(--sc-input-label-font-size-medium)}.choice--size-small{padding:0.75em 0.9em}.choice--size-large{padding:1.3em 1.1em}.choice__icon{display:inline-flex;width:var(--sc-radio-size);height:var(--sc-radio-size)}.choice__icon svg{width:100%;height:100%}.choice__control{flex:0 0 auto;position:relative;display:inline-flex;align-items:center;justify-content:center;border:solid var(--sc-input-border-width) var(--sc-input-border-color);background-color:var(--sc-input-background-color);color:transparent;transition:var(--sc-input-transition, var(--sc-transition-medium)) border-color, var(--sc-input-transition, var(--sc-transition-medium)) background-color, var(--sc-input-transition, var(--sc-transition-medium)) color, var(--sc-input-transition, var(--sc-transition-medium)) box-shadow}.choice__control.choice__radio{width:var(--sc-radio-size);height:var(--sc-radio-size);border-radius:50%}.choice__control.choice__checkbox{width:var(--sc-toggle-size);height:var(--sc-toggle-size);border-radius:4px}.choice__control input[type=radio],.choice__control input[type=checkbox]{position:absolute;opacity:0;padding:0;margin:0;pointer-events:none}.choice:not(.choice--checked):not(.choice--disabled) .choice__control:hover{border-color:var(--sc-input-border-color-hover);background-color:var(--sc-input-background-color-hover)}.choice.choice--focused:not(.choice--checked):not(.choice--disabled) .choice__control{border-color:var(--var-sc-checked-focus-border-color, var(--sc-input-background-color));background-color:var(--sc-input-background-color-focus);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-color-primary-500)}.choice.choice--focused:not(.choice--checked):not(.choice--disabled){outline-style:solid;outline-color:var(--sc-color-primary-500);outline-width:var(--sc-focus-ring-width);outline-offset:2px}.choice--checked .choice__control{color:var(--var-sc-checked-color, var(--sc-input-background-color));border-color:var(--sc-color-primary-500);background-color:var(--sc-color-primary-500)}.choice.choice--checked:not(.choice--disabled) .choice__control:hover{border-color:var(--var-sc-checked-hover-radio-border-color, var(--sc-input-background-color));background-color:var(--sc-color-primary-500)}.choice.choice--checked:not(.choice--disabled).choice--focused .choice__control{border-color:var(--var-sc-checked-focus-radio-border-color, var(--sc-input-background-color));background-color:var(--sc-color-primary-500);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary)}.choice--disabled{opacity:0.5;cursor:not-allowed}.choice:not(.choice--checked) svg circle{opacity:0}.choice__label{width:100%;line-height:1;user-select:none}.choice--layout-columns .choice__label{display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5em}.choice--layout-columns .choice__price{text-align:right;margin:0;display:flex;gap:var(--sc-spacing-xx-small)}.choice__description{display:inline-block;color:var(--sc-color-gray-500);font-size:var(--sc-font-size-medium)}.choice__label-text{display:block;display:flex;flex-direction:column;gap:0.2em;flex:1}.choice__price{display:block}";let id=0;const ScChoice=class{constructor(e){registerInstance(this,e),this.scBlur=createEvent(this,"scBlur",7),this.scChange=createEvent(this,"scChange",7),this.scFocus=createEvent(this,"scFocus",7),this.inputId="choice-"+ ++id,this.labelId=`choice-label-${id}`,this.hasFocus=!1,this.isStacked=!1,this.size="medium",this.type="radio",this.disabled=!1,this.checked=!1,this.required=!1,this.invalid=!1,this.showLabel=!0,this.showPrice=!0,this.showControl=!0}async triggerClick(){this.input.click()}async triggerFocus(){this.input.focus()}async reportValidity(){return this.invalid=!this.input.checkValidity(),this.required&&(this.getAllChoices().some((e=>e.checked))?(this.input.setCustomValidity(""),this.invalid=!this.input.checkValidity()):(this.input.setCustomValidity("radio"===this.type?wp.i18n.__("Please choose one.","surecart"):wp.i18n.__("Please choose at least one.","surecart")),this.invalid=!this.input.checkValidity())),this.input.reportValidity()}handleCheckedChange(){this.input.setCustomValidity(""),"radio"===this.type&&this.checked&&this.getSiblingChoices().map((e=>e.checked=!1)),this.input.checked=this.checked}handleBlur(){this.hasFocus=!1,this.scBlur.emit()}handleFocus(){this.hasFocus=!0,this.scFocus.emit()}async setCustomValidity(e){this.input.setCustomValidity(e),this.invalid=!this.input.checkValidity()}getAllChoices(){const e=this.el.closest("sc-choices")||this.el.parentElement;return e?[...e.querySelectorAll("sc-choice")]:[]}getSiblingChoices(){return this.getAllChoices().filter((e=>e!==this.el))}handleKeyDown(e){if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)){const i=this.getAllChoices().filter((e=>!e.disabled)),o=["ArrowUp","ArrowLeft"].includes(e.key)?-1:1;let c=i.indexOf(this.el)+o;c<0&&(c=i.length-1),c>i.length-1&&(c=0),i[c].triggerFocus(),i[c].checked=!0,e.preventDefault()}}handleMouseDown(e){e.preventDefault(),this.input.focus()}componentDidLoad(){this.handleResize(),this.formController=new FormSubmitController(this.el,{value:e=>e.checked?e.value:void 0}).addFormData()}disconnectedCallback(){var e;null===(e=this.formController)||void 0===e||e.removeFormData()}handleResize(){(null===window||void 0===window?void 0:window.ResizeObserver)&&new window.ResizeObserver((e=>{for(let i of e)if(i.contentBoxSize){const e=Array.isArray(i.contentBoxSize)?i.contentBoxSize[0]:i.contentBoxSize;setTimeout((()=>this.isStacked=(null==e?void 0:e.inlineSize)<350),0)}})).observe(this.el)}handleSlotChange(){this.hasPrice=!!this.el.querySelector('[slot="price"]'),this.hasPer=!!this.el.querySelector('[slot="per"]'),this.hasDescription=!!this.el.querySelector('[slot="description"]'),this.hasDefaultSlot=!!this.el.querySelector('[slot="default"]')}handleClickEvent(){"checkbox"===this.type?(this.checked=!this.checked,this.scChange.emit(this.input.checked)):this.checked||(this.checked=!0,this.scChange.emit(this.input.checked))}render(){return h(Host,{tabindex:"0",onFocus:()=>this.input.focus()},h("div",{part:"base",class:{choice:!0,"choice--checked":this.checked,"choice--disabled":this.disabled,"choice--focused":this.hasFocus,"choice--layout-columns":!this.isStacked,"choice--is-rtl":isRtl(),[`choice--size-${this.size}`]:!0},onKeyDown:e=>this.handleKeyDown(e),onMouseDown:e=>this.handleMouseDown(e)},h("slot",{name:"header"}),h("label",{class:"choice__content",part:"content",htmlFor:this.inputId},h("span",{part:"control",class:{choice__control:!0,choice__checkbox:"checkbox"===this.type,choice__radio:"radio"===this.type},hidden:!this.showControl},h("span",{part:"checked-icon",class:"choice__icon"},"checkbox"===this.type?h("svg",{viewBox:"0 0 16 16"},h("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd","stroke-linecap":"round"},h("g",{stroke:"currentColor","stroke-width":"2"},h("g",{transform:"translate(3.428571, 3.428571)"},h("path",{d:"M0,5.71428571 L3.42857143,9.14285714"}),h("path",{d:"M9.14285714,0 L3.42857143,9.14285714"}))))):h("svg",{viewBox:"0 0 16 16"},h("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},h("g",{fill:"currentColor"},h("circle",{cx:"8",cy:"8",r:"3.42857143"}))))),h("input",{id:this.inputId,ref:e=>this.input=e,type:this.type,name:this.name,value:this.value,checked:this.checked,disabled:this.disabled,"aria-checked":this.checked?"true":"false","aria-disabled":this.disabled?"true":"false","aria-labelledby":this.labelId,tabindex:"0",onBlur:()=>this.handleBlur(),onFocus:()=>this.handleFocus(),onChange:()=>this.handleClickEvent()})),h("span",{part:"label",id:this.labelId,class:"choice__label"},h("span",{class:"choice__label-text",hidden:!this.showLabel},h("span",{class:"choice__title",part:"title"},h("slot",{onSlotchange:()=>this.handleSlotChange()})),h("span",{class:"choice__description description",part:"description",hidden:!this.hasDescription},h("slot",{name:"description",onSlotchange:()=>this.handleSlotChange()}))),h("span",{class:"choice__price",hidden:!this.showPrice||!this.hasPrice&&!this.hasPer},h("span",{class:"choice__title"},h("slot",{name:"price",onSlotchange:()=>this.handleSlotChange()}))," ",h("span",{class:"choice__description"},h("slot",{name:"per",onSlotchange:()=>this.handleSlotChange()}))))),h("slot",{name:"footer"})))}get el(){return getElement(this)}static get watchers(){return{checked:["handleCheckedChange"]}}};ScChoice.style=scChoiceCss;export{ScChoice as sc_choice};