import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    /* this subscribe is to let know that the ingredient array has been changed.*/
    this.subscription = this.shoppingListService.IngredientChanged.subscribe(
      (Ingredient: Ingredient[]) => {
        this.ingredients = Ingredient;
      }
    );
  }
  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
