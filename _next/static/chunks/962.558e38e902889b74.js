!function(){var e,t,r,n,u,i,s={1880:function(e,t,r){"use strict";var n=r(6088),u=r(4691);let i=e=>{let t=e.match(/^\d+/);return t?+t[0]:null},s=e=>e.map(e=>({id:e.applicationNumber||"NA",displayName:e.candidateName||"NA",marks:i(e.marks)||"NA",air:+e.allIndiaRank||"NA"})),l=async()=>{try{var e;let t=await u.Z.get("/neet-result/data/2024.json");if(!(null===(e=t.data)||void 0===e?void 0:e.total))return null;return s(t.data.total)}catch(e){return console.error(e),null}};var a=r(2507);let o={GREATER_THAN:"gt",LESS_THAN:"lt",GREATER_THAN_EQUAL:"gte",LESS_THAN_EQUAL:"lte",EQUAL:"eq",NOT_EQUAL:"ne"};o.GREATER_THAN,o.LESS_THAN,o.GREATER_THAN_EQUAL,o.LESS_THAN_EQUAL,o.EQUAL,o.NOT_EQUAL;let c=a.z.array(a.z.object({field:a.z.string({required_error:"Field is required"}).trim().min(1,{message:"Field is required"}),operator:a.z.string({required_error:"Operator is required"}).trim().min(1,{message:"Operator is required"}),value:a.z.coerce.number({required_error:"Value is required",invalid_type_error:"Value must be a number"}).min(0,{message:"Value must be greater than 0"})}));a.z.object({filters:c});class f{sortByKey(e,t,r){if(!t||!r)return e;let n="asc"===r;return e.sort((e,r)=>{let u=e[t],i=r[t];if("displayName"===t){if((!u||"NA"===u)&&(!i||"NA"===i))return 0;if(!u||"NA"===u)return 1;if(!i||"NA"===i)return -1;let e=u.toString().toLowerCase(),t=i.toString().toLowerCase();return n?e.localeCompare(t):t.localeCompare(e)}let s=isNaN(Number(u))?-1/0:Number(u),l=isNaN(Number(i))?-1/0:Number(i);return s===-1/0&&l===-1/0?0:s===-1/0?1:l===-1/0?-1:n?s-l:l-s})}searchResults(e,t){let r=t.toLowerCase().trim();return e.filter(e=>Object.values(e).some(e=>e.toString().toLowerCase().includes(r)))}applyFilters(e,t){return e.filter(e=>t.every(t=>{let{field:r,operator:n,value:u}=t,i=+e[r];if(!i)return!1;switch(n){case o.GREATER_THAN:return i>u;case o.LESS_THAN:return i<u;case o.GREATER_THAN_EQUAL:return i>=u;case o.LESS_THAN_EQUAL:return i<=u;case o.EQUAL:return i===u;case o.NOT_EQUAL:return i!==u;default:return!1}}))}async fetchResults(){var e;if(null===(e=this.results)||void 0===e?void 0:e.length)return!0;let t=await l();return this.results=t,!!t}getResults(e){let{pageNo:t,pageSize:r=10,search:n,filters:u,sortKey:i,sortOrder:s}=e;if(!this.results)return null;let l=i?this.sortByKey(this.results,i,s):this.results,a=n?this.searchResults(l,n):l,o=u.length?this.applyFilters(a,u):a,c=(t-1)*r,f=o.slice(c,c+r),d=o.length;return{data:f,total:d,totalPages:Math.ceil(d/r)}}getTotalResults(){var e,t;return null!==(t=null===(e=this.results)||void 0===e?void 0:e.length)&&void 0!==t?t:0}constructor(){this.results=[],this.fetchResults()}}(0,n.Jj)(f)}},l={};function a(e){var t=l[e];if(void 0!==t)return t.exports;var r=l[e]={exports:{}},n=!0;try{s[e](r,r.exports,a),n=!1}finally{n&&delete l[e]}return r.exports}a.m=s,a.x=function(){var e=a.O(void 0,[507,381],function(){return a(1880)});return a.O(e)},e=[],a.O=function(t,r,n,u){if(r){u=u||0;for(var i=e.length;i>0&&e[i-1][2]>u;i--)e[i]=e[i-1];e[i]=[r,n,u];return}for(var s=1/0,i=0;i<e.length;i++){for(var r=e[i][0],n=e[i][1],u=e[i][2],l=!0,o=0;o<r.length;o++)s>=u&&Object.keys(a.O).every(function(e){return a.O[e](r[o])})?r.splice(o--,1):(l=!1,u<s&&(s=u));if(l){e.splice(i--,1);var c=n();void 0!==c&&(t=c)}}return t},a.d=function(e,t){for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce(function(t,r){return a.f[r](e,t),t},[]))},a.u=function(e){return 507===e?"static/chunks/507-40ee4dfe5f3378b2.js":"static/chunks/"+e+".2648bae2d6528908.js"},a.miniCssF=function(e){},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.tt=function(){return void 0===t&&(t={createScriptURL:function(e){return e}},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(t=trustedTypes.createPolicy("nextjs#bundler",t))),t},a.tu=function(e){return a.tt().createScriptURL(e)},a.p="/neet-result/_next/",r={962:1},a.f.i=function(e,t){r[e]||importScripts(a.tu(a.p+a.u(e)))},u=(n=self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push.bind(n),n.push=function(e){var t=e[0],n=e[1],i=e[2];for(var s in n)a.o(n,s)&&(a.m[s]=n[s]);for(i&&i(a);t.length;)r[t.pop()]=1;u(e)},i=a.x,a.x=function(){return Promise.all([a.e(507),a.e(381)]).then(i)},_N_E=a.x()}();