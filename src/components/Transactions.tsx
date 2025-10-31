import { Drawer } from "@chakra-ui/react";
import {
  ChevronDown,
  Download,
  MoveDownLeft,
  MoveUpRight,
  ScrollText,
} from "lucide-react";
import { FilterTransactionsDrawer } from "./drawers/FilterTransactions";
import { useState } from "react";
import type { Transaction } from "../utils/types";
import { formatMoney, formatDate } from "../utils";

export function Transactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  console.log({ transactions });
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  //   const [filters, setFilters] = useState(null);

  const handleOpenFilterDrawer = (details: Drawer.OpenChangeDetails) => {
    console.log({ details });
    setOpenFilterDrawer(details.open);
  };

  return (
    <>
      <div className='transactions-section'>
        <div className='transactions-header'>
          <div className='title'>
            <h3>{transactions?.length} Transactions</h3>
            <p>Your transactions for the last 7 days</p>
          </div>
          <div className='filters'>
            <button onClick={() => handleOpenFilterDrawer({ open: true })}>
              Filter <span className='filter-count'>3</span>
              <ChevronDown size={20} />
            </button>
            <button>
              Export list <Download size={14} fontWeight={300} />
            </button>
          </div>
        </div>
        <div className='transactions-list'>
          {transactions.length === 0 ? (
            <div className='empty-state'>
              <div className='empty-state-icon'>
                <ScrollText size={20} />
              </div>
              <h2>No matching transaction found for the selected filter</h2>
              <p>Change your fiter to see more results, or add a new product</p>
              <button>Clear Filter</button>
            </div>
          ) : (
            transactions.map((transaction, key) => (
              <div className='transaction-item' key={key}>
                <div className='transaction-item-left'>
                  <div
                    className={`avatar ${
                      transaction?.type === "withdrawal" ? "withdrawal" : ""
                    }`}
                  >
                    {transaction?.type === "withdrawal" ? (
                      <MoveUpRight color='#961100' size={20} />
                    ) : (
                      <MoveDownLeft size={20} color='#075132' />
                    )}
                  </div>
                  <div className='transaction-item-left-content'>
                    <h4>
                      {transaction?.type === "withdrawal"
                        ? "Cash withdrawal"
                        : transaction?.metadata?.product_name ?? "Deposit"}
                    </h4>
                    <p
                      className={
                        transaction?.type === "withdrawal"
                          ? transaction?.status
                          : ""
                      }
                    >
                      {transaction?.type === "withdrawal"
                        ? transaction?.status
                        : transaction?.metadata?.name ?? "Roy Cash"}
                    </p>
                  </div>
                </div>
                <div className='transaction-item-right'>
                  <h4>{formatMoney(transaction?.amount || 0)}</h4>
                  <p>{formatDate(transaction?.date || "")}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <FilterTransactionsDrawer
        open={openFilterDrawer}
        onOpenChange={handleOpenFilterDrawer}
      />
    </>
  );
}
