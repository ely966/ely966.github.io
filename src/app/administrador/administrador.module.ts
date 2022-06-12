import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from './administrador/administrador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProtegerComponent } from '../proteger/proteger/proteger.component';
import { ProtegerAdminGuard } from '../proteger/proteger-admin.guard';



@NgModule({
  declarations: [
    AdministradorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(
      [
        {//Registrar administrador
          path:'opcionAdminAdd',canActivateChild:[ProtegerComponent, ProtegerAdminGuard],
          loadChildren: () => import('./addadmin/addadmin.module').then(m=> m.AddadminModule),
        },
        {//editar administrador, es decir editar los datos del administrador logeado
          path:'opcionAdminEditar', canActivateChild:[ProtegerComponent, ProtegerAdminGuard],
          loadChildren: () => import('./editadmin/editadmin.module').then(m=> m.EditadminModule),
        },
        {
          path:'opcionAdminMostrar',
          loadChildren: () => import('./mostraradmin/mostraradmin.module').then(m=> m.MostraradminModule),
        },
      ]
    )
  ],
  exports:[
    AdministradorComponent
  ]
})
export class AdministradorModule { }
