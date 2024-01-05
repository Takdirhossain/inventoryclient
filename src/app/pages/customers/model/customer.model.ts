export interface Customer {
  id: number;
  name: string;
  due: number;
  buy: number;
  created_at: string;
  updated_at: string;
  address: any;
  pay: number;
  sales: Sale[];
}

export interface Sale {
  id: number;
  customer_name: string;
  customer_id: string;
  twelve_kg: string;
  twentyfive_kg: any;
  thirtythree_kg: any;
  thirtyfive_kg: any;
  fourtyfive_kg: any;
  others_kg: any;
  empty_twelve_kg: any;
  empty_twentyfive_kg: any;
  empty_thirtythree_kg: any;
  empty_thirtyfive_kg: any;
  empty_fourtyfive_kg: any;
  empty_others_kg: any;
  date: string;
  is_due_bill: string;
  price: string;
  pay: string;
  due: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  customers: Customer[];
  total_due: number;
}
