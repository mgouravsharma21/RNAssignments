import SQLite from 'react-native-sqlite-2';

export interface Expense {
  id?: number;
  category: string;
  amount: number;
  description: string;
  date: string;
}

export interface CategoryTotal {
  category: string;
  total: number;
}

class DatabaseService {
  private db: any;

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    this.db = SQLite.openDatabase('expenses.db', '1.0', '', 1);
    this.createTables();
  }

  private createTables() {
    this.db.transaction((tx: any) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category TEXT NOT NULL,
          amount REAL NOT NULL,
          description TEXT,
          date TEXT NOT NULL
        );`,
        [],
        () => console.log('Expenses table created successfully'),
        (error: any) => console.error('Error creating expenses table:', error)
      );
    });
  }

  addExpense(expense: Expense): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: any) => {
        tx.executeSql(
          'INSERT INTO expenses (category, amount, description, date) VALUES (?, ?, ?, ?)',
          [expense.category, expense.amount, expense.description, expense.date],
          () => {
            console.log('Expense added successfully');
            resolve();
          },
          (error: any) => {
            console.error('Error adding expense:', error);
            reject(error);
          }
        );
      });
    });
  }

  getAllExpenses(): Promise<Expense[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: any) => {
        tx.executeSql(
          'SELECT * FROM expenses ORDER BY date DESC',
          [],
          (tx: any, results: any) => {
            const expenses: Expense[] = [];
            for (let i = 0; i < results.rows.length; i++) {
              expenses.push(results.rows.item(i));
            }
            resolve(expenses);
          },
          (error: any) => {
            console.error('Error fetching expenses:', error);
            reject(error);
          }
        );
      });
    });
  }

  getExpensesByCategory(): Promise<CategoryTotal[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: any) => {
        tx.executeSql(
          'SELECT category, SUM(amount) as total FROM expenses GROUP BY category',
          [],
          (tx: any, results: any) => {
            const categoryTotals: CategoryTotal[] = [];
            for (let i = 0; i < results.rows.length; i++) {
              categoryTotals.push(results.rows.item(i));
            }
            resolve(categoryTotals);
          },
          (error: any) => {
            console.error('Error fetching expenses by category:', error);
            reject(error);
          }
        );
      });
    });
  }

  deleteExpense(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: any) => {
        tx.executeSql(
          'DELETE FROM expenses WHERE id = ?',
          [id],
          () => {
            console.log('Expense deleted successfully');
            resolve();
          },
          (error: any) => {
            console.error('Error deleting expense:', error);
            reject(error);
          }
        );
      });
    });
  }

  getAllExpensesForBackup(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.getAllExpenses()
        .then(expenses => {
          const backupData = JSON.stringify(expenses, null, 2);
          resolve(backupData);
        })
        .catch(error => reject(error));
    });
  }

  restoreFromBackup(backupData: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const expenses: Expense[] = JSON.parse(backupData);
        
        // Clear existing data first
        this.db.transaction((tx: any) => {
          tx.executeSql('DELETE FROM expenses', [], () => {
            // Insert backup data
            const insertPromises = expenses.map(expense => 
              this.addExpense({
                category: expense.category,
                amount: expense.amount,
                description: expense.description,
                date: expense.date
              })
            );
            
            Promise.all(insertPromises)
              .then(() => resolve())
              .catch(error => reject(error));
          });
        });
      } catch (error) {
        reject(new Error('Invalid backup data format'));
      }
    });
  }
}

export default new DatabaseService();