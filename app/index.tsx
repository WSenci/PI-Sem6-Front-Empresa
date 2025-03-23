import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>APP PI 6º SEMESTRE ADS - EMPRESA</Text>
      <Button
        onPress={() => { router.navigate("/kitchen/pedidos") }}
        title="Pedidos (Cozinha)"
        color="#841584"
      />
       <Button
        onPress={() => { router.navigate("/payment/pagamento") }}
        title="Pagamento do Pedido"
        color="#841584"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
