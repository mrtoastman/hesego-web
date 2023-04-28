import{r as t,c as e,h as s,F as i,g as a}from"./p-dfbe004d.js";import{a as r}from"./p-d8453138.js";import{g as o}from"./p-468023a1.js";import{a as n}from"./p-1c2e2695.js";import{F as l}from"./p-f1a6f9ec.js";const c=class{constructor(s){t(this,s),this.scCancel=e(this,"scCancel",7),this.scPreserved=e(this,"scPreserved",7)}replaceAmount(e){var t,s;return(null===(t=this.protocol)||void 0===t?void 0:t.preservation_coupon)?((e,t,s="amount")=>e.replaceAll("{{"+s+"}}",t).replaceAll("{{ "+s+" }}",t))(e,o(null===(s=this.protocol)||void 0===s?void 0:s.preservation_coupon)):e}async addDiscount(){var e,t;try{this.loading=!0,this.subscription=await r({method:"PATCH",path:n(`surecart/v1/subscriptions/${null===(e=this.subscription)||void 0===e?void 0:e.id}/preserve`,{cancellation_act:{...this.comment?{comment:this.comment}:{},cancellation_reason_id:null===(t=this.reason)||void 0===t?void 0:t.id}})}),this.scPreserved.emit()}catch(e){console.error(e),this.error=e}finally{this.loading=!1}}render(){var e;const{preserve_title:t,preserve_description:i,preserve_button:a,cancel_link:r}=(null===(e=this.protocol)||void 0===e?void 0:e.preservation_locales)||{};return s("div",{class:"cancel-discount"},s("sc-dashboard-module",{heading:this.replaceAmount(t),style:{"--sc-dashboard-module-spacing":"2em"}},s("span",{slot:"description"},this.replaceAmount(i)),s("sc-flex",{justifyContent:"flex-start"},s("sc-button",{type:"primary",onClick:()=>this.addDiscount()},a),s("sc-button",{class:"cancel-discount__abort-link",type:"text",onClick:()=>this.scCancel.emit()},r)),!!this.loading&&s("sc-block-ui",{spinner:!0})))}};c.style=".cancel-discount__abort-link{color:var(--sc-color-gray-500)}";const h=class{constructor(s){t(this,s),this.scAbandon=e(this,"scAbandon",7),this.scSubmitReason=e(this,"scSubmitReason",7)}componentWillLoad(){this.reasons||this.fetchReasons()}handleSelectedReasonChange(){var e;(null===(e=this.selectedReason)||void 0===e?void 0:e.comment_enabled)&&setTimeout((()=>{this.textArea.triggerFocus()}),50)}async fetchReasons(){try{this.loading=!0,this.reasons=await r({path:"surecart/v1/cancellation_reasons"})}catch(e){console.error(e),this.error=e}finally{this.loading=!1}}async handleSubmit(e){e.preventDefault(),e.stopImmediatePropagation();try{this.scSubmitReason.emit({reason:this.selectedReason,comment:this.comment})}catch(e){console.error(e),this.error=e}}renderReasons(){return this.loading?s("sc-choice",null,s("sc-skeleton",null)):(this.reasons||[]).map((e=>s("sc-choice",{value:null==e?void 0:e.id,name:"reason",onScChange:t=>{t.target.checked&&(this.selectedReason=e)}},null==e?void 0:e.label)))}render(){var e,t,i;const{reasons_title:a,reasons_description:r,skip_link:o}=(null===(e=this.protocol)||void 0===e?void 0:e.preservation_locales)||{};return this.loading?s("sc-skeleton",null):s("div",{class:"cancel-survey"},s("sc-dashboard-module",{heading:a,style:{"--sc-dashboard-module-spacing":"2em"}},s("span",{slot:"description"},r),s("sc-form",{onScSubmit:e=>this.handleSubmit(e),style:{"--sc-form-row-spacing":"2em"}},s("sc-choices",{showLabel:!1,label:wp.i18n.__("Choose a reason","surecart"),style:{"--columns":"2"},required:!0},this.renderReasons()),(null===(t=this.selectedReason)||void 0===t?void 0:t.comment_enabled)&&s("sc-textarea",{label:(null===(i=this.selectedReason)||void 0===i?void 0:i.comment_prompt)||wp.i18n.__("Additional Comments","surecart"),required:!0,ref:e=>this.textArea=e,onScInput:e=>this.comment=e.target.value}),s("sc-flex",{justifyContent:"flex-start"},s("sc-button",{type:"primary",submit:!0},wp.i18n.__("Continue","surecart"),s("sc-icon",{name:"arrow-right",slot:"suffix"})),!!o&&s("sc-button",{class:"cancel-survey__abort-link",type:"text",onClick:()=>this.scAbandon.emit()},o)))))}static get watchers(){return{selectedReason:["handleSelectedReasonChange"]}}};h.style=".cancel-survey{color:var(--sc-color-gray-900)}.cancel-survey__abort-link{color:var(--sc-color-gray-500)}";const d=class{constructor(s){t(this,s),this.scAbandon=e(this,"scAbandon",7),this.scCancelled=e(this,"scCancelled",7)}async cancelSubscription(){var e,t;try{this.error="",this.busy=!0,await r({path:n(`/surecart/v1/subscriptions/${null===(e=this.subscription)||void 0===e?void 0:e.id}/cancel`,{cancellation_act:{...this.comment?{comment:this.comment}:{},cancellation_reason_id:null===(t=this.reason)||void 0===t?void 0:t.id}}),method:"PATCH"}),this.scCancelled.emit()}catch(e){this.error=(null==e?void 0:e.message)||wp.i18n.__("Something went wrong","surecart"),this.busy=!1}}renderContent(){var e,t;return this.loading?this.renderLoading():s(i,null,"pending"===(null===(e=null==this?void 0:this.protocol)||void 0===e?void 0:e.cancel_behavior)?s("div",{slot:"description"},wp.i18n.__("Your plan will be canceled, but is still available until the end of your billing period on","surecart")," ",s("strong",null,s("sc-format-date",{type:"timestamp",date:null===(t=null==this?void 0:this.subscription)||void 0===t?void 0:t.current_period_end_at,month:"long",day:"numeric",year:"numeric"})),". ",wp.i18n.__("If you change your mind, you can renew your subscription.","surecart")):s("div",{slot:"description"},wp.i18n.__("Your plan will be canceled immediately. You cannot change your mind.","surecart")))}renderLoading(){return s("div",{style:{padding:"0.5em"}},s("sc-skeleton",{style:{width:"30%",marginBottom:"0.75em"}}),s("sc-skeleton",{style:{width:"20%",marginBottom:"0.75em"}}),s("sc-skeleton",{style:{width:"40%"}}))}render(){return s("sc-dashboard-module",{heading:this.heading||wp.i18n.__("Cancel your plan","surecart"),class:"subscription-cancel",error:this.error,style:{"--sc-dashboard-module-spacing":"1em"}},this.renderContent(),s("sc-flex",{justifyContent:"flex-start"},s("sc-button",{type:"primary",loading:this.loading||this.busy,disabled:this.loading||this.busy,onClick:()=>this.cancelSubscription()},wp.i18n.__("Cancel Plan","surecart")),s("sc-button",{style:{color:"var(--sc-color-gray-500"},type:"text",onClick:()=>this.scAbandon.emit(),loading:this.loading||this.busy,disabled:this.loading||this.busy},wp.i18n.__("Keep My Plan","surecart"))),this.busy&&s("sc-block-ui",null))}};d.style=":host{display:block;position:relative}.subscription-cancel{display:grid;gap:0.5em}.subscription-cancel__terms{color:var(--sc-color-gray-600);font-size:var(--sc-font-size-small)}";let u=0;const p=class{constructor(s){t(this,s),this.scChange=e(this,"scChange",7),this.scInput=e(this,"scInput",7),this.scBlur=e(this,"scBlur",7),this.scFocus=e(this,"scFocus",7),this.inputId="textarea-"+ ++u,this.helpId=`textarea-help-text-${u}`,this.labelId=`textarea-label-${u}`,this.hasFocus=!1,this.showCharLimit=!1,this.size="medium",this.value="",this.filled=!1,this.label="",this.showLabel=!0,this.help="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}handleRowsChange(){this.setTextareaHeight()}handleValueChange(){this.invalid=!this.input.checkValidity(),this.showCharLimit=this.maxlength-this.value.length<=20}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}async triggerFocus(e){return this.input.focus(e)}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(e){return e?("number"==typeof e.top&&(this.input.scrollTop=e.top),void("number"==typeof e.left&&(this.input.scrollLeft=e.left))):{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(e,t,s="none"){this.input.setSelectionRange(e,t,s)}setRangeText(e,t,s,i="preserve"){this.input.setRangeText(e,t,s,i),this.value!==this.input.value&&(this.value=this.input.value,this.scInput.emit()),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight(),this.scInput.emit(),this.scChange.emit())}async reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.invalid=!this.input.checkValidity()}handleBlur(){this.hasFocus=!1,this.scBlur.emit()}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.scChange.emit()}handleFocus(){this.hasFocus=!0,this.scFocus.emit()}handleInput(){this.value=this.input.value,this.setTextareaHeight(),this.scInput.emit()}componentWillLoad(){(null===window||void 0===window?void 0:window.ResizeObserver)&&(this.resizeObserver=new window.ResizeObserver((()=>this.setTextareaHeight())))}componentDidLoad(){this.formController=new l(this.el).addFormData(),(null===window||void 0===window?void 0:window.ResizeObserver)&&this.resizeObserver.observe(this.input)}disconnectedCallback(){var e;null===(e=this.formController)||void 0===e||e.removeFormData(),this.resizeObserver.unobserve(this.input)}setTextareaHeight(){"auto"===this.resize?(this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height=void 0}render(){return s("div",{part:"form-control",class:{"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size}},s("sc-form-control",{exportparts:"label, help-text, form-control",size:this.size,required:this.required,label:this.label,showLabel:this.showLabel,help:this.help,inputId:this.inputId,helpId:this.helpId,labelId:this.labelId,name:this.name},s("div",{part:"form-control-input",class:"form-control-input"},s("div",{part:"base",class:{textarea:!0,"textarea--small":"small"===this.size,"textarea--medium":"medium"===this.size,"textarea--large":"large"===this.size,"textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--invalid":this.invalid,"textarea--resize-none":"none"===this.resize,"textarea--resize-vertical":"vertical"===this.resize,"textarea--resize-auto":"auto"===this.resize}},s("textarea",{part:"textarea",ref:e=>this.input=e,id:"input",class:"textarea__control",name:this.name,value:this.value,disabled:this.disabled,readonly:this.readonly,required:this.required,placeholder:this.placeholder,rows:this.rows,minlength:this.minlength,maxlength:this.maxlength,autocapitalize:this.autocapitalize,autocorrect:this.autocorrect,autofocus:this.autofocus,spellcheck:this.spellcheck,enterkeyhint:this.enterkeyhint,inputmode:this.inputmode,"aria-describedby":"help-text",onChange:()=>this.handleChange(),onInput:()=>this.handleInput(),onFocus:()=>this.handleFocus(),onBlur:()=>this.handleBlur()})),this.showCharLimit&&s("div",{slot:"help",class:"textarea__char-limit-warning"},wp.i18n.sprintf(wp.i18n.__("%d characters remaining","surecart"),this.maxlength-this.input.value.length)))))}get el(){return a(this)}static get watchers(){return{rows:["handleRowsChange"],value:["handleValueChange"],disabled:["handleDisabledChange"]}}};p.style=":host{display:block}.textarea{display:flex;align-items:center;position:relative;width:100%;font-family:var(--sc-input-font-family);font-weight:var(--sc-input-font-weight);line-height:var(--sc-line-height-normal);letter-spacing:var(--sc-input-letter-spacing);vertical-align:middle;transition:var(--sc-input-transition, var(--sc-transition-medium)) color, var(--sc-input-transition, var(--sc-transition-medium)) border, var(--sc-input-transition, var(--sc-transition-medium)) box-shadow,\n    var(--sc-input-transition, var(--sc-transition-medium)) background-color;cursor:text}.textarea--standard{background-color:var(--sc-input-background-color);border:solid var(--sc-input-border-width) var(--sc-input-border-color)}.textarea--standard:hover:not(.textarea--disabled){background-color:var(--sc-input-background-color-hover);border-color:var(--sc-input-border-color-hover)}.textarea--standard:hover:not(.textarea--disabled) .textarea__control{color:var(--sc-input-color-hover)}.textarea--standard.textarea--focused:not(.textarea--disabled){background-color:var(--sc-input-background-color-focus);border-color:var(--sc-input-border-color-focus);color:var(--sc-input-color-focus);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-input-focus-ring-color)}.textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control{color:var(--sc-input-color-focus)}.textarea--standard.textarea--disabled{background-color:var(--sc-input-background-color-disabled);border-color:var(--sc-input-border-color-disabled);opacity:0.5;cursor:not-allowed}.textarea--standard.textarea--disabled .textarea__control{color:var(--sc-input-color-disabled)}.textarea--standard.textarea--disabled .textarea__control::placeholder{color:var(--sc-input-placeholder-color-disabled)}.textarea--filled{border:none;background-color:var(--sc-input-filled-background-color);color:var(--sc-input-color)}.textarea--filled:hover:not(.textarea--disabled){background-color:var(--sc-input-filled-background-color-hover)}.textarea--filled.textarea--focused:not(.textarea--disabled){background-color:var(--sc-input-filled-background-color-focus);outline:var(--sc-focus-ring);outline-offset:var(--sc-focus-ring-offset)}.textarea--filled.textarea--disabled{background-color:var(--sc-input-filled-background-color-disabled);opacity:0.5;cursor:not-allowed}.textarea__control{flex:1 1 auto;font-family:inherit;font-size:inherit;font-weight:inherit;line-height:1.4;color:var(--sc-input-color);border:none;background:none;box-shadow:none;cursor:inherit;-webkit-appearance:none}.textarea__control::-webkit-search-decoration,.textarea__control::-webkit-search-cancel-button,.textarea__control::-webkit-search-results-button,.textarea__control::-webkit-search-results-decoration{-webkit-appearance:none}.textarea__control::placeholder{color:var(--sc-input-placeholder-color);user-select:none}.textarea__control:focus{outline:none}.textarea--small{border-radius:var(--sc-input-border-radius-small);font-size:var(--sc-input-font-size-small)}.textarea--small .textarea__control{padding:0.5em var(--sc-input-spacing-small)}.textarea--medium{border-radius:var(--sc-input-border-radius-medium);font-size:var(--sc-input-font-size-medium)}.textarea--medium .textarea__control{padding:0.5em var(--sc-input-spacing-medium)}.textarea--large{border-radius:var(--sc-input-border-radius-large);font-size:var(--sc-input-font-size-large)}.textarea--large .textarea__control{padding:0.5em var(--sc-input-spacing-large)}.textarea--resize-none .textarea__control{resize:none}.textarea--resize-vertical .textarea__control{resize:vertical}.textarea--resize-auto .textarea__control{height:auto;resize:none}.textarea__char-limit-warning{margin-top:var(--sc-input-spacing-small);color:var(--sc-input-help-text-color);font-size:var(--sc-input-help-text-font-size-medium)}";export{c as sc_cancel_discount,h as sc_cancel_survey,d as sc_subscription_cancel,p as sc_textarea};