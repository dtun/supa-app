// From:
// https://supabase.com/docs/guides/auth/social-login/auth-google?platform=react-native
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { supabase } from '@/utils/supabase';

export function GoogleAuth() {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId:
      '327960141607-7cbihe3f1sqgi8ie5ckt42g0efs4lafd.apps.googleusercontent.com',
  });

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Standard}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          if (userInfo.idToken) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: userInfo.idToken,
            });
            console.log(error, data);
          } else {
            throw new Error('no ID token present!');
          }
        } catch (error: any) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      }}
    />
  );
}
