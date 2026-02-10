import { useEffect } from 'react';
import { SplashScreen } from '@capacitor/splash-screen';
import { PushNotifications } from '@capacitor/push-notifications';
import { App } from '@capacitor/app';
import { useNavigate } from 'react-router-dom';

export const useMobileFeatures = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Hide splash screen on mount
    const hideSplash = async () => {
      await SplashScreen.hide();
    };
    hideSplash();

    // Initialize Push Notifications
    const initPush = async () => {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        console.warn('User denied permissions!');
        return;
      }

      await PushNotifications.register();

      // Listeners
      PushNotifications.addListener('registration', (token) => {
        console.log('Push registration success, token: ' + token.value);
      });

      PushNotifications.addListener('registrationError', (error) => {
        console.error('Error on registration: ' + JSON.stringify(error));
      });

      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push received: ' + JSON.stringify(notification));
      });

      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      });
    };

    initPush();

    // Handle Deep Links
    const initDeepLinks = () => {
      App.addListener('appUrlOpen', (data) => {
        console.log('App opened with URL:', data.url);
        // data.url looks like: masoawards://path/to/page
        const slug = data.url.split('://')[1];
        if (slug) {
          navigate('/' + slug);
        }
      });
    };

    initDeepLinks();

    // Cleanup listeners on unmount
    return () => {
      PushNotifications.removeAllListeners();
      App.removeAllListeners();
    };
  }, [navigate]);
};
