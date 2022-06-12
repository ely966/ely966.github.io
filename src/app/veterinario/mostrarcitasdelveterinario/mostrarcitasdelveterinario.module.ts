import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarcitasdelveterinarioComponent } from './mostrarcitasdelveterinario/mostrarcitasdelveterinario.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    MostrarcitasdelveterinarioComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DataTablesModule,
    MatIconModule,
    RouterModule.forChild(
      [{
      path:'mostrarCitasDelVeterinario', component: MostrarcitasdelveterinarioComponent ,
    }])
  ],
  exports:[
    MostrarcitasdelveterinarioComponent
  ]
})
export class MostrarcitasdelveterinarioModule { }
