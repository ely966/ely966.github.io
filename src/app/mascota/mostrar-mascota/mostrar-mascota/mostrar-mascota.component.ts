
import { Component, OnInit } from '@angular/core';
import { mascotaFull } from 'src/app/interfaces/mascotaFull.interface';
import { MascotaService } from 'src/app/servicios/mascota.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { delay } from 'rxjs';
import { idPets } from 'src/app/interfaces/idMascota.interface';

@Component({
  selector: 'app-mostrar-mascota',
  templateUrl: './mostrar-mascota.component.html',
  styles: [
  ]
})
export class MostrarMascotaComponent implements OnInit {
  //Donde recogeremos todas als mascotas del cliente
  mascotas:mascotaFull[]=new Array();
  idMascota !: idPets;
  fatrashcan=faTrashCan;//icono de papelera
  faPenIcon= faPencil;//icono del lapiz de editar

  constructor(private router:Router, private mascotaServi:MascotaService) { }

  //========================================================================================================//
  //Se inicia al principio de cargar este componente

  ngOnInit(): void {
    //LLamada al servidor de mascota para recoger las mascotas del cliente
    this.mascotaServi.mostrarPetsCliente().subscribe(
      datosMascota=>{
        //Guardar los datos de la mascotas del cliente
        this.mascotas=datosMascota;

      }, error =>{//si sale algún error

          Swal.fire({icon: 'error',
          title:'Error',
          text: error.message})
          return;

      }

    )
  }


/*===============================================================================================*/
  //Funciones//

  //Editar mascota
  //Al pulsar el boton de editar mascota
  guardarEditarMascota(mascotaSeleccion:mascotaFull){
    //Mensaje de carga
    this.cargaFuncion();
    //Este metodo haremos guardar esta mascota unos momentos para luego recogerlo.
    this.mascotaServi.guardarPetEditar(mascotaSeleccion);
    this.router.navigate(['/mascota/editarM/editarMascota']);

  }

    //Editar mascota
  //Al pulsar el boton de editar mascota
  guardarMascota(mascotaSeleccion:mascotaFull){
    //Mensaje de carga
    this.cargaFuncion();
    //Este metodo haremos guardar esta mascota unos momentos para luego recogerlo.
    this.mascotaServi.guardarPetEditar(mascotaSeleccion);
    //this.router.navigate(['/mascota/editarM/editarMascota']);

  }
//===============================/
  //borrarMascota
  borrarPet(mascotaSeleccion:mascotaFull){
    this.idMascota=mascotaSeleccion; //recogemos el id de la mascota

    Swal.fire({ //notificacion que pregunta si quieres borrar la mascota
      title: '¿De verdad quieres borrar esta mascota?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
    }).then((result) => {//Respuetsa de a notificación//
      if (result.isConfirmed) { //sí le da a que si quiere borrar la mascota
        //Mensaje de carga
        this.cargaFuncion();

        this.mascotaServi.borrarPetId(mascotaSeleccion.id).subscribe({
          next: (
            datos => {
              delay(4000);
              this.ngOnInit(); //recargar de nuevo
              //Mensaje de carga
              this.cargaFuncion();
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
