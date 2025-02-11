import{_ as N,b as I,s as S,r as f,k as H,p as U,m as L,c as Y,d as l,o,g as A,h as D,e,w as M,B as j,v as T,F as k,l as $,C as K,t as c,i as h,D as P,n as G,q as V,x as q,y as O,z as Z,A as F}from"./index-DqPHT_0Z.js";import{d as z}from"./dayjs.min-CSV3c0hW.js";const R={key:0,class:"modal-mask text-lg tracking-normal leading-none rounded-none"},E={class:"modal-container flex overflow-hidden flex-col items-start px-7 py-6 w-full bg-white rounded-3xl border-solid border-[3px] border-[color:var(--black,#1B1B1B)]"},W={class:"flex flex-col justify-start mt-4 w-full text-lg leading-loose rounded max-w-[335px] text-zinc-900"},J={class:"flex"},Q={class:"relative w-60"},X={key:0,class:"absolute text-xs w-full text-black border border-black bg-white rounded shadow-sm max-h-40 max-w-[230px] overflow-auto top-full mt-1 z-50"},ee=["onMousedown"],te={class:"flex flex-col mt-4 w-full text-lg leading-loose rounded max-w-[335px] text-zinc-900"},se={class:"flex items-center"},oe={class:"flex gap-5 justify-between mt-14 w-full text-center whitespace-nowrap"},le={__name:"AddKeepModal",props:["show","ItemData"],setup(y){const b=I(),{GetItemData:p,AddKeep:r}=b,{AdminSearchUsersData:_,ItemData:w}=S(b),i=f(!1),u=f(""),s=f(null),a=f(!1),g=f(!1);H(async()=>{await p()});const x=f(1);U(x,()=>{x.value<1&&(x.value=1)});const C=L(()=>u.value?w.value.filter(v=>v.Name.toLowerCase().includes(u.value.toLowerCase())):w.value),m=v=>{u.value=v.Name,s.value=v.ItemId,a.value=!1},d=async()=>{if(i.value&&!s.value){toast.error("選擇清單模式，請從選單中選取一個品項",{position:"top-center",timeout:3e3,closeOnClick:!0,pauseOnFocusLoss:!0,pauseOnHover:!0,draggable:!0,draggablePercent:.6,showCloseButtonOnHover:!1,hideProgressBar:!0,closeButton:"button",icon:!0,rtl:!1});return}g.value=!0,await r({account:_.value[0].Account,amount:x.value,itemId:i.value?s.value:null,itemName:i.value?null:u.value}),g.value=!1,window.location.reload()};return(v,t)=>{const B=Y("Loading");return o(),l(k,null,[A(B,{active:g.value,"is-full-page":!0,"can-cancel":!0,color:"oklch(0.21 0.006 285.885)","background-color":"rgb(255, 255, 255)",height:128,width:128,loader:"Bars"},null,8,["active"]),y.show?(o(),l("div",R,[e("section",E,[t[14]||(t[14]=e("p",{class:"text-2xl tracking-wide text-zinc-900"},"新增寄放商品",-1)),e("div",W,[e("div",J,[t[9]||(t[9]=e("label",{for:"itemName",class:"text-left truncate w-[120px] w-max-[120px]"},"選擇商品",-1)),M(e("input",{type:"checkbox",id:"customCheckbox",class:"sr-only","aria-label":"Custom checkbox","onUpdate:modelValue":t[0]||(t[0]=n=>i.value=n)},null,512),[[j,i.value]]),t[10]||(t[10]=e("label",{for:"customCheckbox",class:"flex w-full cursor-pointer items-center justify-center"},[e("div",{class:"flex h-4 w-4 items-center justify-center rounded-sm border-2 border-zinc-900"},[e("svg",{class:"hidden h-3 w-3 text-zinc-900",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})])])],-1))]),e("div",Q,[M(e("input",{id:"itemName","onUpdate:modelValue":t[1]||(t[1]=n=>u.value=n),onFocus:t[2]||(t[2]=n=>a.value=!0),onInput:t[3]||(t[3]=n=>a.value=!0),onBlur:t[4]||(t[4]=n=>a.value=!1),type:"text",placeholder:"輸入飲料名稱",class:"border border-black w-full rounded p-2 bg-white"},null,544),[[T,u.value]]),a.value&&C.value.length&&i.value?(o(),l("ul",X,[(o(!0),l(k,null,$(C.value,n=>(o(),l("li",{key:n.id,onMousedown:K(Ne=>m(n),["prevent"]),class:"p-2 hover:bg-gray-200 cursor-pointer"},c(n.Name),41,ee))),128))])):D("",!0)])]),e("div",te,[t[13]||(t[13]=e("label",{for:"amount",class:"self-start"},"寄放數量* ",-1)),e("div",se,[M(e("input",{type:"number",id:"amount",placeholder:"寄放數量",min:"1","onUpdate:modelValue":t[5]||(t[5]=n=>x.value=n),class:"flex text-center max-w-[100px] gap-2.5 mr-2 py-3 h-12 bg-white rounded border-2 border-solid border-zinc-900 appearance-auto"},null,512),[[T,x.value]]),(o(),l("svg",{width:"40px",height:"40px",viewBox:"0 0 32 32",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xmlns:sketch":"http://www.bohemiancoding.com/sketch/ns",class:"mr-2",onClick:t[6]||(t[6]=n=>x.value--)},t[11]||(t[11]=[e("g",{id:"Page-1",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd","sketch:type":"MSPage"},[e("g",{id:"Icon-Set","sketch:type":"MSLayerGroup",transform:"translate(-152.000000, -1035.000000)",fill:"#000000"},[e("path",{d:"M174,1050 L162,1050 C161.448,1050 161,1050.45 161,1051 C161,1051.55 161.448,1052 162,1052 L174,1052 C174.552,1052 175,1051.55 175,1051 C175,1050.45 174.552,1050 174,1050 L174,1050 Z M182,1063 C182,1064.1 181.104,1065 180,1065 L156,1065 C154.896,1065 154,1064.1 154,1063 L154,1039 C154,1037.9 154.896,1037 156,1037 L180,1037 C181.104,1037 182,1037.9 182,1039 L182,1063 L182,1063 Z M180,1035 L156,1035 C153.791,1035 152,1036.79 152,1039 L152,1063 C152,1065.21 153.791,1067 156,1067 L180,1067 C182.209,1067 184,1065.21 184,1063 L184,1039 C184,1036.79 182.209,1035 180,1035 L180,1035 Z",id:"minus-square","sketch:type":"MSShapeGroup"})])],-1)]))),(o(),l("svg",{width:"40px",height:"40px",viewBox:"0 0 32 32",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xmlns:sketch":"http://www.bohemiancoding.com/sketch/ns",onClick:t[7]||(t[7]=n=>x.value++)},t[12]||(t[12]=[e("g",{id:"Page-1",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd","sketch:type":"MSPage"},[e("g",{id:"Icon-Set-Filled","sketch:type":"MSLayerGroup",transform:"translate(-102.000000, -1037.000000)",fill:"#000000"},[e("path",{d:"M124,1054 L119,1054 L119,1059 C119,1059.55 118.552,1060 118,1060 C117.448,1060 117,1059.55 117,1059 L117,1054 L112,1054 C111.448,1054 111,1053.55 111,1053 C111,1052.45 111.448,1052 112,1052 L117,1052 L117,1047 C117,1046.45 117.448,1046 118,1046 C118.552,1046 119,1046.45 119,1047 L119,1052 L124,1052 C124.552,1052 125,1052.45 125,1053 C125,1053.55 124.552,1054 124,1054 L124,1054 Z M130,1037 L106,1037 C103.791,1037 102,1038.79 102,1041 L102,1065 C102,1067.21 103.791,1069 106,1069 L130,1069 C132.209,1069 134,1067.21 134,1065 L134,1041 C134,1038.79 132.209,1037 130,1037 L130,1037 Z",id:"plus-square","sketch:type":"MSShapeGroup"})])],-1)])))])]),e("footer",oe,[e("div",{class:"gap-1.5 self-stretch px-5 py-2 text-black rounded-lg border border-solid border-zinc-400",onClick:t[8]||(t[8]=n=>v.$emit("close"))}," 關閉 "),e("div",{class:"gap-1.5 self-stretch px-5 py-2 text-white rounded-lg bg-zinc-900",onClick:d}," 送出 ")])])])):D("",!0)],64)}}},ae=N(le,[["__scopeId","data-v-ce3d578d"]]),ne={class:"flex flex-col px-4 mt-3.5 w-full"},re={class:"flex flex-col items-start self-center px-4 py-4 w-full rounded-lg border-4 border-solid border-zinc-800 max-w-[335px] text-zinc-800"},ie={class:"flex gap-6 text-center whitespace-nowrap"},de={class:"my-auto text-2xl"},ce={class:"text-3xl basis-auto"},ue={class:"flex gap-3 px-2.5 py-1.5 mt-2 ml-3 text-lg tracking-normal leading-none bg-white rounded-lg border-4 border-solid border-zinc-900"},me={class:"basis-auto"},pe={class:"flex items-center self-start mt-4 text-2xl leading-none text-center text-zinc-900",role:"heading","aria-level":"2"},xe={class:"overflow-x-auto w-full"},ve={class:"flex gap-4 items-start mt-5 whitespace-nowrap"},fe={class:"flex flex-col px-3 py-4 w-full bg-white rounded-none border-2 border-solid border-zinc-900 text-zinc-900"},be={class:"text-sm tracking-wide"},we={class:"text-lg tracking-normal leading-none"},ge={class:"mt-1 text-xs tracking-wide"},he={class:"text-xs tracking-wide"},ke={__name:"ManageUserHome",setup(y){const b=I(),{GetItemData:p}=b,{AdminSearchUsersData:r,ItemData:_}=S(b),w=f(!1),i=L(()=>[...r.value[0].Keeps].sort((u,s)=>s.DateTime.seconds-u.DateTime.seconds));return(u,s)=>(o(),l(k,null,[A(ae,{ItemData:h(_),show:w.value,onClose:s[0]||(s[0]=a=>w.value=!1)},null,8,["ItemData","show"]),e("div",ne,[e("div",re,[e("div",ie,[e("div",de,c(h(r)[0].Name),1),e("div",ce,c(h(r)[0].MonthDay.replace("-","月")+"日"),1)]),e("div",ue,[s[2]||(s[2]=e("img",{loading:"lazy",src:"https://cdn.builder.io/api/v1/image/assets/1658e52805814928b66db3bf763c83c5/8ed27068e2b86736d3b2f1dbf63e952cbc1b693363b7f29857093d7b8572e8cb?apiKey=1658e52805814928b66db3bf763c83c5&",class:"object-contain shrink-0 w-6 aspect-square",alt:"Phone Icon"},null,-1)),s[3]||(s[3]=e("div",null,"電話:",-1)),e("div",me,c(h(r)[0].Account),1)])]),e("div",pe,[s[5]||(s[5]=P(" 會員的庫存 ")),(o(),l("svg",{class:"w-6 h-6 text-black","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",viewBox:"0 0 24 24",onClick:s[1]||(s[1]=a=>w.value=!0)},s[4]||(s[4]=[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"},null,-1)])))]),e("div",xe,[e("div",ve,[(o(!0),l(k,null,$(i.value,(a,g)=>(o(),l("div",{key:a.id,class:"flex flex-col w-[150px] shrink-0",tabindex:"0",role:"article","aria-label":"Large Latte Stock"},[s[6]||(s[6]=e("div",{class:"flex overflow-hidden flex-col justify-center items-center px-4 py-10 w-full border-2 border-solid bg-zinc-100 border-zinc-900 rounded-t-lg"},[e("img",{loading:"lazy",src:"https://cdn.builder.io/api/v1/image/assets/1658e52805814928b66db3bf763c83c5/3f99a80673c020e4d1b4351e57d0eeb35b539a3ade9906fe51e6f0466dfa7d6b?apiKey=1658e52805814928b66db3bf763c83c5&",class:"object-contain w-6 aspect-square",alt:"Coffee Cup Icon"})],-1)),e("div",fe,[e("div",be,c(g+1),1),e("div",we,c(a.Item.Name),1),e("div",ge," 剩餘數量: "+c(a.Amount),1),e("div",he,c(h(z)(a.DateTime.seconds*1e3).format("YYYY MM月DD日 HH:mm")),1)])]))),128))])])])],64))}},_e={class:"flex flex-col overflow-y-auto min-h-[500px] max-h-[500px] items-center px-6 mt-5 w-full text-base tracking-wide rounded-md",role:"list","aria-label":"Transaction History"},ye={class:"flex gap-5 justify-between py-3 w-full bg-white border-b-2 border-solid border-b-zinc-900",role:"listitem"},Ce={class:"flex gap-2.5"},Le={class:"flex flex-col"},$e={class:"self-start text-zinc-900"},Me={class:"mt-1 text-stone-500"},De={class:"self-start text-zinc-900"},ze={__name:"ManageUserLogs",props:["userlogs"],setup(y){return(b,p)=>(o(),l("div",_e,[(o(!0),l(k,null,$(y.userlogs,r=>(o(),l("div",ye,[e("div",Ce,[p[0]||(p[0]=e("img",{loading:"lazy",src:"https://cdn.builder.io/api/v1/image/assets/1658e52805814928b66db3bf763c83c5/bc52c0ecbf45ac0162e7ce0956322c4d1472b0c8c12760836c29f7e52726f959?apiKey=1658e52805814928b66db3bf763c83c5&",class:"object-contain shrink-0 w-12 aspect-square fill-zinc-100",alt:"Latte Transaction Icon"},null,-1)),e("div",Le,[e("div",$e,c(r.title),1),e("div",Me,c(r.datetime),1)])]),e("div",De," 編號"+c(r.index+1)+" "+c(r.desc),1)]))),256))]))}},Ie={class:"text-sm font-medium text-center text-black border-b border-gray-300 bg-white"},Se={class:"flex flex-wrap -mb-px"},Ae=["onClick"],Be={key:0,class:"flex overflow-y-auto flex-col pb-10 mx-auto w-full bg-white",role:"main","aria-label":"Member Warehouse Section"},Te={__name:"ManageUser",setup(y){const b=I(),{AdminSearchUsersData:p}=S(b),{GetAdminSearchUserDataByAccount:r}=b,_=G(),w=f(!1),i=f([]),u=[{id:0,title:"庫存",component:ke},{id:1,title:"紀錄",component:ze}],s=f(0),a=()=>{for(const[m,d]of p.value[0].Keeps.entries()){i.value.push({index:m,title:`${d.Item.Name} +${d.Amount}`,datetime:z(d.DateTime.seconds*1e3).format("YYYY MM月DD日 HH:mm"),timestamp:d.DateTime.seconds,desc:"寄放"});let v=d.Pickup.map(t=>(p.value[0].Keeps[m].Amount-=t.Amount,{index:m,title:`${d.Item.Name} -${t.Amount}`,datetime:z(t.DateTime.seconds*1e3).format("YYYY MM月DD日 HH:mm"),timestamp:t.DateTime.seconds,desc:"領取"}));i.value.push(...v)}i.value.sort((m,d)=>d.timestamp-m.timestamp)},g=m=>{s.value=m},x=L(()=>u[s.value].component),C=L(()=>s.value==1?{userlogs:i.value}:{});return H(async()=>{await r(_.params.account),a()}),U(()=>_.params.account,async m=>{await r(m),a()}),(m,d)=>{const v=Y("Loading");return o(),l(k,null,[A(v,{active:w.value,"is-full-page":!0,"can-cancel":!0,color:"oklch(0.21 0.006 285.885)","background-color":"rgb(255, 255, 255)",height:128,width:128,loader:"Bars"},null,8,["active"]),d[0]||(d[0]=e("div",{class:"min-h-[76px]"},null,-1)),e("div",Ie,[e("ul",Se,[(o(),l(k,null,$(u,t=>e("li",{key:t.id,class:"me-2"},[e("a",{href:"#",class:V({"inline-block p-4 text-black border-b-2 border-black rounded-t-lg activek":t.id==s.value,"inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-black hover:border-gray-400":t.id!=s.value}),onClick:B=>g(t.id)},c(t.title),11,Ae)])),64))])]),Array.isArray(h(p))&&h(p)[0]?(o(),l("div",Be,[(o(),q(F(x.value),O(Z(C.value)),null,16))])):D("",!0)],64)}}},Ye=N(Te,[["__scopeId","data-v-0a221e18"]]);export{Ye as default};
