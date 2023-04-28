import{r as t,h as s,g as a}from"./p-dfbe004d.js";import{a as i}from"./p-d8453138.js";import{o}from"./p-c2833cb1.js";import{a as e}from"./p-1c2e2695.js";const h=class{constructor(s){t(this,s),this.query={page:1,per_page:10},this.purchases=[],this.pagination={total:0,total_pages:0}}componentWillLoad(){o(this.el,(()=>{this.initialFetch()}))}async initialFetch(){if(this.isCustomer)try{this.loading=!0,await this.getItems()}catch(t){console.error(this.error),this.error=(null==t?void 0:t.message)||wp.i18n.__("Something went wrong","surecart")}finally{this.loading=!1}}async fetchItems(){if(this.isCustomer)try{this.busy=!0,await this.getItems()}catch(t){console.error(this.error),this.error=(null==t?void 0:t.message)||wp.i18n.__("Something went wrong","surecart")}finally{this.busy=!1}}async getItems(){const t=await await i({path:e("surecart/v1/purchases/",{expand:["product","product.downloads","download.media"],downloadable:!0,revoked:!1,...this.query}),parse:!1});return this.pagination={total:parseInt(t.headers.get("X-WP-Total")),total_pages:parseInt(t.headers.get("X-WP-TotalPages"))},this.purchases=await t.json(),this.purchases}nextPage(){this.query.page=this.query.page+1,this.fetchItems()}prevPage(){this.query.page=this.query.page-1,this.fetchItems()}render(){var t;return s("sc-purchase-downloads-list",{heading:this.heading,allLink:this.allLink&&this.pagination.total_pages>1?this.allLink:"",loading:this.loading,busy:this.busy,requestNonce:this.requestNonce,error:this.error,purchases:this.purchases},s("span",{slot:"heading"},s("slot",{name:"heading"},this.heading||wp.i18n.__("Downloads","surecart"))),s("sc-pagination",{slot:"after",page:this.query.page,perPage:this.query.per_page,total:this.pagination.total,totalPages:this.pagination.total_pages,totalShowing:null===(t=null==this?void 0:this.purchases)||void 0===t?void 0:t.length,onScNextPage:()=>this.nextPage(),onScPrevPage:()=>this.prevPage()}))}get el(){return a(this)}};h.style=":host{display:block}.download__details{opacity:0.75}";export{h as sc_dashboard_downloads_list};