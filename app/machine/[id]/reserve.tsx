import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

export default function Reserve() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [duration, setDuration] = useState<number>(30);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Makine {id}</Text>
      <Text style={styles.subtitle}>Rezervasyon Süresi Seç</Text>

      <View style={styles.options}>
        {[30, 60, 90].map((time) => (
          <Pressable
            key={time}
            style={[
              styles.option,
              duration === time && styles.optionActive,
            ]}
            onPress={() => setDuration(time)}
          >
            <Text
              style={[
                styles.optionText,
                duration === time && styles.optionTextActive,
              ]}
            >
              {time} dk
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={styles.confirmButton}
        onPress={() =>
          router.replace(
            `/machine/${id}?status=busy&duration=${duration}`
          )
        }
      >
        <Text style={styles.confirmText}>
          Rezervasyonu Onayla
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    color: '#666',
  },
  options: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: 12,
  },
  optionActive: {
    backgroundColor: '#3CCFCF',
  },
  optionText: {
    fontSize: 16,
  },
  optionTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  confirmButton: {
    marginTop: 'auto',
    backgroundColor: '#3CCFCF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
