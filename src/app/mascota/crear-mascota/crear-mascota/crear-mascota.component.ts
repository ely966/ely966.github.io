import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, delay, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { mascota } from 'src/app/interfaces/mascota.interface';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { UploadFileServiceService } from 'src/app/servicios/upload-file-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styles: [
  ]
})
export class CrearMascotaComponent implements OnInit {

  submitted = false;
  loading = false;
  comprobar:any;
  nuevaMascota!:mascota;

   //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
   progressInfo = []
   //Mensaje que almacena la respuesta de las Apis
   message = '';
   //Nombre del archivo para usarlo posteriormente en la vista html
   fileName = "";
   fileInfos!: Observable<any>;
  registrando:Boolean=false;//esta diciendo que no se a enviado ninguna mascota por ahora
  /*=================================================================================== */
  /*Reglas*/

  //Reglas nombre
  reglaNombre:string="[A-Za-z]{1,20}"
   //Regla del telefono//
   reglaEdad="[0-9]{1,3}"
/*=================================================================================== */

  miFormulario: FormGroup = this.formB.group({
    nombre: [, [ Validators.required,Validators.minLength(4)  ]],
    tipo: [ , [ Validators.required ]],
    raza: [, [  ]],
    edad: [ , [ Validators.required, Validators.pattern(this.reglaEdad),Validators.min(0)]],
    file: []
    //imagen: [, [  JSON.stringify(File) ]]

  })
//https://techclub.tajamar.es/subir-archivos-de-imagen-en-angular-con-api/
 // uploadFile(foto:any) {

   // var json = JSON.stringify(File);
  //  console.log(File);
  //  }
   //muestre errores que puede escribir el usuario en el formulario
   /*=================================================================================== */
/*=================================================================================== */

constructor(private uploadFilesService: UploadFileServiceService, private formB: FormBuilder, private router:Router, private authServ:AuthService, private mascotaServi:MascotaService) { }

   /*=================================================================================== */
/*=================================================================================== */
/*Muestre errores en el formulario*/
   campoEsValido( campo: string ) {

    return this.miFormulario.controls[campo].errors
            && this.miFormulario.controls[campo].touched;
  }

 //*Errores del nombre de la  mascota**/
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
  //*Errores del tipo de mascota**/
  get tipoError(): string {

    const errors = this.miFormulario.get('tipo')?.errors!;
    if ( errors['required'] ) { //Si salta, que es requirido significa que el campo esta vacio
      return 'El tipo es obligatorio. No puede estar vacío, selecciona uno, porfavor';
    } else {
      //**Si todo esta bien */
      return '';
    }
  }
 /*=================== */
  //*Errores del nombre de la  mascota**/
  get edadError(): string {

    const errors = this.miFormulario.get('edad')?.errors!;
    if ( errors['required'] ) { //Si salta, que es requirido significa que el campo esta vacio
      return 'La edad es obligatoria. No puede estar vacío';
    } else if ( errors['pattern'] ) {//Si salta que no esta con el formato correcto
      return 'El valor ingresado no tiene formato de correo.No puede se valores negativos';
    } else {
      //**Si todo esta bien */
      return '';
    }
  }

   /*=================================================================================== */
/*=================================================================================== */

  ngOnInit(): void {

  }


   /*=================================================================================== */
/*=================================================================================== */
  /*Metodos*/
  //Metodo para crear una nueva mascota
  crearNuevaMascota(){
    //comprobamos si ya esta registrando uno
    //Al inicio, no habra registrado asi que estara en falso. Pero si se ha pasado antes por aqui y esta registrando correctamente, y una parte dentro del
    //else, hay una arte que convierte el bolean en true y sigue el registro.
    //SI vuelve s apulsara el boton del formulario no mandara otro registro
    if (this.registrando){}
    else {
        this.submitted = true;
        this.miFormulario.markAllAsTouched(); //Si le das a enviar con los campos vacios, los marcara como tocados y saltará así el error
        //comprobamos que el formulario es valido.
        if(this.miFormulario.invalid){
          Swal.fire('Error', 'No esta correcto el formato de los datos introducidos','error');
          //Activamos el boton
          return;
        }
        //Sí pasa el if anterior, es que el formulario es válido,y  formulario esta correcto
        this.nuevaMascota=this.miFormulario.value;
        console.log(this.nuevaMascota.file);
        this.loading=true;
        const tokenLogeado = this.authServ.getToken();

        this.registrando=true; //confirmamos que ahora esta registrandose alguno

        //añadimos a la pet el usuario
        this.cargaRegistro();
        this.mascotaServi.addPet(tokenLogeado, this.nuevaMascota)
        .subscribe({ /**Si llega la respuetsa correcta, esdecir, que es correcto el login, y que llega el token */
          next: (datoPet => {
            Swal.fire({ //notificacion de correcto registro de cita
              position: 'center',
              icon: 'success',
              title: 'Se ha registrado correctamente tu mascota',
              showConfirmButton: false,
              timer: 2500
            })
            delay(2500); //Una espera apr apoder leerlo
            //this.router.navigateByUrl('./menu/menucliente');
            //this.bloquearBoton=false;
          //volvemos al menu
            window.location.href = '../paginasUser/menu/menucliente';
        }),
          error: resp => { //Si muestra algún error.Muestra una notificación//


            Swal.fire('Error', resp.error.mensaje, 'error');
              return;
          }

      });
  }
  }
/*=========================== */
//funcion que desactiva el boton tras pulsarlo una vez, cuando los datos estan correcto, y no provoque fallos de mandar 2 peticiones a la vez



   /*=================================================================================== */
/*=================================================================================== */
  /*Boton de volver al menú de cliente*/
  volverMenu(){
    window.history.back();
  }



  //public cargaimagen(event){
  //  this.uploadedImage = event.target.files[0];
  //}
  //imageUploadAction() {

   // const imageFormData = new FormData();
  //  imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);

  //}

/*===========================================================================*/
  //Ventana de carga. Mientras carag de una página se muetsre este ventana
 /*Ventana de carga al vovler al menu*/
  cargarRegresar(){

    Swal.fire({title:'Por favor, espere',
    timer: 2070})
    Swal.showLoading()
  }
  //Ventana de carga al realizar una funcion como reguistrar, borrar, o editar
  cargaRegistro(){
    Swal.fire({title:'Por favor, espere',
    timer: 1600})
    Swal.showLoading()
  }
}
