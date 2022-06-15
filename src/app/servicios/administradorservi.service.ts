import { UsuarioFull } from 'src/app/interfaces/usuarioFull.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';
import { editaruser } from '../interfaces/editarUser.interface';

@Injectable({
  providedIn: 'root'
})
export class AdministradorserviService {
  //http://proyectodawveterinaria.herokuapp.com/
  url= "https://proyectodawveterinaria.herokuapp.com/";
  token =localStorage.getItem("tokenGuardado");
  veterinario!:UsuarioFull;
  usuarioCambiarPass!:UsuarioFull;

  constructor(private httpAu: HttpClient, private router:Router) { }

  //Añadir un nuevo admonostrador
  public crearAdministrador(admin: Cliente) :Observable<any>{
    //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpAu.post(this.url +'admin',admin , { headers});



  }

  //Editar administrador, sus datos

  public editardatosadmin( adminEdit: editaruser) :Observable<any>{
    //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpAu.put(this.url +'admin',adminEdit , { headers});

  }


  //Recoger ls datos del administrador
  public recogerInfoAdmin() :Observable<any>{
    //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpAu.get(this.url +'admin/info', { headers});



  }


//Crear un nuevo veterinario
public crearVeterinario(veterinarioNuevo: Cliente) :Observable<any>{
  //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
  const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}` )

    return this.httpAu.post(this.url +'admin/veterinario',veterinarioNuevo , { headers});



}

//Guardar en el momento el veterinario para borrarlo
public guardarVeterinario (veterinarioguardar:UsuarioFull){
  this.veterinario=veterinarioguardar;
}
//Crear un nuevo veterinario
public deleteVeterinario(id: number) :Observable<any>{
  //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
  const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}` )

    return this.httpAu.delete(this.url +'admin/veterinario/' + id , { headers});



}

 //Recoger ls datos de los administradores
 public mostrarAdmin() :Observable<any>{
  //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
  const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}` )

    return this.httpAu.get(this.url +'admin', { headers});



}

//Crear un nuevo veterinario
public deleteAdmin(id: number) :Observable<any>{
  //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
  const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}` )

    return this.httpAu.delete(this.url +'admin/' + id , { headers});



}


//guardar el usuario a editar apra cambiar al contarseña
public guardarUsuarioparacambiarcontraseña(usuario:UsuarioFull){
  this.usuarioCambiarPass=usuario;
  localStorage.setItem("usuarioEditarPass", this.usuarioCambiarPass.email);
}

//recoger el usuario guardado que cmabia la pass
public recogerUsuario(){
  return this.usuarioCambiarPass;
}


//El administrador cambia la contraseña d eun usuario

public cambiarPassDeUnUsuario( usuarioPass: editaruser) :Observable<any>{
  //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
  const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}` )
console.log(usuarioPass.id);
    return this.httpAu.put(this.url +'admin/user/'+usuarioPass.id,usuarioPass , { headers});

}



}
