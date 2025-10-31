import MainStackLogo from "../../assets/mainstack-logo.svg";
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
import type { User } from "../../types/user.types";

export function Header({ user }: { user: User | null }) {
  return (
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
  );
}
