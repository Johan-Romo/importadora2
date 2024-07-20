import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { ClienteService } from '../../../services/cliente.service';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router'; // Importa RouterModule

declare var iziToast: any;
@Component({
  selector: 'app-create-cliente',
  standalone: true,
  imports: [SidebarComponent, CommonModule,FormsModule, RouterModule],
  templateUrl: './create-cliente.component.html',
  styleUrl: './create-cliente.component.css'
})
export class CreateClienteComponent implements OnInit {
  public cliente: any = {
    genero: ''
  };

  public token;
  constructor(
    private _clienteService:ClienteService,
    private _adminService:AdminService,
    private _router: Router
  ) { 
    this.token=this._adminService.getToken();
  }
  
  ngOnInit(): void {
  }
  
  registro(registroForm: any) {
    if (registroForm.valid) {
      console.log(this.cliente);
      this._clienteService.registro_cliente_admin(this.cliente,this.token).subscribe(
        response=>{
          console.log(response);
          iziToast.show({
            title: 'SUCESS',
            titleColor: '#74c822',
            color: '#FFF',
            class: 'text-succes',
            position: 'topRight',
            message: 'Usuario Registrado'
          });

          this.cliente={
            genero:'',
            nombre: '',
            apellidos: '',
            f_nacimiento: '',
            telefono: '',
            dni:'',
            email:''
          }

          this._router.navigate(['/panel/clientes'])
        },
        error=>{
          console.log(error);
        }


      );
      
      
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
  }
}