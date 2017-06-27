import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class Login {
    private loginForm: FormGroup;

    constructor(private navCtrl: NavController,
                private toastCtrl: ToastController,
                private auth: AuthProvider,
                private formBuilder: FormBuilder) {

        this.loginForm = formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    goToRegister() {
        this.navCtrl.push('Register');
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'User logged in successfully',
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    doLogin() {
        this.auth.login(this.loginForm.value)
            .$observable
            .subscribe(
                (response) => {
                    console.log(response);
                    // do some magic after receiving news
                }
            );
        ;
        this.presentToast();
        this.navCtrl.setRoot('Tabs');
    }
}
