import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../app/app.models';
import { ContactFormPage } from '../../pages/contact-form/contact-form';
import { ContactsProvider } from '../../providers/contacts';
import { UtilsProvider } from '../../providers/utils';

@IonicPage()
@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html',
})
export class ContactDetailsPage {

  title: string;
  contact: Contact;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contacts: ContactsProvider,
    private utils: UtilsProvider,
  ) {
    this.contact = this.navParams.get('contact');
    this.title = this.contact.name;
  }

  edit() {
    this.navCtrl.push(ContactFormPage, {contact: this.contact})
  }

  remove(){
    this.utils.showConfirm('Remove', 'Confirm remove this contact?').then(() => {
      this.utils.showLoading()
      this.contacts.remove(this.contact.id)
        .then(res => {
          this.utils.hideLoadingAndToast('Contact removed!')
          this.navCtrl.pop()
        })
        .catch(err => {
          console.error(err)
          this.utils.hideLoadingAndToast('An error has ocurred :(')
        })
    })
  }

}
