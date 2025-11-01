import "./styles.css";
import "./responsive.css";
import { GraphSection } from "./components/GraphSection";
import { Transactions } from "./components/Transactions";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import type { Transaction } from "./types/transaction.types";
import type { User } from "./types/user.types";
import type { WalletBalance } from "./types/wallet.types";
import { ENDPOINT_URL } from "./constants/config";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import type { Filters } from "./types/filters.types";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(
    null
  );
  const [filters, setFilters] = useState<Filters>({});

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [filters]);

  const handleFetchUser = async () => {
    try {
      const response = await fetch(`${ENDPOINT_URL}/user`);
      return response.json();
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user");
    }
  };

  const handleFetchTransactions = async () => {
    try {
      const response = await fetch(`${ENDPOINT_URL}/transactions`);
      return response.json();
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch transactions");
    }
  };

  const handleWalletBalance = async () => {
    try {
      const response = await fetch(`${ENDPOINT_URL}/wallet`);
      return response.json();
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch wallet balance");
    }
  };

  useEffect(() => {
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchData = async () => {
    try {
      setIsLoading(true);
      const [user, transactions, walletBalance] = await Promise.all([
        handleFetchUser(),
        handleFetchTransactions(),
        handleWalletBalance(),
      ]);
      setUser(user);
      setTransactions(transactions);
      setWalletBalance(walletBalance);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data");
      setIsLoading(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      if (
        filters.dateRange &&
        filters.dateRange.startDate &&
        filters.dateRange.endDate
      ) {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(
          new Date(filters.dateRange.startDate).setHours(0, 0, 0, 0)
        );
        const endDate = new Date(
          new Date(filters.dateRange.endDate.setHours(23, 59, 59, 999))
        );
        return transactionDate >= startDate && transactionDate <= endDate;
      }
      if (filters.transactionType && filters.transactionType.length > 0) {
        return filters.transactionType
          .map((type) => type.toLowerCase())
          .includes(transaction.type.toLowerCase());
      }
      if (filters.transactionStatus && filters.transactionStatus.length > 0) {
        return filters.transactionStatus
          .map((status) => status.toLowerCase())
          .includes(transaction.status.toLowerCase());
      }
      return true;
    });
  }, [transactions, filters]);

  return (
    <div className='revenue-app'>
      {isLoading && (
        <div className='loading-overlay'>
          <div className='loading-spinner'></div>
        </div>
      )}
      <Header user={user} />
      <div className='content'>
        <Sidebar />
        <div className='main-content'>
          <GraphSection
            walletBalance={walletBalance}
            transactions={filteredTransactions}
          />
          <Transactions
            transactions={filteredTransactions}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
