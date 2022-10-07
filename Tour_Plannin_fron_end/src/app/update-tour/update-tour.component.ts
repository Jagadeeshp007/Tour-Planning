import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from 'src/service/tour.service';
import Swal from 'sweetalert2';
import { TourDetail } from '../tour-detail';

@Component({
  selector: 'app-update-tour',
  templateUrl: './update-tour.component.html',
  styleUrls: ['./update-tour.component.css']
})
export class UpdateTourComponent implements OnInit {

  tourDetail: TourDetail
  id: number
  updateForm: FormGroup
  constructor(private router: Router, private route: ActivatedRoute, private tourService: TourService, private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      fromPlace: this.fb.control('', Validators.required),
      toPlace: this.fb.control('', Validators.required),
      duration: this.fb.control('', Validators.required),
      hours: this.fb.control('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.tourDetail = new TourDetail()
    this.id = this.route.snapshot.params['id'];
    this.tourService.getTourDetail(this.id).subscribe(data => {
      console.log('value of data onint', data);
      this.tourDetail = data;
      this.updateForm.setValue({
        fromPlace: this.tourDetail.fromPlace,
        toPlace: this.tourDetail.toPlace,
        duration: this.tourDetail.duration,
        hours: this.tourDetail.hours
      })
    })


  }

  onSubmit() {
    this.tourService.updateTour(this.id, this.updateForm.value).subscribe(data => {
      console.log('update value', data);
      Swal.fire('updated', data, 'success');
      this.router.navigate(['/list']);
    })
  }
  btnCancel() {
    this.router.navigate(['/list']);
  }
}
