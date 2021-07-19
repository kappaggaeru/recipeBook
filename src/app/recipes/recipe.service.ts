import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    // ingredientsChanged = new Subject<Ingredient[]>();
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(
            "Extra Burger XL",
            "Extra riki riki",
            "https://s3-eu-central-1.amazonaws.com/bk-ar-demo.menu.app/wp-media-folder-burger-king-argentina//home/ubuntu/wordpress/web/app/uploads/sites/5/2021/04/extra-burger-xl.png",
            [
                new Ingredient("Carne",2),
                new Ingredient("Pan",1),
            ]
        ),
        new Recipe(
            "Pancho Guacamole",
            "Un pancho con una descripcion",
            "https://upload.wikimedia.org/wikipedia/commons/5/53/Hot_dog_on_a_plate_-_Evan_Swigart.jpg",
            [
                new Ingredient("Salchica",1),
                new Ingredient("Pan",1),
            ]
        )
    ];
    constructor(private slService: ShoppingListService){}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        // using slice this returns an exact copy of the array
        return this.recipes.slice();
    }
    addIngredientsToShoppingList(array: Ingredient[]){
        this.slService.addIngredients(array);
    }
    getRecipe(id: number): Recipe{
        return this.recipes[id];
    }
    updateRecipe(id: number, recipe: Recipe){
        this.recipes[id] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(id: number){
        this.recipes.splice(id, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}