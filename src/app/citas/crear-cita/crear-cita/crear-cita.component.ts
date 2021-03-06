import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ClienteFull } from 'src/app/interfaces/clienteFull.interface';
import { credenCita } from 'src/app/interfaces/credencialCita.interface';
import { mascotaFull } from 'src/app/interfaces/mascotaFull.interface';
import { idPetsCita } from 'src/app/interfaces/petCita.interface';
import { CitasServiService } from 'src/app/servicios/citas-servi.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { VeterinarioserviService } from 'src/app/servicios/veterinarioservi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styles: [
  ]
})
export class CrearCitaComponent implements OnInit {
  fecha:any;
  submitted = false;
  loading = false;
  comprobar:any;
  nuevaCita!:credenCita ;
  mascotas:mascotaFull[]=new Array();
  registrando:Boolean=false;//esta diciendo que no se a enviado ninguna mascota por ahora
  petid!:any;
  opcion!:idPetsCita;
  veterinarios:ClienteFull[] =new Array();

  /*ROLE del usuario*/
  role:string="ninguno";
  //ngSelectveterinario:any;//Valor por defecto en el select del formulario
  /*===============================================================================================*/
/*Reglas :*/



/*===============================================================================================*/
/*Formulario :*/

  miFormulario: FormGroup = this.formB.group({//Validators.pattern('/^[a-z]{1,15}$/g'), Validators.pattern('[a-z]{3,15}')
    fecha: [ , [ Validators.required,Validators.minLength(4)]],
    petid: [ , [ Validators.required  ]],
    motivo: [, [ Validators.required,Validators.minLength(4)  ]],
    idVeterinario: [, [Validators.required]]

  })

  /*===============================================================================================*/
/*Constructor :*/
  constructor( private formB: FormBuilder,private vetServi: VeterinarioserviService, private mascotaServi:MascotaService, private router: Router, private citaServi:CitasServiService) { }


  /*===============================================================================================*/
/*Se inicia al inicio :*/
  ngOnInit(): void {//se inicia al inicio
     /*====================Datos par acliente================================*/

    //todo lo de cliente
    this.mascotaServi.mostrarPetsCliente().subscribe( //recoger las mascotas del cliente logeado
      datosMascota=>{
        this.mascotas=datosMascota;
        //this.ngSelectmascota=this.mascotas[0];

      })

      //recoger los veterinarios de la base de datos
    this.vetServi.mostrarVeterinariosComoClientes().subscribe( //recoger lso veterinarios de la veterinaria
      datosveterinarios=>{
        this.veterinarios=datosveterinarios;
        //this.ngSelectveterinario = this.veterinarios[0];

      })

    /*====================Datos si el logeado es veterinario================================*/

  }

    /*=================================================================================== */
/*=================================================================================== */
/*Muestre errores en el formulario*/
campoEsValido( campo: string ) {

  return this.miFormulario.controls[campo].errors
          && this.miFormulario.controls[campo].touched;
}

//*Errores del nombre de la  mascota**/
get veterinarioError(): string {

  const errors = this.miFormulario.get('idVeterinario')?.errors!;
  if ( errors['required'] ) { //Si salta, que es requirido significa que el campo esta vacio
    return 'El Veterinario es obligatorio. No puede estar vac??o';
  } else {
    //**Si todo esta bien */
    return '';
  }
}
/*=================== */
//*Errores del tipo de mascota**/
get fechaError(): string {

  const errors = this.miFormulario.get('fecha')?.errors!;
  if ( errors['required'] ) { //Si salta, que es requirido significa que el campo esta vacio
    return 'La fecha es obligatoria. No puede estar vac??o, selecciona uno, porfavor';
  } else {
    //**Si todo esta bien */
    return '';
  }
}
/*=================== */
/*=================== */
//*Errores de elegi mascota**/
get mascotaError(): string {

  const errors = this.miFormulario.get('petid')?.errors!;
  if ( errors['required'] ) { //Si salta, que es requirido significa que el campo esta vacio
    return 'La mascota es obligatoria. No puede estar vac??o, selecciona uno, porfavor';
  } else {
    //**Si todo esta bien */
    return '';
  }
}
/*=================== */
//*Errores del nombre de la  mascota**/
get motivoError(): string {

  const errors = this.miFormulario.get('motivo')?.errors!;
  if ( errors['required'] ) { //Si salta, que es requirido significa que el campo esta vacio
    return 'El motivo o comentario. No puede estar vac??o';
  } else if ( errors['pattern'] ) {//Si salta que no esta con el formato correcto
    return 'El valor ingresado no tiene formato de correo.No puede se valores negativos';
  } else {
    //**Si todo esta bien */
    return '';
  }
}

