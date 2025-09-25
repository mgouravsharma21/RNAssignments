import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import DatabaseService, { Expense, CategoryTotal } from '../services/DatabaseService';
import BackupService from '../services/BackupService';

const { width: screenWidth } = Dimensions.get('window');

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Groceries',
  'Fuel',
  'Other'
];

const CHART_COLORS = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
  '#FF6384',
  '#C9CBCF',
  '#FF8A80',
  '#8BC34A'
];

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categoryTotals, setCategoryTotals] = useState<CategoryTotal[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
  // Form state
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Format currency in Indian format
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const loadData = useCallback(async () => {
    try {
      const [expenseList, categoryData] = await Promise.all([
        DatabaseService.getAllExpenses(),
        DatabaseService.getExpensesByCategory()
      ]);
      setExpenses(expenseList);
      setCategoryTotals(categoryData);
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load expense data');
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddExpense = async () => {
    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid positive amount');
      return;
    }

    const newExpense: Expense = {
      category,
      amount: Number(amount),
      description: description.trim() || 'No description',
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    };

    try {
      await DatabaseService.addExpense(newExpense);
      await loadData();
      
      // Reset form
      setAmount('');
      setDescription('');
      setShowAddForm(false);
      
      Alert.alert('Success', 'Expense added successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense');
    }
  };

  const handleDeleteExpense = async (id: number) => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await DatabaseService.deleteExpense(id);
              await loadData();
              Alert.alert('Success', 'Expense deleted successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete expense');
            }
          },
        },
      ]
    );
  };

  const prepareChartData = () => {
    if (categoryTotals.length === 0) {
      return [{
        name: 'No Data',
        amount: 1,
        color: '#C9CBCF',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      }];
    }

    return categoryTotals.map((item, index) => ({
      name: item.category,
      amount: item.total,
      color: CHART_COLORS[index % CHART_COLORS.length],
      legendFontColor: '#333',
      legendFontSize: 12,
    }));
  };

  const getTotalExpenses = () => {
    return categoryTotals.reduce((sum, item) => sum + item.total, 0);
  };

  const renderCategorySelector = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
      {CATEGORIES.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.categoryButton,
            category === cat && styles.categoryButtonActive
          ]}
          onPress={() => setCategory(cat)}
        >
          <Text style={[
            styles.categoryButtonText,
            category === cat && styles.categoryButtonTextActive
          ]}>
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.totalAmount}>
          Total: ₹{formatCurrency(getTotalExpenses())}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddForm(!showAddForm)}
        >
          <Text style={styles.addButtonText}>
            {showAddForm ? 'Cancel' : 'Add Expense'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.backupButton}
          onPress={() => BackupService.createBackup()}
        >
          <Text style={styles.backupButtonText}>Backup</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.restoreButton}
          onPress={() => BackupService.restoreFromBackup().then(() => loadData())}
        >
          <Text style={styles.restoreButtonText}>Restore</Text>
        </TouchableOpacity>
      </View>

      {/* Add Expense Form */}
      {showAddForm && (
        <View style={styles.addForm}>
          <Text style={styles.formTitle}>Add New Expense</Text>
          
          <Text style={styles.label}>Category:</Text>
          {renderCategorySelector()}
          
          <Text style={styles.label}>Amount (₹):</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount in INR"
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description (optional)"
            multiline
          />
          
          <TouchableOpacity style={styles.submitButton} onPress={handleAddExpense}>
            <Text style={styles.submitButtonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Pie Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Expenses by Category</Text>
        {categoryTotals.length > 0 ? (
          <View style={styles.chartWrapper}>
            <PieChart
              data={prepareChartData()}
              width={screenWidth - 64}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="0"
              center={[0, 0]}
              hasLegend={true}
              absolute={false}
            />
          </View>
        ) : (
          <View style={styles.noChartData}>
            <Text style={styles.noDataText}>Add some expenses to see the chart</Text>
          </View>
        )}
      </View>

      {/* Expense List */}
      <View style={styles.expenseList}>
        <Text style={styles.sectionTitle}>Recent Expenses</Text>
        {expenses.length === 0 ? (
          <Text style={styles.noDataText}>No expenses found. Add your first expense!</Text>
        ) : (
          expenses.slice(0, 10).map((expense) => (
            <View key={expense.id} style={styles.expenseItem}>
              <View style={styles.expenseInfo}>
                <Text style={styles.expenseCategory}>{expense.category}</Text>
                <Text style={styles.expenseDescription}>{expense.description}</Text>
                <Text style={styles.expenseDate}>{expense.date}</Text>
              </View>
              <View style={styles.expenseActions}>
                <Text style={styles.expenseAmount}>₹{formatCurrency(expense.amount)}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => expense.id && handleDeleteExpense(expense.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2196F3',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  backupButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  backupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  restoreButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  restoreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  addForm: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  categoryScroll: {
    marginBottom: 12,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#2196F3',
  },
  categoryButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: 'white',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  noChartData: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  expenseList: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noDataText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginVertical: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  expenseInfo: {
    flex: 1,
  },
  expenseCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  expenseDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  expenseDate: {
    fontSize: 12,
    color: '#999',
  },
  expenseActions: {
    alignItems: 'flex-end',
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ExpenseTracker;