import{r as registerInstance,h,g as getElement}from"./index-fd4790f6.js";import{a as apiFetch}from"./fetch-34712ac6.js";import{o as onFirstVisible}from"./lazy-64c2bf3b.js";import{a as addQueryArgs}from"./add-query-args-f4c5962b.js";const scChargesListCss=":host{display:block;position:relative}.charges-list{display:grid;gap:1em}",ScChargesList=class{constructor(e){registerInstance(this,e),this.query={page:1,per_page:10},this.showPagination=!0,this.charges=[],this.pagination={total:0,total_pages:0}}componentWillLoad(){onFirstVisible(this.el,(()=>{this.getItems()}))}async getItems(){try{this.loading=!0;const e=await apiFetch({path:addQueryArgs("surecart/v1/charges/",{expand:["checkout","checkout.order"],...this.query}),parse:!1});this.pagination={total:parseInt(e.headers.get("X-WP-Total")),total_pages:parseInt(e.headers.get("X-WP-TotalPages"))},this.charges=await e.json()}catch(e){(null==e?void 0:e.message)?this.error=e.message:this.error=wp.i18n.__("Something went wrong","surecart"),console.error(this.error)}finally{this.loading=!1,this.loaded=!0}}renderRefundStatus(e){return(null==e?void 0:e.fully_refunded)?h("sc-tag",{type:"danger"},wp.i18n.__("Refunded","surecart")):(null==e?void 0:e.refunded_amount)?h("sc-tag",{type:"warning"},wp.i18n.__("Partially Refunded","surecart")):h("sc-tag",{type:"success"},wp.i18n.__("Paid","surecart"))}renderEmpty(){return h("sc-stacked-list-row",{"mobile-size":0},h("slot",{name:"empty"},wp.i18n.__("You have no saved payment methods.","surecart")))}renderLoading(){return h("sc-stacked-list-row",{style:{"--columns":"2"},"mobile-size":0},h("div",{style:{padding:"0.5em"}},h("sc-skeleton",{style:{width:"30%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"20%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"40%"}})))}renderContent(){var e;return this.loading&&!this.loaded?this.renderLoading():0===(null===(e=this.charges)||void 0===e?void 0:e.length)?this.renderEmpty():this.charges.map((e=>{var t;const{currency:s,amount:r,created_at:a}=e;return h("sc-stacked-list-row",{style:{"--columns":"4"},"mobile-size":600,href:addQueryArgs(window.location.href,{action:"show",model:"order",id:null===(t=e.checkout.order)||void 0===t?void 0:t.id})},h("strong",null,h("sc-format-date",{date:a,type:"timestamp",month:"short",day:"numeric",year:"numeric"})),h("sc-text",{style:{"--color":"var(--sc-color-gray-500)"}},wp.i18n.sprintf(wp.i18n.__("#%s","surecart"),e.checkout.order.number)),h("div",null,this.renderRefundStatus(e)),h("strong",null,h("sc-format-number",{type:"currency",value:r,currency:s})))}))}nextPage(){this.query.page=this.query.page+1,this.getItems()}prevPage(){this.query.page=this.query.page-1,this.getItems()}render(){var e;return h("sc-dashboard-module",{class:"charges-list",error:this.error},h("span",{slot:"heading"},h("slot",{name:"heading"},this.heading||wp.i18n.__("Payment History","surecart"))),!!this.allLink&&h("sc-button",{type:"link",href:this.allLink,slot:"end"},wp.i18n.__("View all","surecart"),h("sc-icon",{name:"chevron-right",slot:"suffix"})),h("sc-card",{"no-padding":!0,style:{"--overflow":"hidden"}},h("sc-stacked-list",null,this.renderContent())),this.showPagination&&h("sc-pagination",{page:this.query.page,perPage:this.query.per_page,total:this.pagination.total,totalPages:this.pagination.total_pages,totalShowing:null===(e=null==this?void 0:this.charges)||void 0===e?void 0:e.length,onScNextPage:()=>this.nextPage(),onScPrevPage:()=>this.prevPage()}),this.loading&&this.loaded&&h("sc-block-ui",{spinner:!0}))}get el(){return getElement(this)}};ScChargesList.style=scChargesListCss;export{ScChargesList as sc_charges_list};