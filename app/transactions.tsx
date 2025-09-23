import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useTransactions, Transaction } from '@/hooks/useTransactions';
import { Link } from 'expo-router';
import { Pencil, Trash2 } from 'lucide-react-native';

export default function TransactionsScreen() {
  const { transactions, isLoading, deleteTransaction } = useTransactions();

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteTransaction(id) },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Transaction }) => (
          <View style={styles.transactionItem}>
            <View>
              <Text style={styles.itemDescription}>{item.description}</Text>
              {item.category && (
                <Text style={{ fontSize: 12, color: item.category.color, fontWeight: '600', marginTop: 4 }}>
                  {item.category.name}
                </Text>
              )}
              <Text style={[styles.itemAmount, { color: item.isIncome ? 'green' : 'red' }]}>
                {item.isIncome ? '+' : '-'} ${item.amount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Link href={`/edit/${item.id}`} asChild>
                <TouchableOpacity style={styles.button}>
                  <Pencil size={20} color="#2563eb" />
                </TouchableOpacity>
              </Link>
              <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
                <Trash2 size={20} color="#dc2626" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No transactions yet.</Text>
            <Text style={styles.emptySubtext}>Add your first transaction to get started!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemDescription: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 15,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
});
