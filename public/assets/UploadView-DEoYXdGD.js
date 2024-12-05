import{d as T,r as b,c as w,_ as N,o as u,a as c,b as s,e as x,F as U,f as B,g as E,t as f,n as C,w as S,s as M,h as R,u as I,i as q}from"./index-CrO03m91.js";import{r as L,a as D,b as V}from"./index-Dv1oZ6ws.js";const P=T("files",()=>{const $=b([]),d=w(()=>$.value.length);return{files:$,filesCount:d,requestFileList:async()=>{const i="/nas/list";try{const a=await L(i);return console.log(`response -> ${JSON.stringify(a.data.output.body)}`),$.value=a.data.output.body,a.data}catch(a){return a.code==="ECONNABORTED"?console.log(`서버 요청 시 타임아웃 : ${D.timeout}`):console.error(`서버 요청 시 에러 : ${a.message}`),null}},requestFileDelete:async i=>{const a="/nas/delete";try{const p=await L(a,i);return console.log(`response -> ${JSON.stringify(p.data.output.body)}`),p.data}catch(p){return p.code==="ECONNABORTED"?console.log(`서버 요청 시 타임아웃 : ${D.timeout}`):console.error(`서버 요청 시 에러 : ${p.message}`),null}},requestFileUpload:async(i,a)=>new Promise(async(p,F)=>{console.log(`upload 호출됨 -> name : ${i.name}, type : ${i.type}`);try{let v=new FormData;v.append("photo",i);const y=await V.post(`${D.baseUrl}/nas/upload`,v,{headers:{"Content-Type":"multipart/form-data;charset=utf-8;"},onUploadProgress:g=>{const n=parseInt(g.loaded/g.total*100);a&&a(n)}});p(y.data)}catch(v){console.error(`에러 -> ${v}`),F(`에러 -> ${v}`)}})}}),A={key:0,class:"drop-hint"},G={__name:"FileUpload",setup($){const d=P(),r=b([]),m=b(!1),l=n=>n<1024?`${n} B`:n<1024**2?`${(n/1024).toFixed(2)} KB`:n<1024**3?`${(n/1024**2).toFixed(2)} MB`:`${(n/1024**3).toFixed(2)} GB`,i=n=>{v(n.target.files)},a=()=>{m.value=!0},p=()=>{m.value=!1},F=n=>{m.value=!1,r.value=[],v(n.dataTransfer.files)},v=n=>{const t=Array.from(n).map(e=>({file:e,uploadProgress:0}));r.value=[...r.value,...t]},y=()=>{if(!r.value.length){console.log("선택된 파일이 없습니다");return}r.value.forEach(n=>{g(n)}),console.log("파일이 업로드되었습니다")};async function g(n){console.log(`uploadFile 호출됨 -> name : ${n.file.name}, type : ${n.file.type}`);try{const t=await d.requestFileUpload(n.file,e=>{n.uploadProgress=e,console.log(`업로드 progress : ${e}`)});console.log(`response -> ${JSON.stringify(t)}`)}catch(t){console.error(`에러 -> ${t}`)}}return(n,t)=>(u(),c("div",{class:C(["container",{dragging:m.value}]),onDragover:S(a,["prevent"]),onDragleave:S(p,["prevent"]),onDrop:S(F,["prevent"])},[t[1]||(t[1]=s("h2",null,"Upload Files (limit 10GB)",-1)),s("input",{type:"file",multiple:"",onClick:t[0]||(t[0]=e=>r.value=[]),onChange:i},null,32),s("button",{onClick:y},"upload"),r.value.length?x("",!0):(u(),c("div",A,"Drop files here to upload")),(u(!0),c(U,null,B(r.value,e=>(u(),c("div",{key:e.file.name},[E(f(e.file.name)+" ("+f(l(e.file.size))+" KB) ",1),s("span",null," - "+f(e.uploadProgress<100?`${e.uploadProgress}%`:"완료"),1)]))),128))],34))}},J=N(G,[["__scopeId","data-v-f79f7988"]]),K="/download.ico",H="/assets/delete-DHlDl9-h.png",j={class:"container"},Y={class:"filename-column"},Q=["onClick"],W={key:1},X=["onClick"],Z={class:"pagination"},z=["disabled"],ee=["disabled"],te=["onClick"],oe=["disabled"],se=["disabled"],k=8,ne={__name:"FileList",setup($){const d=P(),{files:r,filesCount:m}=M(d),l=b(1),i=w(()=>{const t=(l.value-1)*k;return r.value.slice(t,t+k)}),a=w(()=>Math.ceil(r.value.length/k)),p=t=>t<1024?`${t} B`:t<1024**2?`${(t/1024).toFixed(2)} KB`:t<1024**3?`${(t/1024**2).toFixed(2)} MB`:`${(t/1024**3).toFixed(2)} GB`,F=t=>{const o=new Date(Number(t)+324e5);return`${o.getFullYear()}-${(o.getMonth()+1).toString().padStart(2,"0")}-${o.getDate().toString().padStart(2,"0")} ${o.getHours().toString().padStart(2,"0")}:${o.getMinutes().toString().padStart(2,"0")}:${o.getSeconds().toString().padStart(2,"0")}`},v=t=>{const e=t.name,o=e.lastIndexOf("."),_=e.slice(0,o).slice(13);if(t.timestamp===_){const h=e.slice(0,o).slice(0,-13),O=e.slice(o+1);return`${h}.${O}`}else return t.name},y=async t=>{console.log("handleFileClick");const e=D.baseUrl+"/uploads/";try{const o=await fetch(e+t);if(!o.ok)console.log(`Page not found or invalid URL: ${e+t}`);else{console.log(`Page exists, proceeding to URL. ${e+t}`);const _=await o.blob(),h=document.createElement("a");h.href=URL.createObjectURL(_),h.download=v({name:t}),h.click()}}catch(o){console.error("Error checking URL:",o)}},g=()=>{console.log("requestFilesList 호출됨.");try{d.requestFileList()}catch(t){console.error(`웹서버 요청 중 에러 발생 : ${t}`)}},n=async t=>{console.log("deleteFile 호출됨.");try{const e={requestCode:"1001",file:t};await d.requestFileDelete(e),g(),i.value.length===1&&l.value--}catch(e){console.error(`웹서버 요청 중 에러 발생 : ${e}`)}};return R(()=>{console.log("onMounted 호출됨."),g()}),(t,e)=>(u(),c("div",j,[s("h2",null,"File list (total "+f(I(m))+" items)",1),s("table",null,[e[6]||(e[6]=s("thead",null,[s("tr",null,[s("th",null,"Date"),s("th",null,"Name"),s("th",null,"Size"),s("th",null,"✅"),s("th",null,"❌")])],-1)),s("tbody",null,[(u(!0),c(U,null,B(i.value,o=>(u(),c("tr",{key:o.name},[s("td",null,f(F(o.timestamp)),1),s("td",Y,f(v(o)),1),s("td",null,f(p(o.size)),1),o.type==="file"?(u(),c("td",{key:0,class:"download-btn",onClick:_=>y(o.name)},e[4]||(e[4]=[s("img",{src:K,alt:"Download",class:"icon"},null,-1)]),8,Q)):(u(),c("td",W,"📁")),s("td",{class:"download-btn",onClick:_=>n(o.name)},e[5]||(e[5]=[s("img",{src:H,alt:"delete",class:"icon"},null,-1)]),8,X)]))),128))])]),s("div",Z,[s("button",{onClick:e[0]||(e[0]=o=>l.value=1),disabled:l.value===1}," « ",8,z),s("button",{onClick:e[1]||(e[1]=o=>l.value--),disabled:l.value===1}," ‹ ",8,ee),(u(!0),c(U,null,B(a.value,o=>(u(),c("button",{key:o,class:C({active:l.value===o}),onClick:_=>l.value=o},f(o),11,te))),128)),s("button",{onClick:e[2]||(e[2]=o=>l.value++),disabled:l.value>=a.value}," › ",8,oe),s("button",{onClick:e[3]||(e[3]=o=>l.value=a.value),disabled:l.value>=a.value}," » ",8,se)])]))}},le=N(ne,[["__scopeId","data-v-f20fdeb6"]]),ae={key:0},re={key:1},ie={__name:"UploadView",setup($){const d=b("list");function r(m){d.value=m}return(m,l)=>(u(),c("div",null,[s("nav",null,[s("button",{onClick:l[0]||(l[0]=i=>r("list")),class:C({active:d.value==="list"})}," 리스트 ",2),s("button",{onClick:l[1]||(l[1]=i=>r("upload")),class:C({active:d.value==="upload"})}," 업로드 ",2)]),d.value==="upload"?(u(),c("div",ae,[q(J)])):x("",!0),d.value==="list"?(u(),c("div",re,[q(le)])):x("",!0)]))}},de=N(ie,[["__scopeId","data-v-e57b0237"]]);export{de as default};
