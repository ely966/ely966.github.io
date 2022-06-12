import { Cita2 } from './../../../interfaces/citaNoObj.interface';
import { Component,EventEmitter,OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faLanguage, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { CitasServiService } from 'src/app/servicios/citas-servi.service';
import Swal from 'sweetalert2';
import { Subject, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-mostrarcitasall',
  templateUrl: './mostrarcitasall.component.html',
  styles: [
  ]
})
export class MostrarcitasallComponent implements OnDestroy, OnInit {
  //para datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  fatrashcan=faTrashCan;//icono de papelera
  mascotaSeleccion: any;
  faPenIcon= faPencil;//icono del lapiz de editar
  table!:any;
  //Para poder borrar
  @ViewChild(DataTableDirective, {static: false}) //evitar el error de que no puede iniciar dtinstance
  dtElement!: DataTableDirective;

  constructor(private router:Router, private citaServi:CitasServiService, private http:HttpClient) { }
  citas:Cita2[]= new Array();
  @Output () valueResponse: EventEmitter<Cita2> = new EventEmitter();

  /*===========================================================================*/
  //Al iniciar la página
  ngOnInit(): void {
    //datatable
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      scrollX: true,
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
    }
    };

    this.citaServi.mostrarCitasCliente().subscribe(
      datoCitas=>{
        this.citas=datoCitas;

        this.dtTrigger.next(null);

      },
      error => {//si hay algún error
        //notificación de error
          Swal.fire({icon: 'error',
          title:'Error',
          text: error.message})
          return;

      }
    );
  }

  /*===========================================================================*/

  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();
  }

  /*===========================================================================*/

  //*FUNCIONES*//

   //borrarMascota
   borrarcitas(citaSeleccionada:Cita2){

    Swal.fire({ //notificacion que pregunta si quieres borrar la cita
      title: '¿De verdad quieres borrar esta cita?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
    }).then((result) => {//Respuetsa de a notificación//
      if (result.isConfirmed) { //sí le da a que si quiere borrar la cita
        //Ventana de recarga//
        this.cargaFuncion();

        //funcion de borrar
        this.citaServi.borrarCitaId(citaSeleccionada.id, citaSeleccionada.pet.id).subscribe({
          next: (
            datos => {

              //Funcion de recarga la lista de citas
              this.recargarLista() ;

            }
          ),
          error: resp => { //Si muestra algún error//
              Swal.fire({icon: 'error',
              title:'Error',
              text: resp.error.message})
              return;

           }
        })
        Swal.fire('¡Borrado!', 'Borrado correctamente')
      }
    })

  }

/*===========================================================================*/
  //Recarga la lista de la datatatble, al borrar un elemento
  recargarLista() {
    this.citaServi.mostrarCitasCliente().subscribe(
      datoCitas=>{
        this.citas=datoCitas;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next(null);
        });

      },
      error => {//si hay algún error
        //notificación de error
          Swal.fire({icon: 'error',
          title:'Error',
          text: error.message})
          return;

      }
    );
  }

/*===========================================================================*/
//Guardar la cita guardaday redirigirse a la página para editar la cita

  guardarEditarCita(cita: Cita2 ){
    this.valueResponse.emit(cita);
    //ventana de carga
    this.cargaFuncion();

    this.citaServi.guardarCitaparaEditar(cita);
    //this.router.navigate(['/citas/editarC/editarCita']);
    this.router.navigate(['/citas/editarC/editarCita']);
  }

/*===========================================================================*/

//Volver al menu cliente//
volverMenu(){
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
//Ventana de carga al realizar una funcion como reguistrar, borrar, o editar
cargaFuncion(){
  Swal.fire({title:'Por favor, espere',
  timer: 2000})
  Swal.showLoading()
}
}
