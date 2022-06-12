import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
    <home-component (valueResponse)="recibiRespuesta($event)" [value]="Hello World!" ></home-component> `
})
export class AppComponent {
  title = 'veterinariaProyecto';
  mensajeHijo:string
  //faCoffee = faCoffee;
  | undefined

  onMensajeHijo(mensaje: string | undefined) {
    this.mensajeHijo=mensaje;
   }
  //faCoffee = faCoffee;
}
