import { Component, OnInit } from '@angular/core';
import { LaptopsService } from './services/laptops/laptops.service';

@Component({
  selector: 'app-pc-list',
  templateUrl: './pc-list.component.html',
  styleUrls: ['./pc-list.component.scss'],
})
export class PcListComponent implements OnInit {
  laptops: any[] = [];
  constructor(LaptopsService: LaptopsService) {
    LaptopsService.getLaptopList().subscribe((laptops) => {
      console.log(laptops);
      this.laptops = laptops.data;
    });
  }

  ngOnInit(): void {}
}
