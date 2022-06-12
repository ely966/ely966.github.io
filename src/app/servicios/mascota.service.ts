
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { mascota } from '../interfaces/mascota.interface';
import { mascotaFull } from '../interfaces/mascotaFull.interface';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  url= "https://proyectodawveterinaria.herokuapp.com/";
  token =localStorage.getItem("tokenGuardado");
  mascotas:mascotaFull[]=new Array();
  mascotaEditae!:mascotaFull;
  idMascota:number=0;
  idMascotaBuscar:any;

  constructor(private httpAu: HttpClient, private router:Router, private cookies: CookieService) { }

//Añadir Mascota al cliente logeado
  public addPet(tokenGuardado: any, mascotadatos: mascota) :Observable<any>{
    //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpAu.post(this.url +'cliente/mascota',mascotadatos , { headers});



  }

  //Mostrar mascotas del cliente logeado

  public mostrarPetsCliente(): Observable<any>{
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpAu.get(this.url +'cliente/mascota' , { headers});
  }

  //borrar Mascota marcado por id

  public borrarPetId(id:any): Observable<any>{
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpAu.delete(this.url +'cliente/mascota/'+id,{ headers});
  }

  //Editar mascota

  public editarMascotaSelecionada( mascotadatos: mascotaFull) :Observable<any>{
    //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpAu.put(this.url +'cliente/mascota/'+mascotadatos.id,mascotadatos , { headers});

  }


  //Guardar la mascota que sera editada
  public guardarPetEditar(mascotaaEditar:mascotaFull){
  this.mascotaEditae = mascotaaEditar;
  this.idMascota=mascotaaEditar.id;
    this.idMascotaBuscar= mascotaaEditar.id;
    localStorage.setItem("idMascotaEdit", this.idMascotaBuscar);
  }
  public recogerMascotaGuardadaParaEditar(): mascotaFull{
    return this.mascotaEditae;

    }

  devolverid ():Number {
    return this.idMascota;
  }

//Subida de imagenes apra mascota

    subirFoto(archivo:File, id:any): Observable<mascotaFull>{
     //utiliza mismo formato apra multipart/formdata
      let formData = new FormData();
      formData.append("archivo", archivo);
      formData.append("id", id);

       //Recoger el token desde el localstorage, pero solo el token no el formato completo, porque sino fallara//
      const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
      const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      // const req = new HttpRequest('POST',this.url +'cliente/mascota/upload/'+this.idMascota,formData, {headers,
      //   reportProgress: true
      // })
      // return this.httpAu.request(this.url +'cliente/mascota/upload/'+this.idMascota,formData, { headers}).pipe(
      return this.httpAu.post(this.url +'cliente/mascota/upload/'+this.idMascota,formData, { headers}).pipe(
        map((response:any) => response.mascota as mascotaFull),
        catchError(e => {
            Swal.fire('error', e.error.mensaje, 'error');
            return throwError(e);
          }
        )
      )


    }


    //al recargar la página, se prierde los datos de la mascota,a si que con este metodo
    //se encarga de recoger de nuevo los datos y mostrarlos

  public datosMascota(id:any): Observable<any>{
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )
      //recogemos el id del localstorage
      this.idMascota=JSON.parse(<string>localStorage.getItem('idMascotaEdit'));
      return this.httpAu.get(this.url +'cliente/mascota/'+this.idMascota, { headers});
  }

}
