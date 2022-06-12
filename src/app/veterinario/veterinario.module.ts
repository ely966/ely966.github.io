import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtegerAdminGuard } from '../proteger/proteger-admin.guard';
import { ProtegerComponent } from '../proteger/proteger/proteger.component';
import { RouterModule } from '@angular/router';
import { VeterinarioComponent } from './veterinario/veterinario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MostrarcitasdelveterinarioModule } from './mostrarcitasdelveterinario/mostrarcitasdelveterinario.module';
import { ProtegerVeterinarioGuard } from '../proteger/proteger-veterinario.guard';



@NgModule({
  declarations: [
    VeterinarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [
        {//Registrar veterinario. Administrador es quien añaade veterinario
          path:'opcionVeterinarioAdd',canActivateChild:[ProtegerComponent, ProtegerAdminGuard],
          loadChildren: () => import('./addveterinario/addveterinario.module').then(m=> m.AddveterinarioModule),
        },
        {//editar veterinario, es decir el veterinario logeado puede editar sus datos
          path:'opcionVeterinarioEditar', canActivateChild:[ProtegerComponent, ProtegerVeterinarioGuard],
          loadChildren: () => import('./editarveterinario/editarveterinario.module').then(m=> m.EditarveterinarioModule),
        },
        {
          path:'opcionVeterinarioMostrar',canActivateChild:[ProtegerComponent],
          loadChildren: () => import('./mostrarveterinario/mostrarveterinario.module').then(m=> m.MostrarveterinarioModule),
        },
        {
          path:'opcionMostrarCitasVeterinario',canActivateChild:[ProtegerComponent, ProtegerVeterinarioGuard],
          loadChildren: () => import('./mostrarcitasdelveterinario/mostrarcitasdelveterinario.module').then(m=> MostrarcitasdelveterinarioModule),
        }
  ])
],
exports:[
  VeterinarioComponent
]
})
export class VeterinarioModule { }
