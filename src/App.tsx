import "./styles.css";
import MainStackLogo from "./assets/mainstack-logo.svg";
import StoreIcon from "./assets/store-icon.svg";
import SideLinkIcon from "./assets/side-link-icon.svg";
import MediaKitIcon from "./assets/media-kit-icon.png";
import InvoicingIcon from "./assets/invoicing-icon.png";
import {
  Banknote,
  Bell,
  FileChartColumn,
  HomeIcon,
  LayoutGrid,
  Menu,
  MessageSquareText,
  Users,
} from "lucide-react";
import { GraphSection } from "./components/GraphSection";
import { Transactions } from "./components/Transactions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Transaction, User, WalletBalance } from "./utils/types";

function App() {
  const endPointUrl = "https://fe-task-api.mainstack.io";
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(
    null
  );

  const handleFetchUser = async () => {
    try {
      const response = await fetch(`${endPointUrl}/user`);
      return response.json();
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user");
    }
  };

  const handleFetchTransactions = async () => {
    try {
      const response = await fetch(`${endPointUrl}/transactions`);
      return response.json();
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch transactions");
    }
  };

  const handleWalletBalance = async () => {
    try {
      const response = await fetch(`${endPointUrl}/wallet`);
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
      <div className='header'>
        <img src={MainStackLogo} alt='MainStack Logo' />
        <div className='menu'>
          <a href='#'>
            <HomeIcon />
            <span>Home</span>
          </a>
          <a href='#'>
            <FileChartColumn />
            <span>Analytics</span>
          </a>
          <a href='#' className='active'>
            <Banknote />
            <span>Revenue</span>
          </a>
          <a href='#'>
            <Users />
            <span>CRM</span>
          </a>
          <a href='#'>
            <LayoutGrid />
            <span>Apps</span>
          </a>
        </div>
        <div className='settings-section'>
          <button>
            <Bell color='#56616B' size={20} />
          </button>
          <button>
            <MessageSquareText color='#56616B' size={20} />
          </button>
          <div className='user'>
            <div className='avatar'>
              {user?.first_name?.charAt(0)}
              {user?.last_name?.charAt(0)}
            </div>
            <Menu />
          </div>
        </div>
      </div>
      <div className='content'>
        <div className='side-menu'>
          <div className='item'>
            <img src={SideLinkIcon} alt='Side Link Icon' />
          </div>
          <div className='item'>
            <img src={StoreIcon} alt='Store Icon' />
          </div>
          <div className='item'>
            <img src={MediaKitIcon} alt='Media Kit Icon' />
          </div>
          <div className='item'>
            <img src={InvoicingIcon} alt='Invoicing Icon' />
          </div>
        </div>
        <div className='main-content'>
          <GraphSection walletBalance={walletBalance} />
          <Transactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default App;
