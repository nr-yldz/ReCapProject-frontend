export interface Payment {
    id:number,
    nameOnCard:string,
    lastNameOnCard:string,
    cardNumber:string,
    cardCvv:string,
    expirationDateMonth:string,
    expirationDateYear:string,
    moneyInCard:number
}