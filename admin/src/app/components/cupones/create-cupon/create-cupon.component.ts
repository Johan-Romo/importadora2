import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NgIf } from '@angular/common';
import { CuponService } from '../../../services/cupon.service';
import { Router } from '@angular/router';

declare var iziToast: any;

@Component({
  selector: 'app-create-cupon',
  standalone: true,
  imports: [RouterLink, FormsModule, SidebarComponent, NgIf],
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit {
  public token: any;
  public cupon: any = {
    tipo: '',
  };
  public load_btn = false;

  constructor(
    private _cuponService: CuponService,
    private _router: Router
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
  }

  registro(registroForm: any): void {
    if (registroForm.valid) {
      this.load_btn = true;
      this._cuponService.registro_cupon_admin(this.cupon, this.token).subscribe(
        response => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#74c822',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Cupón Registrado'
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
            message: 'Ocurrió un error al registrar el cupón'
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
