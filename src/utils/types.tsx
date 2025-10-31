export interface WalletBalance {
  ledger_balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  balance: number;
}

export interface Transaction {
  amount: number;
  date: string;
  metadata: {
    name: string;
    type: string;
    email: string;
    quantity: number;
    country: string;
    product_name: string;
  };
  payment_reference: string;
  status: string;
  type: string;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
}
