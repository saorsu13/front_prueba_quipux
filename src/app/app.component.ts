import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba-angular';

  constructor(private apiService: ApiService, private router: Router) {}

  logout() {
    this.apiService.logout();
    this.router.navigate(['/login']);
  }
  onLogin(username: string, password: string) {
    this.apiService.login(username, password).subscribe(() => {
      this.router.navigate(['/playlist']);
    }, error => {
      console.error('Error al iniciar sesión:', error);
    });
  }
}
