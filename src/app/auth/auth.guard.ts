import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, take, tap } from "rxjs/operators";
import { Observable } from "rxjs";

export const AuthGuard: CanActivateFn = (): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> =>{
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.user.pipe(
        take(1),
        map(user => {
            const isAuth = !!user;
            if(isAuth){
                return true;
            }
            return router.createUrlTree(['/auth']);
        }),
        /**if not using UrlTree we can use this method */
        
        // tap(isAuth =>{
        //     if(!isAuth){
        //         router.navigate(['/auth']);
        //     }
        // })
    )

}