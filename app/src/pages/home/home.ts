import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactsProvider } from '../../providers/contacts';
import { Contact } from '../../app/app.models';

import { ContactDetailsPage } from '../../pages/contact-details/contact-details';
import { ContactFormPage } from '../../pages/contact-form/contact-form';
import { ContactSearchPage } from '../../pages/contact-search/contact-search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts: Array<Contact>;
  isLoading: boolean = false;
  error: boolean = false;

  constructor(
    public navCtrl: NavController,
    private contactsProvider: ContactsProvider
  ) {
    this.contacts = [];
  }

  ionViewDidEnter(){
    this.loadContacts()
  }

  loadContacts(){
    this.isLoading = true
    this.contactsProvider.all().subscribe((data) => {
      this.contacts = data['data']['contacts'];
      this.isLoading = false;
    })
  }

  contactDetails(contact){
    this.navCtrl.push(ContactDetailsPage, {contact: contact})
  }

  newContact(){
    this.navCtrl.push(ContactFormPage)
  }

  searchContacts(){
    this.navCtrl.push(ContactSearchPage)
  }

  handleError(){
    this.isLoading = false;
    this.error = true;
  }

}
