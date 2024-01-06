
export interface DailySales {
  id: number;
  customer_name: string;
  customer_id: string;
  twelve_kg: string | null;
  twentyfive_kg: string | null;
  thirtythree_kg: string | null;
  thirtyfive_kg: string | null;
  fourtyfive_kg: string | null;
  others_kg: string | null;
  empty_twelve_kg: string | null;
  empty_twentyfive_kg: string | null;
  empty_thirtythree_kg: string | null;
  empty_thirtyfive_kg: string | null;
  empty_fourtyfive_kg: string | null;
  empty_others_kg: string | null;
  date: string;
  is_due_bill: string;
  price: string;
  pay: string;
  due: string;
  created_at: string;
  updated_at: string;
}
