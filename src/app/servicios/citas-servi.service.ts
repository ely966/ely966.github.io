import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from '../interfaces/citaFull.interface';
import { CitaEdi } from '../interfaces/citaFullEditar.interface';
import { Cita2 } from '../interfaces/citaNoObj.interface';
import { credenCita } from '../interfaces/credencialCita.interface';
import { mascotaFull } from '../interfaces/mascotaFull.interface';

@Injectable({
  providedIn: 'root'
})
export class CitasServiService {
  url= "https://proyectodawveterinaria.herokuapp.com/";
  token =localStorage.getItem("tokenGuardado");
  citaEditar!:Cita2;
  idmascota!:number;
  MascotaCompleta!:mascotaFull;
  roleUsuario:String="ninguno";


  constructor(private httpAu: HttpClient) { }

  public addCita( cita:credenCita ):Observable<any>{
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpAu.post(this.url +'cliente/mascota/'+this.idmascota + '/cita',cita , { headers});

  }


  /**Muestra las citas del cliente que este logeado**/
  public mostrarCitasCliente(): Observable<any>{
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )


      return this.httpAu.get(this.url +'cliente/cita' , { headers});
  }

  /**Metodo que permite editar la cita seleccionada si el usuario logeado es CLIENTE*/
  public editarCita( cita:CitaEdi, roleUsuario:String ):Observable<any>{

    if (roleUsuario == "CLIENTE"){
      const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
      const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpAu.put(this.url +'cliente/mascota/'+ this.idmascota +'/cita/'+cita.id,cita , { headers});
    }
    else {
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpAu.put(this.url +'veterinario/citas/'+cita.id,cita , { headers});
    }
  }
   /**Metodo que permite editar la cita seleccionada si el usuario logeado es CLIENTE*/
   public editarCitaVeterinario( cita:CitaEdi,  ):Observable<any>{
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpAu.put(this.url +'veterinario/citas/'+cita.id,cita , { headers});

  }


  //extraer nombre de la pet
  public extraerNombrePet():Observable<any>{
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )

      return this.httpAu.get(this.url +'cliente/mascota' , { headers});
  }

  //borrar

  public borrarCitaId(id:any, idMascota:any): Observable<any>{
    const token: string = JSON.parse(<string>localStorage.getItem('token'))['jwt-token'];
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}` )


      return this.httpAu.delete(this.url +'cliente/mascota/' + idMascota +'/cita/'+id,{ headers});
  }


  public guardarCitaparaEditar(citaParaEditar:Cita2){
    this.citaEditar=citaParaEditar;
    this.idmascota=citaParaEditar.pet.id;

  }

  public recogerCitaEditar():Cita2{
    return this.citaEditar;
  }



  //guardar la mascota que sera de la cita en el momento.
  public guardarPet(pedId:any){
    this.idmascota=pedId;


  }
  public recogerPet():number{
    return this.idmascota;
  }
}
