import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styles: [
  ]
})
export class MenuClienteComponent implements OnInit {

  constructor(private router:Router,private authServ:AuthService) { }


  salirUsuario(){//metodo para salir de la aplicación
    Swal.fire({
      title: '¿Quieres salirte de la aplicación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {//En caso afirmativo
        this.authServ.logout();
      }
    })


  }
  ngOnInit(): void {
  }
/*===========================================================================*/
  //Ventana de carga. Mientras carag de una página se muetsre este ventana
 //Carga de pagina. Cada vez que pulsa un botón del menú, mostrará la notificación
 /*Ventana de carga hacia las páginas de reguistros*/
 ventanaLoadingReguistros(){
  Swal.fire({title:'Por favor, espere',
  timer: 2070})
  Swal.showLoading()
}
/********** */
/*Ventana de carga hacia páginas de Mostrar*/
ventanaLoadingMostrar(){
  Swal.fire({title:'Por favor, espere',
  timer: 2100})
  Swal.showLoading()
}
 //Carga de pagina
 cargainicial(){
  Swal.fire({title:'Por favor, espere',
  timer: 1200})
  Swal.showLoading()
}

}
