import{_ as v,a as h,u as w,j as b,s as g,r as n,k as y,c as _,d as k,o as U,g as z,e as t,w as p,v as c,f as I,F as B}from"./index-Vo84ny4w.js";const V={class:"overflow-y-auto flex flex-col items-center mb-[120px] mt-[90px]"},A={class:"flex flex-col max-w-[335px] px-7 mt-7 w-full text-lg leading-loose text-zinc-900"},L={__name:"Auth",setup(S){h();const d=w(),i=b(),{User:f}=g(i),{fetchUser:T,login:x}=i,s=n(""),l=n(""),o=n(!1);y(()=>{f.value!=null&&d.push({path:"/User/Search"})});const u=async()=>{try{if(o.value)return;o.value=!0;let a=await x(s.value,l.value);o.value=!1,a&&d.push({path:"/User/Search"})}catch{s.value=""}};return(a,e)=>{const m=_("Loading");return U(),k(B,null,[z(m,{active:o.value,"is-full-page":!0,"can-cancel":!0,color:"oklch(0.21 0.006 285.885)","background-color":"rgb(255, 255, 255)",height:128,width:128,loader:"Bars"},null,8,["active"]),e[4]||(e[4]=t("div",{class:"min-h-[76px]"},null,-1)),t("div",V,[t("div",A,[e[2]||(e[2]=t("label",{for:"employeeId",class:"self-start"},"員編",-1)),p(t("input",{type:"text",id:"employeeId",name:"employeeId","onUpdate:modelValue":e[0]||(e[0]=r=>s.value=r),class:"flex shrink-0 gap-2.5 py-3 mt-2 h-12 bg-white rounded border-2 border-solid border-zinc-900",required:""},null,512),[[c,s.value]]),e[3]||(e[3]=t("label",{for:"password",class:"self-start mt-11"},"密碼",-1)),p(t("input",{type:"password",id:"password",name:"password","onUpdate:modelValue":e[1]||(e[1]=r=>l.value=r),class:"flex shrink-0 gap-2.5 py-3 mt-2 h-12 bg-white rounded border-2 border-solid border-zinc-900",required:"",onKeyup:I(u,["enter"])},null,544),[[c,l.value]])])]),t("div",{class:"h-[120px] fixed bottom-0 left-0 w-full flex flex-col justify-center px-5 pt-6 pb-12 -mt-11 w-full text-2xl leading-none text-center text-white whitespace-nowrap bg-white shadow-sm"},[t("button",{class:"overflow-hidden gap-2.5 self-stretch px-6 py-3 rounded-lg border-4 border-solid bg-zinc-900 border-zinc-900",onClick:u}," 登入 ")])],64)}}},q=v(L,[["__scopeId","data-v-dd4b65a6"]]);export{q as default};
