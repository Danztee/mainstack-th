import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Transactions from ".";
import { Transaction } from "@/types";

vi.mock("../dialogs/filter-dialog", () => ({
  default: () => <div data-testid="filter-dialog">Filter Dialog</div>,
}));

vi.mock("../transactions/no-filter", () => ({
  default: () => <div data-testid="no-filter">No Filter</div>,
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

const mockTransactions: Transaction[] = [
  {
    amount: 100,
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
  },
  {
    amount: 50,
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
  },
];

describe("Transactions Component", () => {
  it("should render transactions list", () => {
    render(<Transactions transactions={mockTransactions} />);

    expect(screen.getByText("2 Transactions")).toBeInTheDocument();
    expect(
      screen.getByText("Your transactions for the last 7 days")
    ).toBeInTheDocument();
  });

  it("should display correct transaction count", () => {
    render(<Transactions transactions={mockTransactions} />);

    expect(screen.getByText("2 Transactions")).toBeInTheDocument();
  });

  it("should render filter button", () => {
    render(<Transactions transactions={mockTransactions} />);

    const filterButton = screen.getByRole("button", { name: /filter/i });
    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveTextContent("Filter");
  });

  it("should render export button", () => {
    render(<Transactions transactions={mockTransactions} />);

    const exportButton = screen.getByRole("button", { name: /export/i });
    expect(exportButton).toBeInTheDocument();
  });

  it("should handle empty transactions array", () => {
    render(<Transactions transactions={[]} />);

    expect(screen.getByText("0 Transactions")).toBeInTheDocument();
    expect(screen.getByTestId("no-filter")).toBeInTheDocument();
  });

  it("should display responsive text for export button", () => {
    render(<Transactions transactions={mockTransactions} />);

    const exportButton = screen.getByRole("button", { name: /export/i });
    expect(exportButton).toHaveTextContent("Export List");
  });

  it("should format transaction count with locale string", () => {
    const manyTransactions = Array(1000)
      .fill(null)
      .map((_, i) => ({
        ...mockTransactions[0],
        amount: i + 1,
        date: `2024-01-${String(i + 1).padStart(2, "0")}`,
      }));

    render(<Transactions transactions={manyTransactions} />);

    expect(screen.getByText("1,000 Transactions")).toBeInTheDocument();
  });
});
