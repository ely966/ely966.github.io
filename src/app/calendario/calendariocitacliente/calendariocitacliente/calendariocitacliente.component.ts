import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/core';
import { HttpClient } from '@angular/common/http';
import { CitasServiService } from 'src/app/servicios/citas-servi.service';
import { Cita2 } from 'src/app/interfaces/citaNoObj.interface';
import { formatDate } from '@angular/common';
import interactionPlugin from '@fullcalendar/interaction';
//Esto permite que el calendario sea en español:
import esLocale from '@fullcalendar/core/locales/es';
import Swal from 'sweetalert2';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { VeterinarioserviService } from 'src/app/servicios/veterinarioservi.service';
import { AuthService } from 'src/app/auth/auth.service';



  const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };


@Component({
  selector: 'app-calendariocitacliente',
  templateUrl: './calendariocitacliente.component.html',
  styles: [

  ]
})


export class CalendariocitaclienteComponent implements OnInit {

/*Variables*/
  /*Para poder recoger el event*/
  event:any;
  /*Recoger cada parte de la fecha. dia, mes y año*/
  dia:number=0;
  mes:number=0;
  year:number=0;
  /*Aqui guardaremos todos los eventos*/
  Events: any[] = [];
  //recogemos als citas del cliente
  citas:Cita2[]= new Array();
  //para lugeo recorrer las citas y hacer evento
  i:number=0;
  /*ROLE del usuario*/
  role:string="ninguno";
  /*====================================================================================*/
  /*Opciones del calendario*/
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true
  };
  /*====================================================================================*/


  constructor(private citaServi:CitasServiService, private authServ: AuthService, private veterservi:VeterinarioserviService, private httpClient: HttpClient) {}


  /*====================================================================================*/

  /*Iniciar la página se mostrara*/
  ngOnInit(): void {
        /*Para que le dé tiempo a cargar a la página, msotramos notificaciónd e carga*/
        this.cargaFuncion();
        /*Recogemos el role del usuario*/
        this.role=this.authServ.getRole();

        //recogemos las citas , segun el rol del usuario
        /*Si el usuario tiene un role de cliente*/
        if (this.role == "CLIENTE"){
          /*recogemos las citas del cliente*/
          this.citaServi.mostrarCitasCliente().subscribe(
          datoCitas=>{

            this.citas=datoCitas;

          });
        }else if(this.role == "VETERINARIO"){
          /*recogemos las citas del cliente*/
          this.veterservi.mostrarcitasdelveterinario().subscribe(
            citasDelVeterinario=>{
              this.citas=citasDelVeterinario;
            },
            error => {//si hay algún error
              //notificación de error
                Swal.fire({icon: 'error',
                title:'Error',
                text: error.message})
                return;

            }
          );

        }

  /*=========================*/
          /*Cada un tiempo lo comprueba, que recorrer las citas y realizar los eventos*/
          setTimeout(() => {
            //Recorremos las citas del cliente.
            for(this.i=0; this.i< this.citas.length;this.i=this.i+1){


              //recogemos la fecha d ela cita y dividimos, el dia, el mes y el año
              this.dia=parseInt(formatDate(this.citas[this.i].fecha,'d','es'));//recogemos el dia de la fecha de la cita
              this.mes=parseInt(formatDate(this.citas[this.i].fecha,'M','es'));//recogemos el mes de la fecha de la cita
              this.year=parseInt(formatDate(this.citas[this.i].fecha,'yyyy','es')); //recogemos el año de la fecha de la cita

                //ir creando por cita, un evento con los datos de la cita
                this.event= {
                  title: this.citas[this.i].hora + "-" +this.citas[this.i].motivo,
                    start: new Date( this.year,this.mes-1,this.dia), //restamos uno en mes, porque de por si es como un array y da un mes extra por defecto.
                    description:"<h3>La cita consiste con el motivo de : " + this.citas[this.i].motivo //descripcion de la cita
                    + "</br><hr> A las "+ this.citas[this.i].hora + " de la fecha " +this.citas[this.i].fecha
                    + "</br>.<hr> La mascota es "+ this.citas[this.i].pet.nombre +" con id " +this.citas[this.i].pet.id + "</h3>" ,

                    //defaultTimedEventDuration: '00:30:00',
                    //forceEventDuration: true,
                  }

                  //Guardar el evento,en un array de eventos
                  this.Events.push(this.event);
            }


          //Donde declaro opciones del calendario. Masconcretamente, añadirle los eventos
          this.calendarOptions = {
              initialView: 'dayGridMonth',
              plugins: [ interactionPlugin ],

              //dateClick: this.onDateClick.bind(this),
              //coloco los eventos
              events:
                  this.Events,
                  locales: [esLocale],//cambia el idioma del calendario, a español
                  //evento al clikear una cita/fecha
                  contentHeight: 700,
                  eventClick: function(event) {

                      //window.open();
                      Swal.fire({
                        title: '<strong>'+event.event.title +'</strong>',
                        icon: 'info',
                        html:
                          '<br>' +event.event._def.extendedProps['description']
                          ,
                        showCloseButton: true,
                      })

                  },
                    //pulsar en el dia
                    //dateClick: this.mostrarDatoCitaSleccionada.bind(this),
                  //   dateClick: function(info) {
                  //   alert('Clicked on: ' + info.dateStr);
                  //   alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                  //   alert('Current view: ' + info.view.type);
                  //   // change the day's background color just for fun
                  //   info.dayEl.style.backgroundColor = 'red';
                  // },
          }
        }, 2500);


  }

