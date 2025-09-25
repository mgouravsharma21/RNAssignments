import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';

interface PickerItem {
  label: string;
  value: string;
}

interface SimplePickerProps {
  items: PickerItem[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  style?: any;
}

const SimplePicker: React.FC<SimplePickerProps> = ({
  items,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  style,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const selectedItem = items.find(item => item.value === selectedValue);

  const renderItem = ({ item }: { item: PickerItem }) => (
    <TouchableOpacity
      style={[
        styles.item,
        item.value === selectedValue && styles.selectedItem
      ]}
      onPress={() => {
        onValueChange(item.value);
        setModalVisible(false);
      }}
    >
      <Text style={[
        styles.itemText,
        item.value === selectedValue && styles.selectedItemText
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={style}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Select Category</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
              style={styles.list}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  arrow: {
    fontSize: 12,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '80%',
    maxHeight: '60%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    fontSize: 18,
    color: '#666',
  },
  list: {
    maxHeight: 300,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedItem: {
    backgroundColor: '#e3f2fd',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedItemText: {
    color: '#2196F3',
    fontWeight: '600',
  },
});

export default SimplePicker;