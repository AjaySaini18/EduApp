import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View,Text, Alert, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from './context/AuthContext';
import { useSubscription } from './context/SubscriptionContext';

const PaymentScreen: React.FC = () => {
  const { setSubscribed } = useSubscription();
  const { user } = useAuth();
  const [checkoutHtml, setCheckoutHtml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.post('http://192.168.1.4:5001/api/payment/create-order', {
          userId: user?.email
        });

        const options = {
          key: 'rzp_test_Kf8fzScnGfUBMN',
          amount: data.amount,
          currency: data.currency,
          name: 'EduApp Premium',
          description: 'Unlock All Courses',
          order_id: data.id,
          prefill: {
            name: user?.username || 'EduApp User',
            email: user?.email || '',
            contact: '9999999999'
          },
          theme: {
            color: '#4f46e5',
            backdrop_color: '#1e293b'
          }
        };

        const htmlContent = `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
              <style>
                body {
                  background: #0f172a;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
                }
                .loader {
                  color: #fff;
                  font-size: 18px;
                  font-family: sans-serif;
                }
              </style>
            </head>
            <body>
              <div class="loader">Initializing Secure Payment...</div>
              <script>
                document.addEventListener("DOMContentLoaded", function() {
                  var options = ${JSON.stringify(options)};
                  options.handler = function(response) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                      success: true,
                      ...response
                    }));
                  };
                  options.modal = {
                    ondismiss: function() {
                      window.ReactNativeWebView.postMessage(JSON.stringify({ cancelled: true }));
                    }
                  };
                  document.querySelector('.loader').remove();
                  var rzp = new Razorpay(options);
                  rzp.open();
                });
              </script>
            </body>
          </html>
        `;

        setCheckoutHtml(htmlContent);
      } catch (err:any) {
        Alert.alert('Error', 'Failed to initialize payment gateway');
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [user]);

  const handlePaymentResponse = async (event: any) => {
    try {
      const response = JSON.parse(event.nativeEvent.data);
      
      if (response.cancelled) {
        Alert.alert('Payment Cancelled', 'You can continue with free content');
        router.back();
        return;
      }

      const verification = await axios.post(
        'http://192.168.1.4:5001/api/payment/verify-payment',
        {
          ...response,
          userId: user?.email
        }
      );

      if (verification.data.success) {
        await setSubscribed(true);
        Alert.alert('Success', 'Premium Access Activated!', [
          { text: 'Continue', onPress: () => router.replace('/') }
        ]);
      } else {
        Alert.alert('Verification Failed', 'Please contact support');
      }
    } catch (error) {
      Alert.alert('Error', 'Payment processing failed. Please try again.');
      router.back();
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={['#4f46e5', '#312e81']} style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loaderText}>Preparing Secure Payment...</Text>
      </LinearGradient>
    );
  }

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: checkoutHtml }}
      javaScriptEnabled
      domStorageEnabled
      onMessage={handlePaymentResponse}
      onError={() => {
        Alert.alert('Connection Error', 'Failed to connect to payment service');
        router.back();
      }}
      startInLoadingState
      renderLoading={() => (
        <LinearGradient colors={['#4f46e5', '#312e81']} style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </LinearGradient>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PaymentScreen;