"use strict";const store=require("./store-6708f186.js"),formLoading=()=>"loading"===store.state.formState.value,formBusy=()=>["updating","finalizing","paying","confirming"].includes(store.state.formState.value);exports.formBusy=formBusy,exports.formLoading=formLoading;