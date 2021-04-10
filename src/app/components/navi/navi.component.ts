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

  users:User[]

  constructor(private localStorage:LocalStorageService,
    private toast:ToastrService,
    private authService:AuthService,
    private userService:UserService) { }

  ngOnInit(): void {
  }
   logout(){
    this.localStorage.clean()
    this.toast.info("çıkış yapıldı","işlem başarılı")
  }
  isAuthenticated(){
    return this.authService.isAuthenticated()
  }
  getById(){
    this.userService.getById(Number(this.localStorage.getItem('id'))).subscribe(r=>{
      this.users = r.data
      console.log(this.users)
    })
  }

}


