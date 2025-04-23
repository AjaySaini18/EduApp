import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSubscription } from './context/SubscriptionContext';
import { router } from 'expo-router';

const SubscriptionPlan: React.FC = () => {
  const { setSubscribed } = useSubscription();


  const handleBuyPlan = () => {
    router.push('/PaymentScreen'); // navigate to Razorpay payment screen
  };
  

  return (
    <ImageBackground
      source={require('../assets/images/sub-bg.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(10,17,20,0.7)', 'rgba(37,11,25,0.7)']}
        style={styles.container}
      >
        <View style={styles.card}>
          <Image
            source={require('../assets/images/premium.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Unlock Premium Access</Text>
          <Text style={styles.subtitle}>Get full access to all video courses</Text>
          <Text style={styles.price}>Just ₹499 for 6 months</Text>

          <TouchableOpacity style={styles.buyButton} onPress={handleBuyPlan}>
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default SubscriptionPlan;


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#ffffffee',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#27ae60',
    marginBottom: 24,
  },
  buyButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
