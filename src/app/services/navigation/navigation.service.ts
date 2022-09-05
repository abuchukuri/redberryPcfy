import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private history: string[] = [];
  private historySet = new Set();

  constructor(private router: Router, private location: Location) {}

  public startSaveHistory(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!this.historySet.has(event.urlAfterRedirects)) {
          this.historySet.add(event.urlAfterRedirects);
          this.history.push(event.urlAfterRedirects);
        } else {
          this.history = this.history.slice(
            0,
            this.history.indexOf(event.urlAfterRedirects) + 1
          );
          this.historySet = new Set(this.history);
        }
      }
    });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public goBack(): void {
    let route = this.history.pop();
    this.historySet.delete(route);
    if (this.history.length > 0) {
      this.router.navigateByUrl(this.history[this.history.length - 1]);
    } else {
      this.router.navigateByUrl('/');
    }
  }

  public getPreviousUrl(): string {
    if (this.history.length > 0) {
      return this.history[this.history.length - 2];
    }
    return '';
  }
}
