import { Transaction } from "@/types";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TransactionItem from "./transaction-item";

const mockDepositTransaction: Transaction = {
  amount: 100.5,
  status: "successful",
  type: "deposit",
  date: "2024-01-15",
  metadata: {
    name: "John Doe",
    type: "digital_product",
    email: "john@example.com",
    quantity: 1,
    country: "US",
    product_name: "E-book",
  },
};

const mockWithdrawalTransaction: Transaction = {
  amount: 50.0,
  status: "pending",
  type: "withdrawal",
  date: "2024-01-20",
  metadata: {
    name: "Jane Smith",
    type: "withdrawal",
    email: "jane@example.com",
    quantity: 1,
    country: "CA",
  },
};

const mockTransactionWithoutMetadata: Transaction = {
  amount: 25.75,
  status: "failed",
  type: "deposit",
  date: "2024-01-25",
};

describe("TransactionItem Component", () => {
  it("should render deposit transaction correctly", () => {
    render(<TransactionItem transaction={mockDepositTransaction} />);

    expect(screen.getByText("E-book")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("USD 100.50")).toBeInTheDocument();
    expect(screen.getByText("Jan 15, 2024")).toBeInTheDocument();
  });

  it("should render withdrawal transaction correctly", () => {
    render(<TransactionItem transaction={mockWithdrawalTransaction} />);

    expect(screen.getByText("Cash withdrawal")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("USD 50.00")).toBeInTheDocument();
    expect(screen.getByText("Jan 20, 2024")).toBeInTheDocument();
  });

  it("should render transaction without metadata", () => {
    render(<TransactionItem transaction={mockTransactionWithoutMetadata} />);

    expect(screen.getByText("Deposit")).toBeInTheDocument();
    expect(screen.getByText("failed")).toBeInTheDocument();
    expect(screen.getByText("USD 25.75")).toBeInTheDocument();
    expect(screen.getByText("Jan 25, 2024")).toBeInTheDocument();
  });

  it("should display correct icon for deposit transactions", () => {
    render(<TransactionItem transaction={mockDepositTransaction} />);

    const icon = screen.getByAltText("transaction");
    expect(icon).toHaveAttribute("src", "/deposit.svg");
  });

  it("should display correct icon for withdrawal transactions", () => {
    render(<TransactionItem transaction={mockWithdrawalTransaction} />);

    const icon = screen.getByAltText("transaction");
    expect(icon).toHaveAttribute("src", "/withdrawal.svg");
  });

  it("should apply correct background color for deposit transactions", () => {
    render(<TransactionItem transaction={mockDepositTransaction} />);

    const iconContainer = screen.getByAltText("transaction").parentElement;
    expect(iconContainer).toHaveClass("bg-[#E3FCF2]");
  });

  it("should apply correct background color for withdrawal transactions", () => {
    render(<TransactionItem transaction={mockWithdrawalTransaction} />);

    const iconContainer = screen.getByAltText("transaction").parentElement;
    expect(iconContainer).toHaveClass("bg-[#FFEFEF]");
  });

  it("should display status with correct color for successful transactions", () => {
    const successfulTransaction = {
      ...mockTransactionWithoutMetadata,
      status: "successful",
    };
    render(<TransactionItem transaction={successfulTransaction} />);

    const statusElement = screen.getByText("successful");
    expect(statusElement).toHaveClass("text-[#0EA163]");
  });

  it("should display status with correct color for pending transactions", () => {
    const pendingTransaction = {
      ...mockTransactionWithoutMetadata,
      status: "pending",
    };
    render(<TransactionItem transaction={pendingTransaction} />);

    const statusElement = screen.getByText("pending");
    expect(statusElement).toHaveClass("text-[#A77A07]");
  });

  it("should display status with correct color for failed transactions", () => {
    render(<TransactionItem transaction={mockTransactionWithoutMetadata} />);

    const statusElement = screen.getByText("failed");
    expect(statusElement).toHaveClass("text-[#FF0000]");
  });

  it("should format amount with 2 decimal places", () => {
    const transactionWithDecimals = {
      ...mockDepositTransaction,
      amount: 123.456,
    };
    render(<TransactionItem transaction={transactionWithDecimals} />);

    expect(screen.getByText("USD 123.46")).toBeInTheDocument();
  });

  it("should handle zero amount", () => {
    const zeroAmountTransaction = {
      ...mockDepositTransaction,
      amount: 0,
    };
    render(<TransactionItem transaction={zeroAmountTransaction} />);

    expect(screen.getByText("USD 0.00")).toBeInTheDocument();
  });

  it("should handle large amounts", () => {
    const largeAmountTransaction = {
      ...mockDepositTransaction,
      amount: 1234567.89,
    };
    render(<TransactionItem transaction={largeAmountTransaction} />);

    expect(screen.getByText("USD 1234567.89")).toBeInTheDocument();
  });

  it("should truncate long product names", () => {
    const longNameTransaction = {
      ...mockDepositTransaction,
      metadata: {
        ...mockDepositTransaction.metadata!,
        product_name:
          "This is a very long product name that should be truncated",
      },
    };
    render(<TransactionItem transaction={longNameTransaction} />);

    const productName = screen.getByText(
      "This is a very long product name that should be truncated"
    );
    expect(productName).toHaveClass("truncate");
  });

  it("should truncate long names", () => {
    const longNameTransaction = {
      ...mockDepositTransaction,
      metadata: {
        ...mockDepositTransaction.metadata!,
        name: "This is a very long customer name that should be truncated",
      },
    };
    render(<TransactionItem transaction={longNameTransaction} />);

    const customerName = screen.getByText(
      "This is a very long customer name that should be truncated"
    );
    expect(customerName).toHaveClass("truncate");
  });
});
