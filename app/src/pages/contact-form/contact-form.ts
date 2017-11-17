import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from '../../app/app.models';
import { ContactsProvider } from '../../providers/contacts';
import { UtilsProvider } from '../../providers/utils';
import { ContactDetailsPage } from '../../pages/contact-details/contact-details';

@IonicPage()
@Component({
  selector: 'page-contact-form',
  templateUrl: 'contact-form.html',
})
export class ContactFormPage {

  operation: string;
  contact: Contact;
  isEditing: boolean;
  form : FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private contacts: ContactsProvider,
    private utils: UtilsProvider,
  ) {
    this.contact = this.navParams.get('contact')
    this.operation = !!this.contact ? 'Edit' : 'New';
    this.isEditing = !!this.contact;

    if (!this.isEditing){
      this.contact = {
        id: '',
        name: '',
        address: '',
        phone: '',
      }
    }

    this.form = this.formBuilder.group({
      name: [this.contact.name, Validators.compose([
                  Validators.maxLength(30),
                  Validators.pattern('[a-zA-Z ]*'),
                  Validators.required])
      ],
      address: [this.contact.address],
      phone: [this.contact.phone],
    });

  }

  save(){
    let data = this.form.value;
    if (!this.isEditing){
      this.utils.showLoading()
      this.contacts.add(data)
        .then(res => {
          this.utils.hideLoadingAndToast('Contact created!')
          this.navCtrl.pop()
          this.navCtrl.push(ContactDetailsPage, {contact: res.data.addContact})
        })
        .catch(err => {
          console.error(err)
          this.utils.hideLoadingAndToast('An error has ocurred :(')
        })
    } else {
      data.id = this.contact.id;
      this.utils.showLoading()
      this.contacts.update(data)
        .then(res => {
          this.utils.hideLoadingAndToast('Contact updated!')
          this.navCtrl.pop()
          this.navCtrl.push(ContactDetailsPage, {contact: res.data.updateContact})
        })
        .catch(err => {
          console.error(err)
          this.utils.hideLoadingAndToast('An error has ocurred :(')
        })
    }
  }

}
