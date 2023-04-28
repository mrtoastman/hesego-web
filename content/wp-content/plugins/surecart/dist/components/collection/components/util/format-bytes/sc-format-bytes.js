import{Component,Prop}from"@stencil/core";export class ScFormatBytes{constructor(){this.value=0,this.unit="byte",this.display="short"}render(){if(isNaN(this.value))return"";const t="bit"===this.unit?["","kilo","mega","giga","tera"]:["","kilo","mega","giga","tera","peta"],e=Math.max(0,Math.min(Math.floor(Math.log10(this.value)/3),t.length-1)),r=t[e]+this.unit,a=parseFloat((this.value/Math.pow(1e3,e)).toPrecision(3));return new Intl.NumberFormat(this.locale,{style:"unit",unit:r,unitDisplay:this.display}).format(a)}static get is(){return"sc-format-bytes"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-format-bytes.css"]}}static get styleUrls(){return{$:["sc-format-bytes.css"]}}static get properties(){return{locale:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"The locale to use when formatting the number."},attribute:"locale",reflect:!1},value:{type:"number",mutable:!1,complexType:{original:"number",resolved:"number",references:{}},required:!1,optional:!1,docs:{tags:[],text:"The number to format in bytes."},attribute:"value",reflect:!1,defaultValue:"0"},unit:{type:"string",mutable:!1,complexType:{original:"'byte' | 'bit'",resolved:'"bit" | "byte"',references:{}},required:!1,optional:!1,docs:{tags:[],text:"The unit to display."},attribute:"unit",reflect:!1,defaultValue:"'byte'"},display:{type:"string",mutable:!1,complexType:{original:"'long' | 'short' | 'narrow'",resolved:'"long" | "narrow" | "short"',references:{}},required:!1,optional:!1,docs:{tags:[],text:'Determines how to display the result, e.g. "100 bytes", "100 b", or "100b".'},attribute:"display",reflect:!1,defaultValue:"'short'"}}}}