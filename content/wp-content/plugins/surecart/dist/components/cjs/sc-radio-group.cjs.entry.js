"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const index=require("./index-9c866aeb.js"),pageAlign=require("./page-align-bf197eb4.js"),scRadioGroupCss=':host{display:block}.radio-group{border:none;padding:0;margin:0;min-width:0}.radio-group .radio-group__label{display:inline-block;padding:0;color:var(--sc-input-label-color);font-weight:var(--sc-input-label-font-weight);text-transform:var(--sc-input-label-text-transform, none);letter-spacing:var(--sc-input-label-letter-spacing, 0);margin-bottom:var(--sc-input-label-margin)}.radio-group__hidden-input{position:absolute;opacity:0;padding:0px;margin:0px;pointer-events:none}.radio-group--is-required .radio-group__label:after{content:" *";color:var(--sc-color-danger-500)}::slotted(sc-radio:not(:last-of-type)){display:block;margin-bottom:var(--sc-spacing-x-small) !important}.radio-group--is-rtl.radio-group,.radio-group--is-rtl.radio-group .radio-group__label{text-align:right}',ScRadioGroup=class{constructor(i){index.registerInstance(this,i),this.label="",this.value=""}async reportValidity(){return this.invalid=!this.input.checkValidity(),this.input.reportValidity()}handleRadioClick(i){const r=i.target;console.log(r),r.disabled||(this.value=r.value)}render(){return index.h("fieldset",{part:"base",class:{"radio-group":!0,"radio-group--invalid":this.invalid,"radio-group--is-required":this.required,"radio-group--is-rtl":pageAlign.isRtl()},"aria-invalid":this.invalid,role:"radiogroup"},index.h("legend",{part:"label",class:"radio-group__label"},index.h("slot",{name:"label"},this.label)),index.h("input",{type:"text",class:"radio-group__hidden-input",ref:i=>this.input=i,required:this.required,value:this.value,tabindex:"-1"}),index.h("slot",null))}};ScRadioGroup.style=scRadioGroupCss,exports.sc_radio_group=ScRadioGroup;