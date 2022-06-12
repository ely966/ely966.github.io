import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarcitasallComponent } from './mostrarcitasall/mostrarcitasall.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MostrarcitasallComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatIconModule,
    DataTablesModule,
    RouterModule.forChild([
      {path:'mostrarCita', component: MostrarcitasallComponent}
    ]),
  ],
  exports:[
    MostrarcitasallComponent
  ]
})
export class MostrarcitasallModule { }
