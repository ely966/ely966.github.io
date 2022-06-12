import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { UsuarioFull } from '../interfaces/usuarioFull.interface';


@Injectable({
  providedIn: 'root'
})
/*Comprobará que el usuario sea del rol cliente*/

export class ClienteguardianGuard implements CanActivateChild {
  /*Recoger lod atos del usuario logeado*/
  datosUsuario !:UsuarioFull;

/*==========================================================================================*/

  /*COntructor*/

  constructor(private router:Router, private authServi:AuthService) { }

/*==========================================================================================*/

  /*Guardian*/

  canActivateChild(route: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.authServi.datosUsuario().subscribe(/*Pedimos los datos del usuario */
        datos =>{
          this.datosUsuario=datos;/*Guardamos los datos del usuario*/
        });

    /*Controlamos lo que va a devolver, para que en vez de devolver directamente los datos del usuario,
    sino que con esa informacion validemos si continua o se echa de la aplicacion*/
    //*Usaremos pipe, apra que nos permita usar map, El cual nos permite cambiar el return*/
    /*Va comprobando que el token sea valido con cada petición*/

    return this.authServi.datosUsuario().pipe(
      map( resp => {//comprueba que el role del usuario
          /*COmprobamos que si tiene el role de cliente*/
          if (this.datosUsuario.role== "CLIENTE"){
            /*Si tiene el role de cliente, pues que guarde el rol, para cada vez que pida el rol, como
            el menu del navegador de la app, que necesita saber el role, para saber cual mostrar. Recoge de aqui el
            rol y no se le pierda si recarga la página. Tras esto, continuara el usuario en la aplicación */
            this.authServi.guardarroleuser("CLIENTE");
            return true;
          }else {
            /*Si no tiene el role de cliente, se le notificará y redirigirá al inicio de la app*/
            Swal.fire({icon: 'error',
            title:'Error',
            text: 'No estás logeado con un usuario cliente válido'})

            this.router.navigate(['/']);
            return false;
          }

      }),
      catchError(() => {
        /*En el caso que hubiera algún error, se le notificaría  y redirigirá al inicio de la app*/
        Swal.fire({icon: 'error',
        title:'Error',
        text: 'No estás logeado con un usuario cliente válido'})


        this.router.navigate(['/']);

        return of(false)})
        );

  }

}
