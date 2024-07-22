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
  imports: [SidebarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {
  public cliente: any = {
    genero: ''
  };

  public token: string;
  public load_btn = false;

  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router
  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {}

  registro(registroForm: any): void {
    if (registroForm.valid) {
      this.load_btn = true;
      this._clienteService.registro_cliente_admin(this.cliente, this.token).subscribe(
        response => {
          console.log(response);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#74c822',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Usuario Registrado'
          });

          this.cliente = {
            genero: '',
            nombres: '',
            apellidos: '',
            f_nacimiento: '',
            telefono: '',
            dni: '',
            email: ''
          };
          this.load_btn = false;
          this._router.navigate(['/panel/clientes']);
        },
        error => {
          console.log(error);
          this.load_btn = false;
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Ocurrió un error al registrar el usuario'
          });
        }
      );
    } else {
      this.showValidationErrors(registroForm);
    }
  }

  showValidationErrors(form: any): void {
    const controls = form.controls;
    let shownError = false;

    for (const name in controls) {
      if (controls[name].invalid && !shownError) {
        const errors = controls[name].errors;
        let errorMessage = `${name} es obligatorio`;
        
        if (errors?.['pattern']) {
          errorMessage = `${name} tiene un formato incorrecto`;
        } else if (errors?.['email']) {
          errorMessage = `${name} debe ser un correo válido`;
        }

        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: errorMessage
        });
        
        shownError = true;
      }
    }
  }
}
