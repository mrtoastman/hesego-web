import{r as registerInstance,h,H as Host}from"./index-fd4790f6.js";const scUpgradeRequiredCss=":host{display:inline-block;color:var(--sc-color-gray-900);cursor:pointer}p{font-size:var(--sc-font-size-medium);font-weight:var(--sc-font-weight-normal);margin:0 0 var(--sc-spacing-medium) 0;line-height:var(--sc-line-height-dense);white-space:normal}.trigger{pointer-events:auto}.trigger__disabled{pointer-events:none}.dialog__title{display:flex;gap:0.5em;align-items:center}.dialog__title sc-icon{font-size:18px;width:22px;stroke-width:4;color:var(--sc-color-primary-500)}",ScUpgradeRequired=class{constructor(e){registerInstance(this,e),this.size="small",this.required=!0,this.open=!1}render(){return this.required?h(Host,{onClick:()=>this.open=!0},h("span",{class:"trigger"},h("span",{class:"trigger__disabled"},h("slot",null,h("sc-premium-badge",null)))),h("sc-dialog",{label:wp.i18n.__("Boost Your Revenue","surecart"),open:this.open,onScRequestClose:()=>this.open=!1,style:{"--width":"21rem",fontSize:"15px","--body-spacing":"2rem"}},h("span",{class:"dialog__title",slot:"label"},h("sc-icon",{name:"zap"}),h("span",null,wp.i18n.__("Boost Your Revenue","surecart"))),h("p",null,wp.i18n.__("Unlock revenue boosting features when you upgrade your plan!","surecart")),h("sc-button",{href:"https://app.surecart.com/billing",type:"primary",target:"_blank",full:!0},wp.i18n.__("Upgrade Now","surecart"),h("sc-icon",{name:"arrow-right",slot:"suffix"})))):h(Host,null,h("slot",null))}};ScUpgradeRequired.style=scUpgradeRequiredCss;export{ScUpgradeRequired as sc_upgrade_required};