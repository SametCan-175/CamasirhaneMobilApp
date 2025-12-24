import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function MachineDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const id = params.id as string;
  const initialStatus = (params.status as string) ?? 'free';
  const initialDuration = Number(params.duration ?? 0);

  const [status, setStatus] = useState<'free' | 'busy'>(initialStatus as any);
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);

  // ⏱️ geri sayım
  useEffect(() => {
    if (status !== 'busy' || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000); // 1 dk
    <Text style={styles.info}>
  Kalan süre: {timeLeft} dk (test modu)
</Text>


    return () => clearInterval(interval);
  }, [status, timeLeft]);

  // ⛔ süre bitince boş yap
  useEffect(() => {
    if (timeLeft <= 0 && status === 'busy') {
      setStatus('free');
    }
  }, [timeLeft]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Makine {id}</Text>

      <Text style={styles.info}>
        Durum: {status === 'busy' ? 'Dolu' : 'Boş'}
      </Text>

      {status === 'busy' && (
        <Text style={styles.info}>
          Kalan süre: {timeLeft} dk
        </Text>
      )}

      {status === 'free' && (
        <Pressable
          style={styles.button}
          onPress={() => router.push(`/machine/${id}/reserve`)}
        >
          <Text style={styles.buttonText}>Rezervasyon Yap</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 16,
  },
  info: {
    fontSize: 18,
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#3CCFCF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
