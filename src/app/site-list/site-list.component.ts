import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordManagerService } from '../password-manager.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent implements OnInit {
  allSites!: Observable<Array<any>>;

  siteName!: string;
  siteUrl!: string;
  siteImagSurl!: string;
  siteId!: string;

  formState: string = 'Add new';

  constructor(private passwordManagerService: PasswordManagerService) {}

  ngOnInit(): void {
    this.loadSites();
  }

  onSubmit(values: object) {
    if (this.formState == 'Add new') {
      this.passwordManagerService
        .addSite(values)
        .then(() => {
          console.log('Data of the site has been saved succesfully');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState == 'Edit') {
      this.passwordManagerService
        .updateSite(this.siteId, values)
        .then(() => {
          console.log('Data has been updated');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  editSite(siteName: string, siteUrl: string, siteImgUrl: string, id: string) {
    this.siteId = id;
    this.siteImagSurl = siteImgUrl;
    this.siteName = siteName;
    this.siteUrl = siteUrl;

    this.formState = 'Edit';
  }

  deleteSite(id: string) {
    this.passwordManagerService
      .deleteSite(id)
      .then(() => {
        console.log('Site has been deleted succesfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadSites() {
    this.allSites = this.passwordManagerService.loadSites();
  }
}
