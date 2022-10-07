import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/service/tour.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regForm: FormGroup
  msg: boolean = false;
  emailPattern = "^[a-zA-Z0-9_+&*-]+(?:\\." + "[a-zA-Z0-9_+&*-]+)*@" + "(?:[a-zA-Z0-9-]+\\.)+[a-z" + "A-Z]{2,7}$";
  constructor(private fb: FormBuilder, private tourService: TourService) {
    this.regForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      lastName: this.fb.control('', [Validators.minLength(2), Validators.maxLength(8)]),
      loc: this.fb.control(''),
      userName: this.fb.control('', [Validators.required, Validators.pattern("[A-Z][a-z0-9]{1,15}"), Validators.minLength(6), Validators.maxLength(15)]),
      password: this.fb.control('', [Validators.required, Validators.pattern("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,12})")]),
      emailId: this.fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      mobile: this.fb.control('', [Validators.required, Validators.pattern("[6-9][0-9]{9}")]),
      role: this.fb.control('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.regForm.value);
    if (this.regForm.valid) {
      this.tourService.doReg(this.regForm.value).subscribe({
        next: (data) => {
          console.log(data);
          Swal.fire('Registration', 'Registration successfull', 'success')
        },
        error: (error) => {
          console.log('Error msg: ', error.error);
          Swal.fire('Invalid', error.error, 'warning');
        }
      });
    } else {
      this.msg = true;
      window.alert('Please fill all required field');
    }
  }

  resetBtn() {
    this.regForm.reset();
    this.msg = false;
  }
  check(input: string) {
    return (this.regForm.get(input)?.errors?.['required'] && this.regForm.get(input)?.touched) || (this.regForm.get(input)?.errors?.['required'] && this.msg)
  }

  checkLength(input: string) {
    return (this.regForm.get(input)?.errors?.['minlength'] || this.regForm.get(input)?.errors?.['maxlength']);
  }

}

