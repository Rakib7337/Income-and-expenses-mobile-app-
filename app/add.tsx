import { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Switch,
  Alert,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useTransactions } from '@/hooks/useTransactions';
import { Category, categories } from '@/app/data/categories';
import { 
  Briefcase, 
  Pencil, 
  TrendingUp, 
  Utensils, 
  Car, 
  Home, 
  ShoppingBag, 
  Film, 
  HeartPulse, 
  Shapes 
} from 'lucide-react-native';

const iconMap = {
  briefcase: Briefcase,
  pencil: Pencil,
  'trending-up': TrendingUp,
  utensils: Utensils,
  car: Car,
  home: Home,
  'shopping-bag': ShoppingBag,
  film: Film,
  'heart-pulse': HeartPulse,
  shapes: Shapes,
};

export default function AddTransactionScreen() {
  const { addTransaction } = useTransactions();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isIncome, setIsIncome] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);

  const filteredCategories = useMemo(() => {
    return categories.filter((c) => c.isIncome === isIncome);
  }, [isIncome]);

  const handleAddTransaction = () => {
    if (!description || !amount || !category) {
      Alert.alert('Error', 'Please fill in all fields and select a category');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid positive amount');
      return;
    }
    addTransaction({
      description,
      amount: numericAmount,
      isIncome,
      category,
    });

    setDescription('');
    setAmount('');
    setIsIncome(false);
    setCategory(null);
    Alert.alert('Success', 'Transaction added successfully');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Expense</Text>
        <Switch
          value={isIncome}
          onValueChange={(value) => {
            setIsIncome(value);
            setCategory(null); // Reset category when type changes
          }}
        />
        <Text style={styles.switchLabel}>Income</Text>
      </View>

      <Text style={styles.categoryTitle}>Select Category</Text>
      <View style={styles.categoryContainer}>
        {filteredCategories.map((cat) => {
          const Icon = iconMap[cat.icon as keyof typeof iconMap];
          if (!Icon) return null;
          
          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryButton,
                { backgroundColor: cat.color },
                category?.id === cat.id && styles.selectedCategory,
              ]}
              onPress={() => setCategory(cat)}
            >
              <Icon color="white" size={18} />
              <Text style={styles.categoryText}>{cat.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Button title="Add Transaction" onPress={handleAddTransaction} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  switchLabel: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
    width: '100%',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 5,
    opacity: 0.7,
  },
  selectedCategory: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
