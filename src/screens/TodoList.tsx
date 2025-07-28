import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import styles from '../styles/StyleSheet';
import TodoItem from '../props/TodoItem.prop';

const TodoList: React.FC = () => {
  const [todoText, setTodoText] = useState<string>('');
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = () => {
    if (todoText.trim().length === 0) return;

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: todoText.trim(),
    };

    setTodos([...todos, newTodo]);
    setTodoText('');
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const renderItem = ({ item }: { item: TodoItem }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.text}</Text>
      <TouchableOpacity
        onPress={() => deleteTodo(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.rootLayout}>
      <TextInput
        style={styles.todoInput}
        placeholder="Enter a todo"
        value={todoText}
        onChangeText={setTodoText}
      />
      <Button title="Add Todo" onPress={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.todoList}
      />
    </SafeAreaView>
  );
};

export default TodoList;
