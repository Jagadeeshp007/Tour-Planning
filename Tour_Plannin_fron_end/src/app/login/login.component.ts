import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from 'src/service/navbar.service';
import { TourService } from 'src/service/tour.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  result: any
  msg: boolean = false;
  loginForm: FormGroup
  constructor(private fb: FormBuilder, private router: Router, private tourService: TourService, public nav: NavbarService) {
    this.loginForm = this.fb.group({
      userName: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('loginDetails: ', this.loginForm.value)
      this.tourService.doLogin(this.loginForm.value).subscribe(data => {
        console.log(data);
        this.result = Object.values(data);
        // console.log(this.result);
        // console.log("responseStatus :", this.result[0])
        // console.log("responseType :", this.result[1])
        if (this.result[0] == true) {
          this.nav.login();
          if (this.result[1] == "user") {
            this.nav.userLogin();
            this.router.navigate(['/list'])
          } else if (this.result[1] == "admin") {
            this.nav.adminLogin();
            this.router.navigate(['/list'])
          }
        } else {
          Swal.fire('Invalid', 'UserName or Password is inCorrect', 'error');
        }
      })
    } else {
      this.msg = true;
    }
  }

  check(input: string) {
    return (this.loginForm.get(input)?.invalid && this.loginForm.get(input)?.touched) || (this.loginForm.get(input)?.invalid && this.msg)
  }
  reg() {
    this.router.navigate(['/reg']);
  }
}
