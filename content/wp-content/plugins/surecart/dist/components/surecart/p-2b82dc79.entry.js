import{r as t}from"./p-dfbe004d.js";const s=class{constructor(s){t(this,s),this.value=0,this.unit="byte",this.display="short"}render(){if(isNaN(this.value))return"";const t="bit"===this.unit?["","kilo","mega","giga","tera"]:["","kilo","mega","giga","tera","peta"],s=Math.max(0,Math.min(Math.floor(Math.log10(this.value)/3),t.length-1)),i=t[s]+this.unit,a=parseFloat((this.value/Math.pow(1e3,s)).toPrecision(3));return new Intl.NumberFormat(this.locale,{style:"unit",unit:i,unitDisplay:this.display}).format(a)}};s.style=":host{display:inline-block}";export{s as sc_format_bytes};