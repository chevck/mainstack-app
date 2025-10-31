import {
  Button,
  CloseButton,
  createListCollection,
  Drawer,
  Portal,
  Select,
} from "@chakra-ui/react";
import { X } from "lucide-react";
import DatePicker from "react-datepicker";
import { useState } from "react";

const TransactionTypeSelect = () => {
  const frameworks = createListCollection({
    items: [
      { label: "Store Transactions", value: "store-transactions" },
      { label: "Get Tipped", value: "get-tipped" },
      { label: "Withdrawals", value: "withdrawals" },
      { label: "Chargebacks", value: "chargebacks" },
      { label: "Cashbacks", value: "cashbacks" },
      { label: "Refer & Earn", value: "refer-and-earn" },
    ],
  });
  return (
    <Select.Root multiple collection={frameworks} size='sm' width='100%'>
      <Select.HiddenSelect />
      <Select.Label>Transaction Type</Select.Label>
      <Select.Control>
        <Select.Trigger className='transaction-type-select-trigger'>
          <Select.ValueText placeholder='Store Transactions' />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {frameworks.items.map((framework) => (
            <Select.Item item={framework} key={framework.value}>
              {framework.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
};

const TransactionStatusSelect = () => {
  const frameworks = createListCollection({
    items: [
      { label: "Successful", value: "successful" },
      { label: "Failed", value: "failed" },
      { label: "Pending", value: "pending" },
    ],
  });
  return (
    <Select.Root multiple collection={frameworks} size='sm' width='100%'>
      <Select.HiddenSelect />
      <Select.Label>Transaction Status</Select.Label>
      <Select.Control>
        <Select.Trigger className='transaction-type-select-trigger'>
          <Select.ValueText placeholder='Select transaction status' />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {frameworks.items.map((framework) => (
            <Select.Item item={framework} key={framework.value}>
              <div className='transaction-status-item'>
                <div className='transaction-status-item-label'>
                  {framework.label}
                </div>
              </div>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
};

export function FilterTransactionsDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (details: Drawer.OpenChangeDetails) => void;
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content
            minWidth='456px'
            borderRadius='20px'
            className='filter-transactions-drawer'
          >
            <Drawer.Header padding='20px 24px'>
              <Drawer.Title fontSize='24px' fontWeight='700' lineHeight='120%'>
                Filter
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <div className='filter-buttons'>
                <button className='active'>Today</button>
                <button>Last 7 days</button>
                <button>This month</button>
                <button>Last 3 months</button>
              </div>
              <div className='filter-form'>
                <div className='form-calendar'>
                  <label>Date Range</label>
                  <div className='calendar-input-container'>
                    <DatePicker
                      className='calendar-input'
                      selected={startDate}
                      onChange={(date: Date | null) => {
                        if (date) {
                          setStartDate(date);
                        }
                      }}
                    />
                    <DatePicker
                      dateFormat='dd/MM/yyyy'
                      selected={endDate}
                      className='calendar-input'
                      onChange={(date: Date | null) => {
                        if (date) {
                          setEndDate(date);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className='transaction-type'>
                  <TransactionTypeSelect />
                </div>
                <div className='transaction-type'>
                  <TransactionStatusSelect />
                </div>
              </div>
            </Drawer.Body>
            <Drawer.Footer justifyContent='center'>
              <Button
                variant='outline'
                width='50%'
                backgroundColor='transparent'
                color='#131316'
                fontWeight='600'
                height='48px'
              >
                Clear
              </Button>
              <Button fontWeight='600' width='50%' height='48px'>
                Apply
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton backgroundColor='transparent'>
                <X size={24} color='#131316' />
              </CloseButton>
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
