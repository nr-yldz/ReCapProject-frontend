import { CarDetail } from "./carDetail";

export class CartItem{
    
    carDetail:CarDetail;
    Id: number;
  customerId: number;
  rentDate: Date;
  returnDate: Date;
  brandName: string;
  colorName: string;
  modelYear: number;
  dailyPrice: number;
  totalPrice: number;
   
}