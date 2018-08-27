import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
//import { User } from '../../../../node_modules/firebase';
import { User } from '../../core/user';
import { AuthService } from '../../core/auth.service';

import { Observable} from 'rxjs';
import { isNgTemplate } from '../../../../node_modules/@angular/compiler';
import { NgTemplateOutlet } from '../../../../node_modules/@angular/common';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items:Item[];
  editState: boolean = false;
  itemToEdit: Item;
  constructor(private itemService: ItemService, public auth: AuthService) {


  }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;

    });

    // if(!this.items){
    //   console.log('reloading');
    //   window.location.reload();
      
    // }

  }
  deleteItem(event, item: Item) {
    this.clearState();
    this.itemService.deleteItem(item);
  }

  editItem(event, item: Item) {
    this.editState = true;
    this.itemToEdit = item;
  }

  updateItem(item: Item) {
    this.itemService.updateItem(item);
    this.clearState();
  }


  clearState() {
    this.editState = false;
    this.itemToEdit = null;
  }

}
