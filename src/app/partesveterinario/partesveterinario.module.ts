import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParteveterinarioComponent } from './parteveterinario/parteveterinario.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ParteveterinarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path:'opcionmenuVeterinario',
          loadChildren: () => import('./menuveterinario/menuveterinario.module').then(m=> m.MenuveterinarioModule),
        },
        {
          path:'opcionnotificaradmin',
          loadChildren: () => import('./notificaradmin/notificaradmin.module').then(m=> m.NotificaradminModule),
        }
      ]
    ),
    FormsModule,
  ],
  exports: [
    ParteveterinarioComponent
  ]
})
export class PartesveterinarioModule { }
