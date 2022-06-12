import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParteadministradorComponent } from './parteadministrador/parteadministrador.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ParteadministradorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path:'menua',
          loadChildren: () => import('./menuadmin/menuadmin.module').then(m=>m.MenuveterinarioModule)
        }
      ]
    )


  ],
  exports:[
    ParteadministradorComponent
  ]
})
export class ParteadministradorModule { }
