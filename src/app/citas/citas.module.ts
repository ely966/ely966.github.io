
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasComponent } from './citas/citas.component';
import { FormsModule } from '@angular/forms';

import { EditarcitaComponent } from './editarcita/editarcita/editarcita.component';
import { MostrarcitasallModule } from './mostrarcitasall/mostrarcitasall.module';
import { CrearCitaModule } from './crear-cita/crear-cita.module';
import { EditarcitaModule } from './editarcita/editarcita.module';




@NgModule({
  declarations: [
    CitasComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    CrearCitaModule,
    EditarcitaModule,
    MostrarcitasallModule,
    FormsModule,
    RouterModule.forChild([ //A cada modulo
      {//Crear citas veterinarias
        path:'crear',
      loadChildren: () => import('./crear-cita/crear-cita.module').then(m=> m.CrearCitaModule),
      },
      {//mostrar ciats veterinarias
        path:'mostrarC',
      loadChildren: () => import('./mostrarcitasall/mostrarcitasall.module').then(m=> m.MostrarcitasallModule),
      },
       {//mostrar ciats veterinarias
        path:'editarC',
      loadChildren: () => import('./editarcita/editarcita.module').then(m=> m.EditarcitaModule),
      },

      {path:'editar', component: EditarcitaComponent}
    ])


  ],
  exports: [
    CitasComponent
  ]
})
export class CitasModule { }
