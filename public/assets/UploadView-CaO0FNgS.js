import{d as O,r as b,c as k,_ as U,o as p,a as m,b as o,F as w,e as x,f as E,t as v,s as R,g as T,u as I,n as D,h as B,i as N}from"./index-C0ucnu1o.js";import{r as q,a as y,b as M}from"./index-Dv1oZ6ws.js";const L=O("files",()=>{const g=b([]),u=k(()=>g.value.length);return{files:g,filesCount:u,requestFileList:async()=>{const i="/nas/list";try{const a=await q(i);return console.log(`response -> ${JSON.stringify(a.data.output.body)}`),g.value=a.data.output.body,a.data}catch(a){return a.code==="ECONNABORTED"?console.log(`서버 요청 시 타임아웃 : ${y.timeout}`):console.error(`서버 요청 시 에러 : ${a.message}`),null}},requestFileDelete:async i=>{const a="/nas/delete";try{const s=await q(a,i);return console.log(`response -> ${JSON.stringify(s.data.output.body)}`),s.data}catch(s){return s.code==="ECONNABORTED"?console.log(`서버 요청 시 타임아웃 : ${y.timeout}`):console.error(`서버 요청 시 에러 : ${s.message}`),null}},requestFileUpload:async(i,a)=>new Promise(async(s,d)=>{console.log(`upload 호출됨 -> name : ${i.name}, type : ${i.type}`);try{let r=new FormData;r.append("photo",i);const h=await M.post(`${y.baseUrl}/nas/upload`,r,{headers:{"Content-Type":"multipart/form-data;charset=utf-8;"},onUploadProgress:_=>{const S=parseInt(_.loaded/_.total*100);a&&a(S)}});s(h.data)}catch(r){console.error(`에러 -> ${r}`),d(`에러 -> ${r}`)}})}}),V={class:"container"},A={__name:"FileUpload",setup(g){const u=L(),c=b([]),f=s=>s<1024?`${s} B`:s<1024**2?`${(s/1024).toFixed(2)} KB`:s<1024**3?`${(s/1024**2).toFixed(2)} MB`:`${(s/1024**3).toFixed(2)} GB`,l=s=>{c.value=Array.from(s.target.files),c.value=c.value.map(d=>({file:d,uploadProgress:0}))},i=()=>{c.value.forEach(s=>{a(s)}),console.log("파일이 업로드되었습니다!")};async function a(s){console.log(`uploadFile 호출됨 -> name : ${s.file.name}, type : ${s.file.type}`);try{const d=await u.requestFileUpload(s.file,r=>{s.uploadProgress=r,console.log(`업로드 progress : ${r}`)});console.log(`response -> ${JSON.stringify(d)}`)}catch(d){console.error(`에러 -> ${d}`)}}return(s,d)=>(p(),m("div",V,[d[0]||(d[0]=o("h2",null,"Upload Files (limit 10GB)",-1)),o("input",{type:"file",multiple:"",onChange:l},null,32),o("button",{onClick:i},"upload"),(p(!0),m(w,null,x(c.value,r=>(p(),m("div",{key:r.file.name},[E(v(r.file.name)+" ("+v(f(r.file.size))+" KB) ",1),o("span",null," - "+v(r.uploadProgress<100?`${r.uploadProgress}%`:"완료"),1)]))),128))]))}},G=U(A,[["__scopeId","data-v-1c6e425c"]]),J="/download.ico",K="/assets/delete-DHlDl9-h.png",H={class:"container"},j={class:"filename-column"},Y=["onClick"],Q=["onClick"],W={class:"pagination"},X=["disabled"],Z=["disabled"],z=["onClick"],ee=["disabled"],te=["disabled"],C=8,oe={__name:"FileList",setup(g){const u=L(),{files:c,filesCount:f}=R(u),l=b(1),i=k(()=>{const n=(l.value-1)*C;return c.value.slice(n,n+C)}),a=k(()=>Math.ceil(c.value.length/C)),s=n=>n<1024?`${n} B`:n<1024**2?`${(n/1024).toFixed(2)} KB`:n<1024**3?`${(n/1024**2).toFixed(2)} MB`:`${(n/1024**3).toFixed(2)} GB`,d=n=>{if(n===9999999999999)return"manually";const t=9*60*60*1e3,e=new Date(Number(n)+t);return`${e.getFullYear()}-${(e.getMonth()+1).toString().padStart(2,"0")}-${e.getDate().toString().padStart(2,"0")} ${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}:${e.getSeconds().toString().padStart(2,"0")}`},r=n=>{const t=n.name,e=t.lastIndexOf("."),$=t.slice(0,e).slice(13);if(n.timestamp===$){const F=t.slice(0,e).slice(0,-13),P=t.slice(e+1);return`${F}.${P}`}else return n.name},h=async n=>{console.log("handleFileClick");const t=y.baseUrl+"/uploads/";try{const e=await fetch(t+n);if(!e.ok)console.log(`Page not found or invalid URL: ${t+n}`);else{console.log(`Page exists, proceeding to URL. ${t+n}`);const $=await e.blob(),F=document.createElement("a");F.href=URL.createObjectURL($),F.download=r(n),F.click()}}catch(e){console.error("Error checking URL:",e)}},_=()=>{console.log("requestFilesList 호출됨.");try{u.requestFileList()}catch(n){console.error(`웹서버 요청 중 에러 발생 : ${n}`)}},S=async n=>{console.log("deleteFile 호출됨.");try{const t={requestCode:"1001",file:n};await u.requestFileDelete(t),_(),i.value.length===1&&l.value--}catch(t){console.error(`웹서버 요청 중 에러 발생 : ${t}`)}};return T(()=>{console.log("onMounted 호출됨."),_()}),(n,t)=>(p(),m("div",H,[o("h2",null,"File list (total "+v(I(f))+" items)",1),o("table",null,[t[6]||(t[6]=o("thead",null,[o("tr",null,[o("th",null,"Date"),o("th",null,"Name"),o("th",null,"Size"),o("th",null,"✅"),o("th",null,"❌")])],-1)),o("tbody",null,[(p(!0),m(w,null,x(i.value,e=>(p(),m("tr",{key:e.name},[o("td",null,v(d(e.timestamp)),1),o("td",j,v(r(e)),1),o("td",null,v(s(e.size)),1),o("td",{class:"download-btn",onClick:$=>h(e.name)},t[4]||(t[4]=[o("img",{src:J,alt:"Download",class:"icon"},null,-1)]),8,Y),o("td",{class:"download-btn",onClick:$=>S(e.name)},t[5]||(t[5]=[o("img",{src:K,alt:"delete",class:"icon"},null,-1)]),8,Q)]))),128))])]),o("div",W,[o("button",{onClick:t[0]||(t[0]=e=>l.value=1),disabled:l.value===1}," « ",8,X),o("button",{onClick:t[1]||(t[1]=e=>l.value--),disabled:l.value===1}," ‹ ",8,Z),(p(!0),m(w,null,x(a.value,e=>(p(),m("button",{key:e,class:D({active:l.value===e}),onClick:$=>l.value=e},v(e),11,z))),128)),o("button",{onClick:t[2]||(t[2]=e=>l.value++),disabled:l.value>=a.value}," › ",8,ee),o("button",{onClick:t[3]||(t[3]=e=>l.value=a.value),disabled:l.value>=a.value}," » ",8,te)])]))}},se=U(oe,[["__scopeId","data-v-09612494"]]),ne={key:0},le={key:1},ae={__name:"UploadView",setup(g){const u=b("list");function c(f){u.value=f}return(f,l)=>(p(),m("div",null,[o("nav",null,[o("button",{onClick:l[0]||(l[0]=i=>c("list")),class:D({active:u.value==="list"})}," 리스트 ",2),o("button",{onClick:l[1]||(l[1]=i=>c("upload")),class:D({active:u.value==="upload"})}," 업로드 ",2)]),u.value==="upload"?(p(),m("div",ne,[B(G)])):N("",!0),u.value==="list"?(p(),m("div",le,[B(se)])):N("",!0)]))}},ue=U(ae,[["__scopeId","data-v-410daded"]]);export{ue as default};
