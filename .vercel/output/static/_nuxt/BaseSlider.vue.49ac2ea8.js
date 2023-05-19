import Ee from"./BaseLoader.3daed471.js";import{a as Pe,r as p,s as Re,v as ze,x as le,y as K,u as O,z as Ie,A as Ue,b as ce,B as N,e as J,C as j,h as He,D as Fe,E as xe,i as S,G as w,F as Te,H as $e,o as X,c as ie,w as oe,q as ke,j as Ve,l as We,k as Y,t as Be}from"./entry.7dce2292.js";const Xe=()=>null;function Ye(...r){var d;const s=typeof r[r.length-1]=="string"?r.pop():void 0;typeof r[0]!="string"&&r.unshift(s);let[n,t,e={}]=r;if(typeof n!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof t!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");e.server=e.server??!0,e.default=e.default??Xe,e.lazy=e.lazy??!1,e.immediate=e.immediate??!0;const a=Pe(),u=()=>a.isHydrating?a.payload.data[n]:a.static.data[n],l=()=>u()!==void 0;a._asyncData[n]||(a._asyncData[n]={data:p(u()??((d=e.default)==null?void 0:d.call(e))??null),pending:p(!l()),error:Re(a.payload._errors,n)});const i={...a._asyncData[n]};i.refresh=i.execute=(g={})=>{if(a._asyncDataPromises[n]){if(g.dedupe===!1)return a._asyncDataPromises[n];a._asyncDataPromises[n].cancelled=!0}if(g._initial&&l())return u();i.pending.value=!0;const x=new Promise((h,m)=>{try{h(t(a))}catch(k){m(k)}}).then(h=>{if(x.cancelled)return a._asyncDataPromises[n];let m=h;e.transform&&(m=e.transform(h)),e.pick&&(m=Ke(m,e.pick)),i.data.value=m,i.error.value=null}).catch(h=>{var m;if(x.cancelled)return a._asyncDataPromises[n];i.error.value=h,i.data.value=O(((m=e.default)==null?void 0:m.call(e))??null)}).finally(()=>{x.cancelled||(i.pending.value=!1,a.payload.data[n]=i.data.value,i.error.value&&(a.payload._errors[n]=Ie(i.error.value)),delete a._asyncDataPromises[n])});return a._asyncDataPromises[n]=x,a._asyncDataPromises[n]};const o=()=>i.refresh({_initial:!0}),f=e.server!==!1&&a.payload.serverRendered;{const g=Ue();if(g&&!g._nuxtOnBeforeMountCbs){g._nuxtOnBeforeMountCbs=[];const h=g._nuxtOnBeforeMountCbs;g&&(ze(()=>{h.forEach(m=>{m()}),h.splice(0,h.length)}),le(()=>h.splice(0,h.length)))}f&&a.isHydrating&&l()?i.pending.value=!1:g&&(a.payload.serverRendered&&a.isHydrating||e.lazy)&&e.immediate?g._nuxtOnBeforeMountCbs.push(o):e.immediate&&o(),e.watch&&K(e.watch,()=>i.refresh());const x=a.hook("app:data:refresh",h=>{if(!h||h.includes(n))return i.refresh()});g&&le(x)}const y=Promise.resolve(a._asyncDataPromises[n]).then(()=>i);return Object.assign(y,i),y}function Ke(r,s){const n={};for(const t of s)n[t]=r[t];return n}const Ge={ignoreUnknown:!1,respectType:!1,respectFunctionNames:!1,respectFunctionProperties:!1,unorderedObjects:!0,unorderedArrays:!1,unorderedSets:!1};function Je(r,s={}){s={...Ge,...s};const n=De(s);return n.dispatch(r),n.toString()}function De(r){const s=[];let n=[];const t=e=>{s.push(e)};return{toString(){return s.join("")},getContext(){return n},dispatch(e){return r.replacer&&(e=r.replacer(e)),this["_"+(e===null?"null":typeof e)](e)},_object(e){if(e&&typeof e.toJSON=="function")return this._object(e.toJSON());const a=/\[object (.*)]/i,u=Object.prototype.toString.call(e),l=a.exec(u),i=l?l[1].toLowerCase():"unknown:["+u.toLowerCase()+"]";let o=null;if((o=n.indexOf(e))>=0)return this.dispatch("[CIRCULAR:"+o+"]");if(n.push(e),typeof Buffer<"u"&&Buffer.isBuffer&&Buffer.isBuffer(e))return t("buffer:"),t(e.toString("utf8"));if(i!=="object"&&i!=="function"&&i!=="asyncfunction")this["_"+i]?this["_"+i](e):r.ignoreUnknown||this._unkown(e,i);else{let f=Object.keys(e);r.unorderedObjects&&(f=f.sort()),r.respectType!==!1&&!Ae(e)&&f.splice(0,0,"prototype","__proto__","letructor"),r.excludeKeys&&(f=f.filter(function(y){return!r.excludeKeys(y)})),t("object:"+f.length+":");for(const y of f)this.dispatch(y),t(":"),r.excludeValues||this.dispatch(e[y]),t(",")}},_array(e,a){if(a=typeof a<"u"?a:r.unorderedArrays!==!1,t("array:"+e.length+":"),!a||e.length<=1){for(const i of e)this.dispatch(i);return}const u=[],l=e.map(i=>{const o=De(r);return o.dispatch(i),u.push(o.getContext()),o.toString()});return n=[...n,...u],l.sort(),this._array(l,!1)},_date(e){return t("date:"+e.toJSON())},_symbol(e){return t("symbol:"+e.toString())},_unkown(e,a){if(t(a),!!e&&(t(":"),e&&typeof e.entries=="function"))return this._array(Array.from(e.entries()),!0)},_error(e){return t("error:"+e.toString())},_boolean(e){return t("bool:"+e.toString())},_string(e){t("string:"+e.length+":"),t(e.toString())},_function(e){t("fn:"),Ae(e)?this.dispatch("[native]"):this.dispatch(e.toString()),r.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(e.name)),r.respectFunctionProperties&&this._object(e)},_number(e){return t("number:"+e.toString())},_xml(e){return t("xml:"+e.toString())},_null(){return t("Null")},_undefined(){return t("Undefined")},_regexp(e){return t("regex:"+e.toString())},_uint8array(e){return t("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray(e){return t("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array(e){return t("int8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array(e){return t("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array(e){return t("int16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array(e){return t("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array(e){return t("int32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array(e){return t("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array(e){return t("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer(e){return t("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url(e){return t("url:"+e.toString())},_map(e){t("map:");const a=[...e];return this._array(a,r.unorderedSets!==!1)},_set(e){t("set:");const a=[...e];return this._array(a,r.unorderedSets!==!1)},_file(e){return t("file:"),this.dispatch([e.name,e.size,e.type,e.lastModfied])},_blob(){if(r.ignoreUnknown)return t("[blob]");throw new Error(`Hashing Blob objects is currently not supported
Use "options.replacer" or "options.ignoreUnknown"
`)},_domwindow(){return t("domwindow")},_bigint(e){return t("bigint:"+e.toString())},_process(){return t("process")},_timer(){return t("timer")},_pipe(){return t("pipe")},_tcp(){return t("tcp")},_udp(){return t("udp")},_tty(){return t("tty")},_statwatcher(){return t("statwatcher")},_securecontext(){return t("securecontext")},_connection(){return t("connection")},_zlib(){return t("zlib")},_context(){return t("context")},_nodescript(){return t("nodescript")},_httpparser(){return t("httpparser")},_dataview(){return t("dataview")},_signal(){return t("signal")},_fsevent(){return t("fsevent")},_tlswrap(){return t("tlswrap")}}}function Ae(r){return typeof r!="function"?!1:/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code]\s+}$/i.exec(Function.prototype.toString.call(r))!=null}class z{constructor(s,n){s=this.words=s||[],this.sigBytes=n!==void 0?n:s.length*4}toString(s){return(s||qe).stringify(this)}concat(s){if(this.clamp(),this.sigBytes%4)for(let n=0;n<s.sigBytes;n++){const t=s.words[n>>>2]>>>24-n%4*8&255;this.words[this.sigBytes+n>>>2]|=t<<24-(this.sigBytes+n)%4*8}else for(let n=0;n<s.sigBytes;n+=4)this.words[this.sigBytes+n>>>2]=s.words[n>>>2];return this.sigBytes+=s.sigBytes,this}clamp(){this.words[this.sigBytes>>>2]&=4294967295<<32-this.sigBytes%4*8,this.words.length=Math.ceil(this.sigBytes/4)}clone(){return new z([...this.words])}}const qe={stringify(r){const s=[];for(let n=0;n<r.sigBytes;n++){const t=r.words[n>>>2]>>>24-n%4*8&255;s.push((t>>>4).toString(16),(t&15).toString(16))}return s.join("")}},Qe={stringify(r){const s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=[];for(let t=0;t<r.sigBytes;t+=3){const e=r.words[t>>>2]>>>24-t%4*8&255,a=r.words[t+1>>>2]>>>24-(t+1)%4*8&255,u=r.words[t+2>>>2]>>>24-(t+2)%4*8&255,l=e<<16|a<<8|u;for(let i=0;i<4&&t*8+i*6<r.sigBytes*8;i++)n.push(s.charAt(l>>>6*(3-i)&63))}return n.join("")}},Ze={parse(r){const s=r.length,n=[];for(let t=0;t<s;t++)n[t>>>2]|=(r.charCodeAt(t)&255)<<24-t%4*8;return new z(n,s)}},et={parse(r){return Ze.parse(unescape(encodeURIComponent(r)))}};class tt{constructor(){this._minBufferSize=0,this.blockSize=512/32,this.reset()}reset(){this._data=new z,this._nDataBytes=0}_append(s){typeof s=="string"&&(s=et.parse(s)),this._data.concat(s),this._nDataBytes+=s.sigBytes}_doProcessBlock(s,n){}_process(s){let n,t=this._data.sigBytes/(this.blockSize*4);s?t=Math.ceil(t):t=Math.max((t|0)-this._minBufferSize,0);const e=t*this.blockSize,a=Math.min(e*4,this._data.sigBytes);if(e){for(let u=0;u<e;u+=this.blockSize)this._doProcessBlock(this._data.words,u);n=this._data.words.splice(0,e),this._data.sigBytes-=a}return new z(n,a)}}class nt extends tt{update(s){return this._append(s),this._process(),this}finalize(s){s&&this._append(s)}}const rt=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225],st=[1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998],R=[];class at extends nt{constructor(){super(),this.reset()}reset(){super.reset(),this._hash=new z([...rt])}_doProcessBlock(s,n){const t=this._hash.words;let e=t[0],a=t[1],u=t[2],l=t[3],i=t[4],o=t[5],f=t[6],y=t[7];for(let d=0;d<64;d++){if(d<16)R[d]=s[n+d]|0;else{const D=R[d-15],A=(D<<25|D>>>7)^(D<<14|D>>>18)^D>>>3,T=R[d-2],H=(T<<15|T>>>17)^(T<<13|T>>>19)^T>>>10;R[d]=A+R[d-7]+H+R[d-16]}const g=i&o^~i&f,x=e&a^e&u^a&u,h=(e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22),m=(i<<26|i>>>6)^(i<<21|i>>>11)^(i<<7|i>>>25),k=y+m+g+st[d]+R[d],B=h+x;y=f,f=o,o=i,i=l+k|0,l=u,u=a,a=e,e=k+B|0}t[0]=t[0]+e|0,t[1]=t[1]+a|0,t[2]=t[2]+u|0,t[3]=t[3]+l|0,t[4]=t[4]+i|0,t[5]=t[5]+o|0,t[6]=t[6]+f|0,t[7]=t[7]+y|0}finalize(s){super.finalize(s);const n=this._nDataBytes*8,t=this._data.sigBytes*8;return this._data.words[t>>>5]|=128<<24-t%32,this._data.words[(t+64>>>9<<4)+14]=Math.floor(n/4294967296),this._data.words[(t+64>>>9<<4)+15]=n,this._data.sigBytes=this._data.words.length*4,this._process(),this._hash}}function it(r){return new at().finalize(r).toString(Qe)}function ot(r,s={}){const n=typeof r=="string"?r:Je(r,s);return it(n).slice(0,10)}function lt(r,s,n){const[t={},e]=typeof s=="string"?[{},s]:[s,n],a=t.key||ot([e,O(t.baseURL),typeof r=="string"?r:"",O(t.params||t.query)]);if(!a||typeof a!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+a);if(!r)throw new Error("[nuxt] [useFetch] request is missing.");const u=a===e?"$f"+a:a,l=ce(()=>{let A=r;return typeof A=="function"&&(A=A()),O(A)});if(!t.baseURL&&typeof l.value=="string"&&l.value.startsWith("//"))throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:i,lazy:o,default:f,transform:y,pick:d,watch:g,immediate:x,...h}=t,m=N({...h,cache:typeof t.cache=="boolean"?void 0:t.cache}),k={server:i,lazy:o,default:f,transform:y,pick:d,immediate:x,watch:g===!1?[]:[m,l,...g||[]]};let B;return Ye(u,()=>{var T;return(T=B==null?void 0:B.abort)==null||T.call(B),B=typeof AbortController<"u"?new AbortController:{},typeof l.value=="string"&&l.value.startsWith("/"),(t.$fetch||globalThis.$fetch)(l.value,{signal:B.signal,...m})},k)}/**
 * Vue 3 Carousel 0.3.1
 * (c) 2023
 * @license MIT
 */const v={itemsToShow:1,itemsToScroll:1,modelValue:0,transition:300,autoplay:0,snapAlign:"center",wrapAround:!1,throttle:16,pauseAutoplayOnHover:!1,mouseDrag:!0,touchDrag:!0,dir:"ltr",breakpoints:void 0,i18n:{ariaNextSlide:"Navigate to next slide",ariaPreviousSlide:"Navigate to previous slide",ariaNavigateToSlide:"Navigate to slide {slideNumber}",ariaGallery:"Gallery",itemXofY:"Item {currentSlide} of {slidesCount}",iconArrowUp:"Arrow pointing upwards",iconArrowDown:"Arrow pointing downwards",iconArrowRight:"Arrow pointing to the right",iconArrowLeft:"Arrow pointing to the left"}},Ce={itemsToShow:{default:v.itemsToShow,type:Number},itemsToScroll:{default:v.itemsToScroll,type:Number},wrapAround:{default:v.wrapAround,type:Boolean},throttle:{default:v.throttle,type:Number},snapAlign:{default:v.snapAlign,validator(r){return["start","end","center","center-even","center-odd"].includes(r)}},transition:{default:v.transition,type:Number},breakpoints:{default:v.breakpoints,type:Object},autoplay:{default:v.autoplay,type:Number},pauseAutoplayOnHover:{default:v.pauseAutoplayOnHover,type:Boolean},modelValue:{default:void 0,type:Number},mouseDrag:{default:v.mouseDrag,type:Boolean},touchDrag:{default:v.touchDrag,type:Boolean},dir:{default:v.dir,validator(r){return["rtl","ltr"].includes(r)}},i18n:{default:v.i18n,type:Object},settings:{default(){return{}},type:Object}};function ct({config:r,slidesCount:s}){const{snapAlign:n,wrapAround:t,itemsToShow:e=1}=r;if(t)return Math.max(s-1,0);let a;switch(n){case"start":a=s-e;break;case"end":a=s-1;break;case"center":case"center-odd":a=s-Math.ceil((e-.5)/2);break;case"center-even":a=s-Math.ceil(e/2);break;default:a=0;break}return Math.max(a,0)}function ut({config:r,slidesCount:s}){const{wrapAround:n,snapAlign:t,itemsToShow:e=1}=r;let a=0;if(n||e>s)return a;switch(t){case"start":a=0;break;case"end":a=e-1;break;case"center":case"center-odd":a=Math.floor((e-1)/2);break;case"center-even":a=Math.floor((e-2)/2);break;default:a=0;break}return a}function ue({val:r,max:s,min:n}){return s<n?r:Math.min(Math.max(r,n),s)}function dt({config:r,currentSlide:s,slidesCount:n}){const{snapAlign:t,wrapAround:e,itemsToShow:a=1}=r;let u=s;switch(t){case"center":case"center-odd":u-=(a-1)/2;break;case"center-even":u-=(a-2)/2;break;case"end":u-=a-1;break}return e?u:ue({val:u,max:n-a,min:0})}function Oe(r){return r?r.reduce((s,n)=>{var t;return n.type===Te?[...s,...Oe(n.children)]:((t=n.type)===null||t===void 0?void 0:t.name)==="CarouselSlide"?[...s,n]:s},[]):[]}function G({val:r,max:s,min:n=0}){return r>s?G({val:r-(s+1),max:s,min:n}):r<n?G({val:r+(s+1),max:s,min:n}):r}function ft(r,s){let n;return s?function(...t){const e=this;n||(r.apply(e,t),n=!0,setTimeout(()=>n=!1,s))}:r}function ht(r,s){let n;return function(...t){n&&clearTimeout(n),n=setTimeout(()=>{r(...t),n=null},s)}}function Me(r="",s={}){return Object.entries(s).reduce((n,[t,e])=>n.replace(`{${t}}`,String(e)),r)}var pt=J({name:"ARIA",setup(){const r=w("config",N(Object.assign({},v))),s=w("currentSlide",p(0)),n=w("slidesCount",p(0));return()=>S("div",{class:["carousel__liveregion","carousel__sr-only"],"aria-live":"polite","aria-atomic":"true"},Me(r.i18n.itemXofY,{currentSlide:s.value+1,slidesCount:n.value}))}}),yt=J({name:"Carousel",props:Ce,setup(r,{slots:s,emit:n,expose:t}){var e;const a=p(null),u=p([]),l=p(0),i=p(0),o=N(Object.assign({},v));let f=Object.assign({},v),y;const d=p((e=r.modelValue)!==null&&e!==void 0?e:0),g=p(0),x=p(0),h=p(0),m=p(0);let k,B;j("config",o),j("slidesCount",i),j("currentSlide",d),j("maxSlide",h),j("minSlide",m),j("slideWidth",l);function D(){y=Object.assign({},r.breakpoints),f=Object.assign(Object.assign(Object.assign({},f),r),{i18n:Object.assign(Object.assign({},f.i18n),r.i18n),breakpoints:void 0}),T(f)}function A(){if(!y||!Object.keys(y).length)return;const c=Object.keys(y).map(_=>Number(_)).sort((_,M)=>+M-+_);let b=Object.assign({},f);c.some(_=>{const M=window.matchMedia(`(min-width: ${_}px)`).matches;return M&&(b=Object.assign(Object.assign({},b),y[_])),M}),T(b)}function T(c){Object.entries(c).forEach(([b,_])=>o[b]=_)}const H=ht(()=>{A(),I()},16);function I(){if(!a.value)return;const c=a.value.getBoundingClientRect();l.value=c.width/o.itemsToShow}function q(){i.value<=0||(x.value=Math.ceil((i.value-1)/2),h.value=ct({config:o,slidesCount:i.value}),m.value=ut({config:o,slidesCount:i.value}),o.wrapAround||(d.value=ue({val:d.value,max:h.value,min:m.value})))}He(()=>{Fe(()=>I()),setTimeout(()=>I(),1e3),A(),ge(),window.addEventListener("resize",H,{passive:!0}),n("init")}),le(()=>{B&&clearTimeout(B),k&&clearInterval(k),window.removeEventListener("resize",H,{passive:!0})});let C=!1;const F={x:0,y:0},$={x:0,y:0},L=N({x:0,y:0}),V=p(!1),Q=p(!1),je=()=>{V.value=!0},Ne=()=>{V.value=!1};function he(c){["INPUT","TEXTAREA","SELECT"].includes(c.target.tagName)||(C=c.type==="touchstart",C||c.preventDefault(),!(!C&&c.button!==0||E.value)&&(F.x=C?c.touches[0].clientX:c.clientX,F.y=C?c.touches[0].clientY:c.clientY,document.addEventListener(C?"touchmove":"mousemove",pe,!0),document.addEventListener(C?"touchend":"mouseup",ye,!0)))}const pe=ft(c=>{Q.value=!0,$.x=C?c.touches[0].clientX:c.clientX,$.y=C?c.touches[0].clientY:c.clientY;const b=$.x-F.x,_=$.y-F.y;L.y=_,L.x=b},o.throttle);function ye(){const c=o.dir==="rtl"?-1:1,b=Math.sign(L.x)*.4,_=Math.round(L.x/l.value+b)*c;if(_&&!C){const M=ne=>{ne.stopPropagation(),window.removeEventListener("click",M,!0)};window.addEventListener("click",M,!0)}P(d.value-_),L.x=0,L.y=0,Q.value=!1,document.removeEventListener(C?"touchmove":"mousemove",pe,!0),document.removeEventListener(C?"touchend":"mouseup",ye,!0)}function ge(){!o.autoplay||o.autoplay<=0||(k=setInterval(()=>{o.pauseAutoplayOnHover&&V.value||W()},o.autoplay))}function me(){k&&(clearInterval(k),k=null),ge()}const E=p(!1);function P(c){const b=o.wrapAround?c:ue({val:c,max:h.value,min:m.value});d.value===b||E.value||(n("slide-start",{slidingToIndex:c,currentSlideIndex:d.value,prevSlideIndex:g.value,slidesCount:i.value}),E.value=!0,g.value=d.value,d.value=b,B=setTimeout(()=>{if(o.wrapAround){const _=G({val:b,max:h.value,min:0});_!==d.value&&(d.value=_,n("loop",{currentSlideIndex:d.value,slidingToIndex:c}))}n("update:modelValue",d.value),n("slide-end",{currentSlideIndex:d.value,prevSlideIndex:g.value,slidesCount:i.value}),E.value=!1,me()},o.transition))}function W(){P(d.value+o.itemsToScroll)}function Z(){P(d.value-o.itemsToScroll)}const ve={slideTo:P,next:W,prev:Z};j("nav",ve),j("isSliding",E);const _e=ce(()=>dt({config:o,currentSlide:d.value,slidesCount:i.value}));j("slidesToScroll",_e);const Le=ce(()=>{const c=o.dir==="rtl"?-1:1,b=_e.value*l.value*c;return{transform:`translateX(${L.x-b}px)`,transition:`${E.value?o.transition:0}ms`,margin:o.wrapAround?`0 -${i.value*l.value}px`:"",width:"100%"}});function we(){D(),A(),q(),I(),me()}Object.keys(Ce).forEach(c=>{["modelValue"].includes(c)||K(()=>r[c],we)}),K(()=>r.modelValue,c=>{c!==d.value&&P(Number(c))}),K(i,q),n("before-init"),D();const be={config:o,slidesCount:i,slideWidth:l,next:W,prev:Z,slideTo:P,currentSlide:d,maxSlide:h,minSlide:m,middleSlide:x};t({updateBreakpointsConfigs:A,updateSlidesData:q,updateSlideWidth:I,initDefaultConfigs:D,restartCarousel:we,slideTo:P,next:W,prev:Z,nav:ve,data:be});const ee=s.default||s.slides,te=s.addons,Se=N(be);return()=>{const c=Oe(ee==null?void 0:ee(Se)),b=(te==null?void 0:te(Se))||[];c.forEach((re,se)=>re.props.index=se);let _=c;if(o.wrapAround){const re=c.map((ae,U)=>xe(ae,{index:-c.length+U,isClone:!0,key:`clone-before-${U}`})),se=c.map((ae,U)=>xe(ae,{index:c.length+U,isClone:!0,key:`clone-after-${U}`}));_=[...re,...c,...se]}u.value=c,i.value=Math.max(c.length,1);const M=S("ol",{class:"carousel__track",style:Le.value,onMousedownCapture:o.mouseDrag?he:null,onTouchstartPassiveCapture:o.touchDrag?he:null},_),ne=S("div",{class:"carousel__viewport"},M);return S("section",{ref:a,class:{carousel:!0,"is-sliding":E.value,"is-dragging":Q.value,"is-hover":V.value,"carousel--rtl":o.dir==="rtl"},dir:o.dir,"aria-label":o.i18n.ariaGallery,tabindex:"0",onMouseenter:je,onMouseleave:Ne},[ne,b,S(pt)])}}}),de;(function(r){r.arrowUp="arrowUp",r.arrowDown="arrowDown",r.arrowRight="arrowRight",r.arrowLeft="arrowLeft"})(de||(de={}));const gt={arrowUp:"M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z",arrowDown:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",arrowRight:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",arrowLeft:"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"};function mt(r){return r in de}const fe=r=>{const s=w("config",N(Object.assign({},v))),n=String(r.name),t=`icon${n.charAt(0).toUpperCase()+n.slice(1)}`;if(!n||typeof n!="string"||!mt(n))return;const e=gt[n],a=S("path",{d:e}),u=s.i18n[t]||r.title||n,l=S("title",u);return S("svg",{class:"carousel__icon",viewBox:"0 0 24 24",role:"img","aria-label":u},[l,a])};fe.props={name:String,title:String};const vt=(r,{slots:s,attrs:n})=>{const{next:t,prev:e}=s||{},a=w("config",N(Object.assign({},v))),u=w("maxSlide",p(1)),l=w("minSlide",p(1)),i=w("currentSlide",p(1)),o=w("nav",{}),{dir:f,wrapAround:y,i18n:d}=a,g=f==="rtl",x=S("button",{type:"button",class:["carousel__prev",!y&&i.value<=l.value&&"carousel__prev--disabled",n==null?void 0:n.class],"aria-label":d.ariaPreviousSlide,onClick:o.prev},(e==null?void 0:e())||S(fe,{name:g?"arrowRight":"arrowLeft"})),h=S("button",{type:"button",class:["carousel__next",!y&&i.value>=u.value&&"carousel__next--disabled",n==null?void 0:n.class],"aria-label":d.ariaNextSlide,onClick:o.next},(t==null?void 0:t())||S(fe,{name:g?"arrowLeft":"arrowRight"}));return[x,h]},_t=()=>{const r=w("config",N(Object.assign({},v))),s=w("maxSlide",p(1)),n=w("minSlide",p(1)),t=w("currentSlide",p(1)),e=w("nav",{}),a=l=>G({val:t.value,max:s.value,min:0})===l,u=[];for(let l=n.value;l<s.value+1;l++){const i=S("button",{type:"button",class:{"carousel__pagination-button":!0,"carousel__pagination-button--active":a(l)},"aria-label":Me(r.i18n.ariaNavigateToSlide,{slideNumber:l+1}),onClick:()=>e.slideTo(l)}),o=S("li",{class:"carousel__pagination-item",key:l},i);u.push(o)}return S("ol",{class:"carousel__pagination"},u)};var wt=J({name:"CarouselSlide",props:{index:{type:Number,default:1},isClone:{type:Boolean,default:!1}},setup(r,{slots:s}){const n=w("config",N(Object.assign({},v))),t=w("currentSlide",p(0)),e=w("slidesToScroll",p(0)),a=w("isSliding",p(!1)),u=()=>r.index===t.value,l=()=>r.index===t.value-1,i=()=>r.index===t.value+1,o=()=>{const f=Math.floor(e.value),y=Math.ceil(e.value+n.itemsToShow-1);return r.index>=f&&r.index<=y};return()=>{var f;return S("li",{style:{width:`${100/n.itemsToShow}%`},class:{carousel__slide:!0,"carousel__slide--clone":r.isClone,"carousel__slide--visible":o(),"carousel__slide--active":u(),"carousel__slide--prev":l(),"carousel__slide--next":i(),"carousel__slide--sliding":a.value},"aria-hidden":!o()},(f=s.default)===null||f===void 0?void 0:f.call(s))}}});const bt={class:"carousel__item mx-2"},St=["src"],xt={class:"text-xl font-extrabold tracking-tight text-gray-900 mb-4"},kt={class:"text-zinc-500 text-sm"},Ct=J({__name:"BaseSlider",async setup(r){let s,n;const t=p(!0),{data:e}=([s,n]=$e(()=>lt("/api/placeholder?limit=12&delay=5000",{onResponse(){t.value=!1}},"$XJQvj0vyaf")),s=await s,n(),s);return(a,u)=>{const l=Ee;return O(t)?(X(),ie(l,{key:1})):(X(),ie(O(yt),{key:0,"items-to-show":4,"snap-align":"center","wrap-around":!0},{addons:oe(()=>[ke(O(vt)),ke(O(_t))]),default:oe(()=>{var i;return[(X(!0),Ve(Te,null,We((i=O(e))==null?void 0:i.items,o=>(X(),ie(O(wt),{key:o.id},{default:oe(()=>[Y("div",bt,[Y("img",{src:o.productImages[0].url,class:"block object-contain"},null,8,St),Y("h1",xt,Be(o.name),1),Y("p",kt,Be(o.shortDescription),1)])]),_:2},1024))),128))]}),_:1}))}}});export{Ct as _};
