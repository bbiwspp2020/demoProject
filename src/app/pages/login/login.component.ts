import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/Service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private service: UserService,
    private router: Router
  ) { }
  hide = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  data: any

  async signIn() {
    let body = {
      email: this.emailFormControl.value,
      password: this.password.value
    }
    let data: any = await this.service.signIn('/auth/login', body)
    if (data.access_token) {
      sessionStorage.setItem('accessToken', data.access_token)
      sessionStorage.setItem('user', data?.user.id)
      this.router.navigate(['home'])
    }
    this.data = data
  }
}
