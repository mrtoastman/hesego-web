import{c as createStore}from"./index-26bbcef3.js";const{state:state,onChange:onChange,dispose:dispose}=createStore({id:"",method:"",manual:!1});onChange("id",(()=>{state.manual=(null==state?void 0:state.id)&&!["paypal","stripe","mollie"].includes(state.id)}));export{onChange as o,state as s};