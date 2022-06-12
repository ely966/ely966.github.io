import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { ClienteFull } from 'src/app/interfaces/clienteFull.interface';
import { editaruser } from 'src/app/interfaces/editarUser.interface';
import { UsuarioFull } from 'src/app/interfaces/usuarioFull.interface';
import { AdministradorserviService } from 'src/app/servicios/administradorservi.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { VeterinarioserviService } from 'src/app/servicios/veterinarioservi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editartusdatos',
  templateUrl: './editartusdatos.component.html',
  styles: [
  ]
})
export class EditartusdatosComponent implements OnInit {
  comprobar:any;
  submitted = false;
  loading = false;
  usuarioEditado !: editaruser;
  admin!: ClienteFull;
  editando:Boolean=false;
  usuario!: UsuarioFull;
  correoUsuario:any="";

  /*El rol del usuario*/
  rolUsuario:string="ninguno";
  adminrol:string="ADMIN";
  /*=================================================================================== */
  /*Patter, reglas*/
  //Regla de Correo*/
  reglaEmail: string= "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  //regla de nombre
  reglaNombre:string="[A-Za-z]{1,20}"
  //Regla apellidos
  reglaApellidos:string="^[A-Za-z]{1,20}[' ']{1}[A-Za-z]{1,20}$"
  //Regla de la contraseña//
  reglaPass: string="";

  //Regla del telefono//
  reglaTelefono="[0-9]{9}"

  /*Formulario agrupado*/
  /*=================================================================================== */


  miFormulario: FormGroup = this.formB.group({
    //userName: [ , [ Validators.required,Validators.minLength(4)  ]],
    id: [],
    nombre: ['' , [ Validators.required,Validators.minLength(4)  ]],
    password:['' ,[//Validators.required
  ]],
    direccion: ['' , [ Validators.required]],
    telefono: ['' , [ Validators.required, Validators.pattern(this.reglaTelefono)]]
  })

  constructor(private servicliente: ClienteService, private router:Router, private formB: FormBuilder, private veteriServi: VeterinarioserviService,private adminservi: AdministradorserviService) { }

  ngOnInit(): void {
    //recogemos los datos del usuario
   this.rolUsuario=JSON.parse(<string>localStorage.getItem('roleUsuario'));

   /*Si el rol del usuario es administrador*/
   if(this.rolUsuario == this.adminrol){
      this.adminservi.recogerInfoAdmin().subscribe(
          datos => {
              this.usuario = datos;
            }
        )
   /*Si el rol del usuario es veterinario*/
   }else if (this.rolUsuario == "VETERINARIO"){
      this.veteriServi.recogerInfoVeterinario().subscribe(
          datos => {
            this.usuario = datos;
        })
   }
   /*Si el rol del usuario es Cliente*/
   else if (this.rolUsuario == "CLIENTE"){
      this.servicliente.recogerInfoCliente().subscribe(
          datosUser=>{
            this.usuario=datosUser;
          })
   }
   /*Si no hay roll*/
   else {
    this.router.navigateByUrl('/login')
   }

  }

   /*=================================================================================== */
/*=================================================================================== */
//**Chequeo de errores*/

//Muestre los errores en el formulario//

campoEsValido( campo: string ) {
  return this.miFormulario.controls[campo].errors
            && this.miFormulario.controls[campo].touched;
  }




  //Errores personalizado según el tipo//


  get nombreError(): string {

    const errors = this.miFormulario.get('nombre')?.errors!;
    if ( errors['required'] ) { //Si salta, que es requirido significa que el campo esta vacio
      return 'El nombre es obligatorio. No puede estar vacío';
    } else if ( errors['pattern'] ) {//Si salta que no esta con el formato correcto
      return 'El valor ingresado no tiene formato de correo';
    } else {
      //**Si todo esta bien */
      return '';
    }
  }

   /*=================== */

  get passError() : string {
    const errors = this.miFormulario.get('password')?.errors!;
    if ( errors['required'] ) {
      return 'Contraseña es obligatoria, no puede estar vacio';
    } else if ( errors['pattern'] ) {
      return 'Debe contener mínimo 4 caracteres';
    }

    return '';
  }

  /*=================== */

