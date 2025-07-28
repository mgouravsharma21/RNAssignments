import { Dimensions, StyleSheet } from "react-native";

const CARD_MARGIN = 10;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - CARD_MARGIN * 4) / 2; // 2 cards per row

const styles = StyleSheet.create({
    rootLayout: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 7,
    },
    assignmentItem: {
        paddingVertical: 16,
        backgroundColor: "#2E53A6",
        paddingHorizontal: 18,
        borderRadius: 8,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    },
    assignmentItemText: {
        fontWeight: 'medium',
        color: '#fff'
    },
    assignmentHeaderText: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2E53A6',
        marginBottom: 16,
    },
    greetingItemContainer: {
        margin: 8,
        flex: 1,
        borderRadius: 8,
        padding: 26,
        backgroundColor: '#2E53A6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleTextTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2E53A6',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 16,
    },
    toggleSwitch: {
        marginTop: 16,
        alignSelf: 'center',
    },
    text: {
        textAlign: 'center',
        color: '#fff',
    fontSize: 16
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  greeting: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    alignContent: 'center',
  },
  todoInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  todoList: {
    marginTop: 20,
  },
  todoItem: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todoText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardGridContainer: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: CARD_MARGIN,
    backgroundColor: '#f2f2f2',
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: CARD_MARGIN,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: CARD_MARGIN,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  memorizedComponentContainer: {
    flex: 1,
    padding: 24,
    marginTop: 60,
  },
  memorizedComponentInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  counterText: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: '500',
  },
  childContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
  },
  childText: {
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  listContainer: {
    padding: 16,
  },
  userCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
  },container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  lightBackground: {
    backgroundColor: '#f2f2f2',
  },
  DarkModeTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
});

export default styles;