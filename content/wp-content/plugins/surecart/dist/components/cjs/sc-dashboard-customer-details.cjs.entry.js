"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const index=require("./index-9c866aeb.js"),fetch=require("./fetch-b673a242.js"),lazy=require("./lazy-bc8baeab.js"),addQueryArgs=require("./add-query-args-17c551b6.js"),scDashboardCustomerDetailsCss=":host{display:block;position:relative}.customer-details{display:grid;gap:0.75em}",ScDashboardCustomerDetails=class{constructor(e){index.registerInstance(this,e)}componentWillLoad(){lazy.onFirstVisible(this.el,(()=>{this.fetch()}))}async fetch(){if(""!==this.customerId)try{this.loading=!0,this.customer=await await fetch.apiFetch({path:addQueryArgs.addQueryArgs(`surecart/v1/customers/${this.customerId}`,{expand:["shipping_address","billing_address","tax_identifier"]})})}catch(e){(null==e?void 0:e.message)?this.error=e.message:this.error=wp.i18n.__("Something went wrong","surecart"),console.error(this.error)}finally{this.loading=!1}}render(){return index.h("sc-customer-details",{customer:this.customer,loading:this.loading,error:this.error,heading:this.heading,"edit-link":addQueryArgs.addQueryArgs(window.location.href,{action:"edit",model:"customer",id:this.customerId})})}get el(){return index.getElement(this)}};ScDashboardCustomerDetails.style=scDashboardCustomerDetailsCss,exports.sc_dashboard_customer_details=ScDashboardCustomerDetails;