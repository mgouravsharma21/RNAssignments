import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export interface CategorySummary {
  category: string;
  total: number;
  count: number;
}

class AsyncStorageService {
  private readonly EXPENSES_KEY = '@expenses';

  async addExpense(expense: Omit<Expense, 'id'>): Promise<string> {
    try {
      const expenses = await this.getAllExpenses();
      const newExpense: Expense = {
        ...expense,
        id: Date.now().toString(),
      };
      
      expenses.push(newExpense);
      await AsyncStorage.setItem(this.EXPENSES_KEY, JSON.stringify(expenses));
      
      return newExpense.id;
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  }

  async getAllExpenses(): Promise<Expense[]> {
    try {
      const data = await AsyncStorage.getItem(this.EXPENSES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting expenses:', error);
      return [];
    }
  }

  async getExpensesByCategory(): Promise<CategorySummary[]> {
    try {
      const expenses = await this.getAllExpenses();
      const categoryMap: { [key: string]: CategorySummary } = {};

      expenses.forEach(expense => {
        if (!categoryMap[expense.category]) {
          categoryMap[expense.category] = {
            category: expense.category,
            total: 0,
            count: 0,
          };
        }
        categoryMap[expense.category].total += expense.amount;
        categoryMap[expense.category].count += 1;
      });

      return Object.values(categoryMap).sort((a, b) => b.total - a.total);
    } catch (error) {
      console.error('Error getting expenses by category:', error);
      return [];
    }
  }

  async deleteExpense(id: string): Promise<void> {
    try {
      const expenses = await this.getAllExpenses();
      const filteredExpenses = expenses.filter(expense => expense.id !== id);
      await AsyncStorage.setItem(this.EXPENSES_KEY, JSON.stringify(filteredExpenses));
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  }

  async updateExpense(updatedExpense: Expense): Promise<void> {
    try {
      const expenses = await this.getAllExpenses();
      const index = expenses.findIndex(expense => expense.id === updatedExpense.id);
      
      if (index !== -1) {
        expenses[index] = updatedExpense;
        await AsyncStorage.setItem(this.EXPENSES_KEY, JSON.stringify(expenses));
      }
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  }

  async getTotalExpenses(): Promise<number> {
    try {
      const expenses = await this.getAllExpenses();
      return expenses.reduce((total, expense) => total + expense.amount, 0);
    } catch (error) {
      console.error('Error getting total expenses:', error);
      return 0;
    }
  }

  async getExpensesForPeriod(startDate: string, endDate: string): Promise<Expense[]> {
    try {
      const expenses = await this.getAllExpenses();
      return expenses.filter(expense => 
        expense.date >= startDate && expense.date <= endDate
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('Error getting expenses for period:', error);
      return [];
    }
  }

  async clearAllExpenses(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.EXPENSES_KEY);
    } catch (error) {
      console.error('Error clearing expenses:', error);
      throw error;
    }
  }

  async importExpenses(expenses: Expense[]): Promise<number> {
    try {
      const existingExpenses = await this.getAllExpenses();
      let importedCount = 0;

      for (const expense of expenses) {
        // Check if expense already exists (by comparing title, amount, date)
        const exists = existingExpenses.some(existing => 
          existing.title === expense.title &&
          existing.amount === expense.amount &&
          existing.date === expense.date
        );

        if (!exists) {
          const newExpense = {
            ...expense,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          };
          existingExpenses.push(newExpense);
          importedCount++;
        }
      }

      await AsyncStorage.setItem(this.EXPENSES_KEY, JSON.stringify(existingExpenses));
      return importedCount;
    } catch (error) {
      console.error('Error importing expenses:', error);
      throw error;
    }
  }
}

export default new AsyncStorageService();