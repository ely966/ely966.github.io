import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendariocitaclienteComponent } from './calendariocitacliente/calendariocitacliente.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
/*Calendario */
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
FullCalendarModule.registerPlugins([interactionPlugin,dayGridPlugin]);
import esLocale from '@fullcalendar/core/locales/es';
[esLocale]
import { registerLocaleData } from '@angular/common';
 // importar locales
 import localePy from '@angular/common/locales/es-PY';
 import localePt from '@angular/common/locales/pt';
 import localeEn from '@angular/common/locales/en';
 import localeEsAr from '@angular/common/locales/es-AR';
import { MatIconModule } from '@angular/material/icon';
 // registrar los locales con el nombre que quieras utilizar a la hora de proveer
 registerLocaleData(localePy, 'es');
 registerLocaleData(localePt, 'pt');
 registerLocaleData(localeEn, 'en')
 registerLocaleData(localeEsAr, 'es-Ar');


@NgModule({
  declarations: [
    CalendariocitaclienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule,
    MatIconModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule.forChild([
      {path:'calendriocitaclientee', component: CalendariocitaclienteComponent}
    ])
  ],
  exports:[
    CalendariocitaclienteComponent
  ]
})
export class CalendariocitaclienteModule { }
