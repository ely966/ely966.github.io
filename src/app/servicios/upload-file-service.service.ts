import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileServiceService {

   //Url obtenida de la variable de enviroments
   url= "https://proyectodawveterinaria.herokuapp.com/";
     token =localStorage.getItem("tokenGuardado");

   //Inyeccion de HttpClient
   constructor(private http: HttpClient) { }

   //Metodo que envia los archivos al endpoint /upload
   upload(file: File): Observable<HttpEvent<any>>{
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      const formData: FormData = new FormData();
     formData.append('files', file);

     const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
       reportProgress: true,
       responseType: 'json',
       headers
     });
     return this.http.request(req);
   }

   //Metodo para Obtener los archivos
   getFiles(){
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )
     return this.http.get(`${this.url}/files`, {headers});
   }

   //Metodo para borrar los archivos
   deleteFile(filename: string){
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )
     return this.http.get(`${this.url}/delete/${filename}`, {headers});
   }
}
