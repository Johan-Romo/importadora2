import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Importa RouterModule
import { ClienteService } from '../../../services/cliente.service';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router'; // Importa RouterModule

declare var iziToast: any;

@Component({
  selector: 'app-edit-cliente',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {
  public cliente: any = {};
  public id: any;
  public token: any;
  public load_btn = false;
  public load_data = true;

  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._clienteService.obtener_cliente_admin(this.id, this.token).subscribe(
          response => {
            console.log(response);
            if (response.data == undefined) {
              this.cliente = response.undefined;
              this.load_data = false;
            } else {
              this.cliente = response.data;
              this.load_data = false;
            }
          }, error => {
            console.log(error);
          }
        )
      }
    )
  }

  actualizar(updateForm: any): void {
    if (updateForm.valid) {
      this.load_btn = true;
      this._clienteService.actualizar_cliente_admin(this.id, this.cliente, this.token).subscribe(
        response => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#74c822',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Usuario Modificado'
          });
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
            message: 'Ocurrió un error al modificar el usuario'
          });
        }
      );
    } else {
      this.showValidationErrors(updateForm);
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
