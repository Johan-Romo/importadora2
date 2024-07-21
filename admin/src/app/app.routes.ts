import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { adminGuard } from './guards/admin.guard';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { UpdateProductoComponent } from './components/productos/update-producto/update-producto.component';
export const routes: Routes = [

    {path:'', redirectTo: 'inicio',pathMatch: 'full'},
    { path: 'inicio', component: InicioComponent,canActivate:[adminGuard] },
    { path: 'login', component: LoginComponent },
    {path: 'panel', children:[
        {path: 'clientes', component: IndexClienteComponent, canActivate: [adminGuard]},
        {path: 'clientes/registro', component: CreateClienteComponent, canActivate: [adminGuard]},
        {path: 'clientes/:id', component: EditClienteComponent, canActivate: [adminGuard]},
        {path: 'productos/registro', component: CreateProductoComponent, canActivate: [adminGuard]},
        {path: 'productos', component: IndexProductoComponent, canActivate: [adminGuard]},
        {path: 'productos/:id', component: UpdateProductoComponent, canActivate: [adminGuard]},
    ]}
];
