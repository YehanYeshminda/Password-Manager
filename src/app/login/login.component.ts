import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private passwordManagerService: PasswordManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  isError: boolean = false;

  onSubmit(values: any) {
    this.passwordManagerService
      .login(values.email, values.password)
      .then(() => {
        this.router.navigateByUrl('/site-list');
      })
      .catch((err) => {
        this.isError = true;
      });
  }
}
