"use strict";(self.webpackChunkveterinariaProyecto=self.webpackChunkveterinariaProyecto||[]).push([[121],{6121:(A,c,s)=>{s.r(c),s.d(c,{MostrardatosunamascotaModule:()=>v});var r=s(5245),l=s(9808),m=s(5226),i=s.n(m),t=s(5e3),g=s(5530),u=s(744);function f(a,n){if(1&a&&t._UZ(0,"img",13),2&a){const o=t.oxw();t.MGl("src","http://localhost:9000/uploads/img/",o.datosMascota.foto,"",t.LSH)}}function p(a,n){if(1&a&&(t.TgZ(0,"ul",14),t.TgZ(1,"li",15),t.TgZ(2,"mat-icon"),t._uU(3,"pets"),t.qZA(),t._uU(4),t.qZA(),t.TgZ(5,"li",15),t.TgZ(6,"mat-icon"),t._uU(7,"pets"),t.qZA(),t._uU(8),t.qZA(),t.TgZ(9,"li",15),t.TgZ(10,"mat-icon"),t._uU(11,"pets"),t.qZA(),t._uU(12),t.qZA(),t.TgZ(13,"li",15),t._uU(14),t.qZA(),t.qZA()),2&a){const o=t.oxw();t.xp6(4),t.hij("Nombre :",o.datosMascota.nombre," "),t.xp6(4),t.hij(" Edad : ",o.datosMascota.edad," "),t.xp6(4),t.hij(" ",o.datosMascota.tipo," "),t.xp6(2),t.hij(" ",o.datosMascota.raza," ")}}let h=(()=>{class a{constructor(o,e){this.mascotaServi=o,this.activatedRoute=e,this.progreso=0}ngOnInit(){null==this.datosMascota&&this.mascotaServi.datosMascota(JSON.parse(localStorage.getItem("idMascotaEdit"))).subscribe(o=>{this.datosMascota=o})}seleccinarFoto(o){this.fotoSeleccionada=o.target.files[0],this.fotoSeleccionada.type.indexOf("image")<0&&i().fire("Error al seleccionar imagen","Se debe seleccionar un archivo que sea una imagen","error")}subirFoto(){this.fotoSeleccionada?(this.id=this.mascotaServi.devolverid(),this.mascotaServi.subirFoto(this.fotoSeleccionada,this.id).subscribe(o=>{this.datosMascota=o,i().fire("la foto se a a\xf1adido a la mascota correctamente","","success")})):i().fire("Error encontrado","Dee seleccionar una foto","error")}volverListaMascota(){window.history.back()}}return a.\u0275fac=function(o){return new(o||a)(t.Y36(g.F),t.Y36(u.gz))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-mostrardatosunamascota"]],decls:18,vars:2,consts:[[1,"h1","text-info","row","p-3","my-3","justify-content-center"],[1,"container-fluid"],[1,"row","col-sm","justify-content-center","my-3"],["class","img-thumbnail","width","600","height","450",3,"src",4,"ngIf"],[1,"h4","text-info","row","p-3","my-3","justify-content-center"],[1,"input-group","mb-3","col-10"],["type","file","placeholder","Recipient's username","aria-label","Recipient's username","aria-describedby","button-addon2",1,"form-control","col-sm-5","col-md-5","col-lg-5",3,"change"],["type","button","id","button-addon2",1,"btn","btn-info","col-3",3,"click"],[1,"col-sm"],["class","list-group",4,"ngIf"],[1,"form-group","row","justify-content-center","p-3"],[1,"col-sm-10"],[1,"btn","btn-secondary","text-white","col-6","col-lg-6","row","p-3",3,"click"],["width","600","height","450",1,"img-thumbnail",3,"src"],[1,"list-group"],[1,"list-group-item"]],template:function(o,e){1&o&&(t.TgZ(0,"p",0),t.TgZ(1,"strong"),t._uU(2,"~Datos de tu mascota~"),t.qZA(),t.qZA(),t._UZ(3,"div",1),t.TgZ(4,"div",2),t.YNc(5,f,1,1,"img",3),t.TgZ(6,"p",4),t._uU(7,"\xbfQuieres cambiar al imagen?"),t.qZA(),t.TgZ(8,"div",5),t.TgZ(9,"input",6),t.NdJ("change",function(T){return e.seleccinarFoto(T)}),t.qZA(),t.TgZ(10,"button",7),t.NdJ("click",function(){return e.subirFoto()}),t._uU(11,"Seleccionar imagen"),t.qZA(),t.qZA(),t.TgZ(12,"div",8),t.YNc(13,p,15,4,"ul",9),t.qZA(),t.qZA(),t.TgZ(14,"div",10),t.TgZ(15,"div",11),t.TgZ(16,"a",12),t.NdJ("click",function(){return e.volverListaMascota()}),t._uU(17,"Volver al men\xfa de cliente"),t.qZA(),t.qZA(),t.qZA()),2&o&&(t.xp6(5),t.Q6J("ngIf",null==e.datosMascota?null:e.datosMascota.foto),t.xp6(8),t.Q6J("ngIf",e.datosMascota))},directives:[l.O5,r.Hw],encapsulation:2}),a})();var Z=s(9444),M=s(3075);let v=(()=>{class a{}return a.\u0275fac=function(o){return new(o||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[l.ez,r.Ps,Z.uH,u.Bz.forChild([{path:"mostrardatosunaMascota",component:h}])],M.UX]}),a})()}}]);