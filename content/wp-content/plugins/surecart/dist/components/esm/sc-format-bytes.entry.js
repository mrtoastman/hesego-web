import{r as registerInstance}from"./index-fd4790f6.js";const scFormatBytesCss=":host{display:inline-block}",ScFormatBytes=class{constructor(t){registerInstance(this,t),this.value=0,this.unit="byte",this.display="short"}render(){if(isNaN(this.value))return"";const t="bit"===this.unit?["","kilo","mega","giga","tera"]:["","kilo","mega","giga","tera","peta"],s=Math.max(0,Math.min(Math.floor(Math.log10(this.value)/3),t.length-1)),a=t[s]+this.unit,e=parseFloat((this.value/Math.pow(1e3,s)).toPrecision(3));return new Intl.NumberFormat(this.locale,{style:"unit",unit:a,unitDisplay:this.display}).format(e)}};ScFormatBytes.style=scFormatBytesCss;export{ScFormatBytes as sc_format_bytes};