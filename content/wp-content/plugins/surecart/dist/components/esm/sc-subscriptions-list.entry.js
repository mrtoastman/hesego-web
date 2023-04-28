import{r as registerInstance,h,g as getElement}from"./index-fd4790f6.js";import{a as apiFetch}from"./fetch-34712ac6.js";import{o as onFirstVisible}from"./lazy-64c2bf3b.js";import{a as addQueryArgs}from"./add-query-args-f4c5962b.js";const scSubscriptionsListCss=":host{display:block}.subscriptions-list{display:grid;gap:0.5em}.subscriptions-list__heading{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;margin-bottom:0.5em}.subscriptions-list__title{font-size:var(--sc-font-size-x-large);font-weight:var(--sc-font-weight-bold);line-height:var(--sc-line-height-dense)}.subscriptions-list a{text-decoration:none;font-weight:var(--sc-font-weight-semibold);display:inline-flex;align-items:center;gap:0.25em;color:var(--sc-color-primary-500)}.subscriptions__title{display:none}.subscriptions--has-title-slot .subscriptions__title{display:block}",ScSubscriptionsList=class{constructor(s){registerInstance(this,s),this.query={page:1,per_page:10},this.cancelBehavior="period_end",this.subscriptions=[],this.pagination={total:0,total_pages:0}}componentWillLoad(){onFirstVisible(this.el,(()=>{this.initialFetch()}))}async initialFetch(){try{this.loading=!0,await this.getSubscriptions()}catch(s){console.error(this.error),this.error=(null==s?void 0:s.message)||wp.i18n.__("Something went wrong","surecart")}finally{this.loading=!1}}async fetchSubscriptions(){try{this.busy=!0,await this.getSubscriptions()}catch(s){console.error(this.error),this.error=(null==s?void 0:s.message)||wp.i18n.__("Something went wrong","surecart")}finally{this.busy=!1}}async getSubscriptions(){if(!this.isCustomer)return;const s=await await apiFetch({path:addQueryArgs("surecart/v1/subscriptions/",{expand:["price","price.product","current_period","period.checkout","purchase","purchase.license","license.activations","discount","discount.coupon"],...this.query}),parse:!1});return this.pagination={total:parseInt(s.headers.get("X-WP-Total")),total_pages:parseInt(s.headers.get("X-WP-TotalPages"))},this.subscriptions=await s.json(),this.subscriptions}nextPage(){this.query.page=this.query.page+1,this.fetchSubscriptions()}prevPage(){this.query.page=this.query.page-1,this.fetchSubscriptions()}renderEmpty(){return h("div",null,h("sc-divider",{style:{"--spacing":"0"}}),h("slot",{name:"empty"},h("sc-empty",{icon:"repeat"},wp.i18n.__("You don't have any subscriptions.","surecart"))))}renderLoading(){return h("sc-card",{"no-padding":!0,style:{"--overflow":"hidden"}},h("sc-stacked-list",null,h("sc-stacked-list-row",{style:{"--columns":"2"},"mobile-size":0},h("div",{style:{padding:"0.5em"}},h("sc-skeleton",{style:{width:"30%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"20%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"40%"}})))))}renderList(){return this.subscriptions.map((s=>h("sc-stacked-list-row",{href:addQueryArgs(window.location.href,{action:"edit",model:"subscription",id:s.id}),key:s.id,"mobile-size":0},h("sc-subscription-details",{subscription:s}),h("sc-icon",{name:"chevron-right",slot:"suffix"}))))}renderContent(){var s;return this.loading?this.renderLoading():0===(null===(s=this.subscriptions)||void 0===s?void 0:s.length)?this.renderEmpty():h("sc-card",{"no-padding":!0,style:{"--overflow":"hidden"}},h("sc-stacked-list",null,this.renderList()))}render(){var s,t;return h("sc-dashboard-module",{class:"subscriptions-list",error:this.error},h("span",{slot:"heading"},h("slot",{name:"heading"},this.heading||wp.i18n.__("Subscriptions","surecart"))),!!this.allLink&&!!(null===(s=this.subscriptions)||void 0===s?void 0:s.length)&&h("sc-button",{type:"link",href:this.allLink,slot:"end"},wp.i18n.__("View all","surecart"),h("sc-icon",{name:"chevron-right",slot:"suffix"})),this.renderContent(),!this.allLink&&h("sc-pagination",{page:this.query.page,perPage:this.query.per_page,total:this.pagination.total,totalPages:this.pagination.total_pages,totalShowing:null===(t=null==this?void 0:this.subscriptions)||void 0===t?void 0:t.length,onScNextPage:()=>this.nextPage(),onScPrevPage:()=>this.prevPage()}),this.busy&&h("sc-block-ui",null))}get el(){return getElement(this)}};ScSubscriptionsList.style=scSubscriptionsListCss;export{ScSubscriptionsList as sc_subscriptions_list};