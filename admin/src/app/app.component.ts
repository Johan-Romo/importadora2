import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
     CommonModule,
     RouterOutlet,
     RouterLink,
     RouterLinkActive,
     RouterModule,
     FormsModule,
     SidebarComponent,
     LoginComponent,
     InicioComponent,
     IndexClienteComponent,
     NgbPaginationModule,
     EditClienteComponent,
     CreateProductoComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
}
