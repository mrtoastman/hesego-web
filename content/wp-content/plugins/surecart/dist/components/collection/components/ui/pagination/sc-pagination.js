import{Component,h,Prop,Watch,State,Event}from"@stencil/core";import{sprintf,__}from"@wordpress/i18n";export class ScPagination{constructor(){this.page=1,this.perPage=0,this.total=0,this.totalShowing=0,this.totalPages=0}componentWillLoad(){this.handlePaginationChange()}handlePaginationChange(){this.hasNextPage=this.total>1&&this.page<this.totalPages,this.hasPreviousPage=this.totalPages>1&&this.page>1,this.from=this.perPage*(this.page-1)+1,this.to=Math.min(this.from+this.totalShowing-1,this.total)}render(){return this.hasNextPage||this.hasPreviousPage?h("sc-flex",null,h("div",null,sprintf(__("Displaying %1d to %2d of %3d items","surecart"),this.from,this.to,this.total)),h("sc-flex",null,h("sc-button",{onClick:()=>this.scPrevPage.emit(),disabled:!this.hasPreviousPage,size:"small"},__("Previous","surecart")),h("sc-button",{onClick:()=>this.scNextPage.emit(),disabled:!this.hasNextPage,size:"small"},__("Next","surecart")))):null}static get is(){return"sc-pagination"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-pagination.css"]}}static get styleUrls(){return{$:["sc-pagination.css"]}}static get properties(){return{page:{type:"number",mutable:!1,complexType:{original:"number",resolved:"number",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"page",reflect:!1,defaultValue:"1"},perPage:{type:"number",mutable:!1,complexType:{original:"number",resolved:"number",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"per-page",reflect:!1,defaultValue:"0"},total:{type:"number",mutable:!1,complexType:{original:"number",resolved:"number",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"total",reflect:!1,defaultValue:"0"},totalShowing:{type:"number",mutable:!1,complexType:{original:"number",resolved:"number",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"total-showing",reflect:!1,defaultValue:"0"},totalPages:{type:"number",mutable:!1,complexType:{original:"number",resolved:"number",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"total-pages",reflect:!1,defaultValue:"0"}}}static get states(){return{hasNextPage:{},hasPreviousPage:{},from:{},to:{}}}static get events(){return[{method:"scPrevPage",name:"scPrevPage",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:""},complexType:{original:"void",resolved:"void",references:{}}},{method:"scNextPage",name:"scNextPage",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:""},complexType:{original:"void",resolved:"void",references:{}}}]}static get watchers(){return[{propName:"total",methodName:"handlePaginationChange"},{propName:"totalPages",methodName:"handlePaginationChange"},{propName:"page",methodName:"handlePaginationChange"},{propName:"perPage",methodName:"handlePaginationChange"},{propName:"totalShowing",methodName:"handlePaginationChange"}]}}