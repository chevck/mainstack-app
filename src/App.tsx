import "./styles.css";
import { GraphSection } from "./components/GraphSection";
import { Transactions } from "./components/Transactions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Transaction } from "./types/transaction.types";
import type { User } from "./types/user.types";
import type { WalletBalance } from "./types/wallet.types";
import { ENDPOINT_URL } from "./constants/config";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(
    null
  );

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
          <GraphSection walletBalance={walletBalance} />
          <Transactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default App;
