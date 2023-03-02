import { Component, OnInit } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private passwordManagerService: PasswordManagerService) {}

  ngOnInit(): void {}

  onSubmit(values: any) {
    this.passwordManagerService
      .login(values.email, values.password)
      .then(() => {
        console.log('login success');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
