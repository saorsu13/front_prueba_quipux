import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private apiService: ApiService) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToPlaylist() {
    this.router.navigate(['/playlist']);
  }

  onLogin() {
    this.apiService.login(this.email, this.password).subscribe(
      response => {
        console.log('Inicio de sesión exitoso!', response);

        const token = response.split(' ')[1];
        localStorage.setItem('jwt', token);

        this.router.navigate(['/playlist']);
      },
      error => {
        console.error('Error en el inicio de sesión', error);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    );
  }

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

  handleEmailInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.email = inputElement.value;
  }

  handlePasswordInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.password = inputElement.value;
  }
}
