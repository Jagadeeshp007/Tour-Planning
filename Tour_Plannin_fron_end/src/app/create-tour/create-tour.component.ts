import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TourService } from 'src/service/tour.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css']
})
export class CreateTourComponent implements OnInit {

  tourForm: FormGroup
  msg:boolean=false;
  constructor(private router: Router, private fb: FormBuilder, private tourService: TourService) {
    this.tourForm = this.fb.group({
      fromPlace: this.fb.control('', Validators.required),
      toPlace: this.fb.control('', Validators.required),
      duration: this.fb.control('', Validators.required),
      hours: this.fb.control('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.tourForm.valid) {
      this.tourService.addTour(this.tourForm.value).subscribe(data => {
        console.log(data);
        Swal.fire('Success!', 'Tour Detail added successfully', 'success')
        this.gotoList();
      });
    } else {
      this.msg=true;
      window.alert("please fill all required field");
    }
  }
  gotoList() {
    this.router.navigate(['/list']);
  }

  check(input: string) {
    return (this.tourForm.get(input)?.invalid && this.tourForm.get(input)?.touched) || (this.tourForm.get(input)?.invalid && this.msg)
  }
}