  //Errores del telefono//
  get telefonoError(): string {
    const errors = this.miFormulario.get('telefono')?.errors!;
    if(errors['required']){ //si falla el requerir, significa que esta vacio el campo
      return 'Teléfono es obligatorio, no puede estar vacío'
    }else if (errors['pattern']){//si falla es que el formato no es el correcto que son 9 números
      return 'El formato es incorrecto. Debe ser 9 números 000000000'
    }
    //si todo bien
    return '';
  }
  /*==============================^*/
  //Errores de direccion
  get direccionError(): string {

    const errors = this.miFormulario.get('direccion')?.errors!;
    if ( errors['required'] ) { //Si salta, que es requirido significa que el campo esta vacio
      return 'La direccion es obligatorio. No puede estar vacío';
    } else if ( errors['pattern'] ) {//Si salta que no esta con el formato correcto
      return 'El valor ingresado no tiene formato de correo';
    } else {
      //**Si todo esta bien */
      return '';
    }
  }







  editartusdatosUsuario(){
    if(this.editando == true){

    }else {
        this.miFormulario.markAllAsTouched(); //Si le das a enviar con los campos vacios, los marcara como tocados y saltará así el error


      this.submitted = true;
        // si es invalido, se detendra aqui
        if (this.miFormulario.invalid) {
          // this.miFormulario.markAllAsTouched(); //Si le das a enviar con los campos vacios, los marcara como tocados y saltará así el error
            Swal.fire({icon: 'error',
            title:'Error',
            text: 'No esta correcto el formato de los datos introducidos'});
            return;


      }
      /*Recogemos el usuario editado*/
      this.usuarioEditado = this.miFormulario.value;
      this.carga();
      /*======================Desvio segun su roll*/
      if(this.rolUsuario == "ADMIN"){

        this.adminservi.cambiarPassDeUnUsuario(this.usuarioEditado).subscribe(
          {
            next: (
              datos => {
                Swal.fire({ //Notificación de que se ha editado correctamente
                  title: 'Editado correctamente',
                  text: "Tu usuario ha sido editado.",
                  icon: 'success',
                  position: 'center',
                  timer: 2500
                  })
                  delay(2500);
                  window.history.back();
              }
            ),
            error: resp => { //Si muestra algún error//
              Swal.fire('Error', resp.error.message, 'error')
              //this.router.navigateByUrl('/login')
            }
          })

      }else if(this.rolUsuario == "VETERINARIO"){
        this.veteriServi.editardatosveterinario(this.usuarioEditado).subscribe(
          {
            next: (
              datos => {
                Swal.fire({ //Notificación de que se ha editado correctamente
                  title: 'Editado correctamente',
                  text: "Tus datos han sido editados correctamente.",
                  icon: 'success',
                  position: 'center',
                  timer: 2500
                  })
                  delay(2500);
                  //this.router.navigateByUrl('/veterinariopag/opcionmenuVeterinario/menuVeterinario');
                  window.history.back();

              }
            ),
            error: resp => { //Si muestra algún error//

              Swal.fire('Error', resp.error.message, 'error')
              //this.router.navigateByUrl('/login')
            }
          })


      }else if (this.rolUsuario == "CLIENTE"){

      this.servicliente.editardatoscliente(this.usuarioEditado).subscribe(
        {
          next: (
            datos => {
              Swal.fire({ //Notificación de que se ha editado correctamente
                title: 'Editado correctamente',
                text: "Tu usuario ha sido editado.",
                icon: 'success',
                position: 'center',
                timer: 2500
                })
                delay(2500);
                window.history.back();
            }
          ),
          error: resp => { //Si muestra algún error//

            Swal.fire('Error', resp.error.message, 'error')

          }
        })


      }else{

      }

      }

  }












    //https://stackoverflow.com/questions/40365771/sweet-alert-dialog-with-spinner-in-angularjs//
  //Carga de pagina
  carga(){
    Swal.fire({title:'Por favor, espere',
    timer: 2500})
  Swal.showLoading()
  }

  //Segun el roll, se redirige a un menu
  volverAlMenuSegunRole(){
    this.carga();
    if(this.rolUsuario == this.adminrol){
      this.router.navigateByUrl('/parteadm/menua/menuAdmin');
   }else if (this.rolUsuario == "VETERINARIO"){
    this.router.navigateByUrl('/veterinariopag/opcionmenuVeterinario/menuVeterinario');

   }
   else if (this.rolUsuario == "CLIENTE"){
    this.router.navigateByUrl('/paginasUser/menu/menucliente');
   }else {
    this.router.navigateByUrl('/login')
   }

  }
//volver
  volvermenuadmin(){
      //window.history.back();
      this.router.navigateByUrl('/parteadm/menua/menuAdmin');
  }
  //volver
  volvermenucliente(){
    this.router.navigateByUrl('/paginasUser/menu/menucliente');
  }

  volverMenuVeterinario(){
    this.router.navigateByUrl('/veterinariopag/opcionmenuVeterinario/menuVeterinario');

  }



}
