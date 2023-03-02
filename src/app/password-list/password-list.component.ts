import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PasswordManagerService } from '../password-manager.service';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent implements OnInit {
  siteId!: string;
  siteName!: string;
  siteUrl!: string;
  siteImg!: string;
  passwordList!: Observable<Array<any>>;

  email!: string;
  username!: string;
  password!: string;
  passwordId!: string;

  formState: string = 'Add new';

  constructor(
    private route: ActivatedRoute,
    private passwordManagerServive: PasswordManagerService
  ) {
    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteUrl = val.siteUrl;
      this.siteImg = val.imgUrl;
    });
  }

  // this is used in order to add a site using a sub collection
  onSubmit(values: object) {
    if (this.formState === 'Add new') {
      this.passwordManagerServive
        .addPassword(values, this.siteId)
        .then(() => {
          console.log('Password has been saved successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState === 'Edit') {
      this.passwordManagerServive
        .updatePassword(this.siteId, this.passwordId, values)
        .then(() => {
          console.log('Data has been updated succesfully');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  loadPassword() {
    this.passwordList = this.passwordManagerServive.loadPasswords(this.siteId);
  }

  editPassword(email: string, username: string, password: string, id: string) {
    this.passwordId = id;
    this.email = email;
    this.username = username;
    this.password = password;

    this.formState = 'Edit';
  }

  ngOnInit(): void {
    this.loadPassword();
  }
}
