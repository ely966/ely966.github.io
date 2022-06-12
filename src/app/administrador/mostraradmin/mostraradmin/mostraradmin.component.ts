import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioFull } from 'src/app/interfaces/usuarioFull.interface';
import Swal from 'sweetalert2';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { AdministradorserviService } from 'src/app/servicios/administradorservi.service';
import { delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mostraradmin',
  templateUrl: './mostraradmin.component.html',
  styles: [
  ]
})
export class MostraradminComponent implements OnInit {
  admins:UsuarioFull[]=new Array();
  fatrashcan=faTrashCan;//icono de papelera
  faPenIcon= faPencil;//icono del lapiz de editar
  borrando:boolean=false;//si esta borrando a alguno

  constructor(private router:Router, private httpAu: HttpClient,
    private adminServi: AdministradorserviService) { }


  //========================================================================================================//
  //Se inicia al principio de cargar este componente

  ngOnInit(): void {
    //recoger veterinarios
    this.adminServi.mostrarAdmin().subscribe(
      datosAdmins=> {
        this.admins=datosAdmins;

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


  //borrar administrador
borrarAdmin(adminSeleccion:UsuarioFull){
  if(this.borrando){}
  else {
      Swal.fire({ //notificacion que pregunta si quieres borrar la mascota
      title: '¿De verdad quieres borrar este admin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
    }).then((result) => {//Respuetsa de a notificación//
      if (result.isConfirmed) { //sí le da a que si quiere borrar la mascota
          //Mensaje de carga
          this.cargaFuncion();
          this.borrando=true;

          this.adminServi.deleteAdmin(adminSeleccion.id).subscribe({
          next: (
            datos => {
              delay(2000);
              this.ngOnInit(); //para que recarge de nuevo la lista de veterinario
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
}



  //Volver al menu administrador//
  volverMenu(){
    window.location.href = '../parteadm/menua/menuAdmin';
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
