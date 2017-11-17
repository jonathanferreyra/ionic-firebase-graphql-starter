import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactSearchPage } from './contact-search';

@NgModule({
  declarations: [
    ContactSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactSearchPage),
  ],
})
export class ContactSearchPageModule {}
