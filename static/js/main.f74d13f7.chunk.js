(this["webpackJsonpomegaup-problem-creator"]=this["webpackJsonpomegaup-problem-creator"]||[]).push([[0],{153:function(e,t,n){"use strict";n.r(t);var c=n(181),s=n(1),r=n(46),a=n.n(r),i=n(186),o=n(83),j=n(26),b=n(167),l=n(168),d=n(169),u=n(193),O=n(170),p=n(189),x=n(82),h=n(39),m=n(128),f=n(164),g=n(94),C=n(3),v=function(e){var t=Object(m.c)().toggleColorMode,n=Object(m.d)("dark","light"),c=Object(m.d)(g.a,g.b);return Object(C.jsx)(f.a,Object(h.a)({size:"md",fontSize:"lg",variant:"ghost",color:"current",marginLeft:"2",onClick:t,icon:Object(C.jsx)(c,{}),"aria-label":"Switch to ".concat(n," mode")},e))},S=function(){return Object(C.jsx)(b.a,{boxShadow:"md",children:Object(C.jsx)(l.a,{maxW:"container.lg",children:Object(C.jsxs)(d.a,{align:"center",height:"38px",children:[Object(C.jsx)(b.a,{w:"86px",children:Object(C.jsx)(u.a,{w:"full",src:"https://omegaup.com/preguntas//omegaup_curves.png"})}),Object(C.jsx)(O.a,{}),Object(C.jsx)(b.a,{mr:5,children:Object(C.jsx)(v,{})}),Object(C.jsx)(b.a,{children:Object(C.jsx)(p.a,{label:"Colabora con nosotros en Github!","aria-label":"Colabora",children:Object(C.jsx)("span",{children:Object(C.jsx)(x.b,{size:25})})})})]})})})},N=n(5),y=n(171),D=n(190),k=n(185),z=n(126),E=n(174),P=n(45);function w(e){var t=100,n=0;e.forEach((function(e){e.pointsDefined?t-=e.points:n+=1}));var c=t/n;return e.map((function(e){return e.pointsDefined||(e.points=c),e}))}var G,R={title:{titleName:"Nuevo Problema",setTitleName:Object(j.b)((function(e,t){e.titleName=t}))},cases:{cases:[{name:"mainGroup",points:0,isMain:!0,pointsDefined:!1,cases:[]}],availablePoints:100,addCase:Object(j.b)((function(e,t){var n=t.group,c=!1;e.cases.map((function(e){return e.name===n&&(e.cases.push(t),c=!0),e})),c||e.cases.push({name:n,points:0,isMain:!1,pointsDefined:!1,cases:[t]}),e.cases=w(e.cases)})),updateCase:Object(j.b)((function(e,t){e.cases.map((function(e){return e.name===t.oldName&&(e.name=t.newName,e.points=t.points,e.pointsDefined=t.pointsDefined,e.cases=e.cases.map((function(e){return e.group=t.newName,e}))),e})),e.cases=w(e.cases)})),removeCase:Object(j.b)((function(e,t){e.cases=e.cases.filter((function(e){return e.name!==t})),e.cases=w(e.cases)}))}},M=Object(j.c)(Object(j.e)(R)),L=Object(j.d)(),q=L.useStoreActions,A=(L.useStoreDispatch,L.useStoreState),W=function(){var e=A((function(e){return e.title.titleName})),t=q((function(e){return e.title.setTitleName})),n=Object(s.useState)(!1),c=Object(N.a)(n,2),r=c[0],a=c[1],i=Object(y.a)(),o=i.isOpen,j=i.onOpen,d=i.onClose,u=Object(s.useRef)(null);return Object(C.jsx)(l.a,{maxW:"container.lg",children:Object(C.jsx)(b.a,{mt:"5",children:Object(C.jsxs)(D.a,{children:[Object(C.jsxs)(k.a,{defaultValue:e,fontSize:"xl",fontWeight:"bold",placeholder:"Escribe el nombre del problema",onEdit:function(){return a(!0)},onSubmit:function(e){return n=e,a(!1),t(n),void console.log(n);var n},onCancel:function(){return a(!1)},width:r?"50%":void 0,children:[Object(C.jsx)(k.c,{}),Object(C.jsx)(k.b,{})]}),Object(C.jsx)("span",{children:Object(C.jsx)(x.a,{})}),Object(C.jsx)(O.a,{}),Object(C.jsx)(z.a,{size:"sm",children:" Cargar Problema "}),Object(C.jsx)(z.a,{size:"sm",colorScheme:"blue",children:"Guardar Problema"}),Object(C.jsx)(z.a,{size:"sm",colorScheme:"orange",onClick:j,children:"Nuevo Problema"}),Object(C.jsxs)(E.a,{leastDestructiveRef:u,onClose:d,isOpen:o,isCentered:!0,children:[Object(C.jsx)(P.g,{}),Object(C.jsxs)(E.b,{children:[Object(C.jsx)(P.f,{children:"Crear nuevo problema"}),Object(C.jsx)(P.b,{children:"\xbfDeseas crear un nuevo problema? Se borrar\xe1 TODO el problema anterior. Guarda el problema primero antes de crear uno nuevo."}),Object(C.jsxs)(P.e,{children:[Object(C.jsx)(z.a,{ref:u,onClick:d,children:"No"}),Object(C.jsx)(z.a,{colorScheme:"red",ml:3,onClick:function(){return sessionStorage.clear(),void window.location.reload()},children:"S\xed"})]})]})]})]})})})},F=n(197),B=n(121),I=n(123),T=n(122),V=n(180),J=n(179),_=n(182),H=n(184),K=n(69),Q=n(176),U=n(196),X=n(195),Y=n(88),Z=function(e){var t=e.isOpen,n=e.onClose,c=e.title,r=Object(s.useState)(!1),a=Object(N.a)(r,2),i=a[0],o=a[1],j=Object(s.useRef)(null),b=Object(Y.a)({defaultValues:{name:"",group:"",points:void 0}}),l=b.register,d=b.handleSubmit,u=b.formState.errors,O=Object(H.a)(),p=q((function(e){return e.cases.addCase})),x=A((function(e){return e.cases.cases}));return Object(C.jsxs)(P.a,{isOpen:t,onClose:n,children:[Object(C.jsx)(P.g,{}),Object(C.jsxs)(P.d,{children:[Object(C.jsx)(P.f,{children:c}),Object(C.jsx)(P.c,{}),Object(C.jsxs)("form",{onSubmit:d((function(e){var t=j.current;e.group=t?t.value:"",e.group=""===e.group?"mainGroup":e.group;var c=!1;x.forEach((function(t){t.name===e.group&&t.cases.forEach((function(t){t.name!==e.name||(c=!0)}))})),c?O({title:"Nombre repetido",description:"No puedes tener casos con el mismo nombre dentro de un grupo",status:"error"}):(p({name:e.name,group:e.group,arePointsDefined:!!e.points,points:e.points}),O({title:"Caso creado",description:"El caso ha sido creado correctamente",status:"success"}),n())})),autoComplete:"off",children:[Object(C.jsxs)(P.b,{children:[Object(C.jsxs)(K.a,{isRequired:!0,children:[Object(C.jsx)(Q.a,{children:" Nombre del caso"}),Object(C.jsx)(U.a,Object(h.a)({},l("name",{required:!0})))]}),Object(C.jsxs)(K.a,{mt:4,children:[Object(C.jsx)(Q.a,{children:" Nombre del grupo"}),Object(C.jsx)(U.a,Object(h.a)(Object(h.a)({},l("group")),{},{onChange:function(e){""!==e.target.value?o(!0):o(!1)},ref:j}))]}),Object(C.jsxs)(K.a,{mt:4,isDisabled:i,children:[Object(C.jsx)(Q.a,{children:" Puntaje del caso (opcional)"}),Object(C.jsx)(U.a,Object(h.a)({type:"number"},l("points",{min:0,max:100}))),i&&Object(C.jsx)(K.b,{children:"No puedes asignar puntos individuales si el caso est\xe1 dentro de un grupo"}),u.points&&Object(C.jsxs)(X.a,{status:"error",mt:3,children:[Object(C.jsx)(X.c,{}),Object(C.jsx)(X.d,{mr:2,children:"Error"}),Object(C.jsx)(X.b,{children:"Ingresa un n\xfamero entre 0 y 100"})]})]})]}),Object(C.jsxs)(P.e,{children:[Object(C.jsx)(z.a,{variant:"ghost",mr:3,onClick:n,children:"Close"}),Object(C.jsx)(z.a,{colorScheme:"green",type:"submit",children:"Agregar Caso"})]})]})]})]})},$=n(116),ee=n(177),te=n(188),ne=n(117),ce=n(187),se=function(e){var t=e.isOpen,n=e.onClose,c=e.groupName,r=e.groupPoints,a=e.pointsDefined,i=Object(s.useState)(!a),o=Object(N.a)(i,2),j=o[0],b=o[1],l=Object(s.useRef)(null),d=A((function(e){return e.cases.cases})),u=q((function(e){return e.cases.updateCase})),O=Object(H.a)();var p=Object(Y.a)({defaultValues:{name:"".concat(c),points:"".concat(r)}}),x=p.register,m=p.handleSubmit;return Object(C.jsxs)(P.a,{isOpen:t,onClose:n,children:[Object(C.jsx)(P.g,{}),Object(C.jsxs)(P.d,{children:[Object(C.jsx)(P.f,{children:"Editar Grupo"}),Object(C.jsx)(P.c,{}),Object(C.jsxs)("form",{onSubmit:m((function(e){var t=l.current;e.points=t?parseInt(t.value):0;var s=!0;e.name!==c&&function(e){var t=!1;return d.forEach((function(n){n.name===e.name&&(t=!0)})),t}(e)&&(O({title:"Nombre repetido",description:"No puedes tener dos grupos con el mismo nombre",status:"error"}),s=!1),s&&(u({oldName:c,newName:e.name,points:e.points,pointsDefined:!j}),n())})),autoComplete:"off",children:[Object(C.jsxs)(P.b,{children:[Object(C.jsxs)(K.a,{isRequired:!0,children:[Object(C.jsx)(Q.a,{children:" Nombre del caso"}),Object(C.jsx)(U.a,Object(h.a)({},x("name")))]}),Object(C.jsxs)(K.a,{mt:4,isDisabled:j,children:[Object(C.jsx)(Q.a,{children:" Puntaje del grupo"}),Object(C.jsx)(U.a,Object(h.a)(Object(h.a)({type:"number"},x("points",{min:0,max:100})),{},{ref:l})),j&&Object(C.jsx)(K.b,{children:"El programa autom\xe1ticamente generar\xe1 los puntos."})]}),Object(C.jsxs)(ce.a,{mt:4,isChecked:j,onChange:function(e){return b(e.target.checked)},children:[" ","Puntaje Autom\xe1tico"," "]})]}),Object(C.jsxs)(P.e,{children:[Object(C.jsx)(z.a,{variant:"ghost",mr:3,onClick:n,children:"Close"}),Object(C.jsx)(z.a,{colorScheme:"green",type:"submit",children:"Editar Caso"})]})]})]})]})},re=function(e){var t=e.isOpen,n=e.onClose,c=e.groupName,s=q((function(e){return e.cases.removeCase})),r=Object(H.a)();return Object(C.jsxs)(P.a,{isOpen:t,onClose:n,children:[Object(C.jsx)(P.g,{}),Object(C.jsxs)(P.d,{children:[Object(C.jsx)(P.f,{children:"Borar Grupo"}),Object(C.jsx)(P.c,{}),Object(C.jsx)(P.b,{children:"\xbfEst\xe1s seguro que deseas borrar este grupo? Este cambio no se puede deshacer"}),Object(C.jsxs)(P.e,{children:[Object(C.jsx)(z.a,{variant:"ghost",mr:3,onClick:n,children:"Cerrar"}),Object(C.jsx)(z.a,{colorScheme:"red",type:"submit",onClick:function(){return s(c),r({title:"Grupo borrado",description:"El grupo ha sido borrado exitosamente",status:"success"}),void n()},children:"Borrar Grupo"})]})]})]})},ae=n(87),ie=n(118),oe=function(e){e.groupName;var t=e.caseName,n=e.pointsDefined,c=e.points;return Object(C.jsx)(z.a,{variant:"ghost",size:"sm",children:Object(C.jsxs)(D.a,{children:[Object(C.jsx)("span",{children:t}),n&&Object(C.jsxs)(ee.a,{children:[" ",c]})]})})},je=ie.a.div(G||(G=Object($.a)(["\n  //background-color: black;\n  position: absolute;\n  width: 20%;\n  height: 30px;\n"]))),be=function(e){var t=e.name,n=e.points,c=e.arePointsDefined,r=Object(s.useState)(!1),a=Object(N.a)(r,2),i=a[0],o=a[1],j=Object(m.d)("gray.200","gray.600"),l=A((function(e){return e.cases.cases.find((function(e){return e.name===t}))})),u=Object(y.a)(),x=u.isOpen,h=u.onOpen,g=u.onClose,v=Object(y.a)(),S=v.isOpen,k=v.onOpen,z=v.onClose,E=Object(ae.useMediaPredicate)("(min-width: 830px)");return Object(C.jsxs)(d.a,{direction:"column",children:[Object(C.jsxs)(b.a,{my:2,children:[Object(C.jsxs)(D.a,{mb:2,cursor:"pointer",transition:"padding-left 0.1s",_hover:{borderLeft:"2px",borderColor:"".concat(j),paddingLeft:"5px"},onClick:function(){return o(!i)},children:[Object(C.jsx)(b.a,{children:t}),Object(C.jsx)(O.a,{}),Object(C.jsx)(p.a,{label:"Estos ser\xe1n los puntos que obtendr\xe1 el usuario si resuelve correctamente el grupo",children:Object(C.jsx)(ee.a,{colorScheme:c?"green":"blue",size:"sm",children:E?Object(C.jsxs)("span",{children:[" ",parseFloat(""+n).toFixed(2)+" pts"]}):Object(C.jsxs)("span",{children:[Math.round(n)," "]})})}),Object(C.jsxs)(te.a,{isLazy:!0,children:[E?Object(C.jsx)(te.b,{as:f.a,icon:Object(C.jsx)(ne.a,{}),size:"sm"}):Object(C.jsx)(te.b,{as:je,size:"sm"}),Object(C.jsxs)(te.d,{children:[Object(C.jsx)(te.c,{fontSize:"sm",onClick:h,children:"Editar Grupo"}),Object(C.jsx)(te.c,{fontSize:"sm",onClick:k,children:"Eliminar Grupo"})]})]})]}),Object(C.jsx)(J.a,{}),Object(C.jsx)(se,{isOpen:x,onClose:g,groupName:t,groupPoints:n,pointsDefined:c}),Object(C.jsx)(re,{isOpen:S,onClose:z,groupName:t})]}),Object(C.jsx)(b.a,{ml:2,children:l&&i&&l.cases.map((function(e){return Object(C.jsx)(_.a.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},style:{display:"inline-block"},children:Object(C.jsx)(oe,{caseName:e.name,groupName:e.group,pointsDefined:e.arePointsDefined,points:e.points})},e.name+e.group)}))})]})},le=function(){var e=A((function(e){return e.cases.cases}));return Object(C.jsx)(b.a,{mt:2,children:e.map((function(e){return Object(C.jsx)(be,{name:e.name,points:e.points,arePointsDefined:e.pointsDefined},e.name)}))})},de=function(){var e=Object(m.d)("gray.200","gray.600"),t=Object(y.a)(),n=t.isOpen,c=t.onOpen,s=t.onClose,r=Object(ae.useMediaPredicate)("(min-width: 830px)");return Object(C.jsx)(_.a.div,{initial:{opacity:0,x:-50},animate:{opacity:1,x:0},children:Object(C.jsx)(b.a,{w:"30%",h:"75vh",borderRight:"1px",borderColor:e,children:Object(C.jsxs)(b.a,{width:"90%",children:[Object(C.jsxs)(d.a,{align:"center",mb:4,children:[Object(C.jsx)(V.a,{mr:5,fontSize:"xl",fontWeight:"bold",children:"Grupos"}),Object(C.jsx)(O.a,{}),Object(C.jsx)(z.a,{size:"sm",colorScheme:"green",onClick:c,children:r?Object(C.jsx)("p",{children:" Agregar Caso"}):Object(C.jsx)("p",{children:" + "})}),Object(C.jsx)(Z,{isOpen:n,onClose:s,title:"Agregar Problema"})]}),Object(C.jsx)(J.a,{}),Object(C.jsx)(le,{})]})})})},ue=function(){return Object(C.jsx)(C.Fragment,{children:Object(C.jsx)(l.a,{maxW:"container.lg",mt:3,h:"80vh",padding:"0",children:Object(C.jsxs)(F.e,{variant:"enclosed",size:"sm",isLazy:!0,children:[Object(C.jsxs)(F.b,{children:[Object(C.jsx)(F.a,{children:Object(C.jsxs)(D.a,{children:[Object(C.jsx)(B.a,{}),Object(C.jsx)("p",{children:"C\xf3digo Soluci\xf3n"})]})}),Object(C.jsx)(F.a,{children:Object(C.jsxs)(D.a,{children:[Object(C.jsx)(T.a,{}),Object(C.jsx)("p",{children:"Casos de Prueba"})]})}),Object(C.jsx)(F.a,{children:Object(C.jsxs)(D.a,{children:[Object(C.jsx)(I.a,{}),Object(C.jsx)("p",{children:"Redacci\xf3n"})]})})]}),Object(C.jsxs)(F.d,{children:[Object(C.jsx)(F.c,{children:"1"}),Object(C.jsx)(F.c,{children:Object(C.jsx)(de,{})}),Object(C.jsx)(F.c,{children:"3"})]})]})})})},Oe=function(){var e=Object(j.f)();return Object(C.jsx)(i.a,{theme:o.theme,children:e?Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(S,{}),Object(C.jsx)(W,{}),Object(C.jsx)(ue,{})]}):Object(C.jsx)("h1",{children:" Loading "})})};a.a.render(Object(C.jsx)(s.StrictMode,{children:Object(C.jsxs)(j.a,{store:M,children:[Object(C.jsx)(c.a,{}),Object(C.jsx)(Oe,{})]})}),document.getElementById("root"))}},[[153,1,2]]]);
//# sourceMappingURL=main.f74d13f7.chunk.js.map