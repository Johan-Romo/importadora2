import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { NgxTinymceModule } from 'ngx-tinymce';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router'; // Importa RouterModule
import { GLOBAL } from '../../services/GLOBAL';
import { v4 as uuidv4 } from 'uuid';

declare var iziToast : any;
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-config',
  standalone: true,
  imports: [SidebarComponent, CommonModule,FormsModule, RouterModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent implements OnInit 
{
  public token: any;
  public config :any={};
  public titulo_cat='';
  public icono_cat='';
  public imgSelect : String | ArrayBuffer | null |undefined; 
  public url:any;
  public file: File | undefined;
  constructor(
    private _adminService : AdminService
  ){
    this.token=localStorage.getItem('token'); 
    this.url = GLOBAL.url;
    this._adminService.obtener_config_admin(this.token).subscribe(
        response =>{
          console.log(response);
          this.config = response.data
          this.imgSelect=this.url+'obtener_logo/'+this.config.logo;
        }, error =>{
          console.log(error);
        }
      
    );
  }

  ngOnInit(): void {
    
  }

  agregar_cat() {
    if (this.titulo_cat && this.icono_cat) {
   
        this.config.categorias.push({
            titulo: this.titulo_cat,
            icono: this.icono_cat,
            _id: uuidv4()
        });

        this.titulo_cat='';
        this.icono_cat='';
    } else {
        iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Debe ingresar un titulo e icono para la categoria'
        });
    }
}

actualizar(confForm:any) {
  if (confForm.valid) {
      let data = {
          titulo: confForm.value.titulo,
          serie: confForm.value.serie,
          correlativo: confForm.value.correlativo,
          categorias: this.config.categorias,
          logo: this.file
      };

      console.log(data);

      this._adminService.actualizar_config_admin("669ee64bfee7d9af6a237955",data, this.token).subscribe(
          response => {
              console.log(response);
              iziToast.show({
                title: 'SUCESS',
                titleColor: '#74c822',
                color: '#FFF',
                class: 'text-succes',
                position: 'topRight',
                message: 'Cambio Registrado'
              });
          }
      );
  } else {
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Complete correctamente el formulario'
      });
  }
}
fileChangeEvent(event:any){
  var file: any;
    if (event.target.files && event.target.files[0]){
       file = <File>event.target.files[0];

    } else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay una imagen de envio'
      });
    }

    if (file.size <=  4000000){
        if (file.type== 'image/png' || file.type == 'image/jpg' || file.type == 'image/webp' || file.type == 'image/gif' || file.type == 'image/jpeg' ){
            const reader = new FileReader();
            reader.onload=e=>this.imgSelect = reader.result;
            $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
            $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');

            reader.readAsDataURL(file);
            $('#imput-portada').text(file.name);
            this.file = file;
        }else{
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Formato de imagen no permitido'
          });

            this.imgSelect = 'assets/img/01.jpg'
            this.file=undefined;
        }
      
    }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'La imagen no puede superar los 4mb'
      });
      this.imgSelect = 'assets/img/01.jpg'
      this.file=undefined;
    }
      console.log(this.file);
    }

    ngDoCheck():void{
      $('.cs-file-drop-preview').html("<img src=" + this.imgSelect+">");
    }


    eliminar_categoria(idx:any){
      this.config.categorias.splice(idx,1);

    }
  
}

