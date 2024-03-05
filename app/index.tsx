import { supabase } from '@/utils/supabase';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { showAlert } from '@/utils/showAlert';
import { AppleAuth } from '@/components/AppleAuth.native';
import { GoogleAuth } from '@/components/GoogleAuth.native';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) showAlert(error.message);

    setLoading(false);
  };

  const onSignUpPress = async () => {
    setLoading(true);

    const {
      error,
      data: { session },
    } = await supabase.auth.signUp({ email, password });

    if (error) showAlert(error.message);
    if (!session) showAlert('Check your email for the confirmation link.');

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: '#fff' }}>Loading...</Text>
        </View>
      )}
      <Text style={styles.header}>Galaxies.dev</Text>
      <TextInput
        autoCapitalize="none"
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#fff"
        style={styles.inputField}
        value={email}
      />
      <TextInput
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#fff"
        style={styles.inputField}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={{ color: '#fff' }}>Sign In</Text>
      </TouchableOpacity>
      <Button title="Sign Up" color="#fff" onPress={onSignUpPress} />
      <View style={styles.appleAuthView}>
        <AppleAuth />
        <GoogleAuth />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  appleAuthView: { alignItems: 'center', marginTop: 10, gap: 10 },
  container: {
    flex: 1,
    paddingTop: 200,
    padding: 20,
    backgroundColor: '#151515',
  },
  header: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    margin: 15,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#2b825b',
    borderRadius: 4,
    padding: 10,
    color: '#fff',
    backgroundColor: '#363636',
  },
  button: {
    marginVertical: 15,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#2b825b',
    borderRadius: 4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    gap: 10,
  },
});
