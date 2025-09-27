import { StyleSheet, View, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';
import { useTransactions } from '@/hooks/useTransactions';
import { Trash2, Info, Shield, HelpCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress: () => void;
  destructive?: boolean;
}

const SettingItem = ({ icon, title, description, onPress, destructive = false }: SettingItemProps) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.settingIcon, destructive && styles.destructiveIcon]}>
      {icon}
    </View>
    <View style={styles.settingContent}>
      <Text style={[styles.settingTitle, destructive && styles.destructiveText]}>
        {title}
      </Text>
      <Text style={styles.settingDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const { clearAllTransactions, transactions } = useTransactions();

  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      `This will permanently delete all ${transactions.length} transaction${transactions.length !== 1 ? 's' : ''} from your device. This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear All Data", 
          style: "destructive", 
          onPress: () => {
            clearAllTransactions();
            Alert.alert("Success", "All transaction data has been cleared.");
          }
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "About",
      "Income & Expense Manager v1.0.0\n\nA simple and elegant way to track your personal finances.\n\nBuilt with React Native and Expo.",
      [{ text: "OK" }]
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      "Privacy",
      "Your financial data is stored locally on your device and is never transmitted to external servers. We respect your privacy and do not collect any personal information.",
      [{ text: "OK" }]
    );
  };

  const handleHelp = () => {
    Alert.alert(
      "Help & Support",
      "• Tap the '+' tab to add new transactions\n• Swipe to edit or delete transactions\n• View your financial overview on the Home tab\n• All data is stored securely on your device",
      [{ text: "OK" }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your app preferences</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon={<Info size={20} color="#6B7280" strokeWidth={2} />}
            title="About"
            description="App version and information"
            onPress={handleAbout}
          />
          <SettingItem
            icon={<Shield size={20} color="#6B7280" strokeWidth={2} />}
            title="Privacy"
            description="How we handle your data"
            onPress={handlePrivacy}
          />
          <SettingItem
            icon={<HelpCircle size={20} color="#6B7280" strokeWidth={2} />}
            title="Help & Support"
            description="Get help using the app"
            onPress={handleHelp}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon={<Trash2 size={20} color="#EF4444" strokeWidth={2} />}
            title="Clear All Data"
            description={`Delete all ${transactions.length} transaction${transactions.length !== 1 ? 's' : ''} permanently`}
            onPress={handleClearData}
            destructive
          />
        </View>
      </View>

      <View style={styles.footer}>
        <LinearGradient
          colors={['#F3F4F6', '#E5E7EB']}
          style={styles.footerGradient}
        >
          <Text style={styles.footerText}>
            Made with ❤️ for better financial tracking
          </Text>
          <Text style={styles.footerSubtext}>
            Version 1.0.0
          </Text>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  destructiveIcon: {
    backgroundColor: '#FEF2F2',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  destructiveText: {
    color: '#EF4444',
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  footer: {
    marginHorizontal: 24,
    marginBottom: 100,
    borderRadius: 16,
    overflow: 'hidden',
  },
  footerGradient: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});