import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaptopItemComponent } from './components/laptop-item/laptop-item.component';
import { LaptopViewComponent } from './components/laptop-view/laptop-view.component';
import { LaptopListComponent } from './laptop-list.component';

const routes: Routes = [
  {
    path: '',
    component: LaptopListComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: LaptopViewComponent,
  },
];

@NgModule({
  declarations: [LaptopListComponent, LaptopItemComponent, LaptopViewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class LaptopListModule {}
