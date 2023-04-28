import{Component,Element,h,Prop,State}from"@stencil/core";import{sprintf,__}from"@wordpress/i18n";import{addQueryArgs}from"@wordpress/url";import apiFetch from"../../../../functions/fetch";import{onFirstVisible}from"../../../../functions/lazy";export class ScChargesList{constructor(){this.query={page:1,per_page:10},this.showPagination=!0,this.charges=[],this.pagination={total:0,total_pages:0}}componentWillLoad(){onFirstVisible(this.el,(()=>{this.getItems()}))}async getItems(){try{this.loading=!0;const e=await apiFetch({path:addQueryArgs("surecart/v1/charges/",{expand:["checkout","checkout.order"],...this.query}),parse:!1});this.pagination={total:parseInt(e.headers.get("X-WP-Total")),total_pages:parseInt(e.headers.get("X-WP-TotalPages"))},this.charges=await e.json()}catch(e){(null==e?void 0:e.message)?this.error=e.message:this.error=__("Something went wrong","surecart"),console.error(this.error)}finally{this.loading=!1,this.loaded=!0}}renderRefundStatus(e){return(null==e?void 0:e.fully_refunded)?h("sc-tag",{type:"danger"},__("Refunded","surecart")):(null==e?void 0:e.refunded_amount)?h("sc-tag",{type:"warning"},__("Partially Refunded","surecart")):h("sc-tag",{type:"success"},__("Paid","surecart"))}renderEmpty(){return h("sc-stacked-list-row",{"mobile-size":0},h("slot",{name:"empty"},__("You have no saved payment methods.","surecart")))}renderLoading(){return h("sc-stacked-list-row",{style:{"--columns":"2"},"mobile-size":0},h("div",{style:{padding:"0.5em"}},h("sc-skeleton",{style:{width:"30%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"20%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"40%"}})))}renderContent(){var e;return this.loading&&!this.loaded?this.renderLoading():0===(null===(e=this.charges)||void 0===e?void 0:e.length)?this.renderEmpty():this.charges.map((e=>{var t;const{currency:r,amount:s,created_at:a}=e;return h("sc-stacked-list-row",{style:{"--columns":"4"},"mobile-size":600,href:addQueryArgs(window.location.href,{action:"show",model:"order",id:null===(t=e.checkout.order)||void 0===t?void 0:t.id})},h("strong",null,h("sc-format-date",{date:a,type:"timestamp",month:"short",day:"numeric",year:"numeric"})),h("sc-text",{style:{"--color":"var(--sc-color-gray-500)"}},sprintf(__("#%s","surecart"),e.checkout.order.number)),h("div",null,this.renderRefundStatus(e)),h("strong",null,h("sc-format-number",{type:"currency",value:s,currency:r})))}))}nextPage(){this.query.page=this.query.page+1,this.getItems()}prevPage(){this.query.page=this.query.page-1,this.getItems()}render(){var e;return h("sc-dashboard-module",{class:"charges-list",error:this.error},h("span",{slot:"heading"},h("slot",{name:"heading"},this.heading||__("Payment History","surecart"))),!!this.allLink&&h("sc-button",{type:"link",href:this.allLink,slot:"end"},__("View all","surecart"),h("sc-icon",{name:"chevron-right",slot:"suffix"})),h("sc-card",{"no-padding":!0,style:{"--overflow":"hidden"}},h("sc-stacked-list",null,this.renderContent())),this.showPagination&&h("sc-pagination",{page:this.query.page,perPage:this.query.per_page,total:this.pagination.total,totalPages:this.pagination.total_pages,totalShowing:null===(e=null==this?void 0:this.charges)||void 0===e?void 0:e.length,onScNextPage:()=>this.nextPage(),onScPrevPage:()=>this.prevPage()}),this.loading&&this.loaded&&h("sc-block-ui",{spinner:!0}))}static get is(){return"sc-charges-list"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-charges-list.scss"]}}static get styleUrls(){return{$:["sc-charges-list.css"]}}static get properties(){return{query:{type:"unknown",mutable:!0,complexType:{original:"{\n    page: number;\n    per_page: number;\n  }",resolved:"{ page: number; per_page: number; }",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Query to fetch charges"},defaultValue:"{\n    page: 1,\n    per_page: 10,\n  }"},heading:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"heading",reflect:!1},showPagination:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"show-pagination",reflect:!1,defaultValue:"true"},allLink:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"all-link",reflect:!1}}}static get states(){return{charges:{},loading:{},loaded:{},error:{},pagination:{}}}static get elementRef(){return"el"}}