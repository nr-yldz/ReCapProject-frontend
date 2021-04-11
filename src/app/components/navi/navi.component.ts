import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  users:User[];
  userName:string;

  constructor(private localStorageService:LocalStorageService,
    private toast:ToastrService,
    private authService:AuthService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    let mail = this.localStorageService.getItem("email")
    if (mail != null) {
      this.userService.getByEmail(mail).subscribe(response => {
        console.log(response.data);
        this.users = response.data
      })
    }
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