/*====================================================================================*/

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  viewDate: Date = new Date();

  mostrarDatoCitaSleccionada(arg: any) {
    alert('date click! ' + arg.dateStr)
    console.log("a");

  }




/*===========================================================================*/

//Volver al menu cliente//
volverMenu(){
  window.history.back();
}

/*===========================================================================*/
  //Ventana de carga. Mientras carag de una página se muetsre este ventana
 /*Ventana de carga al vovler al menu*/
 cargarRegresar(){
  Swal.fire({title:'Por favor, espere',
  timer: 2070})
  Swal.showLoading()
}
//Ventana de carga al realizar una funcion como reguistrar, borrar, o editar
cargaFuncion(){
  Swal.fire({title:'Por favor, espere',
  timer: 2190})
  Swal.showLoading()
}
}





  //datepipe=transform(this.citas[this.i].fecha,'yyy,MM,dd');
            //this.fechasCitas=formatDate(this.citas[this.i].fecha,'yyy,MM,dd','es-Ar');

//fecha en string
    // setTimeout(() => {
    //   return this.httpClient
    //     .get('http://localhost:8888/event.php')
    //     .subscribe((res: any) => {
    //       this.Events.push(res);
    //       console.log(this.Events);
    //     });
    // }, 2200);
  ///terinafor
          // this.event= {
          //   initialView: 'dayGridMonth'+this.i,
          //   //dateClick: this.onDateClick.bind(this),
          //   events: [
          //     { title: 'All Day Event',
          //     start: new Date( this.year,this.mes,this.dia),
          //     defaultTimedEventDuration: '00:30:00',
          //     forceEventDuration: true,
          //   },],


          // }


          // this.calendarOptions = {
          //   initialView: 'dayGridMonth'+this.i,
          //   //dateClick: this.onDateClick.bind(this),
          //   events: [
          //         { title: 'All Day Event',
          //          start: new Date( this.year,this.mes,this.dia),
          //          defaultTimedEventDuration: '00:30:00',
          //         forceEventDuration: true,
          //       },]


          // this.Events.push(this.event);
          //   this.calendarOptions = {
          //     initialView: 'dayGridMonth'+this.i,
          //     //dateClick: this.onDateClick.bind(this),
          //     events:
          //       this.Events[this.even]



          //   }
          //   this.even=this.even+1;

          // console.log(this.Events);

//solo hace uno, debe recoger el array events
//solo hace uno, debe recoger el array events
      // this.calendarOptions = {
      //   initialView: 'dayGridMonth'+this.i,
      //   //dateClick: this.onDateClick.bind(this),
      //   events: [
      //     { title: 'All Day Event',
      //     start: new Date( this.year,this.mes,this.dia),
      //     defaultTimedEventDuration: '00:30:00',
      //     forceEventDuration: true, },],


      // }
