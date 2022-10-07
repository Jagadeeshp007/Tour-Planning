import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  admin:boolean
  user:boolean
  isLogin:boolean
  constructor() { }

  adminLogin(){
    this.admin=true;
    this.user=false
  }
  userLogin(){
    this.admin=false;
    this.user=true;
  }

  login(){
    this.isLogin=true;
  }
  logout(){
    this.isLogin=false;
  }

}
