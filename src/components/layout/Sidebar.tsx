import StoreIcon from "../../assets/store-icon.svg";
import SideLinkIcon from "../../assets/side-link-icon.svg";
import MediaKitIcon from "../../assets/media-kit-icon.png";
import InvoicingIcon from "../../assets/invoicing-icon.png";

export function Sidebar() {
  return (
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
  );
}