 /*=================================================================================== */
/*=================================================================================== */

  /*===============================================================================================*/
/*Funciones :*/

  comprobarFecha( fecha: Date){

  }

  //Crear una nueva cita.
  crearNuevaCita(){
     //comprobamos si ya esta registrando uno
    //Al inicio, no habra registrado asi que estara en falso. Pero si se ha pasado antes por aqui y esta registrando correctamente, y una parte dentro del
    //else, hay una arte que convierte el bolean en true y sigue el registro.
    //SI vuelve s apulsara el boton del formulario no mandara otro registro
    if (this.registrando){}
    else {
          this.miFormulario.markAllAsTouched(); //Si le das a enviar con los campos vacios, los marcara como tocados y saltar?? as?? el error
          //comprobamos que el formulario es valido.
          this.submitted = true;
          this.opcion=this.miFormulario.value;

            // si es invalido, se detendra aqui si hay alg??n error en los datos ingresados en el formulario
          if (this.miFormulario.invalid) {

            Swal.fire('Error', 'No esta correcto el formato de los datos introducidos','error');

            return;
          }
          this.citaServi.guardarPet(this.opcion.petid);//guardamos la pet en el servicio para luego a??adirla a la ruta

          this.nuevaCita=this.miFormulario.value;
          this.loading=true;
          this.registrando=true; //confirmamos que ahora esta registrandose alguno

          this.carga();
          this.citaServi.addCita(this.nuevaCita) //Llamada al servidor para a??adir nueva cita
          .subscribe(
            {
              next: (datosToken =>{
                //si todo bien
                Swal.fire({ //notificacion de correcto registro de cita
                  position: 'center',
                  icon: 'success',
                  title: 'Se ha registrado correctamente la cita',
                  showConfirmButton: false,
                  timer: 2500
                })
                delay(2500); //Una espera apr apoder leerlo

                //window.history.back();
                window.location.href = '../paginasUser/menu/menucliente';


              }),
              error: resp => { //Si muestra alg??n error//
                Swal.fire({icon: 'error',
                title:'Error',
                text: resp.error.message + resp.error.mensaje})
                this.registrando=false; //confirmamos que ahora esta registrandose alguno
                return;
              }
          });
        }

  }


  funciones(){
    //const type = (<HTMLInputElement>document.getElementById('type')).value;

  }

  //Funcion, que salta con el bot??n informaci??n
  //Esta aleta contendr?? la informaci??n de los tipos de veterinarios
  informacionTipoVeterinarios(){
    Swal.fire({
      title: '<strong><u>Tipo de veterinarios</u></strong>',
      icon: 'info',
      html:
        '<b>Diagn??stico : </b> Veterinario encargado del chequeo de la mascota para comprobar sus estado y s?? sufre alguna condici??n, os recetar?? la medicaci??n necesaria. Tambi??n realiza funciones como vacunar y Desparasita<br>' +
        '----------<br>'
        +'<b>Operaci??n: </b> Veterinarios encargados de realizar alguna operaci??n de su mascota. Tambi??n realizar?? la revisi??n tras la operaci??n<br>'
      + '----------<br>'
        +'<b>General: </b> Veterinarios general que ocupa ambos tipos mencionados. Si no est??s seguro cual de los dos tipos de veterinarios anteriores adec??a a su cita, seleccione este.'

    })

    }
  //Ventana de carga. Mientras carga la p??gina o por una funci??n, se mostrar?? uan notificaci??n
  //Carga de pagina al proceder
  carga(){
    Swal.fire({title:'Por favor, espere',
    timer: 1900})
    Swal.showLoading()
  }

  //Carga de pagina inicialmente
  cargainicial(){
    Swal.fire({title:'Por favor, espere',
    timer: 1000})
    Swal.showLoading()
  }

    confirmar(){
      var r = confirm("??seguro que desea volver?");
      if (r == true) {
          alert("\'codgio de vuelta (true)\'");
      } else {
          alert("\'codgio de redireccion (false)\'");
      }
      }

  //Volver al menu cliente//
    volverMenu(){
      window.history.back();
    }
}
