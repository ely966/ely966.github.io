import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginapublicaComponent } from './paginapublica/paginapublica.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [


    PaginapublicaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(
      [{
      path:'publicapag', component: PaginapublicaComponent,
    },
    {
      path:'publicap',
      loadChildren: () => import('./sobreaplicacion/sobreaplicacion.module').then(m=> m.SobreaplicacionModule),

    }])
  ],
  exports: [

  ]
})
export class PaginapublicaModule { }
