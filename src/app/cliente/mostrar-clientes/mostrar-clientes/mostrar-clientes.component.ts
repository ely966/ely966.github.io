import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { delay } from 'rxjs';
import { UsuarioFull } from 'src/app/interfaces/usuarioFull.interface';
import { AdministradorserviService } from 'src/app/servicios/administradorservi.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-clientes',
  templateUrl: './mostrar-clientes.component.html',
  styles: [
  ]
})
export class MostrarClientesComponent implements OnInit {
  clientes:UsuarioFull[]=new Array();
  fatrashcan=faTrashCan;//icono de papelera
  faPenIcon= faPencil;//icono del lapiz de editar
  borrando:boolean=false;//si esta borrando a alguno

  constructor(private router:Router, private httpAu: HttpClient,
    private adminServi: AdministradorserviService, private clienteServi: ClienteService) { }


  //========================================================================================================//
  //Se inicia al principio de cargar este componente


  ngOnInit(): void {
     //recoger veterinarios
     this.clienteServi.mostrarClientes().subscribe(
      datosClientes=> {
        this.clientes=datosClientes;

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


  //borrar cliente
borrarCliente(clienteSeleccion:UsuarioFull){
  if(this.borrando){}
  else {
      Swal.fire({ //notificacion que pregunta si quieres borrar el cliente
      title: '¿De verdad quieres borrar este cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
    }).then((result) => {//Respuetsa de a notificación//
      if (result.isConfirmed) { //sí le da a que si quiere borrar el cliente
          //Mensaje de carga
          this.cargaFuncion();
          this.borrando=true;

          this.clienteServi.deleteCliente(clienteSeleccion.id).subscribe({
          next: (
            datos => {
              delay(2000);
              this.ngOnInit(); //para que recarge de nuevo la lista de cliente
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


  //guardar los datos del usuario que luego podrems cambiar pass
  guardaryeditarUsuariopass(usuario:UsuarioFull){
    this.cargaFuncion();
    this.adminServi.guardarUsuarioparacambiarcontraseña(usuario);
    this.router.navigate(['/funcionesadmin/funcioncambiarpass/cambiarpass']);
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
