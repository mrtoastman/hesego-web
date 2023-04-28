import{Component,h,Prop,State}from"@stencil/core";import{__}from"@wordpress/i18n";import apiFetch from"../../../../functions/fetch";export class ScWordPressPasswordEdit{renderEmpty(){return h("slot",{name:"empty"},__("User not found.","surecart"))}async handleSubmit(s){this.loading=!0,this.error="";try{const{password:r,password_confirm:e}=await s.target.getFormJson();if(r!==e)throw{message:__("Passwords do not match.","surecart")};await apiFetch({path:"wp/v2/users/me",method:"PATCH",data:{password:r,meta:{default_password_nag:!1}}}),this.successUrl?window.location.assign(this.successUrl):this.loading=!1}catch(s){this.error=(null==s?void 0:s.message)||__("Something went wrong","surecart"),this.loading=!1}}render(){return h("sc-dashboard-module",{class:"customer-details",error:this.error},h("span",{slot:"heading"},this.heading||__("Update Password","surecart")," "),h("slot",{name:"end",slot:"end"}),h("sc-card",null,h("sc-form",{onScFormSubmit:s=>this.handleSubmit(s)},h("sc-input",{label:__("New Password","surecart"),name:"password",type:"password",required:!0}),h("sc-input",{label:__("Confirm New Password","surecart"),name:"password_confirm",type:"password",required:!0}),h("div",null,h("sc-button",{type:"primary",full:!0,submit:!0},__("Update Password","surecart"))))),this.loading&&h("sc-block-ui",{spinner:!0}))}static get is(){return"sc-wordpress-password-edit"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-wordpress-password-edit.css"]}}static get styleUrls(){return{$:["sc-wordpress-password-edit.css"]}}static get properties(){return{heading:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"heading",reflect:!1},successUrl:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"success-url",reflect:!1},user:{type:"unknown",mutable:!1,complexType:{original:"WordPressUser",resolved:"WordPressUser",references:{WordPressUser:{location:"import",path:"../../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:""}}}}static get states(){return{loading:{},error:{}}}}