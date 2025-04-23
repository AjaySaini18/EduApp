import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { router } from 'expo-router';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const PaymentScreen: React.FC<Props> = ({ navigation }) => {
  const [checkoutHtml, setCheckoutHtml] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.post('http://192.168.1.12:5001/api/payment/create-order');

        const options = {
          key: 'rzp_test_Kf8fzScnGfUBMN', 
          amount: data.amount,
          currency: data.currency,
          name: 'EduApp',
          description: 'Premium Course Unlock',
          order_id: data.id,
          handler: function (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) {
            console.log('Payment successful:', response);
            router.push('/'); 
          },
          prefill: {
            name: 'Ajay Saini',
            email: 'ajay@example.com',
            contact: '9999999999'
          },
          theme: {
            color: '#3399cc'
          }
        };

        const htmlContent = `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            </head>
            <body>
              <script>
                document.addEventListener("DOMContentLoaded", function() {
                  var options = ${JSON.stringify(options)};
                  options.handler = function (response) {
                    window.ReactNativeWebView.postMessage(JSON.stringify(response));
                  };
                  var rzp = new Razorpay(options);
                  rzp.open();
                });
              </script>
            </body>
          </html>
        `;

        setCheckoutHtml(htmlContent);
      } catch (err) {
        console.error('Order fetch failed', err);
      }
    };

    fetchOrder();
  }, []);

  const handlePaymentResponse = (event: any) => {
    const response = JSON.parse(event.nativeEvent.data);
    console.log('Razorpay response:', response);
    // You can also verify on backend here
    router.push('/');;
  };

  if (!checkoutHtml) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: checkoutHtml }}
      javaScriptEnabled
      domStorageEnabled
      onMessage={handlePaymentResponse}
    />
  );
};

export default PaymentScreen;
