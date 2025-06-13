import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image
        source={{ uri: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg' }}
        style={styles.headerImage}
      />
      <Text style={styles.title}>TabMenu</Text>
      <Text style={styles.subtitle}>Área do Funcionário</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => { router.navigate("/kitchen/pedidos") }}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Cozinha
        </Button>
        
        <Button
          mode="contained"
          onPress={() => { router.navigate("/payment/pagamento") }}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Pagamento
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 24,
    color: '#1a1a1a',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 8,
    color: '#666',
    marginBottom: 32,
  },
  buttonContainer: {
    padding: 20,
    gap: 16,
  },
  button: {
    backgroundColor: '#2c3e50',
    borderRadius: 12,
    elevation: 2,
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
});