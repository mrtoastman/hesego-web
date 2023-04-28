class FormSubmitController{constructor(t,i){this.form=null,this.input=t,this.options={form:t=>{var i,e;return(null===(e=null===(i=this.closestElement("sc-form",t))||void 0===i?void 0:i.shadowRoot)||void 0===e?void 0:e.querySelector("form"))||this.closestElement("form",t)},name:t=>t.name,value:t=>t.value,disabled:t=>t.disabled,...i},this.form=this.options.form(this.input),this.handleFormData=this.handleFormData.bind(this)}closestElement(t,i){return i?i&&i!=document&&i!=window&&i.closest(t)||this.closestElement(t,i.getRootNode().host):null}addFormData(){this.form&&this.form.addEventListener("formdata",this.handleFormData)}removeFormData(){this.form&&this.form.removeEventListener("formdata",this.handleFormData)}handleFormData(t){const i=this.options.name(this.input),e=this.options.value(this.input);"string"==typeof i&&void 0!==e&&(Array.isArray(e)?e.forEach((e=>{e&&t.formData.append(i,e.toString())})):e&&t.formData.append(i,e.toString()))}}const parseFormData=t=>{var i;const{email:e,name:o,first_name:n,last_name:r,password:a,shipping_city:s,shipping_country:l,shipping_line_1:m,shipping_line_2:d,shipping_postal_code:p,shipping_state:h,billing_city:c,billing_country:_,billing_line_1:u,billing_line_2:f,billing_postal_code:y,billing_state:g,"tax_identifier.number_type":b,"tax_identifier.number":v,...F}=t,D={...s?{city:s}:{},...l?{country:l}:{},...m?{line_1:m}:{},...d?{line_2:d}:{},...p?{postal_code:p}:{},...h?{state:h}:{}},w={...c?{city:c}:{},..._?{country:_}:{},...u?{line_1:u}:{},...f?{line_2:f}:{},...y?{postal_code:y}:{},...g?{state:g}:{}};return{...o?{name:o}:{},...e?{email:e}:{},...n?{first_name:n}:{},...r?{last_name:r}:{},...a?{password:a}:{},...Object.keys(D||{}).length?{shipping_address:D}:{},...Object.keys(w||{}).length?{billing_address:w}:{},...b&&v?{tax_identifier:{number:v,number_type:b}}:{},...(null===(i=Object.keys(F))||void 0===i?void 0:i.length)?{metadata:F}:{}}},reportChildrenValidity=async t=>{const i=[...t.shadowRoot.querySelectorAll("*")].filter((t=>"function"==typeof t.reportValidity));for(const t of i)if(!await t.reportValidity())return!1;return!0};export{FormSubmitController as F,parseFormData as p,reportChildrenValidity as r};