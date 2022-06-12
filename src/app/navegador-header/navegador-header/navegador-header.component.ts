import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UsuarioFull } from 'src/app/interfaces/usuarioFull.interface';
import Swal from 'sweetalert2';
//import { faPencil } from '@fortawesome/free-solid-svg-icons';
// <fa-icon [icon]="faPenIcon "></fa-icon>Editar
@Component({
  selector: 'app-navegador-header',
  templateUrl: './navegador-header.component.html',
  styles: [
  ]
})
export class NavegadorHeaderComponent implements DoCheck, OnInit {

  constructor(private authServ: AuthService, private router:Router, private authServi:AuthService) { }
  estarLogin!: any;
  datosUsuario = {} as UsuarioFull;
  role: string= "ninguno";
  isAdmin:any= false;
  isCliente:Boolean=false;
  isVeterinario:Boolean=false;

  //Al iniciar o recargar la pagina
  ngOnInit(): void {
    //this.estarLogin=localStorage.getItem("token");
    if (localStorage.getItem("token") !=null){
      this.estarLogin=true;
    }else {
      this.role="";
      this.estarLogin= "";
      this.isAdmin= "";
      this.isCliente=false;
      this.isVeterinario=false;
    }
    setInterval(this.comrprobar(), 500);
    //setInterval(this.isAdmin(), 500);
  }








  //comprobamos el roll del usuario. EL roll esta guardado en els ervido autentificacion, se guarda cada vez que se hace login
  comprobarRoluserlogeado(): void{
    this.role=JSON.parse(<string>localStorage.getItem('roleUsuario'));


    if(this.role == "ADMIN"){
      this.isAdmin=true;
      this.isCliente=false;
      this.isVeterinario=false;
    }else if (this.role == "CLIENTE"){
      this.isAdmin=false;
      this.isCliente=true;
      this.isVeterinario=false;
    }else if (this.role == "VETERINARIO"){
      this.isAdmin=false;
      this.isCliente=false;
      this.isVeterinario=true;

    }else {
      this.isAdmin=false;
      this.isCliente=false;
      this.isVeterinario=false;
    }
  }

  //COMPROBAR SI MOSTRAR ICONO SALIR//
  //Comprobar que si hay un token guardado. si lo hay , esque hay alguien logeado ,por lo tanto mostrar el icono de salir
  //comprobara que haya un tokn en el localStorage
  comrprobar() : string{

    if (localStorage.getItem("token") !=null){
      this.estarLogin=true;
      //this.datosUsuario= await this.authServi.getUserLogeado();
      this.comprobarRoluserlogeado();

      return "true";
    }else {
      this.estarLogin= "";
      return "false";
    }
  }
  //FIN COMPROBAR ICONO SALIR//

//SALIR DE APLICACIÓN//
//En el navegador, si lo pulsas te preguntará siq ueires salir de la aplicación
  logout(){//metodo para salir de la aplicación
    Swal.fire({
      title: '¿Quieres salirte de la aplicación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {//En caso afirmativo
        this.estarLogin= "";
        this.authServ.logout();
      }
    })
  }

  //Fin SALIDA DE APLICACIÓN//



//vaya chequeando el comprobar
ngDoCheck(){
  this.comrprobar();
}





  @Input()
  texto!: String ;
  @Output()
  eventoHijo = new EventEmitter<string>();
  enviarPadre() {

    this.eventoHijo.emit("evento hijo!!!!")
  }

}
