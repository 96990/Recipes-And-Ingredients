import { Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { AuthResponseData, AuthService } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    /**instead of componentFactoryResolver we can use new viewcontainerref in A14 */
    @ViewChild(PlaceholderDirective, { static: true }) alertHost: PlaceholderDirective;
    onLoginMode: boolean = true;
    isLoading:boolean = false;
    error: string = '';
    private closeSub: Subscription;
    
    constructor(
        private authService: AuthService,
        private router: Router, 
    ){}

    onSwitchMode(){
        this.onLoginMode = !this.onLoginMode;
    }
    onSubmit(form: NgForm){
        if(!form.valid){
            return;
        }
        const email = form.value.email; //abhi@gmail.com
        const password = form.value.password; //qwe123
        let authObs: Observable<AuthResponseData>
        this.isLoading = true;
        if(this.onLoginMode){
            authObs = this.authService.login(email, password);
        }else{
            authObs = this.authService.signUp(email, password);
        }
        authObs.subscribe(
            resData =>{
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMsg =>{
                console.log(errorMsg);
                this.error = errorMsg;
                this.showAlertError(errorMsg);
                this.isLoading = false;
            }
        )
        // console.log(form);
        // form.reset();
    }

    onHandleError(){
        this.error = '';
    }
    
    /**creating dynamic component using viewcontainerRef */
    showAlertError(message: string){
        const container = this.alertHost.viewContainerRef;
        container.clear();
        const  componentRef= container.createComponent(AlertComponent);
        componentRef.instance.message = message;
        /**to clear the close button as close is an event emitter from alert component */
        this.closeSub = componentRef.instance.close.subscribe(()=>{ 
            this.closeSub.unsubscribe();
            container.clear();
        })
    }

    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
}