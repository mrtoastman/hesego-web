import{r as n,h as t,g as i}from"./p-dfbe004d.js";import{c as A,a as N}from"./p-112455b1.js";import{c as r}from"./p-9cc61896.js";import{z as C}from"./p-121438f5.js";var O=A((function(n){var t,e;n.exports=(t={607:function(n,t,e){var r=this&&this.__assign||function(){return(r=Object.assign||function(n){for(var t,e=1,r=arguments.length;e<r;e++)for(var i in t=arguments[e])Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i]);return n}).apply(this,arguments)},i=this&&this.__values||function(n){var t="function"==typeof Symbol&&Symbol.iterator,e=t&&n[t],r=0;if(e)return e.call(n);if(n&&"number"==typeof n.length)return{next:function(){return n&&r>=n.length&&(n=void 0),{value:n&&n[r++],done:!n}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},s=this&&this.__read||function(n,t){var e="function"==typeof Symbol&&n[Symbol.iterator];if(!e)return n;var r,i,s=e.call(n),l=[];try{for(;(void 0===t||t-- >0)&&!(r=s.next()).done;)l.push(r.value)}catch(n){i={error:n}}finally{try{r&&!r.done&&(e=s.return)&&e.call(s)}finally{if(i)throw i.error}}return l},l=this&&this.__spreadArray||function(n,t,e){if(e||2===arguments.length)for(var r,i=0,s=t.length;i<s;i++)!r&&i in t||(r||(r=Array.prototype.slice.call(t,0,i)),r[i]=t[i]);return n.concat(r||Array.prototype.slice.call(t))},o=this&&this.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(t,"__esModule",{value:!0}),t.formatAddress=void 0;var A=o(e(726)),N=function(n,t){return t in n},C={"%N":"name","%O":"organization","%A":"addressLines","%D":"dependentLocality","%C":"locality","%S":"administrativeArea","%Z":"postalCode","%X":"sortingCode"},O=function(n){return N(C,n)?C[n]:null},a=function(n,t){return!!t&&("addressLines"===t?n.addressLines&&n.addressLines.length>0:N(n,t)&&n[t])};t.formatAddress=function(n){var t,e,o,C=function(n,t){var e,r,l=[];try{for(var o=i(n.entries()),A=o.next();!A.done;A=o.next()){var N=s(A.value,2),C=N[0],Z=N[1];if("%n"!==Z){var d=O(Z);d?a(t,d)&&l.push(Z):(C===n.length-C||"%n"===n[C+1]||a(t,O(n[C+1])))&&(0===C||"%n"===n[C-1]||l.length>0&&null!==O(l[l.length-1]))&&l.push(Z)}else l.push(Z)}}catch(n){e={error:n}}finally{try{A&&!A.done&&(r=o.return)&&r.call(o)}finally{if(e)throw e.error}}return l}(function(n){var t,e,r=[],s="",l=!1;try{for(var o=i(n),A=o.next();!A.done;A=o.next()){var N=A.value;l?(l=!1,r.push("%"+N)):"%"===N?(s.length>0&&(r.push(s),s=""),l=!0):s+=N}}catch(n){t={error:n}}finally{try{A&&!A.done&&(e=o.return)&&e.call(o)}finally{if(t)throw t.error}}return s.length>0&&r.push(s),r}((o=(o=(n=function(n){return r(r({},n),{addressLines:n.addressLines?n.addressLines.filter(Boolean):void 0})}(n)).postalCountry||"ZZ").toUpperCase(),N(A.default,o)?A.default[o]:A.default.ZZ)),n),Z=[],d="";try{for(var u=i(C),c=u.next();!c.done;c=u.next()){var S=c.value;if("%n"!==S){var v=O(S);if(v)if("addressLines"===v){var h=n.addressLines;h.length>0&&(d+=h[0],h.length>1&&(Z.push(d),d="",Z.push.apply(Z,l([],s(h.splice(1)),!1))))}else d+=n[v];else d+=S}else d.length>0&&(Z.push(d),d="")}}catch(n){t={error:n}}finally{try{c&&!c.done&&(e=u.return)&&e.call(u)}finally{if(t)throw t.error}}return d.length>0&&Z.push(d),Z}},726:n=>{n.exports=JSON.parse('{"AC":"%N%n%O%n%A%n%C%n%Z","AD":"%N%n%O%n%A%n%Z %C","AE":"%N%n%O%n%A%n%S","AF":"%N%n%O%n%A%n%C%n%Z","AI":"%N%n%O%n%A%n%C%n%Z","AL":"%N%n%O%n%A%n%Z%n%C","AM":"%N%n%O%n%A%n%Z%n%C%n%S","AR":"%N%n%O%n%A%n%Z %C%n%S","AS":"%N%n%O%n%A%n%C %S %Z","AT":"%O%n%N%n%A%n%Z %C","AU":"%O%n%N%n%A%n%C %S %Z","AX":"%O%n%N%n%A%nAX-%Z %C%nÅLAND","AZ":"%N%n%O%n%A%nAZ %Z %C","BA":"%N%n%O%n%A%n%Z %C","BB":"%N%n%O%n%A%n%C, %S %Z","BD":"%N%n%O%n%A%n%C - %Z","BE":"%O%n%N%n%A%n%Z %C","BF":"%N%n%O%n%A%n%C %X","BG":"%N%n%O%n%A%n%Z %C","BH":"%N%n%O%n%A%n%C %Z","BL":"%O%n%N%n%A%n%Z %C %X","BM":"%N%n%O%n%A%n%C %Z","BN":"%N%n%O%n%A%n%C %Z","BR":"%O%n%N%n%A%n%D%n%C-%S%n%Z","BS":"%N%n%O%n%A%n%C, %S","BT":"%N%n%O%n%A%n%C %Z","BY":"%O%n%N%n%A%n%Z, %C%n%S","CA":"%N%n%O%n%A%n%C %S %Z","CC":"%O%n%N%n%A%n%C %S %Z","CH":"%O%n%N%n%A%nCH-%Z %C","CI":"%N%n%O%n%X %A %C %X","CL":"%N%n%O%n%A%n%Z %C%n%S","CN":"%Z%n%S%C%D%n%A%n%O%n%N","CO":"%N%n%O%n%A%n%C, %S, %Z","CR":"%N%n%O%n%A%n%S, %C%n%Z","CU":"%N%n%O%n%A%n%C %S%n%Z","CV":"%N%n%O%n%A%n%Z %C%n%S","CX":"%O%n%N%n%A%n%C %S %Z","CY":"%N%n%O%n%A%n%Z %C","CZ":"%N%n%O%n%A%n%Z %C","DE":"%N%n%O%n%A%n%Z %C","DK":"%N%n%O%n%A%n%Z %C","DO":"%N%n%O%n%A%n%Z %C","DZ":"%N%n%O%n%A%n%Z %C","EC":"%N%n%O%n%A%n%Z%n%C","EE":"%N%n%O%n%A%n%Z %C","EG":"%N%n%O%n%A%n%C%n%S%n%Z","EH":"%N%n%O%n%A%n%Z %C","ES":"%N%n%O%n%A%n%Z %C %S","ET":"%N%n%O%n%A%n%Z %C","FI":"%O%n%N%n%A%nFI-%Z %C","FK":"%N%n%O%n%A%n%C%n%Z","FM":"%N%n%O%n%A%n%C %S %Z","FO":"%N%n%O%n%A%nFO%Z %C","FR":"%O%n%N%n%A%n%Z %C","GB":"%N%n%O%n%A%n%C%n%Z","GE":"%N%n%O%n%A%n%Z %C","GF":"%O%n%N%n%A%n%Z %C %X","GG":"%N%n%O%n%A%n%C%nGUERNSEY%n%Z","GI":"%N%n%O%n%A%nGIBRALTAR%n%Z","GL":"%N%n%O%n%A%n%Z %C","GN":"%N%n%O%n%Z %A %C","GP":"%O%n%N%n%A%n%Z %C %X","GR":"%N%n%O%n%A%n%Z %C","GS":"%N%n%O%n%A%n%n%C%n%Z","GT":"%N%n%O%n%A%n%Z- %C","GU":"%N%n%O%n%A%n%C %Z","GW":"%N%n%O%n%A%n%Z %C","HK":"%S%n%C%n%A%n%O%n%N","HM":"%O%n%N%n%A%n%C %S %Z","HN":"%N%n%O%n%A%n%C, %S%n%Z","HR":"%N%n%O%n%A%nHR-%Z %C","HT":"%N%n%O%n%A%nHT%Z %C","HU":"%N%n%O%n%C%n%A%n%Z","ID":"%N%n%O%n%A%n%C%n%S %Z","IE":"%N%n%O%n%A%n%D%n%C%n%S%n%Z","IL":"%N%n%O%n%A%n%C %Z","IM":"%N%n%O%n%A%n%C%n%Z","IN":"%N%n%O%n%A%n%C %Z%n%S","IO":"%N%n%O%n%A%n%C%n%Z","IQ":"%O%n%N%n%A%n%C, %S%n%Z","IR":"%O%n%N%n%S%n%C, %D%n%A%n%Z","IS":"%N%n%O%n%A%n%Z %C","IT":"%N%n%O%n%A%n%Z %C %S","JE":"%N%n%O%n%A%n%C%nJERSEY%n%Z","JM":"%N%n%O%n%A%n%C%n%S %X","JO":"%N%n%O%n%A%n%C %Z","JP":"〒%Z%n%S%n%A%n%O%n%N","KE":"%N%n%O%n%A%n%C%n%Z","KG":"%N%n%O%n%A%n%Z %C","KH":"%N%n%O%n%A%n%C %Z","KI":"%N%n%O%n%A%n%S%n%C","KN":"%N%n%O%n%A%n%C, %S","KP":"%Z%n%S%n%C%n%A%n%O%n%N","KR":"%S %C%D%n%A%n%O%n%N%n%Z","KW":"%N%n%O%n%A%n%Z %C","KY":"%N%n%O%n%A%n%S %Z","KZ":"%Z%n%S%n%C%n%A%n%O%n%N","LA":"%N%n%O%n%A%n%Z %C","LB":"%N%n%O%n%A%n%C %Z","LI":"%O%n%N%n%A%nFL-%Z %C","LK":"%N%n%O%n%A%n%C%n%Z","LR":"%N%n%O%n%A%n%Z %C","LS":"%N%n%O%n%A%n%C %Z","LT":"%O%n%N%n%A%nLT-%Z %C","LU":"%O%n%N%n%A%nL-%Z %C","LV":"%N%n%O%n%A%n%C, %Z","MA":"%N%n%O%n%A%n%Z %C","MC":"%N%n%O%n%A%nMC-%Z %C %X","MD":"%N%n%O%n%A%nMD-%Z %C","ME":"%N%n%O%n%A%n%Z %C","MF":"%O%n%N%n%A%n%Z %C %X","MG":"%N%n%O%n%A%n%Z %C","MH":"%N%n%O%n%A%n%C %S %Z","MK":"%N%n%O%n%A%n%Z %C","MM":"%N%n%O%n%A%n%C, %Z","MN":"%N%n%O%n%A%n%C%n%S %Z","MO":"%A%n%O%n%N","MP":"%N%n%O%n%A%n%C %S %Z","MQ":"%O%n%N%n%A%n%Z %C %X","MT":"%N%n%O%n%A%n%C %Z","MU":"%N%n%O%n%A%n%Z%n%C","MV":"%N%n%O%n%A%n%C %Z","MW":"%N%n%O%n%A%n%C %X","MX":"%N%n%O%n%A%n%D%n%Z %C, %S","MY":"%N%n%O%n%A%n%D%n%Z %C%n%S","MZ":"%N%n%O%n%A%n%Z %C%S","NA":"%N%n%O%n%A%n%C%n%Z","NC":"%O%n%N%n%A%n%Z %C %X","NE":"%N%n%O%n%A%n%Z %C","NF":"%O%n%N%n%A%n%C %S %Z","NG":"%N%n%O%n%A%n%D%n%C %Z%n%S","NI":"%N%n%O%n%A%n%Z%n%C, %S","NL":"%O%n%N%n%A%n%Z %C","NO":"%N%n%O%n%A%n%Z %C","NP":"%N%n%O%n%A%n%C %Z","NR":"%N%n%O%n%A%n%S","NZ":"%N%n%O%n%A%n%D%n%C %Z","OM":"%N%n%O%n%A%n%Z%n%C","PA":"%N%n%O%n%A%n%C%n%S","PE":"%N%n%O%n%A%n%C %Z%n%S","PF":"%N%n%O%n%A%n%Z %C %S","PG":"%N%n%O%n%A%n%C %Z %S","PH":"%N%n%O%n%A%n%D, %C%n%Z %S","PK":"%N%n%O%n%A%n%C-%Z","PL":"%N%n%O%n%A%n%Z %C","PM":"%O%n%N%n%A%n%Z %C %X","PN":"%N%n%O%n%A%n%C%n%Z","PR":"%N%n%O%n%A%n%C PR %Z","PT":"%N%n%O%n%A%n%Z %C","PW":"%N%n%O%n%A%n%C %S %Z","PY":"%N%n%O%n%A%n%Z %C","RE":"%O%n%N%n%A%n%Z %C %X","RO":"%N%n%O%n%A%n%Z %C","RS":"%N%n%O%n%A%n%Z %C","RU":"%N%n%O%n%A%n%C%n%S%n%Z","SA":"%N%n%O%n%A%n%C %Z","SC":"%N%n%O%n%A%n%C%n%S","SD":"%N%n%O%n%A%n%C%n%Z","SE":"%O%n%N%n%A%nSE-%Z %C","SG":"%N%n%O%n%A%nSINGAPORE %Z","SH":"%N%n%O%n%A%n%C%n%Z","SI":"%N%n%O%n%A%nSI-%Z %C","SJ":"%N%n%O%n%A%n%Z %C","SK":"%N%n%O%n%A%n%Z %C","SM":"%N%n%O%n%A%n%Z %C","SN":"%N%n%O%n%A%n%Z %C","SO":"%N%n%O%n%A%n%C, %S %Z","SR":"%N%n%O%n%A%n%C%n%S","SV":"%N%n%O%n%A%n%Z-%C%n%S","SZ":"%N%n%O%n%A%n%C%n%Z","TA":"%N%n%O%n%A%n%C%n%Z","TC":"%N%n%O%n%A%n%C%n%Z","TH":"%N%n%O%n%A%n%D %C%n%S %Z","TJ":"%N%n%O%n%A%n%Z %C","TM":"%N%n%O%n%A%n%Z %C","TN":"%N%n%O%n%A%n%Z %C","TR":"%N%n%O%n%A%n%Z %C/%S","TV":"%N%n%O%n%A%n%C%n%S","TW":"%Z%n%S%C%n%A%n%O%n%N","TZ":"%N%n%O%n%A%n%Z %C","UA":"%N%n%O%n%A%n%C%n%S%n%Z","UM":"%N%n%O%n%A%n%C %S %Z","US":"%N%n%O%n%A%n%C, %S %Z","UY":"%N%n%O%n%A%n%Z %C %S","UZ":"%N%n%O%n%A%n%Z %C%n%S","VA":"%N%n%O%n%A%n%Z %C","VC":"%N%n%O%n%A%n%C %Z","VE":"%N%n%O%n%A%n%C %Z, %S","VG":"%N%n%O%n%A%n%C%n%Z","VI":"%N%n%O%n%A%n%C %S %Z","VN":"%N%n%O%n%A%n%C%n%S %Z","WF":"%O%n%N%n%A%n%Z %C %X","XK":"%N%n%O%n%A%n%Z %C","YT":"%O%n%N%n%A%n%Z %C %X","ZA":"%N%n%O%n%A%n%D%n%C%n%Z","ZM":"%N%n%O%n%A%n%Z %C","ZZ":"%N%n%O%n%A%n%C"}')}},e={},function n(r){var i=e[r];if(void 0!==i)return i.exports;var s=e[r]={exports:{}};return t[r].call(s.exports,s,s.exports,n),s.exports}(607))}));const e=class{constructor(t){n(this,t)}renderContent(){var n,e,r,i,s,l,o,A;return this.loading?this.renderLoading():this.customer?t("sc-card",{"no-padding":!0},t("sc-stacked-list",null,!!(null===(n=null==this?void 0:this.customer)||void 0===n?void 0:n.name)&&t("sc-stacked-list-row",{style:{"--columns":"3"},mobileSize:480},t("div",null,t("strong",null,wp.i18n.__("Billing Name","surecart"))),t("div",null,null===(e=this.customer)||void 0===e?void 0:e.name),t("div",null)),!!(null===(r=null==this?void 0:this.customer)||void 0===r?void 0:r.email)&&t("sc-stacked-list-row",{style:{"--columns":"3"},mobileSize:480},t("div",null,t("strong",null,wp.i18n.__("Billing Email","surecart"))),t("div",null,null===(i=this.customer)||void 0===i?void 0:i.email),t("div",null)),!!Object.keys((null===(s=null==this?void 0:this.customer)||void 0===s?void 0:s.shipping_address)||{}).length&&this.renderAddress(wp.i18n.__("Shipping Address","surecart"),this.customer.shipping_address),!!Object.keys((null===(l=null==this?void 0:this.customer)||void 0===l?void 0:l.billing_address)||{}).length&&this.renderAddress(wp.i18n.__("Billing Address","surecart"),this.customer.billing_address),!!(null===(o=null==this?void 0:this.customer)||void 0===o?void 0:o.phone)&&t("sc-stacked-list-row",{style:{"--columns":"3"},mobileSize:480},t("div",null,t("strong",null,wp.i18n.__("Phone","surecart"))),t("div",null,null===(A=this.customer)||void 0===A?void 0:A.phone),t("div",null)),(()=>{var n,e,r,i;const{number_type:s,number:l}=(null===(n=this.customer)||void 0===n?void 0:n.tax_identifier)||{};if(!l||!s)return;const o=(null===(e=null==C?void 0:C[s])||void 0===e?void 0:e.label)||wp.i18n.__("Tax Id","surecart"),A=!1===(null===(i=null===(r=this.customer)||void 0===r?void 0:r.tax_identifier)||void 0===i?void 0:i[`valid_${s}`]);return t("sc-stacked-list-row",{style:{"--columns":"3"},mobileSize:480},t("div",null,t("strong",null,o)),t("div",null,l," ",A&&t("sc-tag",{type:"warning"},wp.i18n.__("Invalid","surecart"))),t("div",null))})())):this.renderEmpty()}renderAddress(n="Address",e){var i;const{name:s,line_1:l,line_2:o,city:A,state:N,postal_code:C,country:a}=e,Z=null===(i=r.find((({value:n})=>n===a)))||void 0===i?void 0:i.label;return t("sc-stacked-list-row",{style:{"--columns":"3"},mobileSize:480},t("div",null,t("strong",null,n)),t("div",null,O.formatAddress({name:s,postalCountry:a,administrativeArea:N,locality:A,postalCode:C,addressLines:[l,o]}).join("\n")+"\n"+Z||a),t("div",null))}renderEmpty(){return t("div",null,t("sc-divider",{style:{"--spacing":"0"}}),t("slot",{name:"empty"},t("sc-empty",{icon:"user"},wp.i18n.__("You don't have any billing information.","surecart"))))}renderLoading(){return t("sc-card",{"no-padding":!0},t("sc-stacked-list",null,t("sc-stacked-list-row",{style:{"--columns":"2"},"mobile-size":0},t("div",{style:{padding:"0.5em"}},t("sc-skeleton",{style:{width:"30%",marginBottom:"0.75em"}}),t("sc-skeleton",{style:{width:"20%",marginBottom:"0.75em"}}),t("sc-skeleton",{style:{width:"40%"}})))))}render(){var n,e,r;return t("sc-dashboard-module",{exportparts:"base, heading, heading-text, heading-title, heading-description",class:"customer-details",error:this.error},t("span",{slot:"heading"},this.heading||wp.i18n.__("Billing Details","surecart")," ",!!(null===(n=null==this?void 0:this.customer)||void 0===n?void 0:n.id)&&!(null===(e=null==this?void 0:this.customer)||void 0===e?void 0:e.live_mode)&&t("sc-tag",{exportparts:"base:test-tag__base, content:test-tag__content",type:"warning",size:"small"},wp.i18n.__("Test","surecart"))),!!this.editLink&&!!(null===(r=this.customer)||void 0===r?void 0:r.id)&&t("sc-button",{exportparts:"base:button__base, label:button__label, prefix:button__prefix",type:"link",href:this.editLink,slot:"end"},t("sc-icon",{name:"edit-3",slot:"prefix"}),wp.i18n.__("Update","surecart")),this.renderContent())}get el(){return i(this)}};e.style="";export{e as sc_customer_details};