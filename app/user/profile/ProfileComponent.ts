import {Component, OnInit} from '@angular/core'
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from '../AuthService';
import {Router} from '@angular/router';

@Component({
    templateUrl: 'app/user/profile/ProfileComponent.html',
    styles: [`
        em {float:right; color:#e05c65; padding-left: 10px;}
        .error input {background-color: #e3c3c5}
        .error ::-webkit-input-placeholder { color: #999; }
        .error ::-moz-placeholder {color: #999;}
        .error :-moz-placeholder {color:#999;}
        .error :-ms-input-placeholder { color: #999}
    `]
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;
    private firstName: FormControl;
    private lastName: FormControl;

    constructor(private  authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.firstName = new FormControl(this.authService.currentUser.firstName,
            [Validators.required, Validators.pattern('[a-zA-Z]')]);

        this.lastName = new FormControl(this.authService.currentUser.lastName,
            Validators.required);

        this.profileForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName
        });
    }

    validateLastName() {
        return this.lastName.valid || this.lastName.untouched;
    }

    validateFirstName() {
        return this.firstName.valid || this.firstName.untouched;
    }

    saveProfile(formValues) {
        if (this.profileForm.valid) {
            this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
            this.router.navigate(['events'])
        }
    }


    cancel() {
        this.router.navigate(['events'])
    }
}