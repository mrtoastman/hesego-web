import{r as i}from"./p-dfbe004d.js";import{m as t}from"./p-df8994cd.js";const s=class{constructor(t){i(this,t),this.value=0,this.type="decimal",this.noGrouping=!1,this.currency="USD",this.currencyDisplay="symbol"}render(){var i;if(isNaN(this.value))return"";const s=navigator.language||(null===(i=navigator)||void 0===i?void 0:i.browserLanguage)||(navigator.languages||["en"])[0];return new Intl.NumberFormat(this.locale||s,{style:this.type,currency:this.currency.toUpperCase(),currencyDisplay:this.currencyDisplay,useGrouping:!this.noGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits}).format(this.noConvert?this.value:t(this.value,this.currency.toUpperCase()))}};export{s as sc_format_number};