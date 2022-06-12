
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, delay, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import { datosClienteParaHacerLogin } from 'src/app/interfaces/login.interface';

import { UsuarioFull } from '../interfaces/usuarioFull.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//Este servicio interactua con el servidor//
url= "https://proyectodawveterinaria.herokuapp.com/";
tokenGuardar: any; //token del momento.

idUsuarioLogeado: number=0;
logeado !:any;

usuario !:UsuarioFull;
datoslogeado!:UsuarioFull;
role!:string;
 /*=====================================================*/


constructor(private httpAu: HttpClient, private router:Router, private cookies: CookieService) {

  }

 /*=====================================================================================================*/

//añadir los nuevos clientes
  public addCliente(datosCliente: datosClienteParaHacerLogin): Observable<any> {
    return this.httpAu.post<any>(this.url + '/auth/register', datosCliente)
    //.pipe()
  }
  /*=====================================================*/

//Hacer login de la aplicaicon
  public doLogin(datosCliente: datosClienteParaHacerLogin): Observable<any> {

    return this.httpAu.post<any>(this.url + 'auth/login', datosCliente).pipe(map(user => {
      localStorage.setItem('token', JSON.stringify(user));
      //this.tokenGuardar=user;
    }))
  }
   /*=====================================================*/

//Método que comprobara que el token continue siendo valido apra pder continuar navegando por la aplicación

  public  comprobarTokenSigueValido (): Observable<any> {
    this.tokenGuardar = JSON.parse(<string>localStorage.getItem('token'));
    if(this.tokenGuardar == null){//si el token es null.
        const token: string = "";
        localStorage.removeItem('token');

        const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}` )
        return  this.httpAu.get(this.url +'auth/comprobarToken' , { headers});
    }
    else { //si el token no es null
        const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];

        const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}` )
        return  this.httpAu.get(this.url +'auth/comprobarToken' , { headers});
      }
  }

//sacar los datos del usuario logeado

public datosUsuario ():Observable<any> {
  const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];

  const headers = new HttpHeaders()
  .set('Authorization', `Bearer ${token}` )
  return  this.httpAu.get(this.url +'auth/info' , { headers});

}


  //comproba para iconos
  public comprobarParaIcono(){
    if (localStorage.getItem("token") !=null){
      this.logeado=true;
    }else {
      this.logeado= "";
    }
  }
/*Método que devuelve el token guardado en el local*/

  getToken(){
    return JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
  }



 /*=====================================================*/

  /*Método que consiste que cuando sale de la aplicación, borrará el token del localstorage y redirige al home*/

    logout() { /**Borrar el token y asi impedir que otro usuario use sus privilegios */

      localStorage.removeItem("token");
      this.role="";
      this.router.navigate(['home']);
  }


  // public datosUser(): Observable<any> {
  //   const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];

  //   const headers = new HttpHeaders()
  //   .set('Authorization', `Bearer ${token}` )
  //   return  this.httpAu.get(this.url +'auth/comprobarToken' , { headers});

  //   }


  public guardarUserLogeado(datoslogeado: UsuarioFull){
    this.datoslogeado=datoslogeado;
  }

  public guardarroleuser (role:string){
    this.role=role;
    localStorage.setItem('roleUsuario', JSON.stringify(role));

  }
getRole(): string{
  return JSON.parse(<string>localStorage.getItem('roleUsuario'));

}
}
