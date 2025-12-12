import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'] 
})
export class sidebarComponent implements OnInit {

  isSidebarOpen = false;
  userName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userJson = localStorage.getItem('user_data'); 
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.userName = user.nombre || user.name || 'Usuario';
      } catch (e) {
        this.userName = 'Usuario';
      }
    }
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  closeSidebar() {
    this.isSidebarOpen = false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data'); 
    this.router.navigate(['/auth/login']);
  }
}