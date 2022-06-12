import { CalendariocitaclienteModule } from './calendariocitacliente/calendariocitacliente.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    RouterModule.forChild([ //A cada modulo
    {//calendario de las citas del cliente
      path:'calendariocitascliente',
    loadChildren: () => import('./calendariocitacliente/calendariocitacliente.module').then(m=> m.CalendariocitaclienteModule),
    }
  ])
],
exports: [

]
})
export class CalendarioModule { }
