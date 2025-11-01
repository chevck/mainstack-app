export interface Filters {
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  transactionType?: string[];
  transactionStatus?: string[];
}
