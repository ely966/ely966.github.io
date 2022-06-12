import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { UsuarioFull } from '../interfaces/usuarioFull.interface';

@Injectable({
  providedIn: 'root'
})
export class ProtegerAdminGuard implements CanActivateChild {
  datosUsuario !:UsuarioFull;

  constructor(private router:Router, private authServi:AuthService) { }

  canActivateChild(route: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.authServi.datosUsuario().subscribe(
        datos =>{
          this.datosUsuario=datos;});

   //Va comprobando que el token sea valido con cada petición
   return this.authServi.datosUsuario().pipe(
   map( resp => {//comprueba que el role del usuario

      if (this.datosUsuario.role== "ADMIN"){
        return true;
      }
      else {
        Swal.fire({icon: 'error',
     title:'Error',
     text: 'No estás logeado con un usuario administrador válido'})
     this.router.navigate(['/']);
        return false;
      }
   }),
   catchError(() => {

     Swal.fire({icon: 'error',
     title:'Error',
     text: 'No estás logeado con un usuario cliente válido'})


     this.router.navigate(['/']);

     return of(false)})
     );




       }};
