import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f', {static: false}) form: NgForm;
  subscription: Subscription;
  editMode = false;
  index: number;
  ingredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(){
    this.subscription = this.shoppingListService.startedEditting
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.index = index;
          this.ingredient = this.shoppingListService.getIngredient(index);
          this.form.setValue({
            name: this.ingredient.name,
            amount: this.ingredient.amount
          });
        }
    );
  }
  resetForm(){
    this.form.reset();
    this.editMode = false;
  }
  deleteItem(){
    this.shoppingListService.deleteIngredient(this.index);
    this.resetForm();
  }

  addIngredient(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.index, newIngredient);
    }else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.resetForm()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
