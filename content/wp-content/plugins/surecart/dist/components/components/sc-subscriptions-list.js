import{proxyCustomElement,HTMLElement,h}from"@stencil/core/internal/client";import{a as apiFetch}from"./fetch.js";import{o as onFirstVisible}from"./lazy.js";import{d as defineCustomElement$m}from"./sc-alert2.js";import{d as defineCustomElement$l}from"./sc-block-ui2.js";import{d as defineCustomElement$k}from"./sc-button2.js";import{d as defineCustomElement$j}from"./sc-card2.js";import{d as defineCustomElement$i}from"./sc-dashboard-module2.js";import{d as defineCustomElement$h}from"./sc-dialog2.js";import{d as defineCustomElement$g}from"./sc-divider2.js";import{d as defineCustomElement$f}from"./sc-empty2.js";import{d as defineCustomElement$e}from"./sc-flex2.js";import{d as defineCustomElement$d}from"./sc-format-date2.js";import{d as defineCustomElement$c}from"./sc-format-number2.js";import{d as defineCustomElement$b}from"./sc-icon2.js";import{d as defineCustomElement$a}from"./sc-pagination2.js";import{d as defineCustomElement$9}from"./sc-skeleton2.js";import{d as defineCustomElement$8}from"./sc-spinner2.js";import{d as defineCustomElement$7}from"./sc-stacked-list2.js";import{d as defineCustomElement$6}from"./sc-stacked-list-row2.js";import{d as defineCustomElement$5}from"./sc-subscription-details2.js";import{d as defineCustomElement$4}from"./sc-subscription-status-badge2.js";import{d as defineCustomElement$3}from"./sc-tag2.js";import{d as defineCustomElement$2}from"./sc-text2.js";import{a as addQueryArgs}from"./add-query-args.js";const scSubscriptionsListCss=":host{display:block}.subscriptions-list{display:grid;gap:0.5em}.subscriptions-list__heading{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;margin-bottom:0.5em}.subscriptions-list__title{font-size:var(--sc-font-size-x-large);font-weight:var(--sc-font-weight-bold);line-height:var(--sc-line-height-dense)}.subscriptions-list a{text-decoration:none;font-weight:var(--sc-font-weight-semibold);display:inline-flex;align-items:center;gap:0.25em;color:var(--sc-color-primary-500)}.subscriptions__title{display:none}.subscriptions--has-title-slot .subscriptions__title{display:block}",ScSubscriptionsList$1=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.query={page:1,per_page:10},this.cancelBehavior="period_end",this.subscriptions=[],this.pagination={total:0,total_pages:0}}componentWillLoad(){onFirstVisible(this.el,(()=>{this.initialFetch()}))}async initialFetch(){try{this.loading=!0,await this.getSubscriptions()}catch(e){console.error(this.error),this.error=(null==e?void 0:e.message)||wp.i18n.__("Something went wrong","surecart")}finally{this.loading=!1}}async fetchSubscriptions(){try{this.busy=!0,await this.getSubscriptions()}catch(e){console.error(this.error),this.error=(null==e?void 0:e.message)||wp.i18n.__("Something went wrong","surecart")}finally{this.busy=!1}}async getSubscriptions(){if(!this.isCustomer)return;const e=await await apiFetch({path:addQueryArgs("surecart/v1/subscriptions/",{expand:["price","price.product","current_period","period.checkout","purchase","purchase.license","license.activations","discount","discount.coupon"],...this.query}),parse:!1});return this.pagination={total:parseInt(e.headers.get("X-WP-Total")),total_pages:parseInt(e.headers.get("X-WP-TotalPages"))},this.subscriptions=await e.json(),this.subscriptions}nextPage(){this.query.page=this.query.page+1,this.fetchSubscriptions()}prevPage(){this.query.page=this.query.page-1,this.fetchSubscriptions()}renderEmpty(){return h("div",null,h("sc-divider",{style:{"--spacing":"0"}}),h("slot",{name:"empty"},h("sc-empty",{icon:"repeat"},wp.i18n.__("You don't have any subscriptions.","surecart"))))}renderLoading(){return h("sc-card",{"no-padding":!0,style:{"--overflow":"hidden"}},h("sc-stacked-list",null,h("sc-stacked-list-row",{style:{"--columns":"2"},"mobile-size":0},h("div",{style:{padding:"0.5em"}},h("sc-skeleton",{style:{width:"30%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"20%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"40%"}})))))}renderList(){return this.subscriptions.map((e=>h("sc-stacked-list-row",{href:addQueryArgs(window.location.href,{action:"edit",model:"subscription",id:e.id}),key:e.id,"mobile-size":0},h("sc-subscription-details",{subscription:e}),h("sc-icon",{name:"chevron-right",slot:"suffix"}))))}renderContent(){var e;return this.loading?this.renderLoading():0===(null===(e=this.subscriptions)||void 0===e?void 0:e.length)?this.renderEmpty():h("sc-card",{"no-padding":!0,style:{"--overflow":"hidden"}},h("sc-stacked-list",null,this.renderList()))}render(){var e,s;return h("sc-dashboard-module",{class:"subscriptions-list",error:this.error},h("span",{slot:"heading"},h("slot",{name:"heading"},this.heading||wp.i18n.__("Subscriptions","surecart"))),!!this.allLink&&!!(null===(e=this.subscriptions)||void 0===e?void 0:e.length)&&h("sc-button",{type:"link",href:this.allLink,slot:"end"},wp.i18n.__("View all","surecart"),h("sc-icon",{name:"chevron-right",slot:"suffix"})),this.renderContent(),!this.allLink&&h("sc-pagination",{page:this.query.page,perPage:this.query.per_page,total:this.pagination.total,totalPages:this.pagination.total_pages,totalShowing:null===(s=null==this?void 0:this.subscriptions)||void 0===s?void 0:s.length,onScNextPage:()=>this.nextPage(),onScPrevPage:()=>this.prevPage()}),this.busy&&h("sc-block-ui",null))}get el(){return this}static get style(){return scSubscriptionsListCss}},[1,"sc-subscriptions-list",{query:[1040],allLink:[1,"all-link"],heading:[1],isCustomer:[4,"is-customer"],cancelBehavior:[1,"cancel-behavior"],subscriptions:[32],loading:[32],busy:[32],error:[32],pagination:[32]}]);function defineCustomElement$1(){"undefined"!=typeof customElements&&["sc-subscriptions-list","sc-alert","sc-block-ui","sc-button","sc-card","sc-dashboard-module","sc-dialog","sc-divider","sc-empty","sc-flex","sc-format-date","sc-format-number","sc-icon","sc-pagination","sc-skeleton","sc-spinner","sc-stacked-list","sc-stacked-list-row","sc-subscription-details","sc-subscription-status-badge","sc-tag","sc-text"].forEach((e=>{switch(e){case"sc-subscriptions-list":customElements.get(e)||customElements.define(e,ScSubscriptionsList$1);break;case"sc-alert":customElements.get(e)||defineCustomElement$m();break;case"sc-block-ui":customElements.get(e)||defineCustomElement$l();break;case"sc-button":customElements.get(e)||defineCustomElement$k();break;case"sc-card":customElements.get(e)||defineCustomElement$j();break;case"sc-dashboard-module":customElements.get(e)||defineCustomElement$i();break;case"sc-dialog":customElements.get(e)||defineCustomElement$h();break;case"sc-divider":customElements.get(e)||defineCustomElement$g();break;case"sc-empty":customElements.get(e)||defineCustomElement$f();break;case"sc-flex":customElements.get(e)||defineCustomElement$e();break;case"sc-format-date":customElements.get(e)||defineCustomElement$d();break;case"sc-format-number":customElements.get(e)||defineCustomElement$c();break;case"sc-icon":customElements.get(e)||defineCustomElement$b();break;case"sc-pagination":customElements.get(e)||defineCustomElement$a();break;case"sc-skeleton":customElements.get(e)||defineCustomElement$9();break;case"sc-spinner":customElements.get(e)||defineCustomElement$8();break;case"sc-stacked-list":customElements.get(e)||defineCustomElement$7();break;case"sc-stacked-list-row":customElements.get(e)||defineCustomElement$6();break;case"sc-subscription-details":customElements.get(e)||defineCustomElement$5();break;case"sc-subscription-status-badge":customElements.get(e)||defineCustomElement$4();break;case"sc-tag":customElements.get(e)||defineCustomElement$3();break;case"sc-text":customElements.get(e)||defineCustomElement$2()}}))}defineCustomElement$1();const ScSubscriptionsList=ScSubscriptionsList$1,defineCustomElement=defineCustomElement$1;export{ScSubscriptionsList,defineCustomElement};