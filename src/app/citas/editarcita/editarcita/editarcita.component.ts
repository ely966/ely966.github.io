import { idPetsCita } from 'src/app/interfaces/petCita.interface';
import { CitaEdi } from 'src/app/interfaces/citaFullEditar.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CitasServiService } from 'src/app/servicios/citas-servi.service';
import { Cita } from 'src/app/interfaces/citaFull.interface';
import Swal from 'sweetalert2';
import { Cita2 } from 'src/app/interfaces/citaNoObj.interface';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-editarcita',
  templateUrl: './editarcita.component.html',
  styles: [
  ]
})
export class EditarcitaComponent implements OnInit {

  /**Variables */
  citaAEditar!:Cita2;
  citaEditada!:CitaEdi;
  opcion !:idPetsCita;

    /*ROLE del usuario*/
    role:string="ninguno";
   /*===============================================================================================*/
/*Reglas :*/



/*===============================================================================================*/
/*Formulario :*/
  miFormulario: FormGroup = this.formB.group({//Validators.pattern('/^[a-z]{1,15}$/g'), Validators.pattern('[a-z]{3,15}')
    id: [, [Validators.required]],
    fecha: [ , [ Validators.required,Validators.minLength(4)  ]],
    petid: [ , [ Validators.required ]],
    motivo: [, [ Validators.required,Validators.minLength(4)  ]]

  })

  /*===============================================================================================*/
/*Constructor :*/
  constructor(private authServ: AuthService,private formB: FormBuilder, private router: Router, private citaServi:CitasServiService) { }

/*===============================================================================================*/
/*Se inicia al inicio :*/
  ngOnInit(): void {
     /*Recogemos el role del usuario*/
     this.role=this.authServ.getRole();
     /*Si el usuario logeado es usuario cliente */
    this.citaAEditar=this.citaServi.recogerCitaEditar();
  }

  /*Metodos*/

//Editar una cita existente
  editarCita(){
     this.opcion=this.miFormulario.value;
     this.citaEditada=this.miFormulario.value;
    //Cambaira segun el tipo de usuario logeado

    //Si el usuario logeado es veterinario

      this.citaServi.editarCita(this.citaEditada, this.role).subscribe(
        {
          next: (
            datos=> {
              Swal.fire({ //Notificación de que se ha editado correctamente
                title: 'Editado correctamente',
                text: "La cita ha sido editada. ¿Quieres volver a la tabla de mostrar citas?",
                icon: 'success',

                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Si',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                }).then((result) => { //si quiere volver a la tabla
                  if (result.isConfirmed) {
                    window.history.back();
                  }
                })


            }),
            error: resp => { //Si muestra algún error//
                Swal.fire({icon: 'error',
                title:'Error',
                text: resp.error.message})
                return;
              }


          })
        }


      //Volver a la lista de citas
    volver(){
    this.cargarRegresar();
    window.history.back();
  }

  /*===========================================================================*/
  //Ventana de carga. Mientras carag de una página se muetsre este ventana
 /*Ventana de carga al vovler al menu*/
 cargarRegresar(){
  Swal.fire({title:'Por favor, espere',
  timer: 2070})
  Swal.showLoading()
}
}
