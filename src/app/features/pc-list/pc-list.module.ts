import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcListComponent } from './pc-list.component';
import { PcItemComponent } from './components/pc-item/pc-item.component';
import { RouterModule, Routes } from '@angular/router';
import { PcViewComponent } from './components/pc-view/pc-view.component';
import { LaptopsService } from '../../services/laptops/laptops.service';

const routes: Routes = [
  {
    path: '',
    component: PcListComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: PcViewComponent,
  },
];

@NgModule({
  declarations: [PcListComponent, PcItemComponent, PcViewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PcListModule {}
