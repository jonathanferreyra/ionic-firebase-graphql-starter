import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactDetailsPage } from '../../pages/contact-details/contact-details';
import { Contact } from '../../app/app.models';
import { ContactsProvider } from '../../providers/contacts';

@IonicPage()
@Component({
  selector: 'page-contact-search',
  templateUrl: 'contact-search.html',
})
export class ContactSearchPage {

  searchQuery: string = '';

  contacts: Array<Contact>;
  isLoading: boolean = false;
  error: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contactsProvider: ContactsProvider
  ) {
    this.contacts = [];
  }

  getItems(ev: any) {
    let query = ev.target.value;
    this.contacts = [];
    if (query.length > 0)
      this.loadResults(query);
  }

  contactDetails(contact){
    this.navCtrl.push(ContactDetailsPage, {contact: contact})
  }

  loadResults(query: string){
    this.isLoading = true
    this.contactsProvider.findByName(query).subscribe((data) => {
      this.contacts = data['data']['contacts'];
      this.isLoading = false;
    }, err => console.error(err))
  }

}
