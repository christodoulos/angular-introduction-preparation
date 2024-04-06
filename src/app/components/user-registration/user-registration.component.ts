import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { User } from 'src/app/shared/interfaces/mongo-backend';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css',
})
export class UserRegistrationComponent implements OnInit {
  userService = inject(UserService);

  registrationStatus: { success: boolean; message: string } = {
    success: false,
    message: 'Not attempted yet.',
  };

  form = new FormGroup(
    {
      givenName: new FormControl('', Validators.required),
      surName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    },
    this.passwordConfirmsPasswordValidator,
  );

  ngOnInit(): void {}

  passwordConfirmsPasswordValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return {};
  }

  onSubmit(value: any) {
    console.log(value);
    const user = this.form.value as User;
    delete user['confirmPassword'];

    this.userService.registerUser(user).subscribe({
      next: (response) => {
        console.log('User registered', response.msg);
        this.registrationStatus = { success: true, message: response.msg };
      },
      error: (response) => {
        const message = response.error.msg;
        console.error('Error registering user:', message);
        this.registrationStatus = { success: false, message };
      },
    });
  }

  registerAnother() {
    this.form.reset();
    this.registrationStatus = { success: false, message: 'Not attempted yet.' };
  }

  check_duplicate_email() {
    const email = this.form.get('email').value;
    this.userService.check_duplicate_email(email).subscribe({
      next: (response) => {
        console.log(response.msg);
        this.form.get('email').setErrors(null);
      },
      error: (response) => {
        const message = response.error.msg;
        console.error(message);
        this.form.get('email').setErrors({ duplicateEmail: true });
      },
    });
  }
}
