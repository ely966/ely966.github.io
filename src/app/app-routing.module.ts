import { FuncionescomunesModule } from './funcionescomunes/funcionescomunes.module';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente/cliente.component';
import { HomeComponent } from './home/home/home.component';

import { ProtegerComponent } from './proteger/proteger/proteger.component';
import { ProtegerAdminGuard } from './proteger/proteger-admin.guard';
import { ClienteguardianGuard } from './proteger/clienteguardian.guard';
import { ProtegerVeterinarioGuard } from './proteger/proteger-veterinario.guard';



const routes: Routes = [
  //*Rutas*//

  {
    path: '',component: HomeComponent,
  },
  {
    path: 'home',component: HomeComponent
  },
  {//Cliente=>Modales de cliente
    path:'cliente',
  loadChildren: () => import('./cliente/cliente.module').then(m=> m.ClienteModule),

  },

  { //Citas=>Modales de citas
    path:'citas', canActivateChild:[ProtegerComponent],
    loadChildren: () => import('./citas/citas.module').then(m=> m.CitasModule),
  },
  {//Mascota=>Modales de mascota
    path:'mascota', canActivateChild:[ProtegerComponent],
    loadChildren: () => import('./mascota/mascota.module').then(m=>m.MascotaModule)

  },
  {//Funciones comunes en todos los tipos de usuario. Editar tus datos por ejemplo
    path:'funcionesComunes', canActivateChild:[ProtegerComponent],
    loadChildren: () => import('./funcionescomunes/funcionescomunes.module').then(m=>m.FuncionescomunesModule)


},
  //Menu cliente
  {//Pagina User=>Menu cliente
    path:'paginasUser', canActivateChild:[ProtegerComponent, ClienteguardianGuard],
    loadChildren: () => import('./paginas-usuario/paginas-usuario.module').then(m=>m.PaginasUsuarioModule)
    //canActivate:[ProtegerComponent]s

  },
   {//Pagina User=>Modales de menu
    path:'parteadm', canActivateChild:[ProtegerComponent, ProtegerAdminGuard],
    loadChildren: () => import('./parteadministrador/parteadministrador.module').then(m=>m.ParteadministradorModule)
    //canActivate:[ProtegerComponent]s

  },
  {//Administrador =>Modales de administrador
      path:'admin', canActivateChild:[ProtegerComponent, ProtegerAdminGuard],
      loadChildren: () => import('./administrador/administrador.module').then(m=>m.AdministradorModule)
      //canActivate:[ProtegerComponent]s

  },
  {//Administrador =>OtrasfuncionesdeadminModule como que cmabia la contraseña de otro usuarios
    path:'funcionesadmin', canActivateChild:[ProtegerComponent, ProtegerAdminGuard],
    loadChildren: () => import('./otrasfuncionesdeadmin/otrasfuncionesdeadmin.module').then(m=>m.OtrasfuncionesdeadminModule)
    //canActivate:[ProtegerComponent]s

},
  {// veterinario=>Modales de veterinario
        path:'veterinario', canActivateChild:[ProtegerComponent],
        loadChildren: () => import('./veterinario/veterinario.module').then(m=>m.VeterinarioModule)
        //canActivate:[ProtegerComponent]s

  },
  {//Pagina veterinario=>Menu veterinario
    path:'veterinariopag', canActivateChild:[ProtegerComponent, ProtegerVeterinarioGuard],
    loadChildren: () => import('./partesveterinario/partesveterinario.module').then(m=>m.PartesveterinarioModule)
    //canActivate:[ProtegerComponent]s

},
 {//Calendario donde se muetsra las citas
  path:'calendario', canActivateChild:[ProtegerComponent],
  loadChildren: () => import('./calendario/calendario.module').then(m=>m.CalendarioModule)
  //canActivate:[ProtegerComponent]s

},

    {//PaginaPublica =>
      path:'paginasPublic',
      loadChildren: () => import('./paginapublica/paginapublica.module').then(m=>m.PaginapublicaModule)
      //canActivate:[ProtegerComponent]s

    },
  {
    path: '**',
    redirectTo: 'home'
  },
  //pagina de error
 // {
   // path:
 // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
