import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/shared/interfaces/mongo-backend';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  userService = inject(UserService);
  router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    const credentials = this.form.value as Credentials;
    this.userService.loginUser(credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.userService.user.set({
          fullname: 'User Name',
          email: credentials.email,
        });
        this.router.navigate(['restricted-content-example']);
      },
      error: (error) => {
        console.error('Login error:', error);
      },
    });
  }
}
