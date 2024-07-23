import { Component, OnInit } from '@angular/core';
import { CuponService } from '../../../services/cupon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

declare var iziToast: any;

@Component({
  selector: 'app-update-cupon',
  standalone: true,
  imports: [SidebarComponent, FormsModule, RouterLink, NgIf],
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.css']
})
export class UpdateCuponComponent implements OnInit {
  public token: any;
  public cupon: any = {
    tipo: '',
  };
  public load_btn = false;
  public id: any;
  public load_data = true;

  constructor(
    private _cuponService: CuponService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        console.log(this.id);

        this._cuponService.obtener_cupon_admin(this.id, this.token).subscribe(
          response => {
            if (response.data == undefined) {
              this.cupon = undefined;
              this.load_data = false;
            } else {
              this.cupon = response.data;
              this.load_data = false;
            }
            console.log(this.cupon);
          }
        );
      }
    );
  }

  actualizar(actualizarForm: any): void {
    if (actualizarForm.valid) {
      this.load_btn = true;
      this._cuponService.actualizar_cupon_admin(this.id, this.cupon, this.token).subscribe(
        response => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#74c822',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Cupón Actualizado'
          });
          this.load_btn = false;
          this._router.navigate(['/panel/cupones']);
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
            message: 'Ocurrió un error al actualizar el cupón'
          });
        }
      );
    } else {
      this.showValidationErrors(actualizarForm);
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
        } else if (errors?.['min']) {
          errorMessage = `${name} debe ser un valor mínimo`;
        } else if (errors?.['max']) {
          errorMessage = `${name} debe ser un valor máximo`;
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
