
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from './../../../servicios/mascota.service';
import { mascotaFull } from 'src/app/interfaces/mascotaFull.interface';
import { Component, OnInit } from '@angular/core';
import { param } from 'jquery';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-mostrardatosunamascota',
  templateUrl: './mostrardatosunamascota.component.html',
  styles: [
  ]
})
export class MostrardatosunamascotaComponent implements OnInit {
  datosMascota!:mascotaFull;
  private fotoSeleccionada !: File;
  id:any;
    progreso: number=0;

  constructor(private mascotaServi:MascotaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {


    //recoge los datos de la mascotas para posteriormente mostrarlos
    //Al recargar la pagina a veces no recoge los datos asi que recargara por aqui
    if (this.datosMascota ==undefined){

      this.mascotaServi.datosMascota(JSON.parse(<string>localStorage.getItem('idMascotaEdit'))).subscribe(
        mascota => {
          this.datosMascota= mascota;

        }
      )
    }

  }

  //el metodo que al seleccionar la foto
  seleccinarFoto(event:any){
      this.fotoSeleccionada= event.target.files[0];
      //Comprobar el tipo de la foto
      //.type es del string que busca en este caso
      //si esta dentro o si encuentra alguna ocurrencia con image, sino devuelve -1
      if (this.fotoSeleccionada.type.indexOf('image') < 0) {
        Swal.fire("Error al seleccionar imagen", "Se debe seleccionar un archivo que sea una imagen", 'error');
        return ;

      }

  }

  subirFoto(){
    if (!this.fotoSeleccionada){  //si no eleccionas una foto
      Swal.fire("Error encontrado", "Dee seleccionar una foto", 'error');

    }else{//sí si selecciono una foto

    this.id=this.mascotaServi.devolverid();
    this.mascotaServi.subirFoto(this.fotoSeleccionada, this.id).subscribe(
      mascota => {
             this.datosMascota= mascota;
             Swal.fire("la foto se a añadido a la mascota correctamente", "", "success");

      }
    )

    // event => {
    //   const  total: number = event.total;
    //   if(event.type === HttpEventType.UploadProgress){
    //     this.progreso=Math.round((event.loaded/total)*100);
    //   }
    //   //this.datosMascota= mascota;
    //   Swal.fire("la foto se a añadido a la mascota correctamente", "", "success");
    // }
  }
}
  //volver
  volverListaMascota(){
    window.history.back();
  }

}
