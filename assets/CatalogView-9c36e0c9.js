import{d as O,r as o,u as R,o as E,a as b,w as C,b as d,c as K,e as s,f as x,g as e,t as n,h as z}from"./index-2556f980.js";const A={class:"h-full w-full flex flex-column align-items-center py-8"},G={class:"card flex flex-column justify-content-center align-items-center align-content-center text-center gap-3"},H={class:"p-inputgroup flex-1"},J=e("span",{class:"p-inputgroup-addon"},[e("i",{class:"pi pi-user"})],-1),Q={class:"p-inputgroup flex-1"},W=e("span",{class:"p-inputgroup-addon"},[e("i",{class:"pi pi-shopping-bag"})],-1),X={class:"p-inputgroup flex-1"},Y=e("span",{class:"p-inputgroup-addon"},"@",-1),Z={class:"pb-5"},F={class:"text-2xl"},P={class:"card col-7"},ee={class:"flex justify-content-between align-items-center"},ae={class:"flex gap-3 justify-content-around"},te={class:"card flex flex-row justify-content-center align-items-center gap-3 align-content-start"},le={class:"flex justify-content-center align-items-start gap-3"},se={class:"flex justify-content-center align-items-start gap-3"},oe={class:"card flex flex-row justify-content-end align-items-center gap-3 align-content-center"},ne={class:"flex flex-auto justify-content-end align-items-center w-full"},ie={class:"p-input-icon-left w-full"},ce=e("i",{class:"pi pi-search"},null,-1),de={class:"col-12"},ue={class:"flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"},re=["src","alt"],pe={class:"flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4 w-8"},me={class:"flex flex-column align-items-center sm:align-items-start flex-grow-0 gap-3 w-8"},ve={class:"text-lg font-bold overflow-hidden white-space-nowrap text-overflow-ellipsis w-full"},fe={class:"font-light overflow-hidden white-space-nowrap text-overflow-ellipsis w-full"},ge={class:"flex align-items-center gap-3"},_e={class:"flex align-items-center gap-2"},xe=e("i",{class:"pi pi-tag"},null,-1),he={class:"font-semibold"},we={class:"flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"},Ve={class:"text-lg font-semibold"},ye={class:"col-12 sm:col-6 lg:col-12 xl:col-4 p-2"},be={class:"p-4 border-1 surface-border surface-card border-round"},Ce={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Ue={class:"flex align-items-center gap-2"},Me=e("i",{class:"pi pi-tag"},null,-1),je={class:"font-semibold"},Le={class:"flex flex-column align-items-center gap-3 py-5 text-center"},De=["src","alt"],$e={class:"text-lg font-bold overflow-hidden white-space-nowrap text-overflow-ellipsis w-full"},ke={class:"font-light overflow-hidden white-space-nowrap text-overflow-ellipsis w-full"},Ne={class:"flex align-items-center justify-content-between"},Se={class:"text-lg font-semibold"},Ie=O({__name:"CatalogView",props:{category:{type:String,required:!0},searchName:{type:String,required:!1}},setup(k){const g=k,u=o([]),h=o([]),p=o({}),i=o([]),m=o(0),v=o(0),w=o(""),c=o(!1),r=o({}),N=R(),U=o({}),M=o({}),j=o("/eshop/images");E(async()=>{p.value.category=g.category,u.value=await b.getCatalogByFilter(p.value),m.value=Math.min(...u.value.map(l=>l.price)),v.value=Math.max(...u.value.map(l=>l.price)),i.value=[m.value,v.value],g.searchName&&(u.value=u.value.filter(l=>l.name.toLocaleLowerCase().includes(g.searchName.toLocaleLowerCase()))),h.value=u.value,U.value=await b.getCategories(),M.value=b.findCategory(U.value,g.category)}),C(i,l=>{p.value.priceMin=l[0],p.value.priceMax=l[1]},{deep:!0}),C(w,l=>{p.value.name=l}),C(p,l=>{h.value=u.value.filter(t=>l.priceMax&&l.priceMin?t.price>=l.priceMin&&t.price<=l.priceMax:l.priceMin?t.price>=l.priceMin:l.priceMax?t.price<=l.priceMax:!0).filter(t=>l.name?t.name.toLocaleLowerCase().includes(l.name.toLocaleLowerCase()):!0)},{deep:!0});const S=()=>{N.add({severity:"success",summary:`Дорогой ${r.value.name}, заявка успешно оформлена!`,detail:"Мы получили ваше обращение, дождитесь обратной связи",life:1e4}),c.value=!c.value},V=o("grid");return(l,t)=>{var $;const _=d("InputText"),y=d("Button"),B=d("Dialog"),L=d("InputNumber"),I=d("Slider"),T=d("DataViewLayoutOptions"),D=d("Rating"),q=d("DataView");return z(),K("div",A,[s(B,{visible:c.value,"onUpdate:visible":t[4]||(t[4]=a=>c.value=a),modal:"",header:"Оставьте заявку",style:{width:"50vw"}},{default:x(()=>[e("div",G,[e("div",H,[J,s(_,{placeholder:"Имя",modelValue:r.value.name,"onUpdate:modelValue":t[0]||(t[0]=a=>r.value.name=a)},null,8,["modelValue"])]),e("div",Q,[W,s(_,{placeholder:"Товары, интересущие вас",modelValue:r.value.products,"onUpdate:modelValue":t[1]||(t[1]=a=>r.value.products=a)},null,8,["modelValue"])]),e("div",X,[Y,s(_,{placeholder:"Ваша почта",modelValue:r.value.email,"onUpdate:modelValue":t[2]||(t[2]=a=>r.value.email=a)},null,8,["modelValue"])]),s(y,{label:"Отправить",onClick:t[3]||(t[3]=a=>S())})])]),_:1},8,["visible"]),e("div",Z,[e("span",F,"Товары категории: "+n(($=M.value)==null?void 0:$.label),1)]),e("div",P,[s(q,{value:h.value,layout:V.value,paginator:"",rows:6,dataKey:"name"},{header:x(()=>[e("div",ee,[e("div",ae,[e("div",te,[e("div",le,[s(L,{modelValue:i.value[0],"onUpdate:modelValue":t[5]||(t[5]=a=>i.value[0]=a),class:"",max:v.value,min:m.value},null,8,["modelValue","max","min"])]),s(I,{modelValue:i.value,"onUpdate:modelValue":t[6]||(t[6]=a=>i.value=a),range:"",class:"w-14rem",min:m.value,max:v.value},null,8,["modelValue","min","max"]),e("div",se,[s(L,{modelValue:i.value[1],"onUpdate:modelValue":t[7]||(t[7]=a=>i.value[1]=a),class:"",max:v.value,min:m.value},null,8,["modelValue","max","min"])])])]),e("div",oe,[e("div",ne,[e("span",ie,[ce,s(_,{modelValue:w.value,"onUpdate:modelValue":t[8]||(t[8]=a=>w.value=a),placeholder:"Search",class:"w-full"},null,8,["modelValue"])])])]),s(T,{modelValue:V.value,"onUpdate:modelValue":t[9]||(t[9]=a=>V.value=a)},null,8,["modelValue"])])]),list:x(a=>[e("div",de,[e("div",ue,[e("img",{class:"w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round",src:`${j.value}/${a.data.img}`,alt:a.data.name},null,8,re),e("div",pe,[e("div",me,[e("div",ve,n(a.data.name),1),e("div",fe,n(a.data.description),1),s(D,{modelValue:a.data.rating,"onUpdate:modelValue":f=>a.data.rating=f,cancel:!1,readonly:""},null,8,["modelValue","onUpdate:modelValue"]),e("div",ge,[e("span",_e,[xe,e("span",he,n(a.data.category),1)])])]),e("div",we,[e("span",Ve,"₽"+n(a.data.price),1),s(y,{icon:"pi pi-shopping-cart",rounded:"",onClick:t[10]||(t[10]=f=>c.value=!c.value)})])])])])]),grid:x(a=>[e("div",ye,[e("div",be,[e("div",Ce,[e("div",Ue,[Me,e("span",je,n(a.data.category),1)])]),e("div",Le,[e("img",{class:"w-9 shadow-2 border-round",src:`${j.value}/${a.data.img}`,alt:a.data.name},null,8,De),e("div",$e,n(a.data.name),1),e("div",ke,n(a.data.description),1),s(D,{modelValue:a.data.rating,"onUpdate:modelValue":f=>a.data.rating=f,cancel:!1,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),e("div",Ne,[e("span",Se,"₽"+n(a.data.price),1),s(y,{icon:"pi pi-shopping-cart",rounded:"",onClick:t[11]||(t[11]=f=>c.value=!c.value)})])])])]),_:1},8,["value","layout"])])])}}});export{Ie as default};
