import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { laptop_details } from '../../models/laptop-details';
import { LaptopsService } from '../../services/laptops/laptops.service';

@Component({
  selector: 'app-pc-view',
  templateUrl: './pc-view.component.html',
  styleUrls: ['./pc-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PcViewComponent implements OnInit {
  cpu = [
    { field: 'CPU', cell: (element: any) => element.laptop.cpu.name },
    {
      field: 'CPU-ს ბირთვი',
      cell: (element: any) => element.laptop.cpu.cores,
    },
    {
      field: 'CPU-ს ნაკადი',
      cell: (element: any) => element.laptop.cpu.threads,
    },
  ];
  laptop = [
    {
      field: 'ლეპტოპის სახელი',
      cell: (element: any) => element.laptop.name,
    },
    {
      field: 'ლეპტოპის ბრენდი',
      cell: (element: any) => element.laptop.brand_id,
    },
    { field: 'RAM', cell: (element: any) => element.laptop.ram },
    {
      field: 'მეხსიერების ტიპი',
      cell: (element: any) => element.laptop.hard_drive_type,
    },
  ];
  state = [
    {
      field: 'ლეპტოპის მდგომარეობა',
      cell: (element: any) => element.laptop.state,
    },
    {
      field: 'შეძენის რიცხვი',
      cell: (element: any) => element.laptop.purchase_date,
    },
  ];

  state_2 = [
    {
      field: 'ლეპტოპის ფასი',
      cell: (element: any) => element.laptop.price + '₾',
    },
  ];

  user = [
    {
      field: 'სახელი',
      cell: (element: any) => element.user.name + ' ' + element.user.surname,
    },
    { field: 'თიმი', cell: (element: any) => element.user.team_id },
    {
      field: 'პოზიცია',
      cell: (element: any) => element.user.position_id,
    },
    { field: 'მეილი', cell: (element: any) => element.user.email },
    {
      field: 'ტელ.ნომერი',
      cell: (element: any) => element.user.phone_number,
    },
  ];
  laptop_details = new BehaviorSubject<laptop_details | null>(null);
  constructor(
    private route: ActivatedRoute,
    private laptopsService: LaptopsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fetchLaptopDetails(params['id']);
    });
  }

  fetchLaptopDetails(id: number) {
    this.laptopsService.getLaptop(id).subscribe((details) => {
      console.log(details.data);
      this.laptop_details.next(details.data);
    });
  }
}
