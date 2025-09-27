import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { useTransactions } from '@/hooks/useTransactions';
import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface StatCardProps {
  title: string;
  value: number;
  icon: 'income' | 'expense' | 'balance' | 'total';
  gradient: string[];
  iconColor: string;
}

const StatCard = ({ title, value, icon, gradient, iconColor }: StatCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case 'income':
        return <TrendingUp size={24} color={iconColor} strokeWidth={2.5} />;
      case 'expense':
        return <TrendingDown size={24} color={iconColor} strokeWidth={2.5} />;
      case 'balance':
        return <Wallet size={24} color={iconColor} strokeWidth={2.5} />;
      case 'total':
        return <DollarSign size={24} color={iconColor} strokeWidth={2.5} />;
      default:
        return <Wallet size={24} color={iconColor} strokeWidth={2.5} />;
    }
  };

  return (
    <LinearGradient colors={gradient} style={styles.card} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          {getIcon()}
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.cardValue}>${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
    </LinearGradient>
  );
};

export default function HomeScreen() {
  const { transactions, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
        <Text style={styles.loadingText}>Loading your finances...</Text>
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
  const totalTransactions = income + expenses;

  const recentTransactions = transactions.slice(0, 3);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning</Text>
        <Text style={styles.title}>Financial Overview</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard 
          title="Balance" 
          value={balance} 
          icon="balance" 
          gradient={balance >= 0 ? ['#000000', '#333333'] : ['#EF4444', '#DC2626']}
          iconColor="#ffffff"
        />
        <StatCard 
          title="Income" 
          value={income} 
          icon="income" 
          gradient={['#10B981', '#059669']}
          iconColor="#ffffff"
        />
        <StatCard 
          title="Expenses" 
          value={expenses} 
          icon="expense" 
          gradient={['#F59E0B', '#D97706']}
          iconColor="#ffffff"
        />
        <StatCard 
          title="Total Flow" 
          value={totalTransactions} 
          icon="total" 
          gradient={['#8B5CF6', '#7C3AED']}
          iconColor="#ffffff"
        />
      </View>

      {recentTransactions.length > 0 && (
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.recentList}>
            {recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.recentItem}>
                <View style={styles.recentItemLeft}>
                  <View style={[
                    styles.recentIcon,
                    { backgroundColor: transaction.category?.color || '#9CA3AF' }
                  ]}>
                    <Text style={styles.recentIconText}>
                      {transaction.category?.name.charAt(0) || 'T'}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.recentDescription}>{transaction.description}</Text>
                    <Text style={styles.recentCategory}>{transaction.category?.name || 'Other'}</Text>
                  </View>
                </View>
                <Text style={[
                  styles.recentAmount,
                  { color: transaction.isIncome ? '#10B981' : '#EF4444' }
                ]}>
                  {transaction.isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {transactions.length === 0 && (
        <View style={styles.emptyState}>
          <Wallet size={64} color="#E5E7EB" strokeWidth={1.5} />
          <Text style={styles.emptyTitle}>Start Your Financial Journey</Text>
          <Text style={styles.emptyDescription}>
            Add your first transaction to begin tracking your income and expenses
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  statsGrid: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    opacity: 0.9,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  recentSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  recentList: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  recentItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentIconText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  recentDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  recentCategory: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  recentAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 24,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});