import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioFull } from 'src/app/interfaces/usuarioFull.interface';
import { VeterinarioserviService } from 'src/app/servicios/veterinarioservi.service';
import Swal from 'sweetalert2';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { AdministradorserviService } from 'src/app/servicios/administradorservi.service';
import { ClienteFull } from 'src/app/interfaces/clienteFull.interface';
import { delay } from 'rxjs';

@Component({
  selector: 'app-mostrarveterinario',
  templateUrl: './mostrarveterinario.component.html',
  styles: [
  ]
})
export class MostrarveterinarioComponent implements OnInit {
  veterinarios:UsuarioFull[]=new Array();
  fatrashcan=faTrashCan;//icono de papelera
  faPenIcon= faPencil;//icono del lapiz de editar
  borrando:boolean=false;
/*==============================================*/

  constructor(private router:Router, private veterinarioServi:VeterinarioserviService, private adminServi: AdministradorserviService) { }

  //Inicio de pagina
  ngOnInit(): void {
    //recoger veterinarios
    this.veterinarioServi.mostrarVeterinarios().subscribe(
      datosVeterinarios=> {
        this.veterinarios=datosVeterinarios;

      }, error =>{//si sale algún error

        Swal.fire({icon: 'error',
        title:'Error',
        text: error.message})
        return;

    }
    )
  }
/*====================================================================================================*/
/*~FUNCIONES~*/

  //guardar los datos del usuario que luego podrems cambiar pass
  guardaryeditarUsuariopass(usuario:UsuarioFull){
    this.cargaFuncion();
    this.adminServi.guardarUsuarioparacambiarcontraseña(usuario);
    this.router.navigate(['/funcionesadmin/funcioncambiarpass/cambiarpass']);
  }

  //borrar Veterinario
borrarVeterinario(veterinarioSeleccionado:UsuarioFull){
  Swal.fire({ //notificacion que pregunta si quieres borrar la mascota
    title: '¿De verdad quieres borrar esta mascota?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Borrar',
  }).then((result) => {//Respuetsa de a notificación//
    if (result.isConfirmed) { //sí le da a que si quiere borrar la mascota
       //Mensaje de carga
       this.cargaFuncion();

       this.adminServi.deleteVeterinario(veterinarioSeleccionado.id).subscribe({
        next: (
          datos => {
            delay(2000);
            this.ngOnInit(); //para que recarge de nuevo la lista de veterinario
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



  //Volver al menu administrador//
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
