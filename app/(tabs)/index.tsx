import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react"; // useEffect eklendi
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
<<<<<<< HEAD
import { router } from "expo-router";
import { useRouter } from "expo-router";
=======
>>>>>>> 2906478a812202e82a6e7af9bd11f907a6657e60


interface FormData {
  name: string;
  surname: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  surname?: string;
  phone?: string;
}

const { width } = Dimensions.get("window");

export default function Index() {
<<<<<<< HEAD
    const router = useRouter();
=======
>>>>>>> 2906478a812202e82a6e7af9bd11f907a6657e60
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Animasyonlar
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Animasyonu başlatan doğru kullanım (useEffect)
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "İsim gereklidir";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "İsim en az 2 karakter olmalıdır";
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "Soyisim gereklidir";
    } else if (formData.surname.trim().length < 2) {
      newErrors.surname = "Soyisim en az 2 karakter olmalıdır";
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon numarası gereklidir";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Geçerli bir telefon numarası giriniz";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (): Promise<void> => {
<<<<<<< HEAD
  
=======
>>>>>>> 2906478a812202e82a6e7af9bd11f907a6657e60
    if (!validateForm()) return;

    setIsLoading(true);

    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    try {
      // Firestore'da Users koleksiyonuna veri ekle
      await addDoc(collection(db, "Users"), {
        name: formData.name.trim(),
        surname: formData.surname.trim(),
        phone: formData.phone.trim(),
        createdAt: serverTimestamp(),
      });

      Alert.alert("✨ Başarılı", `Hoş geldiniz ${formData.name} ${formData.surname}!`);
<<<<<<< HEAD
      router.replace("/(tabs)/Anasayfa");



=======
>>>>>>> 2906478a812202e82a6e7af9bd11f907a6657e60
    } catch (error) {
      console.error("Firestore kaydı başarısız:", error);
      Alert.alert("⚠️ Hata", "Veriler kaydedilemedi, lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };


  const updateField = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const isFormValid = formData.name.length > 1 && formData.surname.length > 1 && formData.phone.length >= 10;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#00d2ff", "#3a7bd5", "#00d2ff"]}
        style={styles.gradient}
      >
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />
        <View style={styles.decorCircle3} />

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <Image
                    source={require('../../assets/images/Camasirhane.jpg')}
                    style={styles.logoImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.brandName}>Çamaşır Takip</Text>
              </View>

              <View style={styles.header}>
                <Text style={styles.title}>Hoş Geldiniz</Text>
                <Text style={styles.subtitle}>Premium deneyiminiz için giriş yapın</Text>
              </View>

              {/* Form Kartı - Çerçeve kaldırıldı (borderWidth: 0) */}
              <BlurView intensity={30} tint="light" style={styles.formCard}>
                <View style={styles.formInner}>

                  {/* İsim */}
                  <View style={styles.inputContainer}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.labelIcon}>👤</Text>
                      <Text style={styles.label}>İsim</Text>
                    </View>
                    <View style={[styles.inputWrapper, focusedField === "name" && styles.inputWrapperFocused, errors.name && styles.inputWrapperError]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Adınızı giriniz"
                        placeholderTextColor="rgba(255,255,255,0.6)"
                        value={formData.name}
                        onChangeText={(v) => updateField("name", v)}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </View>
                    {errors.name && <Text style={styles.errorText}>⚠️ {errors.name}</Text>}
                  </View>

                  {/* Soyisim */}
                  <View style={styles.inputContainer}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.labelIcon}>✍️</Text>
                      <Text style={styles.label}>Soyisim</Text>
                    </View>
                    <View style={[styles.inputWrapper, focusedField === "surname" && styles.inputWrapperFocused, errors.surname && styles.inputWrapperError]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Soyadınızı giriniz"
                        placeholderTextColor="rgba(255,255,255,0.6)"
                        value={formData.surname}
                        onChangeText={(v) => updateField("surname", v)}
                        onFocus={() => setFocusedField("surname")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </View>
                    {errors.surname && <Text style={styles.errorText}>⚠️ {errors.surname}</Text>}
                  </View>

                  {/* Telefon */}
                  <View style={styles.inputContainer}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.labelIcon}>📱</Text>
                      <Text style={styles.label}>Telefon</Text>
                    </View>
                    <View style={[styles.inputWrapper, focusedField === "phone" && styles.inputWrapperFocused, errors.phone && styles.inputWrapperError]}>
                      <TextInput
                        style={styles.input}
                        placeholder="5XX XXX XX XX"
                        placeholderTextColor="rgba(255,255,255,0.6)"
                        keyboardType="phone-pad"
                        value={formData.phone}
                        onChangeText={(v) => updateField("phone", v)}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        maxLength={11}
                      />
                    </View>
                    {errors.phone && <Text style={styles.errorText}>⚠️ {errors.phone}</Text>}
                  </View>

                  {/* Giriş Butonu - Saydamlık düzeltildi */}
                  <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                    <TouchableOpacity
                      style={[styles.button, !isFormValid && styles.buttonDisabled]}
                      onPress={handleLogin}
                      disabled={!isFormValid || isLoading}
                    >
                      <LinearGradient
                        colors={isFormValid ? ["#FF416C", "#FF4B2B"] : ["#999", "#777"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.buttonGradient}
                      >
                        <Text style={styles.buttonText}>
                          {isLoading ? "⏳ Yükleniyor..." : "✨ Giriş Yap"}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </Animated.View>

                  <View style={styles.footer}>
                    <Text style={styles.footerText}>🔒 Bilgileriniz güvende</Text>
                  </View>
                </View>
              </BlurView>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  decorCircle1: { position: "absolute", width: 200, height: 200, borderRadius: 100, backgroundColor: "rgba(255, 255, 255, 0.1)", top: -50, right: -50 },
  decorCircle2: { position: "absolute", width: 150, height: 150, borderRadius: 75, backgroundColor: "rgba(255, 255, 255, 0.08)", bottom: 100, left: -30 },
  decorCircle3: { position: "absolute", width: 100, height: 100, borderRadius: 50, backgroundColor: "rgba(255, 255, 255, 0.06)", top: "40%", right: 30 },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: "center", padding: 20 },
  content: { width: "100%" },
  logoContainer: { alignItems: "center", marginBottom: 25 },
  logoCircle: { width: 110, height: 110, borderRadius: 55, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", elevation: 5, shadowOpacity: 0.2 },
  logoImage: { width: 80, height: 80 },
  brandName: { fontSize: 20, fontWeight: "700", color: "#fff", marginTop: 12 },
  header: { marginBottom: 30, alignItems: "center" },
  title: { fontSize: 36, fontWeight: "800", color: "#fff" },
  subtitle: { fontSize: 16, color: "rgba(255, 255, 255, 0.9)" },
  formCard: { borderRadius: 35, overflow: "hidden" }, // borderWidth kaldırıldı
  formInner: { padding: 25, backgroundColor: "rgba(255, 255, 255, 0.12)" },
  inputContainer: { marginBottom: 20 },
  labelContainer: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  labelIcon: { fontSize: 16, marginRight: 8 },
  label: { fontSize: 14, fontWeight: "700", color: "#fff" },
  inputWrapper: { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 12, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.2)" },
  inputWrapperFocused: { borderColor: "#fff", backgroundColor: "rgba(255, 255, 255, 0.3)" },
  inputWrapperError: { borderColor: "#FF6B6B" },
  input: { padding: 15, color: "#fff", fontSize: 16 },
  errorText: { color: "#FFD93D", fontSize: 12, marginTop: 5, fontWeight: "600" },
  button: { borderRadius: 12, overflow: "hidden", marginTop: 10, elevation: 4 },
  buttonDisabled: { opacity: 0.8 }, // Saydamlık artırıldı (daha görünür)
  buttonGradient: { paddingVertical: 18, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "800" },
  footer: { marginTop: 20, alignItems: "center" },
  footerText: { color: "rgba(255, 255, 255, 0.7)", fontSize: 13 },
});