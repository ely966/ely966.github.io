import { token } from './../../../interfaces/token.interface';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from "sweetalert2";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { EmailValidatorService } from 'src/app/servicios/email-validator.service';
import { delay } from 'rxjs';
import { faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styles: [
  ]
})
export class RegistroClienteComponent implements OnInit {

  submitted = false;
  loading = false;
  comprobar:any;
  ClienteNew !: Cliente;
  token!:token ;
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
  miFormulario: FormGroup = this.formB.group({//Validators.pattern('/^[a-z]{1,15}$/g'), Validators.pattern('[a-z]{3,15}')
    //userName: [ , [ Validators.required,Validators.minLength(4)  ]],
    nombre: ['' , [ Validators.required,Validators.pattern(this.reglaNombre) ]],
    password: [ '', [ Validators.required,Validators.minLength(4)  ]],
    email: ['' , [ Validators.required, Validators.minLength(5), Validators.pattern( this.reglaEmail)], [ this.emailValidator ]],
    direccion:[''],
    telefono:['', [Validators.required, Validators.pattern(this.reglaTelefono)]]
  })
  /*=================================================================================== */



  constructor(private formB: FormBuilder, private route: ActivatedRoute,
    private router: Router, private clienteServi:ClienteService, private authServi: AuthService, private emailValidator: EmailValidatorService ) {

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
  //*Errores del correo**/
  get emailErrorMsg(): string {

    const errors = this.miFormulario.get('email')?.errors!;
    if ( errors['required'] ) { //i el campo esta vacio
      return 'Email es obligatorio, no puede estar el campo vacío';
    } else if ( errors['pattern'] ) {//si no introduce el formato correcto
      return 'El valor ingresado no tiene formato de correo correcto';
    } else if ( errors['emailTomado'] ) {//si el correo ya existe en la abse de datos
      return 'El email ya fue tomado anteriormente, es decir, ya existe en la base de datos.Por favor, ingrese otro correo disponible';
    }

    return '';
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

//en proceso mas adelante
 // get usernameError() : string {
 //   const errors = this.miFormulario.get('username')?.errors!;
  //  if ( errors['required'] ) {
  //    return 'username es obligatorio';
 //   } else if ( errors['pattern'] ) {
 //     return 'El valor ingresado no tiene formato indicado';
 //   }

 //   return '';
 // }
//

  //fin de control de errores




/*=================================================================================== */
/*=================================================================================== */
//Crear el nuevo cliente
  crearNuevoCliente(){
    this.miFormulario.markAllAsTouched(); //Si le das a enviar con los campos vacios, los marcara como tocados y saltará así el error

    this.submitted = true;
      // si es invalido, se detendra aqui
      if (this.miFormulario.invalid) {
        this.emailErrorMsg;
        // this.miFormulario.markAllAsTouched(); //Si le das a enviar con los campos vacios, los marcara como tocados y saltará así el error
          Swal.fire({icon: 'error',
          title:'Error',
          text: 'No esta correcto el formato de los datos introducidos'});
          return;


    }
    //si llega aqui, es valido
    this.ClienteNew=this.miFormulario.value;
    this.loading = true;
    this.clienteServi.crearCliente(this.ClienteNew)
    .subscribe({ /**Si llega la respuetsa correcta, esdecir, que es correcto el login, y que llega el token */
      next: (datoToken => {

        //Notificación si se registra correctamente
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se ha registrado correctamente el cliente',
          showConfirmButton: false,
          timer: 2500
        })
        delay(2500);
            this.router.navigateByUrl('/');

     }),
     error: resp => { //Si muestra algún error//
      Swal.fire({icon: 'error',
      title:'Error',
      text: resp.error.message})
      return;
    }
   });
}
/*=================================================================================== */
/*=================================================================================== */

  //https://stackoverflow.com/questions/40365771/sweet-alert-dialog-with-spinner-in-angularjs//
  //Carga de pagina
  carga(){
    Swal.fire({title:'Por favor, espere',
    timer: 2500})
    Swal.showLoading()
}
   //Carga de pagina
   cargainicial(){
    Swal.fire({title:'Por favor, espere',
    timer: 800})
    Swal.showLoading()
}
//Volver al menu cliente//
  volverInicio(){
    window.history.back();
  }
  /*=================================================================================== */
  ngOnInit(): void {
    this.cargainicial();

    // this.miFormulario.reset({
    //   username: "",
    //   nombre: "",
    //   pass: "",
    //   email: ""

    // })




  }



}

