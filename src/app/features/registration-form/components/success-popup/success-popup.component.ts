import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss'],
})
export class SuccessPopupComponent implements OnInit {
  parent_overlay: any;
  constructor(private route: Router, public active: ActivatedRoute) {}

  ngOnInit(): void {}

  redirect(url: string) {
    this.parent_overlay?.detach();
    this.parent_overlay?.dispose();
    this.route.navigate([url]);
  }
}
