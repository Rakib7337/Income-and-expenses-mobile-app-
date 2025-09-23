import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useTransactions } from '@/hooks/useTransactions';
import { CircleArrowUp as ArrowUpCircle, CircleArrowDown as ArrowDownCircle, Wallet } from 'lucide-react-native';

interface StatCardProps {
  title: string;
  value: number;
  icon: 'income' | 'expense' | 'balance';
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  const IconComponent = icon === 'income' ? ArrowUpCircle : icon === 'expense' ? ArrowDownCircle : Wallet;
  
  return (
    <View style={styles.card}>
      <IconComponent size={32} color={color} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={[styles.cardValue, { color }]}>${value.toFixed(2)}</Text>
    </View>
  );
};

export default function HomeScreen() {
  const { transactions, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const income = transactions
    .filter((t) => t.isIncome)
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => !t.isIncome)
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <StatCard title="Income" value={income} icon="income" color="#16a34a" />
      <StatCard title="Expenses" value={expenses} icon="expense" color="#dc2626" />
      <StatCard title="Balance" value={balance} icon="balance" color={balance >= 0 ? "#2563eb" : "#dc2626"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  }
});
