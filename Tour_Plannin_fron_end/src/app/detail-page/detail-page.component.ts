import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from 'src/service/tour.service';
import { TourDetail } from '../tour-detail';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  tourDetail: TourDetail;
  id: number
  constructor(private tourService: TourService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.tourDetail = new TourDetail();
    this.id = this.route.snapshot.params['id'];

    this.tourService.getTourDetail(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.tourDetail = data;
      },
      error: (err) => { console.log(err); }
    });
  }

}
