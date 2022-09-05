import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, forkJoin, merge, switchMap } from 'rxjs';
import { brand } from 'src/app/features/registration-form/models/brand.model';
import { CPU } from 'src/app/features/registration-form/models/cpu.model';
import { Position } from 'src/app/features/registration-form/models/position.model';
import { Team } from 'src/app/features/registration-form/models/team.model';
import { FormGeneralHelperService } from 'src/app/services/form-general-helper/form-general-helper.service';
import { LaptopsService } from '../../../../services/laptops/laptops.service';
import { stateEnum } from '../../enum/state.enum';
import { laptop_details } from '../../models/laptop-details';

@Component({
  selector: 'app-laptop-view',
  templateUrl: './laptop-view.component.html',
  styleUrls: ['./laptop-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaptopViewComponent implements OnInit {
  teams: Team[] = [];
  positions: Position[] = [];
  brands: brand[] = [];
  //as we fetch brand, team and position from backend
  // creating enums for them doesn't seem logical
  // I'll make separate requests to fetch information from server
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
      cell: (element: any) =>
        this.brands.find((item) => item.id == element.laptop.brand_id)?.name,
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
      cell: (element: any) =>
        stateEnum[<keyof typeof stateEnum>element.laptop.state],
    },
    {
      field: 'ლეპტოპის ფასი',
      cell: (element: any) => element.laptop.price + '₾',
    },
  ];

  state_2 = [
    {
      field: 'შეძენის რიცხვი',
      cell: (element: any) => element.laptop.purchase_date || '-',
    },
  ];

  user = [
    {
      field: 'სახელი',
      cell: (element: any) => element.user.name + ' ' + element.user.surname,
    },
    {
      field: 'თიმი',
      cell: (element: any) =>
        this.teams.find((item) => item.id == element.user.team_id)?.name,
    },
    {
      field: 'პოზიცია',
      cell: (element: any) =>
        this.positions.find((item) => item.id == element.user.position_id)
          ?.name,
    },
    { field: 'მეილი', cell: (element: any) => element.user.email },
    {
      field: 'ტელ. ნომერი',
      cell: (element: any) => element.user.phone_number,
    },
  ];
  laptop_details = new BehaviorSubject<laptop_details | null>(null);
  constructor(
    private route: Router,
    private active: ActivatedRoute,
    private laptopsService: LaptopsService,
    private formHelper: FormGeneralHelperService
  ) {}

  ngOnInit(): void {
    this.active.params.subscribe((params) => {
      this.fetchLaptopDetails(params['id']);
    });
  }

  fetchLaptopDetails(id: number) {
    forkJoin(
      this.laptopsService.getLaptop(id),
      this.formHelper.getPosition(),
      this.formHelper.getTeams(),
      this.formHelper.getBrands()
    ).subscribe(
      ([details, positions, teams, brands]) => {
        this.laptop_details.next(details.data);
        this.teams = teams.data;
        this.positions = positions.data;
        this.brands = brands.data;
      },
      (err) => {
        this.route.navigate(['../'], { relativeTo: this.active });
      }
    );
  }
}
