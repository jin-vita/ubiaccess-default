import{d as E,r as b,c as k,_ as N,o as u,a as c,b as o,e as x,F as U,f as B,g as M,t as g,n as D,w as S,s as R,h as T,u as I,i as q}from"./index-CIcjQBX0.js";import{r as L,a as C,b as V}from"./index-Dv1oZ6ws.js";const P=E("files",()=>{const $=b([]),d=k(()=>$.value.length);return{files:$,filesCount:d,requestFileList:async()=>{const i="/nas/list";try{const a=await L(i);return console.log(`response -> ${JSON.stringify(a.data.output.body)}`),$.value=a.data.output.body,a.data}catch(a){return a.code==="ECONNABORTED"?console.log(`서버 요청 시 타임아웃 : ${C.timeout}`):console.error(`서버 요청 시 에러 : ${a.message}`),null}},requestFileDelete:async i=>{const a="/nas/delete";try{const p=await L(a,i);return console.log(`response -> ${JSON.stringify(p.data.output.body)}`),p.data}catch(p){return p.code==="ECONNABORTED"?console.log(`서버 요청 시 타임아웃 : ${C.timeout}`):console.error(`서버 요청 시 에러 : ${p.message}`),null}},requestFileUpload:async(i,a)=>new Promise(async(p,F)=>{console.log(`upload 호출됨 -> name : ${i.name}, type : ${i.type}`);try{let v=new FormData;v.append("photo",i);const y=await V.post(`${C.baseUrl}/nas/upload`,v,{headers:{"Content-Type":"multipart/form-data;charset=utf-8;"},onUploadProgress:f=>{const n=parseInt(f.loaded/f.total*100);a&&a(n)}});p(y.data)}catch(v){console.error(`에러 -> ${v}`),F(`에러 -> ${v}`)}})}}),A={key:0,class:"drop-hint"},G={__name:"FileUpload",setup($){const d=P(),r=b([]),m=b(!1),l=n=>n<1024?`${n} B`:n<1024**2?`${(n/1024).toFixed(2)} KB`:n<1024**3?`${(n/1024**2).toFixed(2)} MB`:`${(n/1024**3).toFixed(2)} GB`,i=n=>{v(n.target.files)},a=()=>{m.value=!0},p=()=>{m.value=!1},F=n=>{m.value=!1,r.value=[],v(n.dataTransfer.files)},v=n=>{const t=Array.from(n).map(e=>({file:e,uploadProgress:0}));r.value=[...r.value,...t]},y=()=>{if(!r.value.length){console.log("선택된 파일이 없습니다");return}r.value.forEach(n=>{f(n)}),console.log("파일이 업로드되었습니다")};async function f(n){console.log(`uploadFile 호출됨 -> name : ${n.file.name}, type : ${n.file.type}`);try{const t=await d.requestFileUpload(n.file,e=>{n.uploadProgress=e,console.log(`업로드 progress : ${e}`)});console.log(`response -> ${JSON.stringify(t)}`)}catch(t){console.error(`에러 -> ${t}`)}}return(n,t)=>(u(),c("div",{class:D(["container",{dragging:m.value}]),onDragover:S(a,["prevent"]),onDragleave:S(p,["prevent"]),onDrop:S(F,["prevent"])},[t[1]||(t[1]=o("h2",null,"Upload Files (limit 10GB)",-1)),o("input",{type:"file",multiple:"",onClick:t[0]||(t[0]=e=>r.value=[]),onChange:i},null,32),o("button",{onClick:y},"upload"),r.value.length?x("",!0):(u(),c("div",A,"Drop files here to upload")),(u(!0),c(U,null,B(r.value,e=>(u(),c("div",{key:e.file.name},[M(g(e.file.name)+" ("+g(l(e.file.size))+" KB) ",1),o("span",null," - "+g(e.uploadProgress<100?`${e.uploadProgress}%`:"완료"),1)]))),128))],34))}},J=N(G,[["__scopeId","data-v-f79f7988"]]),K="/download.ico",H="/assets/delete-DHlDl9-h.png",j={class:"container"},Y={class:"filename-column"},Q=["onClick"],W={key:1},X=["onClick"],Z={class:"pagination"},z=["disabled"],ee=["disabled"],te=["onClick"],oe=["disabled"],ne=["disabled"],w=8,se={__name:"FileList",setup($){const d=P(),{files:r,filesCount:m}=R(d),l=b(1),i=k(()=>{const t=(l.value-1)*w;return r.value.slice(t,t+w)}),a=k(()=>Math.ceil(r.value.length/w)),p=t=>t<1024?`${t} B`:t<1024**2?`${(t/1024).toFixed(2)} KB`:t<1024**3?`${(t/1024**2).toFixed(2)} MB`:`${(t/1024**3).toFixed(2)} GB`,F=t=>{const e=new Date(Number(t));return`${e.getFullYear()}-${(e.getMonth()+1).toString().padStart(2,"0")}-${e.getDate().toString().padStart(2,"0")} ${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}:${e.getSeconds().toString().padStart(2,"0")}`},v=t=>{const e=t.name,s=e.lastIndexOf("."),_=e.slice(0,s).slice(13);if(t.timestamp===_){const h=e.slice(0,s).slice(0,-13),O=e.slice(s+1);return`${h}.${O}`}else return t.name},y=async t=>{console.log("handleFileClick");const e=C.baseUrl+"/uploads/";try{const s=await fetch(e+t);if(!s.ok)console.log(`Page not found or invalid URL: ${e+t}`);else{console.log(`Page exists, proceeding to URL. ${e+t}`);const _=await s.blob(),h=document.createElement("a");h.href=URL.createObjectURL(_),h.download=v({name:t}),h.click()}}catch(s){console.error("Error checking URL:",s)}},f=()=>{console.log("requestFilesList 호출됨.");try{d.requestFileList()}catch(t){console.error(`웹서버 요청 중 에러 발생 : ${t}`)}},n=async t=>{console.log("deleteFile 호출됨.");try{const e={requestCode:"1001",file:t};await d.requestFileDelete(e),f(),i.value.length===1&&l.value--}catch(e){console.error(`웹서버 요청 중 에러 발생 : ${e}`)}};return T(()=>{console.log("onMounted 호출됨."),f()}),(t,e)=>(u(),c("div",j,[o("h2",null,"File list (total "+g(I(m))+" items)",1),o("table",null,[e[6]||(e[6]=o("thead",null,[o("tr",null,[o("th",null,"Date"),o("th",null,"Name"),o("th",null,"Size"),o("th",null,"✅"),o("th",null,"❌")])],-1)),o("tbody",null,[(u(!0),c(U,null,B(i.value,s=>(u(),c("tr",{key:s.name},[o("td",null,g(F(s.timestamp)),1),o("td",Y,g(v(s)),1),o("td",null,g(p(s.size)),1),s.type==="file"?(u(),c("td",{key:0,class:"download-btn",onClick:_=>y(s.name)},e[4]||(e[4]=[o("img",{src:K,alt:"Download",class:"icon"},null,-1)]),8,Q)):(u(),c("td",W,"📁")),o("td",{class:"download-btn",onClick:_=>n(s.name)},e[5]||(e[5]=[o("img",{src:H,alt:"delete",class:"icon"},null,-1)]),8,X)]))),128))])]),o("div",Z,[o("button",{onClick:e[0]||(e[0]=s=>l.value=1),disabled:l.value===1}," « ",8,z),o("button",{onClick:e[1]||(e[1]=s=>l.value--),disabled:l.value===1}," ‹ ",8,ee),(u(!0),c(U,null,B(a.value,s=>(u(),c("button",{key:s,class:D({active:l.value===s}),onClick:_=>l.value=s},g(s),11,te))),128)),o("button",{onClick:e[2]||(e[2]=s=>l.value++),disabled:l.value>=a.value}," › ",8,oe),o("button",{onClick:e[3]||(e[3]=s=>l.value=a.value),disabled:l.value>=a.value}," » ",8,ne)])]))}},le=N(se,[["__scopeId","data-v-6083b855"]]),ae={key:0},re={key:1},ie={__name:"UploadView",setup($){const d=b("list");function r(m){d.value=m}return(m,l)=>(u(),c("div",null,[o("nav",null,[o("button",{onClick:l[0]||(l[0]=i=>r("list")),class:D({active:d.value==="list"})}," 리스트 ",2),o("button",{onClick:l[1]||(l[1]=i=>r("upload")),class:D({active:d.value==="upload"})}," 업로드 ",2)]),d.value==="upload"?(u(),c("div",ae,[q(J)])):x("",!0),d.value==="list"?(u(),c("div",re,[q(le)])):x("",!0)]))}},de=N(ie,[["__scopeId","data-v-e57b0237"]]);export{de as default};
