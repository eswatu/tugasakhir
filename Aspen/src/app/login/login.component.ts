import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@env/services';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  error = '';
  constructor(
      private formBuilder: UntypedFormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.userValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }
//error message
get ErrorMessageUsername() : string{
    const c: UntypedFormControl = (this.loginForm.get('username') as UntypedFormControl);
    return c.hasError('required') ? 'Username tidak boleh kosong': '';
}
get ErrorMessagePassword() : string{
    const c: UntypedFormControl = (this.loginForm.get('password') as UntypedFormControl);
    return c.hasError('required') ? 'Password tidak boleh kosong': '';
}
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
// variable - default false
hide: boolean = true;

// click event function toggle
password() {
    this.hide = !this.hide;
}
  onSubmit() {
    
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  // get return url from query parameters or default to home page
                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                  this.router.navigateByUrl(returnUrl);
              },
              error: error => {
                  this.error = error;
                  this.loading = false;
              }
          });
  }

}
