import { Component } from '@angular/core';
import { NavigationService } from './services/navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pcfy';
  constructor(private navigate: NavigationService) {
    navigate.startSaveHistory();
  }
}
