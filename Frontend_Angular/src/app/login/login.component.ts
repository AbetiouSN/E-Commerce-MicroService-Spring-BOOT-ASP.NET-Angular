import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../Services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../Models/customer.model";
import {User} from "../Models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  authenticatedUser!: User | null;
  errorMessage: string = '';
  role: string | undefined = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.authenticatedUser = this.authService.currentUser();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          console.log('Login successful', response);
          this.role = this.authService.currentUser()?.role;
          console.log(this.role);
          if (this.role === 'ADMIN') {
            this.router.navigate(['/home']);
          } else if (this.role === 'USER') {
            this.router.navigate(['/products']);
          }
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Email ou mot de passe incorrect.';
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }


}
