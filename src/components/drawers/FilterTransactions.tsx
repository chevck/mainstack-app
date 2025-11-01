import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { X } from "lucide-react";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { CustomSelect } from "../ui/custom-select";
import type { Filters } from "../../types/filters.types";
import { toast } from "sonner";

export function FilterTransactionsDrawer({
  open,
  onOpenChange,
  setFilters,
  filters,
  clearFilters,
}: {
  open: boolean;
  onOpenChange: (details: Drawer.OpenChangeDetails) => void;
  setFilters: (filters: Filters) => void;
  filters: Filters;
  clearFilters: () => void;
}) {
  const [startDate, setStartDate] = useState(
    filters?.dateRange?.startDate
      ? new Date(filters.dateRange.startDate)
      : new Date()
  );
  const [endDate, setEndDate] = useState(
    filters?.dateRange?.endDate
      ? new Date(filters.dateRange.endDate)
      : new Date()
  );
  const [psuedoFilters, setPsuedoFilters] = useState<Filters>({});

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
                <button
                  onClick={() => {
                    setStartDate(new Date());
                    setEndDate(new Date());
                    setPsuedoFilters({
                      dateRange: {
                        startDate: new Date(),
                        endDate: new Date(),
                      },
                    });
                  }}
                  className='active'
                >
                  Today
                </button>
                <button
                  onClick={() => {
                    setStartDate(
                      new Date(new Date().setDate(new Date().getDate() - 7))
                    );
                    setEndDate(new Date());
                    setPsuedoFilters({
                      dateRange: {
                        startDate: new Date(
                          new Date().setDate(new Date().getDate() - 7)
                        ),
                        endDate: new Date(),
                      },
                    });
                  }}
                >
                  Last 7 days
                </button>
                <button
                  onClick={() =>
                    setStartDate(
                      new Date(new Date().setMonth(new Date().getMonth() - 1))
                    )
                  }
                >
                  Last month
                </button>
                <button
                  onClick={() => {
                    setStartDate(
                      new Date(new Date().setMonth(new Date().getMonth() - 3))
                    );
                    setEndDate(new Date());
                    setPsuedoFilters({
                      dateRange: {
                        startDate,
                        endDate,
                      },
                    });
                  }}
                >
                  Last 3 months
                </button>
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
                          setPsuedoFilters({
                            dateRange: {
                              ...(filters?.dateRange || {}),
                              startDate: date,
                              endDate:
                                filters?.dateRange?.endDate || new Date(),
                            },
                          });
                        }
                      }}
                    />
                    <DatePicker
                      selected={endDate}
                      className='calendar-input'
                      onChange={(date: Date | null) => {
                        if (date) {
                          setEndDate(date);
                          setPsuedoFilters({
                            dateRange: {
                              ...(filters?.dateRange || {}),
                              endDate: date,
                              startDate:
                                filters?.dateRange?.startDate || new Date(),
                            },
                          });
                        }
                      }}
                    />
                  </div>
                </div>
                <div className='transaction-type'>
                  <CustomSelect
                    label='Transaction Type'
                    options={[
                      "Store Transactions",
                      "Get Tipped",
                      "Withdrawal",
                      "Chargebacks",
                      "Cashbacks",
                      "Refer & Earn",
                    ].map((option) => ({
                      label: option,
                      value: option,
                    }))}
                    setValues={(values) =>
                      setPsuedoFilters({ transactionType: values })
                    }
                    values={filters?.transactionType || []}
                  />
                </div>
                <div className='transaction-type'>
                  <CustomSelect
                    label='Transaction Status'
                    options={["Pending", "Successful", "Failed"].map(
                      (option) => ({
                        label: option,
                        value: option,
                      })
                    )}
                    setValues={(values) =>
                      setPsuedoFilters({ transactionStatus: values })
                    }
                    values={filters?.transactionStatus || []}
                  />
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
                onClick={() => {
                  clearFilters();
                  toast.info("Filters cleared");
                  setPsuedoFilters({});
                  onOpenChange({ open: false });
                }}
              >
                Clear
              </Button>
              <Button
                fontWeight='600'
                width='50%'
                height='48px'
                onClick={() => {
                  setFilters({ ...filters, ...psuedoFilters });
                  onOpenChange({ open: false });
                }}
              >
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
