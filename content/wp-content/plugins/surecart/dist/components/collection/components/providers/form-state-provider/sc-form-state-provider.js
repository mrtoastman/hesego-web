import{Component,h,State,Event,Listen,Watch}from"@stencil/core";import{checkoutMachine}from"./checkout-machine";import{interpret}from"@xstate/fsm";import{__}from"@wordpress/i18n";import{updateFormState}from"@store/form/mutations";export class ScFormStateProvider{constructor(){this._stateService=interpret(checkoutMachine),this.checkoutState=checkoutMachine.initialState}setState(t){const{send:e}=this._stateService;return updateFormState(t),e(t)}handleCheckoutStateChange(t){this.scSetCheckoutFormState.emit(t.value)}componentWillLoad(){this._stateService.subscribe((t=>this.checkoutState=t)),this._stateService.start()}disconnectedCallback(){this._stateService.stop()}handleSetStateEvent(t){this.setState(t.detail)}async handlePaid(){this.setState("PAID")}render(){return"expired"===this.checkoutState.value?h("sc-block-ui",null,h("div",null,__("Please refresh the page.","surecart"))):h("slot",null)}static get is(){return"sc-form-state-provider"}static get encapsulation(){return"shadow"}static get states(){return{checkoutState:{}}}static get events(){return[{method:"scSetCheckoutFormState",name:"scSetCheckoutFormState",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"Set the state."},complexType:{original:"FormState",resolved:'"confirmed" | "confirming" | "draft" | "expired" | "failure" | "finalizing" | "idle" | "loading" | "paid" | "paying" | "redirecting" | "updating"',references:{FormState:{location:"import",path:"../../../types"}}}}]}static get watchers(){return[{propName:"checkoutState",methodName:"handleCheckoutStateChange"}]}static get listeners(){return[{name:"scSetState",method:"handleSetStateEvent",target:void 0,capture:!1,passive:!1},{name:"scPaid",method:"handlePaid",target:void 0,capture:!1,passive:!1}]}}