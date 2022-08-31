import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pc-item',
  templateUrl: './pc-item.component.html',
  styleUrls: ['./pc-item.component.scss'],
})
export class PcItemComponent implements OnInit {
  @Input() laptop: any = {};
  constructor() {}

  ngOnInit(): void {}
}
