import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';
import { editaruser } from '../interfaces/editarUser.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private httpClient:HttpClient, private router:Router) { }
  url= "https://proyectodawveterinaria.herokuapp.com/";
  token =localStorage.getItem("tokenGuardado");


  crearCliente(cliente:Cliente): Observable<any>{
    return this.httpClient.post(this.url+'auth/register',cliente);
  }


  //Editar cliente. El cliente puede editar sus datos

  public editardatoscliente( clienteEdit: editaruser) :Observable<any>{
    //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      //return this.httpClient.put(this.url +'cliente',clienteEdit , { headers});
      return this.httpClient.put(this.url + 'cliente', clienteEdit, { headers}).pipe(map(user => {
        localStorage.setItem('token', JSON.stringify(user)); //se vuelve a guardar, ya que si cmabia la contraseña, cambairá el token
        //this.tokenGuardar=user;
      }))

  }


  //Recoger ls datos del cliente
  public recogerInfoCliente() :Observable<any>{
    //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpClient.get(this.url +'cliente/info', { headers});



  }

    //Recoger ls datos del cliente
    public recogerInfoClienteporCorreo(correo:any) :Observable<any>{
      //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
      const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}` )

        return this.httpClient.get(this.url +'admin/cliente/'+correo, { headers});



    }


  //Recoger ls datos de los clientes
  public mostrarClientes() :Observable<any>{
    //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpClient.get(this.url +'admin/clientes', { headers});



  }


  //borra un nuevo cliente
public deleteCliente(id: number) :Observable<any>{
  //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
  const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}` )

    return this.httpClient.delete(this.url +'admin/cliente/' + id , { headers});



}

}
