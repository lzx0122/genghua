import{_ as x,a as m,u as w,j as h,s as b,r as i,l as v,d as g,o as y,e as s,w as p,v as u,f as _,F as U}from"./index-CYmITvUh.js";const k={class:"overflow-y-auto flex flex-col items-center mb-[120px] mt-[110px]"},z={class:"flex flex-col max-w-[335px] px-7 mt-7 w-full text-lg leading-loose text-zinc-900"},I={__name:"Auth",setup(A){m();const r=w(),a=h(),{User:c}=b(a),{fetchUser:B,login:f}=a,t=i(""),o=i("");v(()=>{c.value!=null&&r.push({path:"/User/Search"})});const n=async()=>{try{await f(t.value,o.value)&&r.push({path:"/User/Search"})}catch{t.value=""}};return(d,e)=>(y(),g(U,null,[s("div",k,[s("div",z,[e[2]||(e[2]=s("label",{for:"employeeId",class:"self-start"},"員編",-1)),p(s("input",{type:"text",id:"employeeId",name:"employeeId","onUpdate:modelValue":e[0]||(e[0]=l=>t.value=l),class:"flex shrink-0 gap-2.5 py-3 mt-2 h-12 bg-white rounded border-2 border-solid border-zinc-900",required:""},null,512),[[u,t.value]]),e[3]||(e[3]=s("label",{for:"password",class:"self-start mt-11"},"密碼",-1)),p(s("input",{type:"password",id:"password",name:"password","onUpdate:modelValue":e[1]||(e[1]=l=>o.value=l),class:"flex shrink-0 gap-2.5 py-3 mt-2 h-12 bg-white rounded border-2 border-solid border-zinc-900",required:"",onKeyup:_(n,["enter"])},null,544),[[u,o.value]])])]),s("div",{class:"h-[120px] fixed bottom-0 left-0 w-full flex flex-col justify-center px-5 pt-6 pb-12 -mt-11 w-full text-2xl leading-none text-center text-white whitespace-nowrap bg-white shadow-sm"},[s("button",{class:"overflow-hidden gap-2.5 self-stretch px-6 py-3 rounded-lg border-4 border-solid bg-zinc-900 border-zinc-900",onClick:n}," 登入 ")])],64))}},T=x(I,[["__scopeId","data-v-63ee82ce"]]);export{T as default};
