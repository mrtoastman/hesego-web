import{a as o}from"./p-10aa7556.js";import"./p-47d251a3.js";import{s as d}from"./p-0bb69f38.js";import{a as i}from"./p-d8453138.js";import{a}from"./p-1c2e2695.js";import{g as n}from"./p-4d73f82a.js";const e="surecart/v1/checkouts/",t=["line_items","line_item.price","line_item.fees","price.product","customer","customer.shipping_address","payment_intent","discount","discount.promotion","recommended_bumps","bump.price","discount.coupon","shipping_address","staged_payment_intents","tax_identifier","manual_payment_method"],l=(d={})=>{var a,i,e,t;return{live_mode:"test"!==o.mode,group_key:o.groupId,abandoned_checkout_return_url:o.abandonedCheckoutReturnUrl||null,abandoned_checkout_enabled:o.abandonedCheckoutEnabled&&!!o.abandonedCheckoutReturnUrl,metadata:{...(null==d?void 0:d.metadata)||{},...(null===(a=null===window||void 0===window?void 0:window.scData)||void 0===a?void 0:a.page_id)&&{page_id:null===(i=null===window||void 0===window?void 0:window.scData)||void 0===i?void 0:i.page_id},...(null===(e=null==o?void 0:o.product)||void 0===e?void 0:e.id)&&{buy_page_product_id:null===(t=null==o?void 0:o.product)||void 0===t?void 0:t.id},page_url:window.location.href},...d}},u=(a={})=>{var i,e;return{...!!(null==o?void 0:o.formId)&&{form_id:null==o?void 0:o.formId},...!!(null===(i=null==o?void 0:o.product)||void 0===i?void 0:i.id)&&{product_id:null===(e=null==o?void 0:o.product)||void 0===e?void 0:e.id},...!!d.config.stripe.paymentElement&&{stage_processor_type:"stripe"},...a}},r=(o,d="")=>{let i=o?`${e}${o}`:e;return i=`${i}${d}`,a(i,{expand:t})},s=async({id:o,query:d={}})=>await i({path:a(r(o),u(d))}),p=async({id:d=null,data:e={},query:t={}})=>{var p,s;return d=d||n(window.location.href,"checkout_id")||((null===(p=null==o?void 0:o.checkout)||void 0===p?void 0:p.id)?null===(s=null==o?void 0:o.checkout)||void 0===s?void 0:s.id:null),await i({method:d?"PATCH":"POST",path:a(r(d),u(t)),data:l(e)})},m=async({id:o,data:d={},query:e={}})=>await i({method:"PATCH",path:a(r(o),u(e)),data:l(d)}),v=async({id:o,data:d={},query:e={},processor:t})=>await i({method:"POST",path:a(r(o,"/finalize"),u({...(null==t?void 0:t.manual)?{manual_payment:!0,manual_payment_method_id:null==t?void 0:t.id}:{processor_type:null==t?void 0:t.id},...e})),data:l(d)});export{s as a,e as b,p as c,t as e,v as f,m as u};