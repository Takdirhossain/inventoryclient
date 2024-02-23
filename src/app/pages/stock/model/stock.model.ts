export interface Stock {
  id: string;
  twelve_kg: string;
  twentyfive_kg: string;
  thirtythree_kg: string;
  thirtyfive_kg: string;
  fourtyfive_kg: string;
  others_kg: string;
  empty_twelve_kg: string;
  empty_twentyfive_kg: string;
  empty_thirtythree_kg: string
  empty_thirtyfive_kg: string;
  empty_fourtyfive_kg: string;
  empty_others_kg: string;
  price: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface StockUpdate{
  total_stock_twelve_kg: Number;
  total_stock_twentyfive_kg: Number;
  total_stock_thirtythree_kg: Number;
  total_stock_thirtyfive_kg: Number;
  total_stock_fourtyfive_kg: Number;
  total_sales_twelve_kg: Number;
  total_sales_twentyfive_kg: Number;
  total_sales_thirtythree_kg: Number;
  total_sales_thirtyfive_kg: Number;
  total_sales_fourtyfive_kg: Number;
  net_stock_twelve_kg: Number;
  net_stock_twentyfive_kg: Number;
  net_stock_thirtythree_kg: Number;
  net_stock_thirtyfive_kg: Number;
  net_stock_fourtyfive_kg: Number;
  total_stock_empty_twelve_kg: Number;
  total_stock_empty_twentyfive_kg: Number;
  total_stock_empty_thirtythree_kg: Number;
  total_stock_empty_thirtyfive_kg: Number;
  total_stock_empty_fourtyfive_kg: Number;
  total_sales_empty_twelve_kg: Number;
  total_sales_empty_twentyfive_kg: Number;
  total_sales_empty_thirtythree_kg: Number;
  total_sales_empty_thirtyfive_kg: Number;
  empty_fourtyfive_kg: Number;
  net_stock_empty_twelve_kg: Number;
  net_stock_empty_twentyfive_kg: Number;
  net_stock_empty_thirtythree_kg: Number;
  net_stock_empty_thirtyfive_kg: Number;
  net_stock_empty_fourtyfive_kg: Number;
}
