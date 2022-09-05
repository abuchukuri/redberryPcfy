import { Component, OnInit } from '@angular/core';
import { LaptopsService } from '../../services/laptops/laptops.service';

@Component({
  selector: 'app-laptop-list',
  templateUrl: './laptop-list.component.html',
  styleUrls: ['./laptop-list.component.scss'],
})
export class LaptopListComponent implements OnInit {
  laptops: any[] = [];
  constructor(LaptopsService: LaptopsService) {
    LaptopsService.getLaptopList().subscribe(
      (laptops) => {
        this.laptops = laptops.data;
      },
      (err) => {
        alert('sorry, there was an error');
      }
    );
  }

  ngOnInit(): void {}
}
