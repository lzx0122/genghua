import{_ as b,u as m,i as v,j as h,s as x,r as i,k as w,c as y,o as B,d as s,w as c,v as p,F as O}from"./index-D1gb35iV.js";const k={class:"overflow-y-auto flex flex-col items-center mb-[120px] mt-[110px]"},_={class:"flex flex-col max-w-[335px] px-7 mt-7 w-full text-lg leading-loose text-zinc-900"},C={__name:"Auth",setup(H){const r=m(),n=v(),u=h(),{User:d}=x(u),{fetchUser:P,login:f}=u,o=i(""),t=i("");w(()=>{d.value!=null&&n.push({path:"/User/Search"})});const g=async()=>{var l;if(t.value.length>8||o.value.length!=10){r.error("密碼不可大於8 或 員編錯誤",{position:"top-center",timeout:5e3,closeOnClick:!0,pauseOnFocusLoss:!0,pauseOnHover:!0,draggable:!0,draggablePercent:.6,showCloseButtonOnHover:!1,hideProgressBar:!0,closeButton:"button",icon:!0,rtl:!1});return}t.value.length<8&&(t.value=t.value.padEnd(8,"0"));try{await f(o.value,t.value),r.success(`${(l=d.value)==null?void 0:l.name} 您好！🫡`,{position:"top-center",timeout:5e3,closeOnClick:!0,pauseOnFocusLoss:!0,pauseOnHover:!0,draggable:!0,draggablePercent:.6,showCloseButtonOnHover:!1,hideProgressBar:!0,closeButton:"button",icon:!0,rtl:!1}),n.push({path:"/User/Search"})}catch(e){r.error(e.message,{position:"top-center",timeout:5e3,closeOnClick:!0,pauseOnFocusLoss:!0,pauseOnHover:!0,draggable:!0,draggablePercent:.6,showCloseButtonOnHover:!1,hideProgressBar:!0,closeButton:"button",icon:!0,rtl:!1}),o.value="",t.value=""}};return(l,e)=>(B(),y(O,null,[s("div",k,[s("div",_,[e[2]||(e[2]=s("label",{for:"employeeId",class:"self-start"},"員編",-1)),c(s("input",{type:"text",id:"employeeId",name:"employeeId","onUpdate:modelValue":e[0]||(e[0]=a=>o.value=a),class:"flex shrink-0 gap-2.5 py-3 mt-2 h-12 bg-white rounded border-2 border-solid border-zinc-900",required:""},null,512),[[p,o.value]]),e[3]||(e[3]=s("label",{for:"password",class:"self-start mt-11"},"密碼",-1)),c(s("input",{type:"password",id:"password",name:"password","onUpdate:modelValue":e[1]||(e[1]=a=>t.value=a),class:"flex shrink-0 gap-2.5 py-3 mt-2 h-12 bg-white rounded border-2 border-solid border-zinc-900",required:""},null,512),[[p,t.value]])])]),s("div",{class:"h-[120px] fixed bottom-0 left-0 w-full flex flex-col justify-center px-5 pt-6 pb-12 -mt-11 w-full text-2xl leading-none text-center text-white whitespace-nowrap bg-white shadow-sm"},[s("button",{class:"overflow-hidden gap-2.5 self-stretch px-6 py-3 rounded-lg border-4 border-solid bg-zinc-900 border-zinc-900",onClick:g}," 登入 ")])],64))}},z=b(C,[["__scopeId","data-v-f2a1cbbb"]]);export{z as default};
