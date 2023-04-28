import{Component,Element,Event,h,Method,Prop,State,Watch}from"@stencil/core";import{countryChoices,hasState}from"../../../functions/address";import{__}from"@wordpress/i18n";import{reportChildrenValidity}from"../../../functions/form-data";export class ScCompactAddress{constructor(){this.address={country:null,city:null,line_1:null,line_2:null,postal_code:null,state:null},this.names={country:"shipping_country",city:"shipping_city",line_1:"shipping_line_1",line_2:"shipping_line_2",postal_code:"shipping_postal_code",state:"shipping_state"},this.placeholders={country:"",postal_code:"",state:""},this.label=__("Country or region","surecart"),this.countryChoices=countryChoices}handleAddressChange(){this.address.country&&(this.setRegions(),this.showState=["US","CA"].includes(this.address.country),this.showPostal=["US"].includes(this.address.country),this.scChangeAddress.emit(this.address),this.scInputAddress.emit(this.address))}updateAddress(e){this.address={...this.address,...e}}handleAddressInput(e){this.scInputAddress.emit({...this.address,...e})}clearAddress(){this.address={country:null,line_1:null,line_2:null,city:null,postal_code:null,state:null}}setRegions(){hasState(this.address.country)?import("../address/countries.json").then((e=>{this.regions=null==e?void 0:e[this.address.country]})):this.regions=[]}componentWillLoad(){var e;this.handleAddressChange();const t=null===(e=this.countryChoices.find((e=>e.value===this.address.country)))||void 0===e?void 0:e.value;t&&this.updateAddress({country:t})}async reportValidity(){return reportChildrenValidity(this.el)}getStatePlaceholder(){var e,t;return(null===(e=this.placeholders)||void 0===e?void 0:e.state)?this.placeholders.state:"US"===(null===(t=this.address)||void 0===t?void 0:t.country)?__("State","surecart"):__("Province/Region","surecart")}render(){var e,t,s,r,o;return h("div",{class:"sc-address",part:"base"},h("sc-form-control",{exportparts:"label, help-text, form-control",label:this.label,class:"sc-address__control",part:"control",required:this.required},h("sc-select",{exportparts:"base:select__base, input, form-control, label, help-text, trigger, panel, caret, search__base, search__input, search__form-control, menu__base, spinner__base, empty",value:null===(e=this.address)||void 0===e?void 0:e.country,onScChange:e=>{this.clearAddress(),this.updateAddress({country:e.target.value||null})},choices:this.countryChoices,autocomplete:"country-name",placeholder:(null===(t=this.placeholders)||void 0===t?void 0:t.country)||__("Select Your Country","surecart"),name:this.names.country,search:!0,unselect:!1,"squared-bottom":this.showState||this.showPostal,required:this.required}),h("div",{class:"sc-address__columns"},this.showState&&h("sc-select",{exportparts:"base:select__base, input, form-control, label, help-text, trigger, panel, caret, search__base, search__input, search__form-control, menu__base, spinner__base, empty",placeholder:this.getStatePlaceholder(),name:this.names.state,autocomplete:"address-level1",value:null===(s=null==this?void 0:this.address)||void 0===s?void 0:s.state,onScChange:e=>this.updateAddress({state:e.target.value||null}),choices:this.regions,required:this.required,search:!0,"squared-top":!0,unselect:!1,"squared-right":this.showPostal}),this.showPostal&&h("sc-input",{exportparts:"base:input__base, input, form-control, label, help-text",placeholder:(null===(r=this.placeholders)||void 0===r?void 0:r.postal_code)||__("Postal Code/Zip","surecart"),name:this.names.postal_code,onScChange:e=>this.updateAddress({postal_code:e.target.value||null}),onScInput:e=>this.handleAddressInput({name:e.target.value||null}),autocomplete:"postal-code",required:this.required,value:null===(o=null==this?void 0:this.address)||void 0===o?void 0:o.postal_code,"squared-top":!0,maxlength:5,"squared-left":this.showState}))),this.loading&&h("sc-block-ui",{exportparts:"base:block-ui, content:block-ui__content"}))}static get is(){return"sc-compact-address"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-compact-address.scss"]}}static get styleUrls(){return{$:["sc-compact-address.css"]}}static get properties(){return{address:{type:"unknown",mutable:!0,complexType:{original:"Partial<Address>",resolved:"{ name?: string; line_1?: string; line_2?: string; city?: string; state?: string; postal_code?: string; country?: string; constructor?: Function; toString?: () => string; toLocaleString?: () => string; valueOf?: () => Object; hasOwnProperty?: (v: PropertyKey) => boolean; isPrototypeOf?: (v: Object) => boolean; propertyIsEnumerable?: (v: PropertyKey) => boolean; }",references:{Partial:{location:"global"},Address:{location:"import",path:"../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:"The address."},defaultValue:"{\n    country: null,\n    city: null,\n    line_1: null,\n    line_2: null,\n    postal_code: null,\n    state: null,\n  }"},names:{type:"unknown",mutable:!1,complexType:{original:"Partial<Address>",resolved:"{ name?: string; line_1?: string; line_2?: string; city?: string; state?: string; postal_code?: string; country?: string; constructor?: Function; toString?: () => string; toLocaleString?: () => string; valueOf?: () => Object; hasOwnProperty?: (v: PropertyKey) => boolean; isPrototypeOf?: (v: Object) => boolean; propertyIsEnumerable?: (v: PropertyKey) => boolean; }",references:{Partial:{location:"global"},Address:{location:"import",path:"../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:""},defaultValue:"{\n    country: 'shipping_country',\n    city: 'shipping_city',\n    line_1: 'shipping_line_1',\n    line_2: 'shipping_line_2',\n    postal_code: 'shipping_postal_code',\n    state: 'shipping_state',\n  }"},placeholders:{type:"unknown",mutable:!1,complexType:{original:"Partial<Address>",resolved:"{ name?: string; line_1?: string; line_2?: string; city?: string; state?: string; postal_code?: string; country?: string; constructor?: Function; toString?: () => string; toLocaleString?: () => string; valueOf?: () => Object; hasOwnProperty?: (v: PropertyKey) => boolean; isPrototypeOf?: (v: Object) => boolean; propertyIsEnumerable?: (v: PropertyKey) => boolean; }",references:{Partial:{location:"global"},Address:{location:"import",path:"../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:"Placeholders"},defaultValue:"{\n    country: '',\n    postal_code: '',\n    state: '',\n  }"},label:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Label for the address"},attribute:"label",reflect:!1,defaultValue:"__('Country or region', 'surecart')"},required:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Is this required?"},attribute:"required",reflect:!1},loading:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Is this loading"},attribute:"loading",reflect:!1}}}static get states(){return{countryChoices:{},regions:{},showState:{},showPostal:{}}}static get events(){return[{method:"scChangeAddress",name:"scChangeAddress",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"Address change event."},complexType:{original:"Partial<Address>",resolved:"{ name?: string; line_1?: string; line_2?: string; city?: string; state?: string; postal_code?: string; country?: string; constructor?: Function; toString?: () => string; toLocaleString?: () => string; valueOf?: () => Object; hasOwnProperty?: (v: PropertyKey) => boolean; isPrototypeOf?: (v: Object) => boolean; propertyIsEnumerable?: (v: PropertyKey) => boolean; }",references:{Partial:{location:"global"},Address:{location:"import",path:"../../../types"}}}},{method:"scInputAddress",name:"scInputAddress",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"Address input event."},complexType:{original:"Partial<Address>",resolved:"{ name?: string; line_1?: string; line_2?: string; city?: string; state?: string; postal_code?: string; country?: string; constructor?: Function; toString?: () => string; toLocaleString?: () => string; valueOf?: () => Object; hasOwnProperty?: (v: PropertyKey) => boolean; isPrototypeOf?: (v: Object) => boolean; propertyIsEnumerable?: (v: PropertyKey) => boolean; }",references:{Partial:{location:"global"},Address:{location:"import",path:"../../../types"}}}}]}static get methods(){return{reportValidity:{complexType:{signature:"() => Promise<boolean>",parameters:[],references:{Promise:{location:"global"}},return:"Promise<boolean>"},docs:{text:"",tags:[]}}}}static get elementRef(){return"el"}static get watchers(){return[{propName:"address",methodName:"handleAddressChange"}]}}