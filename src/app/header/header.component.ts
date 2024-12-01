import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage-service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() featureSelected = new EventEmitter<string>();
  collapsed = true;
  isAuthenticated = false;
  userSub: Subscription;
  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }
  constructor(private DataStorageService: DataStorageService, private authService: AuthService){}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user, "!!User", !!user)
    })
  }
  onSaveData(){
    this.DataStorageService.storeRecipes();
  }

  onFetchData(){
    this.DataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
