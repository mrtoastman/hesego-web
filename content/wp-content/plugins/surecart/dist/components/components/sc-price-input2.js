import{proxyCustomElement,HTMLElement,createEvent,h}from"@stencil/core/internal/client";import{a as getCurrencySymbol}from"./price.js";import{F as FormSubmitController}from"./form-data.js";import{i as isZeroDecimal,m as maybeConvertAmount}from"./utils.js";import{d as defineCustomElement$3}from"./sc-form-control2.js";import{d as defineCustomElement$2}from"./sc-input2.js";import{d as defineCustomElement$1}from"./sc-tooltip2.js";const scPriceInputCss=":host{display:block}",ScPriceInput=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.scChange=createEvent(this,"scChange",7),this.scInput=createEvent(this,"scInput",7),this.scFocus=createEvent(this,"scFocus",7),this.scBlur=createEvent(this,"scBlur",7),this.size="medium",this.value="",this.pill=!1,this.showLabel=!0,this.help="",this.clearable=!1,this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}async reportValidity(){return this.input.shadowRoot.querySelector("input").reportValidity()}async triggerFocus(e){return this.input.triggerFocus(e)}async setCustomValidity(e){this.input.setCustomValidity(e)}async triggerBlur(){return this.input.blur()}handleFocusChange(){var e,t,s,i;this.hasFocus?null===(t=null===(e=this.input)||void 0===e?void 0:e.focus)||void 0===t||t.call(e):null===(i=null===(s=this.input)||void 0===s?void 0:s.blur)||void 0===i||i.call(s)}handleChange(){this.updateValue()}handleInput(){this.updateValue(),this.scInput.emit()}updateValue(){if(!this.input.shadowRoot.querySelector("input").checkValidity())return;const e=isZeroDecimal(this.currencyCode)?parseFloat(this.input.value):(100*parseFloat(this.input.value)).toFixed(2);this.value=this.input.value?e.toString():""}componentDidLoad(){this.handleFocusChange(),this.formController=new FormSubmitController(this.el).addFormData(),document.addEventListener("wheel",(()=>{this.input.triggerBlur()}))}disconnectedCallback(){var e;null===(e=this.formController)||void 0===e||e.removeFormData()}render(){return h("sc-input",{exportparts:"base, input, form-control, label, help-text, prefix, suffix",size:this.size,label:this.label,showLabel:this.showLabel,help:this.help,ref:e=>this.input=e,type:"number",name:this.name,disabled:this.disabled,readonly:this.readonly,required:this.required,placeholder:this.placeholder,minlength:this.minlength,maxlength:this.maxlength,min:this.min?this.min/100:0,step:.001,max:this.max?this.max/100:null,autofocus:this.autofocus,inputmode:"decimal",onScChange:()=>this.handleChange(),onScInput:()=>this.handleInput(),onScBlur:()=>this.scBlur.emit(),onScFocus:()=>this.scFocus.emit(),value:maybeConvertAmount(parseFloat(this.value),this.currencyCode).toString()},h("span",{style:{opacity:"0.5"},slot:"prefix"},getCurrencySymbol(this.currencyCode)),h("span",{slot:"suffix"},h("slot",{name:"suffix"},this.showCode&&(null==this?void 0:this.currencyCode)&&h("span",{style:{opacity:"0.5"}},this.currencyCode.toUpperCase()))))}get el(){return this}static get watchers(){return{hasFocus:["handleFocusChange"]}}static get style(){return scPriceInputCss}},[1,"sc-price-input",{size:[513],name:[1],value:[1025],pill:[516],label:[1],showLabel:[4,"show-label"],help:[1],clearable:[4],placeholder:[1],disabled:[516],readonly:[516],minlength:[2],maxlength:[2],max:[514],min:[514],required:[516],invalid:[1540],autofocus:[4],hasFocus:[1540,"has-focus"],currencyCode:[513,"currency-code"],showCode:[4,"show-code"],reportValidity:[64],triggerFocus:[64],setCustomValidity:[64],triggerBlur:[64]}]);function defineCustomElement(){"undefined"!=typeof customElements&&["sc-price-input","sc-form-control","sc-input","sc-tooltip"].forEach((e=>{switch(e){case"sc-price-input":customElements.get(e)||customElements.define(e,ScPriceInput);break;case"sc-form-control":customElements.get(e)||defineCustomElement$3();break;case"sc-input":customElements.get(e)||defineCustomElement$2();break;case"sc-tooltip":customElements.get(e)||defineCustomElement$1()}}))}defineCustomElement();export{ScPriceInput as S,defineCustomElement as d};