import { MostrardatosunamascotaModule } from './mostrardatosunamascota/mostrardatosunamascota.module';

import { EditarmascotaModule } from './editarmascota/editarmascota.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascotaComponent } from './mascota/mascota.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    MascotaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    EditarmascotaModule,
    RouterModule.forChild([
      {path:'addM',
      loadChildren: () => import('./crear-mascota/crear-mascota.module').then(m=> m.CrearMascotaModule),
    },
    {path:'mostrarM',
    loadChildren: () => import('./mostrar-mascota/mostrar-mascota.module').then(m=> m.MostrarMascotaModule),
  },
    {path:'editarM',
      loadChildren: () => import('./editarmascota/editarmascota.module').then(m=> m.EditarmascotaModule),
  },
  {path:'mostrarDatosunamascota',
  loadChildren: () => import('./mostrardatosunamascota/mostrardatosunamascota.module').then(m=> m.MostrardatosunamascotaModule),
},
    ])
  ],
  exports: [
    MascotaComponent
  ]
})
export class MascotaModule { }
