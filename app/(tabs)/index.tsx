import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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

  useState(() => {
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
  });

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
    if (validateForm()) {
      setIsLoading(true);

      // Buton animasyonu
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      // Simüle edilmiş API çağrısı
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert(
          "✨ Başarılı",
          `Hoş geldiniz ${formData.name} ${formData.surname}!\n\nTelefon: ${formData.phone}`,
          [{ text: "Harika!", style: "default" }]
        );
      }, 1500);
    }
  };

  const updateField = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const isFormValid = formData.name && formData.surname && formData.phone;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#00d2ff", "#3a7bd5", "#00d2ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Dekoratif Arka Plan Şekilleri */}
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
              {/* Logo/Icon Alanı */}
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoText}>👤</Text>
                </View>
              </View>

              {/* Başlık */}
              <View style={styles.header}>
                <Text style={styles.title}>Hoş Geldiniz</Text>
                <Text style={styles.subtitle}>
                  Premium deneyiminiz için giriş yapın
                </Text>
              </View>

              {/* Form Kartı */}
              <BlurView intensity={20} tint="light" style={styles.formCard}>
                <View style={styles.formInner}>
                  {/* İsim */}
                  <View style={styles.inputContainer}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.labelIcon}>👤</Text>
                      <Text style={styles.label}>İsim</Text>
                    </View>
                    <View
                      style={[
                        styles.inputWrapper,
                        focusedField === "name" && styles.inputWrapperFocused,
                        errors.name && styles.inputWrapperError,
                      ]}
                    >
                      <TextInput
                        style={styles.input}
                        placeholder="Adınızı giriniz"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        value={formData.name}
                        onChangeText={(value) => updateField("name", value)}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        autoCapitalize="words"
                      />
                    </View>
                    {errors.name && (
                      <Text style={styles.errorText}>⚠️ {errors.name}</Text>
                    )}
                  </View>

                  {/* Soyisim */}
                  <View style={styles.inputContainer}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.labelIcon}>✍️</Text>
                      <Text style={styles.label}>Soyisim</Text>
                    </View>
                    <View
                      style={[
                        styles.inputWrapper,
                        focusedField === "surname" && styles.inputWrapperFocused,
                        errors.surname && styles.inputWrapperError,
                      ]}
                    >
                      <TextInput
                        style={styles.input}
                        placeholder="Soyadınızı giriniz"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        value={formData.surname}
                        onChangeText={(value) => updateField("surname", value)}
                        onFocus={() => setFocusedField("surname")}
                        onBlur={() => setFocusedField(null)}
                        autoCapitalize="words"
                      />
                    </View>
                    {errors.surname && (
                      <Text style={styles.errorText}>⚠️ {errors.surname}</Text>
                    )}
                  </View>

                  {/* Telefon */}
                  <View style={styles.inputContainer}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.labelIcon}>📱</Text>
                      <Text style={styles.label}>Telefon</Text>
                    </View>
                    <View
                      style={[
                        styles.inputWrapper,
                        focusedField === "phone" && styles.inputWrapperFocused,
                        errors.phone && styles.inputWrapperError,
                      ]}
                    >
                      <TextInput
                        style={styles.input}
                        placeholder="5XX XXX XX XX"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        keyboardType="phone-pad"
                        value={formData.phone}
                        onChangeText={(value) => updateField("phone", value)}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        maxLength={11}
                      />
                    </View>
                    {errors.phone && (
                      <Text style={styles.errorText}>⚠️ {errors.phone}</Text>
                    )}
                  </View>

                  {/* Giriş Butonu */}
                  <Animated.View
                    style={{ transform: [{ scale: buttonScale }] }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.button,
                        !isFormValid && styles.buttonDisabled,
                      ]}
                      onPress={handleLogin}
                      activeOpacity={0.85}
                      disabled={!isFormValid || isLoading}
                    >
                      <LinearGradient
                        colors={
                          isFormValid
                            ? ["#FF6B6B", "#FF8E53", "#FFD93D"]
                            : ["#cccccc", "#aaaaaa"]
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.buttonGradient}
                      >
                        {isLoading ? (
                          <Text style={styles.buttonText}>⏳ Yükleniyor...</Text>
                        ) : (
                          <Text style={styles.buttonText}>
                            ✨ Giriş Yap
                          </Text>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                  </Animated.View>

                  {/* Alt Bilgi */}
                  <View style={styles.footer}>
                    <Text style={styles.footerText}>
                      🔒 Bilgileriniz güvende
                    </Text>
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
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  decorCircle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    top: -50,
    right: -50,
  },
  decorCircle2: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    bottom: 100,
    left: -30,
  },
  decorCircle3: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    top: "40%",
    right: 30,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  content: {
    width: "100%",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  logoText: {
    fontSize: 40,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  formCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  formInner: {
    padding: 28,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  inputContainer: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    
  },
  labelIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  inputWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
  },
  inputWrapperFocused: {
    borderColor: "#FFD93D",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    shadowColor: "#FFD93D",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  inputWrapperError: {
    borderColor: "#FF6B6B",
  },
  input: {
    padding: 18,
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  errorText: {
    color: "#FFD93D",
    fontSize: 13,
    marginTop: 8,
    marginLeft: 8,
    fontWeight: "600",
  },
  button: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "600",
  },
});