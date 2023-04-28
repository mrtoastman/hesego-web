const convertAmount=(r,n)=>["bif","clp","djf","gnf","jpy","kmf","krw","xaf"].includes(n)?r:r/100,getHumanDiscount=r=>(null==r?void 0:r.amount_off)&&(null==r?void 0:r.currency)?getFormattedPrice({amount:r.amount_off,currency:r.currency}):(null==r?void 0:r.percent_off)?wp.i18n.sprintf(wp.i18n.__("%1d%% off","surecart"),0|r.percent_off):"",getFormattedPrice=({amount:r,currency:n})=>{const e=convertAmount(r,n);return`${new Intl.NumberFormat(void 0,{style:"currency",currency:n}).format(parseFloat(e.toFixed(2)))}`},getCurrencySymbol=(r="usd")=>{const[n]=new Intl.NumberFormat(void 0,{style:"currency",currency:r}).formatToParts(0);return null==n?void 0:n.value},translateInterval=(r,n,e=wp.i18n.__("every","surecart"),t=wp.i18n.__("once","surecart"),a=!1)=>{switch(n){case"day":return`${e} ${wp.i18n.sprintf(a?wp.i18n._n("%d day","%d days",r,"surecart"):wp.i18n._n("day","%d days",r,"surecart"),r)}`;case"week":return`${e} ${wp.i18n.sprintf(a?wp.i18n._n("%d week","%d weeks",r,"surecart"):wp.i18n._n("week","%d weeks",r,"surecart"),r)}`;case"month":return`${e} ${wp.i18n.sprintf(a?wp.i18n._n("%d month","%d months",r,"surecart"):wp.i18n._n("month","%d months",r,"surecart"),r)}`;case"year":return`${e} ${wp.i18n.sprintf(a?wp.i18n._n("%d year","%d years",r,"surecart"):wp.i18n._n("year","%d years",r,"surecart"),r)}`;default:return t}},translateAbbreviatedInterval=(r,n,e=wp.i18n.__("once","surecart"),t=!1)=>{switch(n){case"day":return` / ${wp.i18n.sprintf(t?wp.i18n._n("%d day","%d days",r,"surecart"):wp.i18n._n("day","%d days",r,"surecart"),r)}`;case"week":return` / ${wp.i18n.sprintf(t?wp.i18n._n("%d wk","%d wks",r,"surecart"):wp.i18n._n("wk","%d wks",r,"surecart"),r)}`;case"month":return` / ${wp.i18n.sprintf(t?wp.i18n._n("%d mo","%d months",r,"surecart"):wp.i18n._n("mo","%d mos",r,"surecart"),r)}`;case"year":return` / ${wp.i18n.sprintf(t?wp.i18n._n("%d yr","%d yrs",r,"surecart"):wp.i18n._n("yr","%d yrs",r,"surecart"),r)}`;default:return e}},intervalString=(r,n={})=>{if(!r)return"";const{showOnce:e,labels:t,abbreviate:a}=n,{interval:i=wp.i18n.__("every","surecart")}=t||{};return`${intervalCountString(r,i,e?wp.i18n.__("once","surecart"):"",a)} ${periodCountString(r,a)}`},intervalCountString=(r,n,e=wp.i18n.__("once","surecart"),t=!1)=>r.recurring_interval_count&&r.recurring_interval?t?translateAbbreviatedInterval(r.recurring_interval_count,r.recurring_interval,e):translateInterval(r.recurring_interval_count,r.recurring_interval,` ${n}`,e):"",periodCountString=(r,n=!1)=>(null==r?void 0:r.recurring_period_count)?n?`x ${r.recurring_period_count}`:` (${wp.i18n.sprintf(wp.i18n._n("%d payment","%d payments",r.recurring_period_count,"surecart"),r.recurring_period_count)})`:"",translateRemainingPayments=r=>wp.i18n.sprintf(wp.i18n._n("%d payment remaining","%d payments remaining",r,"surecart"),r);export{getCurrencySymbol as a,translateRemainingPayments as b,getHumanDiscount as g,intervalString as i,translateInterval as t};