import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  public userName: string = '';

  constructor(private _adminService: AdminService) {}

  ngOnInit(): void {
    const user = this._adminService.getUserFromToken();
    if (user) {
      this.userName = user.nombres || 'Usuario';  // Asume que el nombre del usuario está en la propiedad 'nombres'
    }
  }
}
