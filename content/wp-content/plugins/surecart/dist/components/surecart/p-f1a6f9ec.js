class i{constructor(t,i){this.form=null,this.input=t,this.options={form:t=>{var i,e;return(null===(e=null===(i=this.closestElement("sc-form",t))||void 0===i?void 0:i.shadowRoot)||void 0===e?void 0:e.querySelector("form"))||this.closestElement("form",t)},name:t=>t.name,value:t=>t.value,disabled:t=>t.disabled,...i},this.form=this.options.form(this.input),this.handleFormData=this.handleFormData.bind(this)}closestElement(t,i){return i?i&&i!=document&&i!=window&&i.closest(t)||this.closestElement(t,i.getRootNode().host):null}addFormData(){this.form&&this.form.addEventListener("formdata",this.handleFormData)}removeFormData(){this.form&&this.form.removeEventListener("formdata",this.handleFormData)}handleFormData(t){const i=this.options.name(this.input),e=this.options.value(this.input);"string"==typeof i&&void 0!==e&&(Array.isArray(e)?e.forEach((e=>{e&&t.formData.append(i,e.toString())})):e&&t.formData.append(i,e.toString()))}}const t=t=>{var i;const{email:e,name:n,first_name:o,last_name:s,password:a,shipping_city:r,shipping_country:l,shipping_line_1:d,shipping_line_2:m,shipping_postal_code:h,shipping_state:p,billing_city:c,billing_country:_,billing_line_1:u,billing_line_2:f,billing_postal_code:y,billing_state:g,"tax_identifier.number_type":b,"tax_identifier.number":v,...D}=t,F={...r?{city:r}:{},...l?{country:l}:{},...d?{line_1:d}:{},...m?{line_2:m}:{},...h?{postal_code:h}:{},...p?{state:p}:{}},w={...c?{city:c}:{},..._?{country:_}:{},...u?{line_1:u}:{},...f?{line_2:f}:{},...y?{postal_code:y}:{},...g?{state:g}:{}};return{...n?{name:n}:{},...e?{email:e}:{},...o?{first_name:o}:{},...s?{last_name:s}:{},...a?{password:a}:{},...Object.keys(F||{}).length?{shipping_address:F}:{},...Object.keys(w||{}).length?{billing_address:w}:{},...b&&v?{tax_identifier:{number:v,number_type:b}}:{},...(null===(i=Object.keys(D))||void 0===i?void 0:i.length)?{metadata:D}:{}}},s=async t=>{const i=[...t.shadowRoot.querySelectorAll("*")].filter((t=>"function"==typeof t.reportValidity));for(const t of i)if(!await t.reportValidity())return!1;return!0};export{i as F,t as p,s as r};