"use strict";(self.webpackChunkveterinariaProyecto=self.webpackChunkveterinariaProyecto||[]).push([[665],{2665:(q,m,n)=>{n.r(m),n.d(m,{EditartusdatosModule:()=>U});var d=n(9808),i=n(3075),c=n(842),p=n(5226),u=n.n(p),o=n(5e3),h=n(4051),g=n(744),v=n(51),Z=n(9574),f=n(5245);function T(e,l){if(1&e&&(o.TgZ(0,"span",20),o._uU(1),o.qZA()),2&e){const r=o.oxw(2);o.xp6(1),o.hij(" Error:",r.nombreError," ")}}function E(e,l){if(1&e&&(o.TgZ(0,"span",20),o._uU(1),o.qZA()),2&e){const r=o.oxw(2);o.xp6(1),o.hij(" Error: ",r.passError," ")}}function x(e,l){if(1&e&&(o.TgZ(0,"span",20),o._uU(1),o.qZA()),2&e){const r=o.oxw(2);o.xp6(1),o.hij(" error: ",r.direccionError," ")}}function A(e,l){if(1&e&&(o.TgZ(0,"span",20),o._uU(1),o.qZA()),2&e){const r=o.oxw(2);o.xp6(1),o.hij(" Error : ",r.telefonoError,"")}}function _(e,l){if(1&e){const r=o.EpF();o.TgZ(0,"form",5),o.NdJ("ngSubmit",function(){return o.CHM(r),o.oxw().editartusdatosUsuario()}),o.TgZ(1,"div",6),o.TgZ(2,"p",7),o.TgZ(3,"strong"),o._uU(4,"Tu id "),o.qZA(),o.qZA(),o.TgZ(5,"div",8),o.TgZ(6,"input",9),o.NdJ("ngModelChange",function(s){return o.CHM(r),o.oxw().usuario.id=s}),o.qZA(),o.qZA(),o.qZA(),o.TgZ(7,"div",6),o.TgZ(8,"p",7),o.TgZ(9,"strong"),o._uU(10,"Tu nombre "),o.qZA(),o.qZA(),o.TgZ(11,"div",8),o.TgZ(12,"input",10),o.NdJ("ngModelChange",function(s){return o.CHM(r),o.oxw().usuario.nombre=s}),o.qZA(),o.YNc(13,T,2,1,"span",11),o.qZA(),o.qZA(),o.TgZ(14,"div",6),o.TgZ(15,"p",12),o.TgZ(16,"strong"),o._uU(17,"Tu contrase\xf1a "),o.qZA(),o.qZA(),o.TgZ(18,"div",8),o.TgZ(19,"input",13),o.NdJ("ngModelChange",function(s){return o.CHM(r),o.oxw().usuario.password=s}),o.qZA(),o.YNc(20,E,2,1,"span",11),o.qZA(),o.qZA(),o.TgZ(21,"div",6),o.TgZ(22,"p",12),o.TgZ(23,"strong"),o._uU(24,"Tu direcci\xf3n "),o.qZA(),o.qZA(),o.TgZ(25,"div",8),o.TgZ(26,"input",14),o.NdJ("ngModelChange",function(s){return o.CHM(r),o.oxw().usuario.direccion=s}),o.qZA(),o.YNc(27,x,2,1,"span",11),o.qZA(),o.qZA(),o.TgZ(28,"div",6),o.TgZ(29,"p",12),o.TgZ(30,"strong"),o._uU(31,"Tu tel\xe9fono "),o.qZA(),o.qZA(),o.TgZ(32,"div",8),o.TgZ(33,"input",15),o.NdJ("ngModelChange",function(s){return o.CHM(r),o.oxw().usuario.telefono=s}),o.qZA(),o.YNc(34,A,2,1,"span",11),o.qZA(),o.qZA(),o.TgZ(35,"div",16),o.TgZ(36,"div",17),o.TgZ(37,"a",18),o.NdJ("click",function(){return o.CHM(r),o.oxw().volverAlMenuSegunRole()}),o.TgZ(38,"strong"),o.TgZ(39,"mat-icon"),o._uU(40,"arrow_back"),o.qZA(),o._uU(41," Volver al men\xfa "),o.qZA(),o.qZA(),o.TgZ(42,"button",19),o.TgZ(43,"strong"),o._uU(44," Editar tus datos "),o.TgZ(45,"mat-icon"),o._uU(46," border_color"),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA()}if(2&e){const r=o.oxw();o.Q6J("formGroup",r.miFormulario),o.xp6(6),o.Q6J("ngModel",r.usuario.id),o.xp6(6),o.Q6J("ngModel",r.usuario.nombre),o.xp6(1),o.Q6J("ngIf",r.campoEsValido("nombre")),o.xp6(6),o.Q6J("ngModel",r.usuario.password),o.xp6(1),o.Q6J("ngIf",r.campoEsValido("password")),o.xp6(6),o.Q6J("ngModel",r.usuario.direccion),o.xp6(1),o.Q6J("ngIf",r.campoEsValido("direccion")),o.xp6(6),o.Q6J("ngModel",r.usuario.telefono),o.xp6(1),o.Q6J("ngIf",r.campoEsValido("telefono"))}}let C=(()=>{class e{constructor(r,t,s,a,M){this.servicliente=r,this.router=t,this.formB=s,this.veteriServi=a,this.adminservi=M,this.submitted=!1,this.loading=!1,this.editando=!1,this.correoUsuario="",this.rolUsuario="ninguno",this.adminrol="ADMIN",this.reglaEmail="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",this.reglaNombre="[A-Za-z]{1,20}",this.reglaApellidos="^[A-Za-z]{1,20}[' ']{1}[A-Za-z]{1,20}$",this.reglaPass="",this.reglaTelefono="[0-9]{9}",this.miFormulario=this.formB.group({id:[],nombre:["",[i.kI.required,i.kI.minLength(4)]],password:["",[]],direccion:["",[i.kI.required]],telefono:["",[i.kI.required,i.kI.pattern(this.reglaTelefono)]]})}ngOnInit(){this.rolUsuario=JSON.parse(localStorage.getItem("roleUsuario")),this.rolUsuario==this.adminrol?this.adminservi.recogerInfoAdmin().subscribe(r=>{this.usuario=r}):"VETERINARIO"==this.rolUsuario?this.veteriServi.recogerInfoVeterinario().subscribe(r=>{this.usuario=r}):"CLIENTE"==this.rolUsuario?this.servicliente.recogerInfoCliente().subscribe(r=>{this.usuario=r}):this.router.navigateByUrl("/login")}campoEsValido(r){return this.miFormulario.controls[r].errors&&this.miFormulario.controls[r].touched}get nombreError(){var r;const t=null===(r=this.miFormulario.get("nombre"))||void 0===r?void 0:r.errors;return t.required?"El nombre es obligatorio. No puede estar vac\xedo":t.pattern?"El valor ingresado no tiene formato de correo":""}get passError(){var r;const t=null===(r=this.miFormulario.get("password"))||void 0===r?void 0:r.errors;return t.required?"Contrase\xf1a es obligatoria, no puede estar vacio":t.pattern?"Debe contener m\xednimo 4 caracteres":""}get telefonoError(){var r;const t=null===(r=this.miFormulario.get("telefono"))||void 0===r?void 0:r.errors;return t.required?"Tel\xe9fono es obligatorio, no puede estar vac\xedo":t.pattern?"El formato es incorrecto. Debe ser 9 n\xfameros 000000000":""}get direccionError(){var r;const t=null===(r=this.miFormulario.get("direccion"))||void 0===r?void 0:r.errors;return t.required?"La direccion es obligatorio. No puede estar vac\xedo":t.pattern?"El valor ingresado no tiene formato de correo":""}editartusdatosUsuario(){if(1!=this.editando){if(this.miFormulario.markAllAsTouched(),this.submitted=!0,this.miFormulario.invalid)return void u().fire({icon:"error",title:"Error",text:"No esta correcto el formato de los datos introducidos"});this.usuarioEditado=this.miFormulario.value,this.carga(),"ADMIN"==this.rolUsuario?this.adminservi.cambiarPassDeUnUsuario(this.usuarioEditado).subscribe({next:r=>{u().fire({title:"Editado correctamente",text:"Tu usuario ha sido editado.",icon:"success",position:"center",timer:2500}),(0,c.g)(2500),window.history.back()},error:r=>{u().fire("Error",r.error.message,"error")}}):"VETERINARIO"==this.rolUsuario?this.veteriServi.editardatosveterinario(this.usuarioEditado).subscribe({next:r=>{u().fire({title:"Editado correctamente",text:"Tus datos han sido editados correctamente.",icon:"success",position:"center",timer:2500}),(0,c.g)(2500),window.history.back()},error:r=>{u().fire("Error",r.error.message,"error")}}):"CLIENTE"==this.rolUsuario&&this.servicliente.editardatoscliente(this.usuarioEditado).subscribe({next:r=>{u().fire({title:"Editado correctamente",text:"Tu usuario ha sido editado.",icon:"success",position:"center",timer:2500}),(0,c.g)(2500),window.history.back()},error:r=>{u().fire("Error",r.error.message,"error")}})}}carga(){u().fire({title:"Por favor, espere",timer:2500}),u().showLoading()}volverAlMenuSegunRole(){this.carga(),this.router.navigateByUrl(this.rolUsuario==this.adminrol?"/parteadm/menua/menuAdmin":"VETERINARIO"==this.rolUsuario?"/veterinariopag/opcionmenuVeterinario/menuVeterinario":"CLIENTE"==this.rolUsuario?"/paginasUser/menu/menucliente":"/login")}volvermenuadmin(){this.router.navigateByUrl("/parteadm/menua/menuAdmin")}volvermenucliente(){this.router.navigateByUrl("/paginasUser/menu/menucliente")}volverMenuVeterinario(){this.router.navigateByUrl("/veterinariopag/opcionmenuVeterinario/menuVeterinario")}}return e.\u0275fac=function(r){return new(r||e)(o.Y36(h.$),o.Y36(g.F0),o.Y36(i.qu),o.Y36(v.u),o.Y36(Z.A))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-editartusdatos"]],decls:7,vars:1,consts:[[1,"h1","text-info"],[1,"text-info"],[1,"row","justify-content-centrer"],[1,"col-xs-12","col-sm-12","col-md-12","col-lg-12","bg-white","py-5","mt-5","rounded","text-center"],[3,"formGroup","ngSubmit",4,"ngIf"],[3,"formGroup","ngSubmit"],[1,"form-group","row","my-2"],[1,"text-info","h4","py-2"],[1,"col-sm-12"],["type","number","formControlName","id","id","id","readonly","",1,"form-control",3,"ngModel","ngModelChange"],["type","text","id","nombre","formControlName","nombre",1,"form-control",3,"ngModel","ngModelChange"],["class","form-text text-danger",4,"ngIf"],[1,"text-info","h4","p-2"],["type","password","formControlName","password","id","password","placeholder","Escribe la contrase\xf1a, solo si desea cambiarla, sino dejalo blanco",1,"form-control",3,"ngModel","ngModelChange"],["type","text","formControlName","direccion","id","direccion","placeholder","Escribe tu direcci\xf3n. Puedes realizarlo m\xe1s tarde",1,"form-control",3,"ngModel","ngModelChange"],["type","number","formControlName","telefono","id","telefono","placeholder","Escribe tu tel\xe9fono",1,"form-control",3,"ngModel","ngModelChange"],[1,"form-group","row"],[1,"col-xs-12","col-sm-12","col-md-12","col-lg-12","my-3"],["id","botonregresarfor",1,"btn","btn-secondary","text-white","col-12","col-lg-6","p-3",3,"click"],["id","botonregistro","type","submit",1,"btn","btn-info","col-12","col-lg-6","p-3"],[1,"form-text","text-danger"]],template:function(r,t){1&r&&(o.TgZ(0,"p",0),o.TgZ(1,"strong"),o._uU(2,"~Editar tus datos~"),o.qZA(),o.qZA(),o._UZ(3,"hr",1),o.TgZ(4,"div",2),o.TgZ(5,"div",3),o.YNc(6,_,47,10,"form",4),o.qZA(),o.qZA()),2&r&&(o.xp6(6),o.Q6J("ngIf",t.usuario))},directives:[d.O5,i._Y,i.JL,i.sg,i.wV,i.Fj,i.JJ,i.u,f.Hw],encapsulation:2}),e})();var b=n(9444);let U=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[d.ez,d.ez,i.u5,b.uH,f.Ps,i.UX,g.Bz.forChild([{path:"editarTusDatos",component:C}])]]}),e})()}}]);