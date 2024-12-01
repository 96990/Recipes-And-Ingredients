import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports:[
        FormsModule,
        SharedModule,
        RouterModule.forChild([{ path: '', component: AuthComponent}])
    ]
})
export class AuthModule{}