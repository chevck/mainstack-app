import StoreIcon from "../../assets/store-icon.svg";
import SideLinkIcon from "../../assets/side-link-icon.svg";
import MediaKitIcon from "../../assets/media-kit-icon.png";
import InvoicingIcon from "../../assets/invoicing-icon.png";
import { Tooltip } from "../ui/tooltip";

interface SidebarItemProps {
  icon: string;
  alt: string;
  title: string;
}

function SidebarItem({ icon, alt, title }: SidebarItemProps) {
  return (
    <Tooltip
      content={title}
      positioning={{ placement: "right" }}
      showArrow
      contentProps={{ fontSize: "16px", padding: "8px 12px" }}
    >
      <div className='item'>
        <img src={icon} alt={alt} />
      </div>
    </Tooltip>
  );
}

export function Sidebar() {
  const sidebarItems = [
    { icon: SideLinkIcon, alt: "Side Link Icon", title: "Link in Bio" },
    { icon: StoreIcon, alt: "Store Icon", title: "Store" },
    { icon: MediaKitIcon, alt: "Media Kit Icon", title: "Media Kit" },
    { icon: InvoicingIcon, alt: "Invoicing Icon", title: "Invoicing" },
  ];

  return (
    <div className='side-menu'>
      {sidebarItems.map((item, index) => (
        <SidebarItem
          key={index}
          icon={item.icon}
          alt={item.alt}
          title={item.title}
        />
      ))}
    </div>
  );
}
