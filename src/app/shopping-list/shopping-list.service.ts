import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditting = new Subject<number>();
    private ingredients: Ingredient[] = [];
    constructor() {
        this.ingredients.push(new Ingredient("apple",5));
        this.ingredients.push(new Ingredient("peach",3));
        this.ingredients.push(new Ingredient("lemon",1));
    }
    getIngredient(index: number){
        return this.ingredients.slice()[index];
    }
    getIngredients(){
        return this.ingredients.slice();
    }
    addIngredient(ing: Ingredient){
        this.ingredients.push(ing);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    addIngredients(array: Ingredient[]){
        this.ingredients.push(...array);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}