import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../Services/auth.service";
import {Customer} from "../Models/customer.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupForm: FormGroup;
  formInvalid: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder,private route: ActivatedRoute, private router: Router) {
    this.signupForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      cne: ['',Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
onSubmit(){
    if(this.signupForm.valid){
      const newCustomer: Customer = {
        id: '',
        nom: this.signupForm.value.nom,
        prenom: this.signupForm.value.prenom,
        cne: this.signupForm.value.cne,
        user: {
          email: this.signupForm.value.email,
          password: this.signupForm.value.password,
          role: 'USER',
        }
      };
      this.authService.registerClient(newCustomer).subscribe(
        response => {
          console.log("Client Register Successfully",response);
          alert("Client registered successfully!");
          this.formInvalid = false;
          this.router.navigate(['/products']);
        },
        error => {console.error('Error registering client', error);}
      );
    }else{
      this.formInvalid = true;  // Set form invalid flag if the form is invalid
      console.log('Form is invalid');
    }
}

}
