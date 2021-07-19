import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  private subscription: Subscription;
  ingredients: Ingredient[];
  constructor(private shoppingListSerive: ShoppingListService){}
  ngOnInit(){
    this.ingredients = this.shoppingListSerive.getIngredients();
    this.subscription = this.shoppingListSerive.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onEditItem(index: number){
    this.shoppingListSerive.startedEditting.next(index);
  }
}
