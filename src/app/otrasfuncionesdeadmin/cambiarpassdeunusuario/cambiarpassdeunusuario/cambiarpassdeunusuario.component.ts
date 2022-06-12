import { UsuarioFull } from 'src/app/interfaces/usuarioFull.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteFull } from 'src/app/interfaces/clienteFull.interface';
import { editaruser } from 'src/app/interfaces/editarUser.interface';
import { AdministradorserviService } from 'src/app/servicios/administradorservi.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-cambiarpassdeunusuario',
  templateUrl: './cambiarpassdeunusuario.component.html',
  styles: [
  ]
})
export class CambiarpassdeunusuarioComponent implements OnInit {
  comprobar:any;
  submitted = false;
  loading = false;
  usuarioPassEditado !: editaruser;
  usuario!: UsuarioFull;
  editando:Boolean=false;
  correoUsuario:any="";

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
  constructor(private servicliente: ClienteService, private router:Router, private formB: FormBuilder, private adminservi: AdministradorserviService) { }

  ngOnInit(): void {
    //recogemos los datos del usuario
   this.usuario=this.adminservi.recogerUsuario();
   this.correoUsuario=localStorage.getItem('usuarioEditarPass');
   this.servicliente.recogerInfoClienteporCorreo(this.correoUsuario).subscribe(
     datosUser=>{
       this.usuario=datosUser;
     }
   )
  }

  /*=================================================================================== */
/*=================================================================================== */
//**Chequeo de errores*/

//Muestre los errores en el formulario//

campoEsValido( campo: string ) {
  return this.miFormulario.controls[campo].errors
            && this.miFormulario.controls[campo].touched;
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


/*=================================================================================== */
/*=================================================================================== */
  editarpassUsuario(){
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
      this.usuarioPassEditado = this.miFormulario.value;
      console.log(this.usuarioPassEditado);
      this.carga();
      this.adminservi.cambiarPassDeUnUsuario(this.usuarioPassEditado).subscribe(
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
      }

  }
//https://stackoverflow.com/questions/40365771/sweet-alert-dialog-with-spinner-in-angularjs//
//Carga de pagina
  carga(){
    Swal.fire({title:'Por favor, espere',
    timer: 2500})
Swal.showLoading()
  }
  //volver
  volver(){
    window.history.back();
  }


}
