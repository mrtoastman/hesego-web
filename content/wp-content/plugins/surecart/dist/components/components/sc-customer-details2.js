import{proxyCustomElement,HTMLElement,h}from"@stencil/core/internal/client";import{c as createCommonjsModule,a as commonjsGlobal}from"./_commonjsHelpers.js";import{c as countryChoices}from"./address.js";import{z as zones}from"./tax.js";import{d as defineCustomElement$c}from"./sc-alert2.js";import{d as defineCustomElement$b}from"./sc-button2.js";import{d as defineCustomElement$a}from"./sc-card2.js";import{d as defineCustomElement$9}from"./sc-dashboard-module2.js";import{d as defineCustomElement$8}from"./sc-divider2.js";import{d as defineCustomElement$7}from"./sc-empty2.js";import{d as defineCustomElement$6}from"./sc-icon2.js";import{d as defineCustomElement$5}from"./sc-skeleton2.js";import{d as defineCustomElement$4}from"./sc-spinner2.js";import{d as defineCustomElement$3}from"./sc-stacked-list2.js";import{d as defineCustomElement$2}from"./sc-stacked-list-row2.js";import{d as defineCustomElement$1}from"./sc-tag2.js";var lib=createCommonjsModule((function(n,e){var t,s;n.exports=(t={607:function(n,e,t){var s=this&&this.__assign||function(){return s=Object.assign||function(n){for(var e,t=1,s=arguments.length;t<s;t++)for(var r in e=arguments[t])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},s.apply(this,arguments)},r=this&&this.__values||function(n){var e="function"==typeof Symbol&&Symbol.iterator,t=e&&n[e],s=0;if(t)return t.call(n);if(n&&"number"==typeof n.length)return{next:function(){return n&&s>=n.length&&(n=void 0),{value:n&&n[s++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},i=this&&this.__read||function(n,e){var t="function"==typeof Symbol&&n[Symbol.iterator];if(!t)return n;var s,r,i=t.call(n),o=[];try{for(;(void 0===e||e-- >0)&&!(s=i.next()).done;)o.push(s.value)}catch(n){r={error:n}}finally{try{s&&!s.done&&(t=i.return)&&t.call(i)}finally{if(r)throw r.error}}return o},o=this&&this.__spreadArray||function(n,e,t){if(t||2===arguments.length)for(var s,r=0,i=e.length;r<i;r++)!s&&r in e||(s||(s=Array.prototype.slice.call(e,0,r)),s[r]=e[r]);return n.concat(s||Array.prototype.slice.call(e))},l=this&&this.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(e,"__esModule",{value:!0}),e.formatAddress=void 0;var a=l(t(726)),d=function(n,e){return e in n},C={"%N":"name","%O":"organization","%A":"addressLines","%D":"dependentLocality","%C":"locality","%S":"administrativeArea","%Z":"postalCode","%X":"sortingCode"},A=function(n){return d(C,n)?C[n]:null},c=function(n,e){return!!e&&("addressLines"===e?n.addressLines&&n.addressLines.length>0:d(n,e)&&n[e])};e.formatAddress=function(n){var e,t,l,C=function(n){var e,t,s=[],i="",o=!1;try{for(var l=r(n),a=l.next();!a.done;a=l.next()){var d=a.value;o?(o=!1,s.push("%"+d)):"%"===d?(i.length>0&&(s.push(i),i=""),o=!0):i+=d}}catch(n){e={error:n}}finally{try{a&&!a.done&&(t=l.return)&&t.call(l)}finally{if(e)throw e.error}}return i.length>0&&s.push(i),s}((l=(l=(n=function(n){return s(s({},n),{addressLines:n.addressLines?n.addressLines.filter(Boolean):void 0})}(n)).postalCountry||"ZZ").toUpperCase(),d(a.default,l)?a.default[l]:a.default.ZZ)),u=function(n,e){var t,s,o=[];try{for(var l=r(n.entries()),a=l.next();!a.done;a=l.next()){var d=i(a.value,2),C=d[0],u=d[1];if("%n"!==u){var N=A(u);N?c(e,N)&&o.push(u):(C===n.length-C||"%n"===n[C+1]||c(e,A(n[C+1])))&&(0===C||"%n"===n[C-1]||o.length>0&&null!==A(o[o.length-1]))&&o.push(u)}else o.push(u)}}catch(n){t={error:n}}finally{try{a&&!a.done&&(s=l.return)&&s.call(l)}finally{if(t)throw t.error}}return o}(C,n),N=[],O="";try{for(var m=r(u),Z=m.next();!Z.done;Z=m.next()){var h=Z.value;if("%n"!==h){var f=A(h);if(f)if("addressLines"===f){var p=n.addressLines;p.length>0&&(O+=p[0],p.length>1&&(N.push(O),O="",N.push.apply(N,o([],i(p.splice(1)),!1))))}else O+=n[f];else O+=h}else O.length>0&&(N.push(O),O="")}}catch(n){e={error:n}}finally{try{Z&&!Z.done&&(t=m.return)&&t.call(m)}finally{if(e)throw e.error}}return O.length>0&&N.push(O),N}},726:n=>{n.exports=JSON.parse('{"AC":"%N%n%O%n%A%n%C%n%Z","AD":"%N%n%O%n%A%n%Z %C","AE":"%N%n%O%n%A%n%S","AF":"%N%n%O%n%A%n%C%n%Z","AI":"%N%n%O%n%A%n%C%n%Z","AL":"%N%n%O%n%A%n%Z%n%C","AM":"%N%n%O%n%A%n%Z%n%C%n%S","AR":"%N%n%O%n%A%n%Z %C%n%S","AS":"%N%n%O%n%A%n%C %S %Z","AT":"%O%n%N%n%A%n%Z %C","AU":"%O%n%N%n%A%n%C %S %Z","AX":"%O%n%N%n%A%nAX-%Z %C%nÅLAND","AZ":"%N%n%O%n%A%nAZ %Z %C","BA":"%N%n%O%n%A%n%Z %C","BB":"%N%n%O%n%A%n%C, %S %Z","BD":"%N%n%O%n%A%n%C - %Z","BE":"%O%n%N%n%A%n%Z %C","BF":"%N%n%O%n%A%n%C %X","BG":"%N%n%O%n%A%n%Z %C","BH":"%N%n%O%n%A%n%C %Z","BL":"%O%n%N%n%A%n%Z %C %X","BM":"%N%n%O%n%A%n%C %Z","BN":"%N%n%O%n%A%n%C %Z","BR":"%O%n%N%n%A%n%D%n%C-%S%n%Z","BS":"%N%n%O%n%A%n%C, %S","BT":"%N%n%O%n%A%n%C %Z","BY":"%O%n%N%n%A%n%Z, %C%n%S","CA":"%N%n%O%n%A%n%C %S %Z","CC":"%O%n%N%n%A%n%C %S %Z","CH":"%O%n%N%n%A%nCH-%Z %C","CI":"%N%n%O%n%X %A %C %X","CL":"%N%n%O%n%A%n%Z %C%n%S","CN":"%Z%n%S%C%D%n%A%n%O%n%N","CO":"%N%n%O%n%A%n%C, %S, %Z","CR":"%N%n%O%n%A%n%S, %C%n%Z","CU":"%N%n%O%n%A%n%C %S%n%Z","CV":"%N%n%O%n%A%n%Z %C%n%S","CX":"%O%n%N%n%A%n%C %S %Z","CY":"%N%n%O%n%A%n%Z %C","CZ":"%N%n%O%n%A%n%Z %C","DE":"%N%n%O%n%A%n%Z %C","DK":"%N%n%O%n%A%n%Z %C","DO":"%N%n%O%n%A%n%Z %C","DZ":"%N%n%O%n%A%n%Z %C","EC":"%N%n%O%n%A%n%Z%n%C","EE":"%N%n%O%n%A%n%Z %C","EG":"%N%n%O%n%A%n%C%n%S%n%Z","EH":"%N%n%O%n%A%n%Z %C","ES":"%N%n%O%n%A%n%Z %C %S","ET":"%N%n%O%n%A%n%Z %C","FI":"%O%n%N%n%A%nFI-%Z %C","FK":"%N%n%O%n%A%n%C%n%Z","FM":"%N%n%O%n%A%n%C %S %Z","FO":"%N%n%O%n%A%nFO%Z %C","FR":"%O%n%N%n%A%n%Z %C","GB":"%N%n%O%n%A%n%C%n%Z","GE":"%N%n%O%n%A%n%Z %C","GF":"%O%n%N%n%A%n%Z %C %X","GG":"%N%n%O%n%A%n%C%nGUERNSEY%n%Z","GI":"%N%n%O%n%A%nGIBRALTAR%n%Z","GL":"%N%n%O%n%A%n%Z %C","GN":"%N%n%O%n%Z %A %C","GP":"%O%n%N%n%A%n%Z %C %X","GR":"%N%n%O%n%A%n%Z %C","GS":"%N%n%O%n%A%n%n%C%n%Z","GT":"%N%n%O%n%A%n%Z- %C","GU":"%N%n%O%n%A%n%C %Z","GW":"%N%n%O%n%A%n%Z %C","HK":"%S%n%C%n%A%n%O%n%N","HM":"%O%n%N%n%A%n%C %S %Z","HN":"%N%n%O%n%A%n%C, %S%n%Z","HR":"%N%n%O%n%A%nHR-%Z %C","HT":"%N%n%O%n%A%nHT%Z %C","HU":"%N%n%O%n%C%n%A%n%Z","ID":"%N%n%O%n%A%n%C%n%S %Z","IE":"%N%n%O%n%A%n%D%n%C%n%S%n%Z","IL":"%N%n%O%n%A%n%C %Z","IM":"%N%n%O%n%A%n%C%n%Z","IN":"%N%n%O%n%A%n%C %Z%n%S","IO":"%N%n%O%n%A%n%C%n%Z","IQ":"%O%n%N%n%A%n%C, %S%n%Z","IR":"%O%n%N%n%S%n%C, %D%n%A%n%Z","IS":"%N%n%O%n%A%n%Z %C","IT":"%N%n%O%n%A%n%Z %C %S","JE":"%N%n%O%n%A%n%C%nJERSEY%n%Z","JM":"%N%n%O%n%A%n%C%n%S %X","JO":"%N%n%O%n%A%n%C %Z","JP":"〒%Z%n%S%n%A%n%O%n%N","KE":"%N%n%O%n%A%n%C%n%Z","KG":"%N%n%O%n%A%n%Z %C","KH":"%N%n%O%n%A%n%C %Z","KI":"%N%n%O%n%A%n%S%n%C","KN":"%N%n%O%n%A%n%C, %S","KP":"%Z%n%S%n%C%n%A%n%O%n%N","KR":"%S %C%D%n%A%n%O%n%N%n%Z","KW":"%N%n%O%n%A%n%Z %C","KY":"%N%n%O%n%A%n%S %Z","KZ":"%Z%n%S%n%C%n%A%n%O%n%N","LA":"%N%n%O%n%A%n%Z %C","LB":"%N%n%O%n%A%n%C %Z","LI":"%O%n%N%n%A%nFL-%Z %C","LK":"%N%n%O%n%A%n%C%n%Z","LR":"%N%n%O%n%A%n%Z %C","LS":"%N%n%O%n%A%n%C %Z","LT":"%O%n%N%n%A%nLT-%Z %C","LU":"%O%n%N%n%A%nL-%Z %C","LV":"%N%n%O%n%A%n%C, %Z","MA":"%N%n%O%n%A%n%Z %C","MC":"%N%n%O%n%A%nMC-%Z %C %X","MD":"%N%n%O%n%A%nMD-%Z %C","ME":"%N%n%O%n%A%n%Z %C","MF":"%O%n%N%n%A%n%Z %C %X","MG":"%N%n%O%n%A%n%Z %C","MH":"%N%n%O%n%A%n%C %S %Z","MK":"%N%n%O%n%A%n%Z %C","MM":"%N%n%O%n%A%n%C, %Z","MN":"%N%n%O%n%A%n%C%n%S %Z","MO":"%A%n%O%n%N","MP":"%N%n%O%n%A%n%C %S %Z","MQ":"%O%n%N%n%A%n%Z %C %X","MT":"%N%n%O%n%A%n%C %Z","MU":"%N%n%O%n%A%n%Z%n%C","MV":"%N%n%O%n%A%n%C %Z","MW":"%N%n%O%n%A%n%C %X","MX":"%N%n%O%n%A%n%D%n%Z %C, %S","MY":"%N%n%O%n%A%n%D%n%Z %C%n%S","MZ":"%N%n%O%n%A%n%Z %C%S","NA":"%N%n%O%n%A%n%C%n%Z","NC":"%O%n%N%n%A%n%Z %C %X","NE":"%N%n%O%n%A%n%Z %C","NF":"%O%n%N%n%A%n%C %S %Z","NG":"%N%n%O%n%A%n%D%n%C %Z%n%S","NI":"%N%n%O%n%A%n%Z%n%C, %S","NL":"%O%n%N%n%A%n%Z %C","NO":"%N%n%O%n%A%n%Z %C","NP":"%N%n%O%n%A%n%C %Z","NR":"%N%n%O%n%A%n%S","NZ":"%N%n%O%n%A%n%D%n%C %Z","OM":"%N%n%O%n%A%n%Z%n%C","PA":"%N%n%O%n%A%n%C%n%S","PE":"%N%n%O%n%A%n%C %Z%n%S","PF":"%N%n%O%n%A%n%Z %C %S","PG":"%N%n%O%n%A%n%C %Z %S","PH":"%N%n%O%n%A%n%D, %C%n%Z %S","PK":"%N%n%O%n%A%n%C-%Z","PL":"%N%n%O%n%A%n%Z %C","PM":"%O%n%N%n%A%n%Z %C %X","PN":"%N%n%O%n%A%n%C%n%Z","PR":"%N%n%O%n%A%n%C PR %Z","PT":"%N%n%O%n%A%n%Z %C","PW":"%N%n%O%n%A%n%C %S %Z","PY":"%N%n%O%n%A%n%Z %C","RE":"%O%n%N%n%A%n%Z %C %X","RO":"%N%n%O%n%A%n%Z %C","RS":"%N%n%O%n%A%n%Z %C","RU":"%N%n%O%n%A%n%C%n%S%n%Z","SA":"%N%n%O%n%A%n%C %Z","SC":"%N%n%O%n%A%n%C%n%S","SD":"%N%n%O%n%A%n%C%n%Z","SE":"%O%n%N%n%A%nSE-%Z %C","SG":"%N%n%O%n%A%nSINGAPORE %Z","SH":"%N%n%O%n%A%n%C%n%Z","SI":"%N%n%O%n%A%nSI-%Z %C","SJ":"%N%n%O%n%A%n%Z %C","SK":"%N%n%O%n%A%n%Z %C","SM":"%N%n%O%n%A%n%Z %C","SN":"%N%n%O%n%A%n%Z %C","SO":"%N%n%O%n%A%n%C, %S %Z","SR":"%N%n%O%n%A%n%C%n%S","SV":"%N%n%O%n%A%n%Z-%C%n%S","SZ":"%N%n%O%n%A%n%C%n%Z","TA":"%N%n%O%n%A%n%C%n%Z","TC":"%N%n%O%n%A%n%C%n%Z","TH":"%N%n%O%n%A%n%D %C%n%S %Z","TJ":"%N%n%O%n%A%n%Z %C","TM":"%N%n%O%n%A%n%Z %C","TN":"%N%n%O%n%A%n%Z %C","TR":"%N%n%O%n%A%n%Z %C/%S","TV":"%N%n%O%n%A%n%C%n%S","TW":"%Z%n%S%C%n%A%n%O%n%N","TZ":"%N%n%O%n%A%n%Z %C","UA":"%N%n%O%n%A%n%C%n%S%n%Z","UM":"%N%n%O%n%A%n%C %S %Z","US":"%N%n%O%n%A%n%C, %S %Z","UY":"%N%n%O%n%A%n%Z %C %S","UZ":"%N%n%O%n%A%n%Z %C%n%S","VA":"%N%n%O%n%A%n%Z %C","VC":"%N%n%O%n%A%n%C %Z","VE":"%N%n%O%n%A%n%C %Z, %S","VG":"%N%n%O%n%A%n%C%n%Z","VI":"%N%n%O%n%A%n%C %S %Z","VN":"%N%n%O%n%A%n%C%n%S %Z","WF":"%O%n%N%n%A%n%Z %C %X","XK":"%N%n%O%n%A%n%Z %C","YT":"%O%n%N%n%A%n%Z %C %X","ZA":"%N%n%O%n%A%n%D%n%C%n%Z","ZM":"%N%n%O%n%A%n%Z %C","ZZ":"%N%n%O%n%A%n%C"}')}},s={},function n(e){var r=s[e];if(void 0!==r)return r.exports;var i=s[e]={exports:{}};return t[e].call(i.exports,i,i.exports,n),i.exports}(607))}));const scCustomerDetailsCss="",ScCustomerDetails=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow()}renderContent(){var n,e,t,s,r,i,o,l;return this.loading?this.renderLoading():this.customer?h("sc-card",{"no-padding":!0},h("sc-stacked-list",null,!!(null===(n=null==this?void 0:this.customer)||void 0===n?void 0:n.name)&&h("sc-stacked-list-row",{style:{"--columns":"3"},mobileSize:480},h("div",null,h("strong",null,wp.i18n.__("Billing Name","surecart"))),h("div",null,null===(e=this.customer)||void 0===e?void 0:e.name),h("div",null)),!!(null===(t=null==this?void 0:this.customer)||void 0===t?void 0:t.email)&&h("sc-stacked-list-row",{style:{"--columns":"3"},mobileSize:480},h("div",null,h("strong",null,wp.i18n.__("Billing Email","surecart"))),h("div",null,null===(s=this.customer)||void 0===s?void 0:s.email),h("div",null)),!!Object.keys((null===(r=null==this?void 0:this.customer)||void 0===r?void 0:r.shipping_address)||{}).length&&this.renderAddress(wp.i18n.__("Shipping Address","surecart"),this.customer.shipping_address),!!Object.keys((null===(i=null==this?void 0:this.customer)||void 0===i?void 0:i.billing_address)||{}).length&&this.renderAddress(wp.i18n.__("Billing Address","surecart"),this.customer.billing_address),!!(null===(o=null==this?void 0:this.customer)||void 0===o?void 0:o.phone)&&h("sc-stacked-list-row",{style:{"--columns":"3"},mobileSize:480},h("div",null,h("strong",null,wp.i18n.__("Phone","surecart"))),h("div",null,null===(l=this.customer)||void 0===l?void 0:l.phone),h("div",null)),(()=>{var n,e,t,s;const{number_type:r,number:i}=(null===(n=this.customer)||void 0===n?void 0:n.tax_identifier)||{};if(!i||!r)return;const o=(null===(e=null==zones?void 0:zones[r])||void 0===e?void 0:e.label)||wp.i18n.__("Tax Id","surecart"),l=!1===(null===(s=null===(t=this.customer)||void 0===t?void 0:t.tax_identifier)||void 0===s?void 0:s[`valid_${r}`]);return h("sc-stacked-list-row",{style:{"--columns":"3"},mobileSize:480},h("div",null,h("strong",null,o)),h("div",null,i," ",l&&h("sc-tag",{type:"warning"},wp.i18n.__("Invalid","surecart"))),h("div",null))})())):this.renderEmpty()}renderAddress(n="Address",e){var t;const{name:s,line_1:r,line_2:i,city:o,state:l,postal_code:a,country:d}=e,C=null===(t=countryChoices.find((({value:n})=>n===d)))||void 0===t?void 0:t.label;return h("sc-stacked-list-row",{style:{"--columns":"3"},mobileSize:480},h("div",null,h("strong",null,n)),h("div",null,lib.formatAddress({name:s,postalCountry:d,administrativeArea:l,locality:o,postalCode:a,addressLines:[r,i]}).join("\n")+"\n"+C||d),h("div",null))}renderEmpty(){return h("div",null,h("sc-divider",{style:{"--spacing":"0"}}),h("slot",{name:"empty"},h("sc-empty",{icon:"user"},wp.i18n.__("You don't have any billing information.","surecart"))))}renderLoading(){return h("sc-card",{"no-padding":!0},h("sc-stacked-list",null,h("sc-stacked-list-row",{style:{"--columns":"2"},"mobile-size":0},h("div",{style:{padding:"0.5em"}},h("sc-skeleton",{style:{width:"30%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"20%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"40%"}})))))}render(){var n,e,t;return h("sc-dashboard-module",{exportparts:"base, heading, heading-text, heading-title, heading-description",class:"customer-details",error:this.error},h("span",{slot:"heading"},this.heading||wp.i18n.__("Billing Details","surecart")," ",!!(null===(n=null==this?void 0:this.customer)||void 0===n?void 0:n.id)&&!(null===(e=null==this?void 0:this.customer)||void 0===e?void 0:e.live_mode)&&h("sc-tag",{exportparts:"base:test-tag__base, content:test-tag__content",type:"warning",size:"small"},wp.i18n.__("Test","surecart"))),!!this.editLink&&!!(null===(t=this.customer)||void 0===t?void 0:t.id)&&h("sc-button",{exportparts:"base:button__base, label:button__label, prefix:button__prefix",type:"link",href:this.editLink,slot:"end"},h("sc-icon",{name:"edit-3",slot:"prefix"}),wp.i18n.__("Update","surecart")),this.renderContent())}get el(){return this}static get style(){return""}},[1,"sc-customer-details",{heading:[1],editLink:[1,"edit-link"],customer:[16],loading:[4],error:[1]}]);function defineCustomElement(){"undefined"!=typeof customElements&&["sc-customer-details","sc-alert","sc-button","sc-card","sc-dashboard-module","sc-divider","sc-empty","sc-icon","sc-skeleton","sc-spinner","sc-stacked-list","sc-stacked-list-row","sc-tag"].forEach((n=>{switch(n){case"sc-customer-details":customElements.get(n)||customElements.define(n,ScCustomerDetails);break;case"sc-alert":customElements.get(n)||defineCustomElement$c();break;case"sc-button":customElements.get(n)||defineCustomElement$b();break;case"sc-card":customElements.get(n)||defineCustomElement$a();break;case"sc-dashboard-module":customElements.get(n)||defineCustomElement$9();break;case"sc-divider":customElements.get(n)||defineCustomElement$8();break;case"sc-empty":customElements.get(n)||defineCustomElement$7();break;case"sc-icon":customElements.get(n)||defineCustomElement$6();break;case"sc-skeleton":customElements.get(n)||defineCustomElement$5();break;case"sc-spinner":customElements.get(n)||defineCustomElement$4();break;case"sc-stacked-list":customElements.get(n)||defineCustomElement$3();break;case"sc-stacked-list-row":customElements.get(n)||defineCustomElement$2();break;case"sc-tag":customElements.get(n)||defineCustomElement$1()}}))}defineCustomElement();export{ScCustomerDetails as S,defineCustomElement as d};