import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

@Injectable()
export class OverlayControllerService {
  constructor(private overlay: Overlay) {}

  create(component: ComponentType<any>, service: OverlayControllerService) {
    let configs = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['success-moda', 'is-active'],
      backdropClass: 'success-modal__background',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
    const overlayRef = this.overlay.create(configs);
    const overlayPortal = new ComponentPortal(component);
    const cmpRef = overlayRef.attach(overlayPortal);
    cmpRef.instance.parent_overlay = overlayRef;
  }
}
