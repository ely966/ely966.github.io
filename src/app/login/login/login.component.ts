import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { datosClienteParaHacerLogin } from 'src/app/interfaces/login.interface';
import { catchError, debounceTime, of, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioFull } from 'src/app/interfaces/usuarioFull.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  submitted = false;
  loading = false;
  datosUsuario !:UsuarioFull;
  comprobandoUserLogeado!:Boolean;
  debounceTime = 500;

   miFormularioLogin:FormGroup = this.formBB.group({
    email: [ , [ Validators.required, Validators.min(0), Validators.email] ],
    password: [ , [ Validators.required, Validators.minLength(3) ]   ]

  })

  constructor( private formBB: FormBuilder, private route: ActivatedRoute,private elementRef: ElementRef,
    private router: Router, private authServi: AuthService) { }
    loginnn!: datosClienteParaHacerLogin;

//muestre errores que puede escribir el usuario en el formulario
    campoEsValido( campo: string ) {

      return this.miFormularioLogin.controls[campo].errors
              && this.miFormularioLogin.controls[campo].touched;
    }



/*Método que realizará la acción de redirigir al menu al usuario.
    El menu cambiará segun el rol del usuario*/

   mandarDatosLogin(){

          this.comprobandoUserLogeado=true;//esta comprobando un logeado

          this.submitted=true;
          if(this.miFormularioLogin.invalid){//Formulario mal escrito

            Swal.fire('Error', "Corrige los errores marcados en el formualrio", 'error')
              return;
          }
          //eformulario bien escrito
          this.loginnn=this.miFormularioLogin.value;


          this.loading=true;
          this.authServi.doLogin(this.loginnn)
          .subscribe({ /**Si llega la respuetsa correcta, esdecir, que es correcto el login, y que llega el token */
            next: (datoToken => {
              //Si esta logeado correctamente

            //redirigo al metodo que comprueba el rol, y asi lo redirige al menu que le corresponde
            this.comprobarrole();
          }),
            error: resp => { //Si muestra algún error//


              Swal.fire('Error', resp.error.mensaje, 'error')
              this.router.navigateByUrl('/')
            }
        });


  }
//comrpueba el roll. Si esta registrado el usuario , comprueba su rol, ys egun su roll lo redirige a su menu.
comprobarrole(){
  this.authServi.datosUsuario().subscribe(
    datos =>{
      this.datosUsuario=datos;//segun el role redirige a un menu
      this.authServi.guardarUserLogeado(this.datosUsuario);//guardar datos
      //Ventana de carga
      this.carga();
      if(this.datosUsuario.role === "ADMIN"){
        this.authServi.guardarroleuser("ADMIN");
        this.comprobandoUserLogeado=false;
        this.router.navigateByUrl('/parteadm/menua/menuAdmin');

      }else if(this.datosUsuario.role === "VETERINARIO"){
        this.authServi.guardarroleuser("VETERINARIO");
        this.comprobandoUserLogeado=false;
        this.router.navigateByUrl('/veterinariopag/opcionmenuVeterinario/menuVeterinario');


      }
      else {//usuario roll cliente
        this.authServi.guardarroleuser("CLIENTE");
        this.comprobandoUserLogeado=false;
        this.router.navigateByUrl('/paginasUser/menu/menucliente');
      }


    }
  ),  catchError(error => {
    Swal.fire('Error', error.error.mensaje, 'error')
    this.router.navigateByUrl('/')
    return of(false);
  })

}

  ngOnInit(): void {

}

 //Metodo que será la notificacion de carga de la pagina, para notificar que etsa cargando la página
 carga(){
  Swal.fire({title:'Por favor, espere',
  timer: 2400})
  Swal.showLoading()
}



}
