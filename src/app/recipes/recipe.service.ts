import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>(); /* changed to subject form eventEmitter for efficency */
  recipeSelected = new Subject<Recipe[]>();
  recipe: any;
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Beef Steak',
  //     'This is simple beef steak',
  //     'https://media.istockphoto.com/id/1170324943/photo/sliced-steak-ribeye-grilled-with-pepper-garlic-salt-and-thyme-served-on-a-wooden-cutting.jpg?s=1024x1024&w=is&k=20&c=OJgBhYpdl6gsgfmL6P8YUy84DqXdqOLCDWzDU3D0OqI=',
  //     [new Ingredient('meat', 1), new Ingredient('frenchFries', 10)]
  //   ),
  //   new Recipe(
  //     'Beef Steak',
  //     'This is spicy beef steak',
  //     'assets/images/Steak2.jpg',
  //     [new Ingredient('meat', 1), new Ingredient('potato', 10)]
  //   ),
  //   new Recipe(
  //     'Beef Steak',
  //     'This is simple beef steak',
  //     'https://media.istockphoto.com/id/1468568803/photo/steaks-sliced-grilled-meat-steak-new-york-or-ribeye-with-spices-rosemary-and-pepper-on-black.jpg?s=1024x1024&w=is&k=20&c=iRyTdZRTCdwEpKg9FkGp1yK7xg52ZI5AXQPruN1fm-I=',
  //     [new Ingredient('meat', 1), new Ingredient('tomato', 10)]
  //   ),
  //   new Recipe(
  //     'Beef Steak',
  //     'This is tasty beef steak',
  //     'https://www.cloughbanefarm.com/wp-content/uploads/2021/04/shutterstock_500232412.jpg',
  //     [new Ingredient('meat', 1), new Ingredient('greens', 10)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipe: Recipe[]){
    this.recipes = recipe;
    this.recipeSelected.next(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
  getRecipesById(id: number) {
    let recipe;
    this.recipe = this.recipes.slice();
    Object.keys(this.recipe).forEach((key) => {
      if (this.recipe[key].id == id) {
        recipe = this.recipe[key];
      }
    });
    return recipe;
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeSelected.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    const val = this.recipes;
    this.recipes[index] = newRecipe;
    this.recipeSelected.next(this.recipes.slice());
  }
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeSelected.next(this.recipes.slice());
  }
}
