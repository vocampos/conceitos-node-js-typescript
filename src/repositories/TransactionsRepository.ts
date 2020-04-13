import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.getTotalByType('income');
    const outcome = this.getTotalByType('outcome');
    const total = income - outcome;

    return new Balance({ income, outcome, total });
  }

  public create({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  private getTotalByType(type: string): number {
    const items = this.transactions.filter(t => t.type === type);
    return items.reduce((total, transaction) => {
      return total + transaction.value;
    }, 0);
  }
}

export default TransactionsRepository;
