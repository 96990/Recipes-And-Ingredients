import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  // IngredientChanged = new EventEmitter<Ingredient[]>(); /* moved from eventEmitter to subject its more efficent.*/
  IngredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10),
  ];
  getIngredients() {
    return this.ingredients.slice();
  } 
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient) {
    debugger;
    this.ingredients.push(ingredient);
    /* this emit is to let know that the ingredient array has been changed.*/
    this.IngredientChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    /* this emit is to let know that the ingredient array has been changed.*/
    this.IngredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number,ingredient: any){
    this.ingredients[index] = ingredient;
    this.IngredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.IngredientChanged.next(this.ingredients.slice());
  }
}
