export interface laptop_details {
  laptop: {
    name: string;
    image: 'string';
    brand_id: string;
    cpu: {
      name: string;
      cores: number;
      threads: number;
    };
    ram: number;
    hard_drive_type: string;
    state: string;
    purchase_date: string;
    price: number;
  };
  user: {
    name: string;
    surname: string;
    team_id: number;
    position_id: number;
    email: string;
    phone_number: number;
  };
}
