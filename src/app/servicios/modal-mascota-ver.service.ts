import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalMascotaVerService {

  //este modal es que en la lista de mascota, se observe visualmente mas agradable
  modal:boolean=false;

  constructor() { }

  abrilModal(){
    this.modal=true;
  }

  cerrarModal(){
    this.modal=false;
  }

}
