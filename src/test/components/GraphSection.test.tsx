import { render, screen } from "../test-utils";
import { GraphSection } from "../../components/GraphSection";
import type { WalletBalance } from "../../types/wallet.types";
import type { Transaction } from "../../types/transaction.types";

const mockWalletBalance: WalletBalance = {
  balance: 50000,
  ledger_balance: 45000,
  total_payout: 100000,
  total_revenue: 150000,
  pending_payout: 5000,
};

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

describe("GraphSection", () => {
  it("should render available balance", () => {
    const { container } = render(
      <GraphSection walletBalance={mockWalletBalance} transactions={mockTransactions} />
    );
    // formatMoney formats as "USD 50,000" (with space), find by partial match
    // or check the graph-header content
    const graphHeader = container.querySelector(".graph-header");
    expect(graphHeader).toBeInTheDocument();
    expect(graphHeader?.textContent).toMatch(/USD\s*50,000/);
  });

  it("should render balance labels", () => {
    render(<GraphSection walletBalance={mockWalletBalance} transactions={mockTransactions} />);

    expect(screen.getByText("Ledger Balance")).toBeInTheDocument();
    expect(screen.getByText("Total Payout")).toBeInTheDocument();
    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("Pending Payout")).toBeInTheDocument();
  });

  it("should render balance amounts", () => {
    const { container } = render(
      <GraphSection walletBalance={mockWalletBalance} transactions={mockTransactions} />
    );

    // formatMoney formats with space: "USD 45,000", "USD 100,000", etc.
    // Check the balances container textContent for all amounts
    const balancesContainer = container.querySelector(".balances");
    expect(balancesContainer).toBeInTheDocument();
    const balancesText = balancesContainer?.textContent || "";

    expect(balancesText).toMatch(/USD\s*45,000/);
    expect(balancesText).toMatch(/USD\s*100,000/);
    expect(balancesText).toMatch(/USD\s*150,000/);
    expect(balancesText).toMatch(/USD\s*5,000/);
  });

  it("should render withdraw button", () => {
    render(<GraphSection walletBalance={mockWalletBalance} transactions={mockTransactions} />);
    expect(screen.getByText("Withdraw")).toBeInTheDocument();
  });

  it("should handle null wallet balance", () => {
    const { container } = render(<GraphSection walletBalance={null} transactions={mockTransactions} />);

    // When walletBalance is null, formatMoney(0) returns "USD 0" (with space)
    // This appears 5 times: Available Balance + 4 balance cards
    // Use getAllByText since there are multiple instances
    const balanceTexts = screen.getAllByText(/USD\s*0/);
    expect(balanceTexts.length).toBeGreaterThanOrEqual(1);

    // Verify the component structure is still rendered
    const graphSection = container.querySelector(".graph-section");
    expect(graphSection).toBeInTheDocument();

    // Verify Available Balance header exists
    expect(screen.getByText("Available Balance")).toBeInTheDocument();
  });

  it("should render chart container", () => {
    const { container } = render(
      <GraphSection walletBalance={mockWalletBalance} transactions={mockTransactions} />
    );
    const chartContainer = container.querySelector(".graph-container");
    expect(chartContainer).toBeInTheDocument();
  });

  it("should render graph section structure", () => {
    const { container } = render(
      <GraphSection walletBalance={mockWalletBalance} transactions={mockTransactions} />
    );
    const graphSection = container.querySelector(".graph-section");
    expect(graphSection).toBeInTheDocument();
  });
});
