import { Injectable } from '@angular/core';

import {
  LoadingController,
  ToastController,
  AlertController
} from 'ionic-angular';


@Injectable()
export class UtilsProvider {

    loading: any;

    constructor(
      public loadingCtrl: LoadingController,
      public toastCtrl: ToastController,
      public alertCtrl: AlertController,
    ){
        this.loading = null;
    }

    showToast(message:string){
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

    showLoading(message?:string){
        if (!message) message = 'Please wait...';
        this.loading = this.loadingCtrl.create({content: message});
        this.loading.present();
    }

    hideLoading(){
        this.loading.dismiss();
        this.loading = null;
    }

    hideLoadingAndToast(message:string){
        this.hideLoading();
        this.showToast(message);
    }

    showConfirm(title, message, cancelText='No', okText='Yes'){
      return new Promise(resolve => {
        let alert = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: [
            {
              text: cancelText,
              role: 'cancel'
            },
            {
              text: okText,
              handler: resolve
            }
          ]
        });
        alert.present();
      })
    }
}