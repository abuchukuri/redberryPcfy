import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-laptop-item',
  templateUrl: './laptop-item.component.html',
  styleUrls: ['./laptop-item.component.scss'],
})
export class LaptopItemComponent implements OnInit {
  @Input() laptop: any = {};
  constructor() {}

  ngOnInit(): void {}
}
