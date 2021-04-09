import { Injectable } from '@angular/core';
import { CarDetail } from '../models/carDetail';
import { CartItems } from '../models/carItems';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
 
 
  addToCart(carDetail: CarDetail) {
    let cartItem = new CartItem();
    cartItem.carDetail = carDetail;
    CartItems.push(cartItem);
  }

  list(): CartItem[] {
    return CartItems;
  }
  removeFromCart(carDetail:CarDetail){
    let item:CartItem = CartItems.find(c=>c.carDetail.id===carDetail.id);
    CartItems.splice(CartItems.indexOf(item),1);
  }
 
}
