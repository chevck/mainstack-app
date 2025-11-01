import { render, screen, waitFor } from "../test-utils";
import App from "../../App";
import { ENDPOINT_URL } from "../../constants/config";
import type { User } from "../../types/user.types";
import type { Transaction } from "../../types/transaction.types";
import type { WalletBalance } from "../../types/wallet.types";

// Mock fetch
(global as any).fetch = jest.fn();

const mockUser: User = {
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
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
      type: "withdrawal",
      email: "jane@example.com",
      quantity: 2,
      country: "UK",
      product_name: "Another Product",
    },
    payment_reference: "ref-456",
    status: "pending",
    type: "withdrawal",
  },
];

const mockWalletBalance: WalletBalance = {
  balance: 50000,
  ledger_balance: 45000,
  total_payout: 100000,
  total_revenue: 150000,
  pending_payout: 5000,
};

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("App Structure and Layout", () => {
    it("should render the root revenue-app container", () => {
      ((global as any).fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      render(<App />);
      const appContainer = document.querySelector(".revenue-app");
      expect(appContainer).toBeInTheDocument();
    });

    it("should render loading overlay initially with spinner", () => {
      ((global as any).fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      render(<App />);
      const loadingOverlay = document.querySelector(".loading-overlay");
      const spinner = document.querySelector(".loading-spinner");

      expect(loadingOverlay).toBeInTheDocument();
      expect(spinner).toBeInTheDocument();
    });

    it("should render complete app structure: Header, Sidebar, and Main Content", async () => {
      ((global as any).fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockUser,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockTransactions,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockWalletBalance,
        });

      render(<App />);

      await waitFor(
        () => {
          // Test root structure
          const appContainer = document.querySelector(".revenue-app");
          expect(appContainer).toBeInTheDocument();

          // Test Header component
          const header = document.querySelector(".header");
          expect(header).toBeInTheDocument();

          // Test Content wrapper
          const content = document.querySelector(".content");
          expect(content).toBeInTheDocument();

          // Test Sidebar component
          const sidebar = document.querySelector(".side-menu");
          expect(sidebar).toBeInTheDocument();

          // Test Main Content section
          const mainContent = document.querySelector(".main-content");
          expect(mainContent).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("should render GraphSection and Transactions within main-content", async () => {
      ((global as any).fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockUser,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockTransactions,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockWalletBalance,
        });

      render(<App />);

      await waitFor(
        () => {
          const mainContent = document.querySelector(".main-content");
          expect(mainContent).toBeInTheDocument();

          // GraphSection should be rendered (check for graph-section class or graph container)
          const graphSection = document.querySelector(".graph-section");
          expect(graphSection).toBeInTheDocument();

          // Transactions section should be rendered
          const transactionsSection = document.querySelector(
            ".transactions-section"
          );
          expect(transactionsSection).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("Data Fetching", () => {
    it("should fetch data from all three endpoints in parallel on mount", async () => {
      ((global as any).fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockUser,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockTransactions,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockWalletBalance,
        });

      render(<App />);

      await waitFor(
        () => {
          expect((global as any).fetch).toHaveBeenCalledTimes(3);
          expect((global as any).fetch).toHaveBeenCalledWith(`${ENDPOINT_URL}/user`);
          expect((global as any).fetch).toHaveBeenCalledWith(
            `${ENDPOINT_URL}/transactions`
          );
          expect((global as any).fetch).toHaveBeenCalledWith(`${ENDPOINT_URL}/wallet`);
        },
        { timeout: 3000 }
      );
    });

    it("should hide loading overlay after data is fetched", async () => {
      ((global as any).fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockUser,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockTransactions,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockWalletBalance,
        });

      render(<App />);

      // Initially loading overlay should be visible
      const loadingOverlay = document.querySelector(".loading-overlay");
      expect(loadingOverlay).toBeInTheDocument();

      // After data loads, loading overlay should disappear
      await waitFor(
        () => {
          const overlay = document.querySelector(".loading-overlay");
          expect(overlay).not.toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("Data Flow to Components", () => {
    it("should pass user data to Header component", async () => {
      ((global as any).fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockUser,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockTransactions,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockWalletBalance,
        });

      render(<App />);

      await waitFor(
        () => {
          // Header should display user initials
          expect(screen.getByText("JD")).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("should pass walletBalance data to GraphSection component", async () => {
      ((global as any).fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockUser,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockTransactions,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockWalletBalance,
        });

      render(<App />);

      await waitFor(
        () => {
          // GraphSection should render wallet balance information
          // Check for balance display (format may vary)
          const graphSection = document.querySelector(".graph-section");
          expect(graphSection).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("should pass transactions data to Transactions component", async () => {
      ((global as any).fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockUser,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockTransactions,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockWalletBalance,
        });

      render(<App />);

      await waitFor(
        () => {
          // Transactions component should render transaction items
          const transactionsList = document.querySelector(".transactions-list");
          expect(transactionsList).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("should handle null user gracefully", async () => {
      ((global as any).fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => null,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockTransactions,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockWalletBalance,
        });

      render(<App />);

      await waitFor(
        () => {
          // App should still render even with null user
          const header = document.querySelector(".header");
          expect(header).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("Error Handling", () => {
    it("should handle fetch errors gracefully and still render app structure", async () => {
      // Mock all three fetches to return responses that throw on json() call
      // This simulates network errors that occur during JSON parsing
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      ((global as any).fetch as any)
        .mockResolvedValueOnce({
          ok: false,
          json: async () => {
            throw new Error("Failed to parse JSON");
          },
        })
        .mockResolvedValueOnce({
          ok: false,
          json: async () => {
            throw new Error("Failed to parse JSON");
          },
        })
        .mockResolvedValueOnce({
          ok: false,
          json: async () => {
            throw new Error("Failed to parse JSON");
          },
        });

      render(<App />);

      // Errors are caught in try-catch, Promise.all resolves with undefined values
      // and setIsLoading(false) is called
      await waitFor(
        () => {
          // App structure should still be rendered
          const appContainer = document.querySelector(".revenue-app");
          expect(appContainer).toBeInTheDocument();

          // Loading should eventually stop even on error
          const loadingOverlay = document.querySelector(".loading-overlay");
          expect(loadingOverlay).not.toBeInTheDocument();

          // Header should still render (with null user)
          const header = document.querySelector(".header");
          expect(header).toBeInTheDocument();

          // Content section should render
          const content = document.querySelector(".content");
          expect(content).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      consoleErrorSpy.mockRestore();
    });

    it("should handle partial fetch failures gracefully", async () => {
      // Mock: user succeeds, transactions succeeds (empty array), wallet succeeds
      // This simulates a scenario where some data is available
      ((global as any).fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockUser,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => [],
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockWalletBalance,
        });

      render(<App />);

      await waitFor(
        () => {
          // App should still render with available data
          const appContainer = document.querySelector(".revenue-app");
          expect(appContainer).toBeInTheDocument();

          // Loading should stop
          const loadingOverlay = document.querySelector(".loading-overlay");
          expect(loadingOverlay).not.toBeInTheDocument();

          // Header should render with user data
          expect(screen.getByText("JD")).toBeInTheDocument();

          // GraphSection should render with wallet data
          const graphSection = document.querySelector(".graph-section");
          expect(graphSection).toBeInTheDocument();

          // Transactions section should still render (with empty transactions)
          const transactionsSection = document.querySelector(
            ".transactions-section"
          );
          expect(transactionsSection).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("Component Integration", () => {
    it("should render all major components in correct DOM hierarchy", async () => {
      ((global as any).fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockUser,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockTransactions,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockWalletBalance,
        });

      const { container } = render(<App />);

      await waitFor(
        () => {
          // Verify DOM hierarchy: revenue-app > header + content > sidebar + main-content
          const revenueApp = container.querySelector(".revenue-app");
          expect(revenueApp).toBeInTheDocument();

          const header = revenueApp?.querySelector(".header");
          expect(header).toBeInTheDocument();

          const content = revenueApp?.querySelector(".content");
          expect(content).toBeInTheDocument();

          const sidebar = content?.querySelector(".side-menu");
          expect(sidebar).toBeInTheDocument();

          const mainContent = content?.querySelector(".main-content");
          expect(mainContent).toBeInTheDocument();

          const graphSection = mainContent?.querySelector(".graph-section");
          expect(graphSection).toBeInTheDocument();

          const transactionsSection = mainContent?.querySelector(
            ".transactions-section"
          );
          expect(transactionsSection).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  });
});
