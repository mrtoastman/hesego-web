"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const index=require("./index-9c866aeb.js"),scBadgeNoticeCss=":host{display:block}.notice{background:var(--sc-badge-notice-background-color, var(--sc-color-white));color:var(--sc-badge-notice-text-color, var(--sc-color-gray-950));border:solid 1px var(--sc-badge-notice-border-color, var(--sc-color-white));border-radius:var(--sc-border-radius-small);padding:var(--sc-spacing-small);font-size:var(--sc-font-size-x-small);display:flex;gap:0.5em;line-height:1}.notice--warning{background:var(--sc-color-warning-50);color:var(--sc-color-warning-700)}",ScBadgeNotice=class{constructor(e){index.registerInstance(this,e),this.type="primary",this.size="small"}render(){return index.h("div",{class:{notice:!0,"notice--is-small":"small"===this.size,"notice--is-medium":"medium"===this.size,"notice--is-large":"large"===this.size,"notice--primary":"primary"===this.type,"notice--success":"success"===this.type,"notice--warning":"warning"===this.type,"notice--danger":"danger"===this.type,"notice--default":"default"===this.type}},index.h("sc-tag",{size:this.size,type:this.type},this.label),index.h("slot",null))}};ScBadgeNotice.style=scBadgeNoticeCss,exports.sc_badge_notice=ScBadgeNotice;