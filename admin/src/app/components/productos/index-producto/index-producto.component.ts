import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { AdminService } from '../../../services/admin.service';
import { NgxTinymceModule } from 'ngx-tinymce';
import { ProductoService } from '../../../services/producto.service';
import { GLOBAL } from '../../../services/GLOBAL';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
declare var iziToast: any;

@Component({
  selector: 'app-index-producto',
  standalone: true,
  imports: [SidebarComponent, CommonModule,FormsModule, RouterModule,NgbPaginationModule],
  templateUrl: './index-producto.component.html',
  styleUrl: './index-producto.component.css'
})
export class IndexProductoComponent implements OnInit {
  public page = 1;
  public pageSize =20;
  public filtro = '';
  public token : any;
  public productos : Array<any> =[];
  public url: any;
  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService
  ){
    this.token=localStorage.getItem('token');
    this.url=GLOBAL.url;
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
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

  filtrar(){
    if (this.filtro){
      this._productoService.listar_productos_admin(this.filtro, this.token).subscribe(
        response =>{
          console.log(response);
          this.productos=response.data;
        },
        error=>{
          console.log(error);
        }
  
      );
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese un filtro para buscar'
      });
    }
  }

  resetear(){
       this.filtro='';
      this.init_data();
  }
}
