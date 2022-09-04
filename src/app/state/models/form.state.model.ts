export type registration_Form_Model = {
  user: user_Model;
  laptop: laptop_Model;
  user_valid: null | boolean;
  laptop_valid: null | boolean;
  dirty: null | boolean;
  [key: string]: null | boolean | laptop_Model | user_Model;
};

export interface user_Model {
  name: string | null;
  surname: string | null;
  team_id: number | null;
  position_id: number | null;
  phone_number: string | null;
  email: string | null;
}

export interface laptop_Model {
  laptop_name: string | null;
  laptop_image: string | null;
  laptop_brand_id: number | null;
  laptop_cpu: string | null;
  laptop_cpu_cores: number | null;
  laptop_cpu_threads: number | null;
  laptop_ram: number | null;
  laptop_hard_drive_type: string | null;
  laptop_state: string | null;
  laptop_purchase_date: string | null;
  laptop_price: number | null;
}
