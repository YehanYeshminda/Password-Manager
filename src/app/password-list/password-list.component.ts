import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.passwordManagerServive
      .addPassword(values, this.siteId)
      .then(() => {
        console.log('Password has been saved successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit(): void {}
}
