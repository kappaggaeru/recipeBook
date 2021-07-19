import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredient[];
    constructor(n: string,desc: string,img: string,ing: Ingredient[]){
        this.name = n;
        this.description = desc;
        this.imagePath = img;
        this.ingredients = ing;
    }
}
