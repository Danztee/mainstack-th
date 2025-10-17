import { Transaction } from "@/types";

export type FilterPeriod = "today" | "last7days" | "thisMonth" | "last3Months";
export type TransactionStatus = "successful" | "pending" | "failed";
export type TransactionType =
  | "storeTransactions"
  | "getTipped"
  | "withdrawal"
  | "chargebacks"
  | "cashbacks"
  | "referAndEarn";

export interface FilterState {
  period: FilterPeriod | null;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  statuses: TransactionStatus[];
  types: TransactionType[];
}

const typeMapping: Record<TransactionType, string[]> = {
  storeTransactions: ["digital_product", "coffee", "webinar"],
  getTipped: ["tip"],
  withdrawal: ["withdrawal"],
  chargebacks: ["chargeback"],
  cashbacks: ["cashback"],
  referAndEarn: ["referral", "earn"],
};

export function filterTransactions(
  transactions: Transaction[],
  filters: FilterState
): Transaction[] {
  return transactions.filter((transaction) => {
    if (filters.dateFrom || filters.dateTo || filters.period) {
      const transactionDate = new Date(transaction.date);
      transactionDate.setHours(0, 0, 0, 0);

      if (filters.dateFrom) {
        const fromDate = new Date(filters.dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        if (transactionDate < fromDate) {
          return false;
        }
      }

      if (filters.dateTo) {
        const toDate = new Date(filters.dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (transactionDate > toDate) {
          return false;
        }
      }

      if (filters.period && !filters.dateFrom && !filters.dateTo) {
        const now = new Date();
        const periodStart = getPeriodStartDate(filters.period, now);
        if (transactionDate < periodStart) {
          return false;
        }
      }
    }

    if (filters.statuses.length > 0) {
      if (!filters.statuses.includes(transaction.status as TransactionStatus)) {
        return false;
      }
    }

    if (filters.types.length > 0) {
      const transactionType = getTransactionType(transaction);
      const matchesType = filters.types.some((filterType) => {
        const mappedTypes = typeMapping[filterType];
        return mappedTypes.includes(transactionType);
      });

      if (!matchesType) {
        return false;
      }
    }

    return true;
  });
}

function getPeriodStartDate(period: FilterPeriod, now: Date): Date {
  const start = new Date(now);

  switch (period) {
    case "today":
      start.setHours(0, 0, 0, 0);
      break;
    case "last7days":
      start.setDate(now.getDate() - 7);
      start.setHours(0, 0, 0, 0);
      break;
    case "thisMonth":
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      break;
    case "last3Months":
      start.setMonth(now.getMonth() - 3);
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      break;
  }

  return start;
}

function getTransactionType(transaction: Transaction): string {
  if (transaction.type === "withdrawal") {
    return "withdrawal";
  }

  if (transaction.metadata?.type) {
    return transaction.metadata.type;
  }

  return transaction.type;
}

export function getActiveFiltersCount(filters: FilterState): number {
  let count = 0;

  if (filters.period) count++;
  if (filters.dateFrom) count++;
  if (filters.dateTo) count++;
  if (filters.statuses.length > 0) count++;
  if (filters.types.length > 0) count++;

  return count;
}

export function getFilterDescription(
  filters: FilterState,
  totalCount: number
): string {
  if (getActiveFiltersCount(filters) === 0) {
    return "Your transactions for the last 7 days";
  }

  const parts: string[] = [];

  if (filters.period) {
    const periodLabels: Record<FilterPeriod, string> = {
      today: "today",
      last7days: "the last 7 days",
      thisMonth: "this month",
      last3Months: "the last 3 months",
    };
    parts.push(periodLabels[filters.period]);
  } else if (filters.dateFrom || filters.dateTo) {
    if (filters.dateFrom && filters.dateTo) {
      parts.push(
        `from ${filters.dateFrom.toLocaleDateString()} to ${filters.dateTo.toLocaleDateString()}`
      );
    } else if (filters.dateFrom) {
      parts.push(`from ${filters.dateFrom.toLocaleDateString()}`);
    } else if (filters.dateTo) {
      parts.push(`until ${filters.dateTo.toLocaleDateString()}`);
    }
  }

  if (filters.types.length > 0) {
    const typeLabels: Record<TransactionType, string> = {
      storeTransactions: "Store Transactions",
      getTipped: "Get Tipped",
      withdrawal: "Withdrawals",
      chargebacks: "Chargebacks",
      cashbacks: "Cashbacks",
      referAndEarn: "Refer & Earn",
    };
    const typeNames = filters.types.map((type) => typeLabels[type]);
    if (typeNames.length === 1) {
      parts.push(typeNames[0]);
    } else if (typeNames.length === 2) {
      parts.push(`${typeNames[0]} and ${typeNames[1]}`);
    } else {
      parts.push(
        `${typeNames.slice(0, -1).join(", ")}, and ${
          typeNames[typeNames.length - 1]
        }`
      );
    }
  }

  if (filters.statuses.length > 0) {
    const statusLabels: Record<TransactionStatus, string> = {
      successful: "Successful",
      pending: "Pending",
      failed: "Failed",
    };
    const statusNames = filters.statuses.map((status) => statusLabels[status]);
    if (statusNames.length === 1) {
      parts.push(statusNames[0]);
    } else if (statusNames.length === 2) {
      parts.push(`${statusNames[0]} and ${statusNames[1]}`);
    } else {
      parts.push(
        `${statusNames.slice(0, -1).join(", ")}, and ${
          statusNames[statusNames.length - 1]
        }`
      );
    }
  }

  const datePart = parts.length > 0 ? ` for ${parts.join(", ")}` : "";
  return `Filtered results from ${totalCount} total transactions${datePart}`;
}
