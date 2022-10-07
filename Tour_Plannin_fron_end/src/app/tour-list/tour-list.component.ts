import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavbarService } from 'src/service/navbar.service';
import { TourService } from 'src/service/tour.service';
import Swal from 'sweetalert2';
import { TourDetail } from '../tour-detail';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {
  tourDetail: Observable<TourDetail[]>
  constructor(private tourService: TourService, private router: Router, public nav: NavbarService) { }

  ngOnInit(): void {
    this.reload();

  }
  deleteTour(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete the Data',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: "No, keep it!",
    }).then((response: any) => {
      console.log('response', response.value);
      if (response.value) {
        this.tourService.deleteTour(id).subscribe(data => {
          console.log(data);
          this.reload();
          Swal.fire('Deleted!', data, 'success');
        });
      } else if (response.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Tour Detail is safe', 'error');
      }
    })
  }
  update(id: number) {
    this.router.navigate(['/update', id]);
  }
  detail(id: number) {
    this.router.navigate(['/detail', id]);
  }

  reload() {
    this.tourDetail = this.tourService.getTourDetailList();
    console.log('list:', this.tourDetail);
  }
}
