import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

user:User;

  constructor(private localStorageService:LocalStorageService,
    private toast:ToastrService,
    private authService:AuthService,
    private userService:UserService, private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getName();
  }
  getName(){
    
    return this.authService.getName()
  }

  logout() {
    this.authService.logOut()
    window.location.reload()
  }

  isAuthenticated(){
    if(this.authService.isAuthenticated()){
      return true;
    }
    else{
      return false;
    }
  }


}


