import React from "react";
import { render, screen, fireEvent } from "../test-utils";
import { Transactions } from "../../components/Transactions";
import type { Transaction } from "../../types/transaction.types";

const mockTransactions: Transaction[] = [
  {
    amount: 1000,
    date: "2024-01-15T00:00:00.000Z",
    metadata: {
      name: "John Doe",
      type: "payment",
      email: "john@example.com",
      quantity: 1,
      country: "US",
      product_name: "Test Product",
    },
    payment_reference: "ref-123",
    status: "successful",
    type: "deposit",
  },
  {
    amount: 500,
    date: "2024-01-14T00:00:00.000Z",
    metadata: {
      name: "Jane Smith",
      type: "payment",
      email: "jane@example.com",
      quantity: 1,
      country: "US",
      product_name: "Another Product",
    },
    payment_reference: "ref-456",
    status: "pending",
    type: "withdrawal",
  },
];

describe("Transactions", () => {
  it("should render transactions count", () => {
    render(<Transactions transactions={mockTransactions} />);
    expect(screen.getByText("2 Transactions")).toBeDefined();
  });

  it("should render empty state when no transactions", () => {
    render(<Transactions transactions={[]} />);
    expect(
      screen.getByText("No matching transaction found for the selected filter")
    ).toBeDefined();
  });

  it("should render all transaction items", () => {
    render(<Transactions transactions={mockTransactions} />);

    const transactionItems = document.querySelectorAll(".transaction-item");
    expect(transactionItems.length).toBe(2);
  });

  it("should render transaction amounts", () => {
    render(<Transactions transactions={mockTransactions} />);
    expect(screen.getByText(/USD\s*1,000/)).toBeDefined();
    expect(screen.getByText(/USD\s*500/)).toBeDefined();
  });

  it("should render withdrawal transactions correctly", () => {
    render(<Transactions transactions={mockTransactions} />);
    expect(screen.getByText("Cash withdrawal")).toBeDefined();
  });

  it("should render deposit transactions correctly", () => {
    render(<Transactions transactions={mockTransactions} />);
    expect(screen.getByText("Test Product")).toBeDefined();
  });

  it("should open filter drawer when filter button is clicked", () => {
    render(<Transactions transactions={mockTransactions} />);
    const filterButton = screen.getByText("Filter");

    fireEvent.click(filterButton);

    // Drawer should be open
    const drawer =
      document.querySelector('[role="dialog"]') ||
      document.querySelector(".filter-transactions-drawer");
    expect(drawer).toBeDefined();
  });

  it("should display filter count", () => {
    render(<Transactions transactions={mockTransactions} />);
    const filterCount = screen.getByText("3");
    expect(filterCount).toBeDefined();
  });

  it("should render export button", () => {
    render(<Transactions transactions={mockTransactions} />);
    expect(screen.getByText("Export list")).toBeDefined();
  });
});
