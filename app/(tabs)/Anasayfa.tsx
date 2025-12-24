import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

type MachineType = 'wash' | 'dry';
type Status = 'free' | 'busy';

type Machine = {
  id: string;
  name: string;
  type: MachineType;
  status: Status;
  startedAt?: number;
  duration?: number;
};

// 🔹 MAKİNELER BURADA
const MACHINES: Machine[] = [
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `wash-${i + 1}`,
    name: `Yıkama ${i + 1}`,
    type: 'wash' as const,
    status: 'free' as const,
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `dry-${i + 1}`,
    name: `Kurutma ${i + 1}`,
    type: 'dry' as const,
    status: 'free' as const,
  })),
];

function ProgressBar({ progress }: { progress: number }) {
  return (
    <View style={progressStyles.container}>
      <LinearGradient
        colors={['#2ECC71', '#F1C40F', '#E74C3C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          progressStyles.bar,
          { width: `${progress * 100}%` },
        ]}
      />
    </View>
  );
}

export default function Home() {
  const router = useRouter();

  // ❗ Context yok → local state
  const [machines, setMachines] = useState<Machine[]>(MACHINES);
  const [activeTab, setActiveTab] = useState<MachineType>('wash');
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredMachines = machines.filter(
    (m) => m.type === activeTab
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Çamaşırhane</Text>

      {/* SEKME */}
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, activeTab === 'wash' && styles.activeTab]}
          onPress={() => setActiveTab('wash')}
        >
          <Text style={styles.tabText}>🧺 Yıkama</Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'dry' && styles.activeTab]}
          onPress={() => setActiveTab('dry')}
        >
          <Text style={styles.tabText}>🔥 Kurutma</Text>
        </Pressable>
      </View>

      {/* LİSTE */}
      <FlatList
        data={filteredMachines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          let timeLeft = 0;
          let progress = 0;

          if (item.status === 'busy' && item.startedAt && item.duration) {
            const elapsed = (now - item.startedAt) / 60000;
            timeLeft = Math.max(
              0,
              Math.ceil(item.duration - elapsed)
            );
            progress = timeLeft / item.duration;
          }

          return (
            <Pressable
              style={[
                styles.card,
                item.status === 'free' && styles.freeCard,
              ]}
              onPress={() =>
                router.push(
                  `/machine/${item.id}?type=${item.type}&status=${item.status}`
                )
              }
            >
              <Text style={styles.title}>{item.name}</Text>

              <Text
                style={{
                  color: item.status === 'free' ? 'green' : 'red',
                }}
              >
                {item.status === 'free'
                  ? 'Boş'
                  : `Dolu • ${timeLeft} dk`}
              </Text>

              {item.status === 'busy' && (
                <ProgressBar progress={progress} />
              )}
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f2f2f2' },
  header: { fontSize: 26, fontWeight: '600', marginBottom: 12 },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#ddd',
    borderRadius: 12,
  },
  tab: { flex: 1, padding: 12, alignItems: 'center' },
  activeTab: { backgroundColor: '#3CCFCF', borderRadius: 12 },
  tabText: { fontSize: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  freeCard: {
    backgroundColor: '#E9F7EF',
    borderColor: '#2ECC71',
    borderWidth: 1,
  },
  title: { fontSize: 16, fontWeight: '500' },
});

const progressStyles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: '#ccc',
    borderRadius: 6,
    marginTop: 8,
    overflow: 'hidden',
  },
  bar: { height: '100%' },
});
