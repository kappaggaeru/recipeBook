import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({providedIn: "root"})
export class DataStorageService {
    url: string = '';
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    postRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put(
            this.url,
            recipes
        ).subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes(){
        this.http
        .get<Recipe[]>(this.url)
        .subscribe( recipes => {
            this.recipeService.setRecipes(recipes);
        });
    }
}