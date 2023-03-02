import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PasswordManagerService } from '../password-manager.service';

// imports from 3 party
import { AES, enc } from 'crypto-js';
import { environment } from 'src/environments/environment';

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
  passwordList!: Array<any>;

  email!: string;
  username!: string;
  password!: string;
  passwordId!: string;

  formState: string = 'Add new';

  isSuccess: boolean = false;
  successMessage!: string;

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
  onSubmit(values: any) {
    const passwordEncrpted = this.encryptPassword(values.password);
    values.password = passwordEncrpted;

    if (this.formState === 'Add new') {
      this.passwordManagerServive
        .addPassword(values, this.siteId)
        .then(() => {
          this.showAlert('Data saved successfully');
          this.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState === 'Edit') {
      this.passwordManagerServive
        .updatePassword(this.siteId, this.passwordId, values)
        .then(() => {
          this.showAlert('Data Updated successfully');
          this.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }

  loadPassword() {
    this.passwordManagerServive.loadPasswords(this.siteId).subscribe((val) => {
      this.passwordList = val;
    });
  }

  editPassword(email: string, username: string, password: string, id: string) {
    this.passwordId = id;
    this.email = email;
    this.username = username;
    this.password = password;

    this.formState = 'Edit';
  }

  deletePassword(passwordId: string) {
    this.passwordManagerServive
      .deletePassword(this.siteId, passwordId)
      .then(() => {
        this.showAlert('Data deleted successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onDecrypt(password: string, arrayIndex: number) {
    const decPassword = this.decryptPassword(password);
    this.passwordList[arrayIndex].password = decPassword;
  }

  resetForm() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.formState = 'Add new';
    this.passwordId = '';
  }

  encryptPassword(password: string) {
    const secretKey = environment.secretKey;
    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
  }

  decryptPassword(password: string) {
    const secretKey = environment.secretKey;
    const decryptedPassword = AES.decrypt(password, secretKey).toString(
      enc.Utf8
    );
    return decryptedPassword;
  }

  ngOnInit(): void {
    this.loadPassword();
  }
}
