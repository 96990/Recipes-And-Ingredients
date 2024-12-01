import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(
        private http: HttpClient, 
        private recipeService: RecipeService,
        private authService: AuthService
    ){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-6cb8b-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(responses =>{
            console.log(responses);
        })
    }
    
    fetchRecipes(){
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-6cb8b-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
            map((recipes: Recipe[]) => {  /** map in here is the rxjs operator */
                return recipes.map(recipe => { /** map in here is the javascript method on array. */
                    return { 
                        ...recipe, 
                        ingredients: recipe.ingredients || [] 
                    };
                });
            }),
            tap(recipes => {
                return this.recipeService.setRecipes(recipes);
            })
        )
    }
}
