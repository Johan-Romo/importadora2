import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { AdminService } from '../../../services/admin.service';
import { NgxTinymceModule } from 'ngx-tinymce';
import { ProductoService } from '../../../services/producto.service';
@Component({
  selector: 'app-index-producto',
  standalone: true,
  imports: [SidebarComponent, CommonModule,FormsModule, RouterModule],
  templateUrl: './index-producto.component.html',
  styleUrl: './index-producto.component.css'
})
export class IndexProductoComponent implements OnInit {
  public filtro = '';
  public token : any;
  public productos : Array<any> =[];
  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService
  ){
    this.token=localStorage.getItem('token');
  }

  ngOnInit(): void {
    this._productoService.listar_productos_admin(this.filtro, this.token).subscribe(
      response =>{
        console.log(response);
        this.productos=response.data;
      },
      error=>{
        console.log(error);
      }

    );
  }
}
