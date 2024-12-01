import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  // @ViewChild('nameInput', { static: true }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: true }) amountInputRef: ElementRef;
  @ViewChild('f') slform: NgForm;
  subscription: Subscription;
  editMode = false;
  editingItemIndex: number;
  editedItem: Ingredient;
  constructor(private slService: ShoppingListService) {}
  /**? commeted part is where used before ngForm */
  // onAddItem() {
  //   const ingName = this.nameInputRef.nativeElement.value;
  //   const ingAmount = this.amountInputRef.nativeElement.value;
  //   const newIngredient = new Ingredient(ingName, ingAmount);
  //   this.slService.addIngredient(newIngredient);
  // }
  ngOnInit(){
    this.subscription = this.slService.startedEditing.subscribe((index:number)=>{
      this.editingItemIndex = index
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);
      this.slform.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editingItemIndex,newIngredient)
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear(){
    this.slform.reset();
    this.editMode = false;
  }
  onDelete(){
    this.onClear();
    this.slService.deleteIngredient(this.editingItemIndex);
  }
  onDestroy(){
    this.subscription.unsubscribe();
  }
}
