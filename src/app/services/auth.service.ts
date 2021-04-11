import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();

  apiUrl = 'https://localhost:44328/api/auth';

  constructor(private httpClient: HttpClient, private localStorageService:LocalStorageService,
     private toastrService:ToastrService) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"/login",loginModel)
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{ 
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"/register",registerModel)
  }
  

  logOut(){
    this.localStorageService.cleanLocal();
     this.toastrService.success("Çıkış Yapılıyor");
     setTimeout(()=>{
       window.location.href="";
     },2000);
   
   }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
  getName() {
    let token:string=localStorage.getItem("token")
    if (token) {
      let decoded = this.jwtHelper.decodeToken(token)
      let userName = Object.keys(decoded).filter(x => x.endsWith("/name"))[0];
      return decoded[userName];
    }
    return null
}
}