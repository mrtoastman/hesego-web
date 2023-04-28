import{r as registerInstance,h,g as getElement}from"./index-fd4790f6.js";import{c as createCommonjsModule,a as commonjsGlobal}from"./_commonjsHelpers-9943807e.js";import{c as countryChoices}from"./address-c40a6eb5.js";import{z as zones}from"./tax-83f264de.js";var lib=createCommonjsModule((function(n,e){var t,r;n.exports=(t={607:function(n,e,t){var r=this&&this.__assign||function(){return r=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var s in e=arguments[t])Object.prototype.hasOwnProperty.call(e,s)&&(n[s]=e[s]);return n},r.apply(this,arguments)},s=this&&this.__values||function(n){var e="function"==typeof Symbol&&Symbol.iterator,t=e&&n[e],r=0;if(t)return t.call(n);if(n&&"number"==typeof n.length)return{next:function(){return n&&r>=n.length&&(n=void 0),{value:n&&n[r++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},i=this&&this.__read||function(n,e){var t="function"==typeof Symbol&&n[Symbol.iterator];if(!t)return n;var r,s,i=t.call(n),l=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)l.push(r.value)}catch(n){s={error:n}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return l},l=this&&this.__spreadArray||function(n,e,t){if(t||2===arguments.length)for(var r,s=0,i=e.length;s<i;s++)!r&&s in e||(r||(r=Array.prototype.slice.call(e,0,s)),r[s]=e[s]);return n.concat(r||Array.prototype.slice.call(e))},o=this&&this.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(e,"__esModule",{value:!0}),e.formatAddress=void 0;var A=o(t(726)),C=function(n,e){return e in n},N={"%N":"name","%O":"organization","%A":"addressLines","%D":"dependentLocality","%C":"locality","%S":"administrativeArea","%Z":"postalCode","%X":"sortingCode"},O=function(n){return C(N,n)?N[n]:null},a=function(n,e){return!!e&&("addressLines"===e?n.addressLines&&n.addressLines.length>0:C(n,e)&&n[e])};e.formatAddress=function(n){var e,t,o,N=function(n){var e,t,r=[],i="",l=!1;try{for(var o=s(n),A=o.next();!A.done;A=o.next()){var C=A.value;l?(l=!1,r.push("%"+C)):"%"===C?(i.length>0&&(r.push(i),i=""),l=!0):i+=C}}catch(n){e={error:n}}finally{try{A&&!A.done&&(t=o.return)&&t.call(o)}finally{if(e)throw e.error}}return i.length>0&&r.push(i),r}((o=(o=(n=function(n){return r(r({},n),{addressLines:n.addressLines?n.addressLines.filter(Boolean):void 0})}(n)).postalCountry||"ZZ").toUpperCase(),C(A.default,o)?A.default[o]:A.default.ZZ)),d=function(n,e){var t,r,l=[];try{for(var o=s(n.entries()),A=o.next();!A.done;A=o.next()){var C=i(A.value,2),N=C[0],d=C[1];if("%n"!==d){var Z=O(d);Z?a(e,Z)&&l.push(d):(N===n.length-N||"%n"===n[N+1]||a(e,O(n[N+1])))&&(0===N||"%n"===n[N-1]||l.length>0&&null!==O(l[l.length-1]))&&l.push(d)}else l.push(d)}}catch(n){t={error:n}}finally{try{A&&!A.done&&(r=o.return)&&r.call(o)}finally{if(t)throw t.error}}return l}(N,n),Z=[],u="";try{for(var c=s(d),h=c.next();!h.done;h=c.next()){var S=h.value;if("%n"!==S){var v=O(S);if(v)if("addressLines"===v){var p=n.addressLines;p.length>0&&(u+=p[0],p.length>1&&(Z.push(u),u="",Z.push.apply(Z,l([],i(p.splice(1)),!1))))}else u+=n[v];else u+=S}else u.length>0&&(Z.push(u),u="")}}catch(n){e={error:n}}finally{try{h&&!h.done&&(t=c.return)&&t.call(c)}finally{if(e)throw e.error}}return u.length>0&&Z.push(u),Z}},726:n=>{n.exports=JSON.parse('{"AC":"%N%n%O%n%A%n%C%n%Z","AD":"%N%n%O%n%A%n%Z %C","AE":"%N%n%O%n%A%n%S","AF":"%N%n%O%n%A%n%C%n%Z","AI":"%N%n%O%n%A%n%C%n%Z","AL":"%N%n%O%n%A%n%Z%n%C","AM":"%N%n%O%n%A%n%Z%n%C%n%S","AR":"%N%n%O%n%A%n%Z %C%n%S","AS":"%N%n%O%n%A%n%C %S %Z","AT":"%O%n%N%n%A%n%Z %C","AU":"%O%n%N%n%A%n%C %S %Z","AX":"%O%n%N%n%A%nAX-%Z %C%nÅLAND","AZ":"%N%n%O%n%A%nAZ %Z %C","BA":"%N%n%O%n%A%n%Z %C","BB":"%N%n%O%n%A%n%C, %S %Z","BD":"%N%n%O%n%A%n%C - %Z","BE":"%O%n%N%n%A%n%Z %C","BF":"%N%n%O%n%A%n%C %X","BG":"%N%n%O%n%A%n%Z %C","BH":"%N%n%O%n%A%n%C %Z","BL":"%O%n%N%n%A%n%Z %C %X","BM":"%N%n%O%n%A%n%C %Z","BN":"%N%n%O%n%A%n%C %Z","BR":"%O%n%N%n%A%n%D%n%C-%S%n%Z","BS":"%N%n%O%n%A%n%C, %S","BT":"%N%n%O%n%A%n%C %Z","BY":"%O%n%N%n%A%n%Z, %C%n%S","CA":"%N%n%O%n%A%n%C %S %Z","CC":"%O%n%N%n%A%n%C %S %Z","CH":"%O%n%N%n%A%nCH-%Z %C","CI":"%N%n%O%n%X %A %C %X","CL":"%N%n%O%n%A%n%Z %C%n%S","CN":"%Z%n%S%C%D%n%A%n%O%n%N","CO":"%N%n%O%n%A%n%C, %S, %Z","CR":"%N%n%O%n%A%n%S, %C%n%Z","CU":"%N%n%O%n%A%n%C %S%n%Z","CV":"%N%n%O%n%A%n%Z %C%n%S","CX":"%O%n%N%n%A%n%C %S %Z","CY":"%N%n%O%n%A%n%Z %C","CZ":"%N%n%O%n%A%n%Z %C","DE":"%N%n%O%n%A%n%Z %C","DK":"%N%n%O%n%A%n%Z %C","DO":"%N%n%O%n%A%n%Z %C","DZ":"%N%n%O%n%A%n%Z %C","EC":"%N%n%O%n%A%n%Z%n%C","EE":"%N%n%O%n%A%n%Z %C","EG":"%N%n%O%n%A%n%C%n%S%n%Z","EH":"%N%n%O%n%A%n%Z %C","ES":"%N%n%O%n%A%n%Z %C %S","ET":"%N%n%O%n%A%n%Z %C","FI":"%O%n%N%n%A%nFI-%Z %C","FK":"%N%n%O%n%A%n%C%n%Z","FM":"%N%n%O%n%A%n%C %S %Z","FO":"%N%n%O%n%A%nFO%Z %C","FR":"%O%n%N%n%A%n%Z %C","GB":"%N%n%O%n%A%n%C%n%Z","GE":"%N%n%O%n%A%n%Z %C","GF":"%O%n%N%n%A%n%Z %C %X","GG":"%N%n%O%n%A%n%C%nGUERNSEY%n%Z","GI":"%N%n%O%n%A%nGIBRALTAR%n%Z","GL":"%N%n%O%n%A%n%Z %C","GN":"%N%n%O%n%Z %A %C","GP":"%O%n%N%n%A%n%Z %C %X","GR":"%N%n%O%n%A%n%Z %C","GS":"%N%n%O%n%A%n%n%C%n%Z","GT":"%N%n%O%n%A%n%Z- %C","GU":"%N%n%O%n%A%n%C %Z","GW":"%N%n%O%n%A%n%Z %C","HK":"%S%n%C%n%A%n%O%n%N","HM":"%O%n%N%n%A%n%C %S %Z","HN":"%N%n%O%n%A%n%C, %S%n%Z","HR":"%N%n%O%n%A%nHR-%Z %C","HT":"%N%n%O%n%A%nHT%Z %C","HU":"%N%n%O%n%C%n%A%n%Z","ID":"%N%n%O%n%A%n%C%n%S %Z","IE":"%N%n%O%n%A%n%D%n%C%n%S%n%Z","IL":"%N%n%O%n%A%n%C %Z","IM":"%N%n%O%n%A%n%C%n%Z","IN":"%N%n%O%n%A%n%C %Z%n%S","IO":"%N%n%O%n%A%n%C%n%Z","IQ":"%O%n%N%n%A%n%C, %S%n%Z","IR":"%O%n%N%n%S%n%C, %D%n%A%n%Z","IS":"%N%n%O%n%A%n%Z %C","IT":"%N%n%O%n%A%n%Z %C %S","JE":"%N%n%O%n%A%n%C%nJERSEY%n%Z","JM":"%N%n%O%n%A%n%C%n%S %X","JO":"%N%n%O%n%A%n%C %Z","JP":"〒%Z%n%S%n%A%n%O%n%N","KE":"%N%n%O%n%A%n%C%n%Z","KG":"%N%n%O%n%A%n%Z %C","KH":"%N%n%O%n%A%n%C %Z","KI":"%N%n%O%n%A%n%S%n%C","KN":"%N%n%O%n%A%n%C, %S","KP":"%Z%n%S%n%C%n%A%n%O%n%N","KR":"%S %C%D%n%A%n%O%n%N%n%Z","KW":"%N%n%O%n%A%n%Z %C","KY":"%N%n%O%n%A%n%S %Z","KZ":"%Z%n%S%n%C%n%A%n%O%n%N","LA":"%N%n%O%n%A%n%Z %C","LB":"%N%n%O%n%A%n%C %Z","LI":"%O%n%N%n%A%nFL-%Z %C","LK":"%N%n%O%n%A%n%C%n%Z","LR":"%N%n%O%n%A%n%Z %C","LS":"%N%n%O%n%A%n%C %Z","LT":"%O%n%N%n%A%nLT-%Z %C","LU":"%O%n%N%n%A%nL-%Z %C","LV":"%N%n%O%n%A%n%C, %Z","MA":"%N%n%O%n%A%n%Z %C","MC":"%N%n%O%n%A%nMC-%Z %C %X","MD":"%N%n%O%n%A%nMD-%Z %C","ME":"%N%n%O%n%A%n%Z %C","MF":"%O%n%N%n%A%n%Z %C %X","MG":"%N%n%O%n%A%n%Z %C","MH":"%N%n%O%n%A%n%C %S %Z","MK":"%N%n%O%n%A%n%Z %C","MM":"%N%n%O%n%A%n%C, %Z","MN":"%N%n%O%n%A%n%C%n%S %Z","MO":"%A%n%O%n%N","MP":"%N%n%O%n%A%n%C %S %Z","MQ":"%O%n%N%n%A%n%Z %C %X","MT":"%N%n%O%n%A%n%C %Z","MU":"%N%n%O%n%A%n%Z%n%C","MV":"%N%n%O%n%A%n%C %Z","MW":"%N%n%O%n%A%n%C %X","MX":"%N%n%O%n%A%n%D%n%Z %C, %S","MY":"%N%n%O%n%A%n%D%n%Z %C%n%S","MZ":"%N%n%O%n%A%n%Z %C%S","NA":"%N%n%O%n%A%n%C%n%Z","NC":"%O%n%N%n%A%n%Z %C %X","NE":"%N%n%O%n%A%n%Z %C","NF":"%O%n%N%n%A%n%C %S %Z","NG":"%N%n%O%n%A%n%D%n%C %Z%n%S","NI":"%N%n%O%n%A%n%Z%n%C, %S","NL":"%O%n%N%n%A%n%Z %C","NO":"%N%n%O%n%A%n%Z %C","NP":"%N%n%O%n%A%n%C %Z","NR":"%N%n%O%n%A%n%S","NZ":"%N%n%O%n%A%n%D%n%C %Z","OM":"%N%n%O%n%A%n%Z%n%C","PA":"%N%n%O%n%A%n%C%n%S","PE":"%N%n%O%n%A%n%C %Z%n%S","PF":"%N%n%O%n%A%n%Z %C %S","PG":"%N%n%O%n%A%n%C %Z %S","PH":"%N%n%O%n%A%n%D, %C%n%Z %S","PK":"%N%n%O%n%A%n%C-%Z","PL":"%N%n%O%n%A%n%Z %C","PM":"%O%n%N%n%A%n%Z %C %X","PN":"%N%n%O%n%A%n%C%n%Z","PR":"%N%n%O%n%A%n%C PR %Z","PT":"%N%n%O%n%A%n%Z %C","PW":"%N%n%O%n%A%n%C %S %Z","PY":"%N%n%O%n%A%n%Z %C","RE":"%O%n%N%n%A%n%Z %C %X","RO":"%N%n%O%n%A%n%Z %C","RS":"%N%n%O%n%A%n%Z %C","RU":"%N%n%O%n%A%n%C%n%S%n%Z","SA":"%N%n%O%n%A%n%C %Z","SC":"%N%n%O%n%A%n%C%n%S","SD":"%N%n%O%n%A%n%C%n%Z","SE":"%O%n%N%n%A%nSE-%Z %C","SG":"%N%n%O%n%A%nSINGAPORE %Z","SH":"%N%n%O%n%A%n%C%n%Z","SI":"%N%n%O%n%A%nSI-%Z %C","SJ":"%N%n%O%n%A%n%Z %C","SK":"%N%n%O%n%A%n%Z %C","SM":"%N%n%O%n%A%n%Z %C","SN":"%N%n%O%n%A%n%Z %C","SO":"%N%n%O%n%A%n%C, %S %Z","SR":"%N%n%O%n%A%n%C%n%S","SV":"%N%n%O%n%A%n%Z-%C%n%S","SZ":"%N%n%O%n%A%n%C%n%Z","TA":"%N%n%O%n%A%n%C%n%Z","TC":"%N%n%O%n%A%n%C%n%Z","TH":"%N%n%O%n%A%n%D %C%n%S %Z","TJ":"%N%n%O%n%A%n%Z %C","TM":"%N%n%O%n%A%n%Z %C","TN":"%N%n%O%n%A%n%Z %C","TR":"%N%n%O%n%A%n%Z %C/%S","TV":"%N%n%O%n%A%n%C%n%S","TW":"%Z%n%S%C%n%A%n%O%n%N","TZ":"%N%n%O%n%A%n%Z %C","UA":"%N%n%O%n%A%n%C%n%S%n%Z","UM":"%N%n%O%n%A%n%C %S %Z","US":"%N%n%O%n%A%n%C, %S %Z","UY":"%N%n%O%n%A%n%Z %C %S","UZ":"%N%n%O%n%A%n%Z %C%n%S","VA":"%N%n%O%n%A%n%Z %C","VC":"%N%n%O%n%A%n%C %Z","VE":"%N%n%O%n%A%n%C %Z, %S","VG":"%N%n%O%n%A%n%C%n%Z","VI":"%N%n%O%n%A%n%C %S %Z","VN":"%N%n%O%n%A%n%C%n%S %Z","WF":"%O%n%N%n%A%n%Z %C %X","XK":"%N%n%O%n%A%n%Z %C","YT":"%O%n%N%n%A%n%Z %C %X","ZA":"%N%n%O%n%A%n%D%n%C%n%Z","ZM":"%N%n%O%n%A%n%Z %C","ZZ":"%N%n%O%n%A%n%C"}')}},r={},function n(e){var s=r[e];if(void 0!==s)return s.exports;var i=r[e]={exports:{}};return t[e].call(i.exports,i,i.exports,n),i.exports}(607))}));const scCustomerDetailsCss="",ScCustomerDetails=class{constructor(n){registerInstance(this,n)}renderContent(){var n,e,t,r,s,i,l,o;return this.loading?this.renderLoading():this.customer?h("sc-card",{"no-padding":!0},h("sc-stacked-list",null,!!(null===(n=null==this?void 0:this.customer)||void 0===n?void 0:n.name)&&h("sc-stacked-list-row",{style:{"--columns":"3"},mobileSize:480},h("div",null,h("strong",null,wp.i18n.__("Billing Name","surecart"))),h("div",null,null===(e=this.customer)||void 0===e?void 0:e.name),h("div",null)),!!(null===(t=null==this?void 0:this.customer)||void 0===t?void 0:t.email)&&h("sc-stacked-list-row",{style:{"--columns":"3"},mobileSize:480},h("div",null,h("strong",null,wp.i18n.__("Billing Email","surecart"))),h("div",null,null===(r=this.customer)||void 0===r?void 0:r.email),h("div",null)),!!Object.keys((null===(s=null==this?void 0:this.customer)||void 0===s?void 0:s.shipping_address)||{}).length&&this.renderAddress(wp.i18n.__("Shipping Address","surecart"),this.customer.shipping_address),!!Object.keys((null===(i=null==this?void 0:this.customer)||void 0===i?void 0:i.billing_address)||{}).length&&this.renderAddress(wp.i18n.__("Billing Address","surecart"),this.customer.billing_address),!!(null===(l=null==this?void 0:this.customer)||void 0===l?void 0:l.phone)&&h("sc-stacked-list-row",{style:{"--columns":"3"},mobileSize:480},h("div",null,h("strong",null,wp.i18n.__("Phone","surecart"))),h("div",null,null===(o=this.customer)||void 0===o?void 0:o.phone),h("div",null)),(()=>{var n,e,t,r;const{number_type:s,number:i}=(null===(n=this.customer)||void 0===n?void 0:n.tax_identifier)||{};if(!i||!s)return;const l=(null===(e=null==zones?void 0:zones[s])||void 0===e?void 0:e.label)||wp.i18n.__("Tax Id","surecart"),o=!1===(null===(r=null===(t=this.customer)||void 0===t?void 0:t.tax_identifier)||void 0===r?void 0:r[`valid_${s}`]);return h("sc-stacked-list-row",{style:{"--columns":"3"},mobileSize:480},h("div",null,h("strong",null,l)),h("div",null,i," ",o&&h("sc-tag",{type:"warning"},wp.i18n.__("Invalid","surecart"))),h("div",null))})())):this.renderEmpty()}renderAddress(n="Address",e){var t;const{name:r,line_1:s,line_2:i,city:l,state:o,postal_code:A,country:C}=e,N=null===(t=countryChoices.find((({value:n})=>n===C)))||void 0===t?void 0:t.label;return h("sc-stacked-list-row",{style:{"--columns":"3"},mobileSize:480},h("div",null,h("strong",null,n)),h("div",null,lib.formatAddress({name:r,postalCountry:C,administrativeArea:o,locality:l,postalCode:A,addressLines:[s,i]}).join("\n")+"\n"+N||C),h("div",null))}renderEmpty(){return h("div",null,h("sc-divider",{style:{"--spacing":"0"}}),h("slot",{name:"empty"},h("sc-empty",{icon:"user"},wp.i18n.__("You don't have any billing information.","surecart"))))}renderLoading(){return h("sc-card",{"no-padding":!0},h("sc-stacked-list",null,h("sc-stacked-list-row",{style:{"--columns":"2"},"mobile-size":0},h("div",{style:{padding:"0.5em"}},h("sc-skeleton",{style:{width:"30%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"20%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"40%"}})))))}render(){var n,e,t;return h("sc-dashboard-module",{exportparts:"base, heading, heading-text, heading-title, heading-description",class:"customer-details",error:this.error},h("span",{slot:"heading"},this.heading||wp.i18n.__("Billing Details","surecart")," ",!!(null===(n=null==this?void 0:this.customer)||void 0===n?void 0:n.id)&&!(null===(e=null==this?void 0:this.customer)||void 0===e?void 0:e.live_mode)&&h("sc-tag",{exportparts:"base:test-tag__base, content:test-tag__content",type:"warning",size:"small"},wp.i18n.__("Test","surecart"))),!!this.editLink&&!!(null===(t=this.customer)||void 0===t?void 0:t.id)&&h("sc-button",{exportparts:"base:button__base, label:button__label, prefix:button__prefix",type:"link",href:this.editLink,slot:"end"},h("sc-icon",{name:"edit-3",slot:"prefix"}),wp.i18n.__("Update","surecart")),this.renderContent())}get el(){return getElement(this)}};ScCustomerDetails.style="";export{ScCustomerDetails as sc_customer_details};