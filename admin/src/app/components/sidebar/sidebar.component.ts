import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private _adminService: AdminService, private _router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    this._router.navigate(['/login']);
  }
}
