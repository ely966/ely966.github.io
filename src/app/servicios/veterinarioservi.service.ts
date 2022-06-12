import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';
import { editaruser } from '../interfaces/editarUser.interface';
import { Router } from '@angular/router';
import { CitaEdi } from '../interfaces/citaFullEditar.interface';


@Injectable({
  providedIn: 'root'
})
export class VeterinarioserviService {

  constructor(private httpClient:HttpClient, private router:Router) { }
  url= "https://proyectodawveterinaria.herokuapp.com/";
    token =localStorage.getItem("tokenGuardado");
  listaFunciones: string[]=new Array();

//recoge todos lso veterinarios
  public mostrarVeterinarios(): Observable<any>{
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpClient.get(this.url +'admin/veterinario' , { headers});
  }

//recoge todos lso veterinarios
//recogemos los veterinarios para usarlo en la lista de crear citas
public mostrarVeterinariosComoClientes(): Observable<any>{
  const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}` )

    return this.httpClient.get(this.url +'cliente/veterinario' , { headers});
}

  //Editar veterinario, sus datos. Un usuario veterinario pueda editar sus datos

  public editardatosveterinario( veteEdit: editaruser) :Observable<any>{
    //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpClient.put(this.url +'veterinario',veteEdit , { headers});

  }


  //Recoger los datos del veterinario logeado
  public recogerInfoVeterinario() :Observable<any>{
    //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpClient.get(this.url +'veterinario/info', { headers});



  }

  //mostrar citas del veterinario tiene que atender
  public mostrarcitasdelveterinario(): Observable<any>{
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )


      return this.httpClient.get(this.url +'veterinario/citas' , { headers});
  }
   /**Metodo que permite editar la cita seleccionada si el usuario logeado es CLIENTE*/
   public editarCitaVeterinario( cita:CitaEdi,  ):Observable<any>{
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpClient.put(this.url +'veterinario/citas/'+cita.id,cita , { headers});

  }
//public enviarEmail(email :Email): Observable<any> {
 // return this.http.post(`${this.baseUrl}`, email);
//}
//public sendMessage(correo) {
 // return this.httpClient.post(this.url , body);
  //}




//Recoger funciones veterinario. Seguns u tipo

//public funciones(tipoVeter: String):string[]{

  //if(tipoVeter=== "revision"){
//    return listaFunciones=["Vacunar", "Revision", "Analíticas", "Desparacitar"];
  ///}
//}

}
