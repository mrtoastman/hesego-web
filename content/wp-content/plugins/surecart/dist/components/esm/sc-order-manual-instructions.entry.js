import{r as registerInstance,h,H as Host}from"./index-fd4790f6.js";import{o as openWormhole}from"./consumer-b5087188.js";const scOrderManualInstructionsCss=":host{display:block}",ScOrderManualInstructions=class{constructor(n){registerInstance(this,n)}render(){return this.manualPaymentInstructions&&this.manualPaymentTitle?h("sc-alert",{type:"info",open:!0},h("span",{slot:"title"},this.manualPaymentTitle),this.manualPaymentInstructions.split("\n").map((n=>h("p",null,n)))):h(Host,{style:{display:"none"}})}};openWormhole(ScOrderManualInstructions,["manualPaymentTitle","manualPaymentInstructions"],!1),ScOrderManualInstructions.style=":host{display:block}";export{ScOrderManualInstructions as sc_order_manual_instructions};