import{checkoutMachine}from"../../../src/components/providers/form-state-provider/checkout-machine";import{interpret}from"@xstate/fsm";import state from"./store";const service=interpret(checkoutMachine);service.subscribe((e=>state.formState=e)),service.start();export default service;