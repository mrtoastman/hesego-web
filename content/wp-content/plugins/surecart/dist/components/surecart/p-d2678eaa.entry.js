import{r as s,h as r}from"./p-dfbe004d.js";import{a as t}from"./p-d8453138.js";import"./p-1c2e2695.js";const a=class{constructor(r){s(this,r)}renderEmpty(){return r("slot",{name:"empty"},wp.i18n.__("User not found.","surecart"))}async handleSubmit(s){this.loading=!0,this.error="";try{const{password:r,password_confirm:a}=await s.target.getFormJson();if(r!==a)throw{message:wp.i18n.__("Passwords do not match.","surecart")};await t({path:"wp/v2/users/me",method:"PATCH",data:{password:r,meta:{default_password_nag:!1}}}),this.successUrl?window.location.assign(this.successUrl):this.loading=!1}catch(s){this.error=(null==s?void 0:s.message)||wp.i18n.__("Something went wrong","surecart"),this.loading=!1}}render(){return r("sc-dashboard-module",{class:"customer-details",error:this.error},r("span",{slot:"heading"},this.heading||wp.i18n.__("Update Password","surecart")," "),r("slot",{name:"end",slot:"end"}),r("sc-card",null,r("sc-form",{onScFormSubmit:s=>this.handleSubmit(s)},r("sc-input",{label:wp.i18n.__("New Password","surecart"),name:"password",type:"password",required:!0}),r("sc-input",{label:wp.i18n.__("Confirm New Password","surecart"),name:"password_confirm",type:"password",required:!0}),r("div",null,r("sc-button",{type:"primary",full:!0,submit:!0},wp.i18n.__("Update Password","surecart"))))),this.loading&&r("sc-block-ui",{spinner:!0}))}};a.style=":host{display:block;position:relative}";export{a as sc_wordpress_password_edit};