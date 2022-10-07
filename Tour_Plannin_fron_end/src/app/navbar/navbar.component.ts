import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/service/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName = "";
  constructor(public nav:NavbarService, private router:Router) { 
    
  }
  ngOnInit(): void {

    // this.userName=this.loginDetail.firstName
    // console.log("ngonchange",this.loginDetail.firstName.)
  }
  logout(){
    this.nav.logout()
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
