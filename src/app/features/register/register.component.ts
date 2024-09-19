import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router) {}
  username: string = '';
  email: string = '';
  password: string = '';

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onRegister() {

    console.log('Registro exitoso!');

    this.goToLogin();
  }

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

  handleUsernameInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.username = inputElement.value;
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
