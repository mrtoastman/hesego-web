import{Component,Event,h,Prop}from"@stencil/core";import{state as checkoutState}from"@store/checkout";import{lockCheckout,unLockCheckout}from"@store/checkout/mutations";import{createOrUpdateCheckout}from"../../../../services/session";import{openWormhole}from"stencil-wormhole";export class ScOrderTaxIdInput{constructor(){this.show=!1,this.busy=!1}getStatus(){var e,t,a;return"eu_vat"!==(null===(e=this.taxIdentifier)||void 0===e?void 0:e.number_type)||"apply_reverse_charge"===(null===(t=this.taxProtocol)||void 0===t?void 0:t.eu_vat_unverified_behavior)?"unknown":(null===(a=this.taxIdentifier)||void 0===a?void 0:a.eu_vat_verified)?"valid":"invalid"}async maybeUpdateOrder(e){try{lockCheckout("tax_identifier"),checkoutState.checkout=await createOrUpdateCheckout({id:checkoutState.checkout.id,data:{tax_identifier:e}})}catch(e){console.error(e),this.scError.emit(e)}finally{unLockCheckout("tax_identifier")}}render(){var e,t,a,o,r,n;return h("sc-tax-id-input",{show:this.show,number:null===(t=null===(e=this.order)||void 0===e?void 0:e.tax_identifier)||void 0===t?void 0:t.number,type:null===(o=null===(a=this.order)||void 0===a?void 0:a.tax_identifier)||void 0===o?void 0:o.number_type,country:null===(n=null===(r=null==this?void 0:this.order)||void 0===r?void 0:r.shipping_address)||void 0===n?void 0:n.country,status:this.getStatus(),loading:this.busy,onScChange:e=>{e.stopImmediatePropagation(),this.maybeUpdateOrder(e.detail)},otherLabel:this.otherLabel,caGstLabel:this.caGstLabel,auAbnLabel:this.auAbnLabel,gbVatLabel:this.gbVatLabel,euVatLabel:this.euVatLabel})}static get is(){return"sc-order-tax-id-input"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-order-tax-id-input.css"]}}static get styleUrls(){return{$:["sc-order-tax-id-input.css"]}}static get properties(){return{order:{type:"unknown",mutable:!1,complexType:{original:"Partial<Checkout>",resolved:'{ id?: string; status?: "draft" | "paid" | "canceled" | "finalized" | "payment_intent_canceled" | "payment_failed" | "processing"; staged_payment_intents?: { object: "list"; pagination: Pagination; data: PaymentIntent[]; }; abandoned_checkout_enabled?: boolean; bump_amount?: number; payment_method_required?: boolean; manual_payment?: boolean; manual_payment_method?: string | ManualPaymentMethod; reusable_payment_method_required?: boolean; number?: string; amount_due?: number; trial_amount?: number; charge?: string | Charge; name?: string; email?: string; live_mode?: boolean; currency?: string; total_amount?: number; subtotal_amount?: number; full_amount?: number; proration_amount?: number; total_savings_amount?: number; applied_balance_amount?: number; discounts?: number; tax_enabled?: boolean; tax_amount?: number; email_exists?: boolean; tax_inclusive_amount?: number; tax_exclusive_amount?: number; tax_status?: "disabled" | "address_invalid" | "estimated" | "calculated"; tax_label?: string; tax_percent?: number; line_items?: lineItems; recommended_bumps?: { object: "list"; pagination: Pagination; data: Bump[]; }; metadata?: any; payment_intent?: PaymentIntent; payment_method?: PaymentMethod; order?: string | Order; customer?: string | Customer; subscriptions?: { object: "list"; pagination: Pagination; data: Subscription[]; }; purchases?: { object: "list"; pagination: Pagination; data: Purchase[]; }; discount_amount?: number; discount?: DiscountResponse; billing_address?: string | Address; shipping_address?: string | Address; shipping_enabled?: boolean; processor_data?: ProcessorData; tax_identifier?: { number: string; number_type: string; }; url?: string; created_at?: number; constructor?: Function; toString?: () => string; toLocaleString?: () => string; valueOf?: () => Object; hasOwnProperty?: (v: PropertyKey) => boolean; isPrototypeOf?: (v: Object) => boolean; propertyIsEnumerable?: (v: PropertyKey) => boolean; }',references:{Partial:{location:"global"},Checkout:{location:"import",path:"../../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:"The order"}},show:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Force show the field."},attribute:"show",reflect:!1,defaultValue:"false"},taxIdentifier:{type:"unknown",mutable:!1,complexType:{original:"TaxIdentifier",resolved:"TaxIdentifier",references:{TaxIdentifier:{location:"import",path:"../../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:"Tax identifier"}},taxProtocol:{type:"unknown",mutable:!1,complexType:{original:"TaxProtocol",resolved:"TaxProtocol",references:{TaxProtocol:{location:"import",path:"../../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:"The tax protocol."}},busy:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Is this busy"},attribute:"busy",reflect:!1,defaultValue:"false"},otherLabel:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Other zones label"},attribute:"other-label",reflect:!1},caGstLabel:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"GST zone label"},attribute:"ca-gst-label",reflect:!1},auAbnLabel:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"AU zone label"},attribute:"au-abn-label",reflect:!1},gbVatLabel:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"UK zone label"},attribute:"gb-vat-label",reflect:!1},euVatLabel:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"EU zone label"},attribute:"eu-vat-label",reflect:!1}}}static get events(){return[{method:"scUpdateOrder",name:"scUpdateOrder",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"Make a request to update the order."},complexType:{original:"{\n    data: Partial<Checkout>;\n    options?: { silent?: boolean };\n  }",resolved:"{ data: Partial<Checkout>; options?: { silent?: boolean; }; }",references:{Partial:{location:"global"},Checkout:{location:"import",path:"../../../../types"}}}},{method:"scError",name:"scError",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"Error event"},complexType:{original:"ResponseError",resolved:"ResponseError",references:{ResponseError:{location:"import",path:"../../../../types"}}}}]}}openWormhole(ScOrderTaxIdInput,["draft","order","tax_status","taxIdentifier","taxProtocol","busy"],!1);