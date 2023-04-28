import{Component,Prop,h,Watch,State,Host,Listen,Event}from"@stencil/core";import{__}from"@wordpress/i18n";import apiFetch from"../../../functions/fetch";export class ScLoginProvider{handleLoginPrompt(){this.open=!0}handleLoginDialogChange(e){e&&setTimeout((()=>{this.loginForm.querySelector("sc-input").triggerFocus()}),100)}handleLoggedInChange(e,t){!1===t&&e&&(this.notice=!0)}handleOrderChange(e,t){(null==e?void 0:e.updated_at)!==(null==t?void 0:t.updated_at)&&(this.notice=!1)}async handleFormSubmit(e){e.preventDefault(),e.stopImmediatePropagation(),this.error=null;const{login:t,password:o}=await e.target.getFormJson();try{this.loading=!0;const{name:e,email:r}=await apiFetch({method:"POST",path:"surecart/v1/login",data:{login:t,password:o}});this.scSetLoggedIn.emit(!0),this.scSetCustomer.emit({name:e,email:r}),this.open=!1}catch(e){console.error(e),this.error=(null==e?void 0:e.message)||__("Something went wrong","surecart")}finally{this.loading=!1}}render(){return h(Host,null,!!this.notice&&h("sc-alert",{type:"success",open:!0,style:{marginBottom:"var(--sc-form-row-spacing)"},closable:!0},h("span",{slot:"title"},__("Welcome back!","surecart")),__("You have logged in successfully.","surecart")),h("slot",null),!this.loggedIn&&h("sc-dialog",{label:__("Login to your account","surecart"),open:this.open,onScRequestClose:()=>this.open=!1},h("sc-form",{ref:e=>this.loginForm=e,onScFormSubmit:e=>{e.preventDefault(),e.stopImmediatePropagation()},onScSubmit:e=>this.handleFormSubmit(e)},!!this.error&&h("sc-alert",{type:"danger",open:!!this.error},this.error),h("sc-input",{label:__("Email or Username","surecart"),type:"text",name:"login",required:!0,autofocus:this.open}),h("sc-input",{label:__("Password","surecart"),type:"password",name:"password",required:!0}),h("sc-button",{type:"primary",full:!0,loading:this.loading,submit:!0},__("Login","surecart")))))}static get is(){return"sc-login-provider"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-login-provider.css"]}}static get styleUrls(){return{$:["sc-login-provider.css"]}}static get properties(){return{loggedIn:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Is the user logged in."},attribute:"logged-in",reflect:!1},order:{type:"unknown",mutable:!1,complexType:{original:"Checkout",resolved:"Checkout",references:{Checkout:{location:"import",path:"../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:""}}}}static get states(){return{notice:{},open:{},loading:{},error:{}}}static get events(){return[{method:"scSetLoggedIn",name:"scSetLoggedIn",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:""},complexType:{original:"boolean",resolved:"boolean",references:{}}},{method:"scSetCustomer",name:"scSetCustomer",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:""},complexType:{original:"{ email: string; name?: string }",resolved:"{ email: string; name?: string; }",references:{}}}]}static get watchers(){return[{propName:"open",methodName:"handleLoginDialogChange"},{propName:"loggedIn",methodName:"handleLoggedInChange"},{propName:"order",methodName:"handleOrderChange"}]}static get listeners(){return[{name:"scLoginPrompt",method:"handleLoginPrompt",target:void 0,capture:!1,passive:!1}]}}