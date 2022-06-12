import { UsuarioFull } from './../../interfaces/usuarioFull.interface';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import Swal from "sweetalert2";

@Component({
  selector: 'app-proteger',
  templateUrl: './proteger.component.html',
  styles: [
  ]
})
//*Esta pagina protege, y si no estas logeado no te permite pasar*/
@Injectable()
export class ProtegerComponent implements CanActivateChild {
  logeador !:any;
  datosUsuario !:UsuarioFull;

  constructor(private router:Router, private authServi:AuthService) { }

  canActivateChild(route: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      //Comprobacion del token pr peticion

      //Va comprobando que el token sea valido con cada petición
      const tokenComprobar = this.authServi.getToken();
      return this.authServi.comprobarTokenSigueValido()
      .pipe(delay(1000),
      map( resp => {
        //si es todo valido
        //Coprobamos el roll
         //if (this.datosUsuario.)
        return true
      }),
      catchError(() => {

        Swal.fire({icon: 'error',
        title:'Error',
        text: 'No estás logeado con un usuario cliente válido'})


        this.router.navigate(['/']);

        return of(false)})
    );




      }




}
//});
 /*  ngOnInit(): void {
  }

  comprobarToken(){
    //this.authServi.
  }

} */
