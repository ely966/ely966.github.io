import { UsuarioFull } from 'src/app/interfaces/usuarioFull.interface';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Cita2 } from 'src/app/interfaces/citaNoObj.interface';
import { VeterinarioserviService } from 'src/app/servicios/veterinarioservi.service';
import Swal from 'sweetalert2';
import { Cita } from 'src/app/interfaces/citaFull.interface';
import { CitasServiService } from 'src/app/servicios/citas-servi.service';

@Component({
  selector: 'app-mostrarcitasdelveterinario',
  templateUrl: './mostrarcitasdelveterinario.component.html',
  styles: [
  ]
})
export class MostrarcitasdelveterinarioComponent implements OnInit {
  //para datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  //recoger la informacion del client de cada cita apra recoger su telefono
  datosCliente:UsuarioFull[]= new Array();

  fatrashcan=faTrashCan;//icono de papelera
  mascotaSeleccion: any;
  faPenIcon= faPencil;//icono del lapiz de editar
  table!:any;
  //Para poder borrar
  @ViewChild(DataTableDirective, {static: false}) //evitar el error de que no puede iniciar dtinstance
  dtElement!: DataTableDirective;

  constructor(private router:Router,private citaServi:CitasServiService,  private veterservi:VeterinarioserviService, private http:HttpClient) { }
  citas:Cita[]= new Array();
  @Output () valueResponse: EventEmitter<Cita2> = new EventEmitter();

  /*===========================================================================*/
  //Al iniciar la página
  ngOnInit(): void {
    //datatable
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      responsive: true,
      scrollX: true,
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
    }
    };
    //recogemos las citas del veterinario
    this.veterservi.mostrarcitasdelveterinario().subscribe(
      citasDelVeterinario=>{
        this.citas=citasDelVeterinario;
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

  //  //borrarMascota
  //  borrarcitas(citaSeleccionada:Cita2){

  //   Swal.fire({ //notificacion que pregunta si quieres borrar la cita
  //     title: '¿De verdad quieres borrar esta cita?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Borrar',
  //   }).then((result) => {//Respuetsa de a notificación//
  //     if (result.isConfirmed) { //sí le da a que si quiere borrar la cita
  //       //Ventana de recarga//
  //       this.cargaFuncion();

  //       //funcion de borrar
  //       this.veteri.borrarCitaId(citaSeleccionada.id, citaSeleccionada.pet.id).subscribe({
  //         next: (
  //           datos => {

  //             //Funcion de recarga la lista de citas
  //             this.recargarLista() ;

  //           }
  //         ),
  //         error: resp => { //Si muestra algún error//
  //             Swal.fire({icon: 'error',
  //             title:'Error',
  //             text: resp.error.message})
  //             return;

  //          }
  //       })
  //       Swal.fire('¡Borrado!', 'Borrado correctamente')
  //     }
  //   })

  // }

/*===========================================================================*/
  //Recarga la lista de la datatatble, al borrar un elemento
  recargarLista() {
    this.veterservi.mostrarcitasdelveterinario().subscribe(
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
    this.router.navigate(['/citas/editarC/editarCita']);
    //this.router.navigate(['/citas/editarC/editarCita']);
  }

/*===========================================================================*/

//Volver al menu veterinario//
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
