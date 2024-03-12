import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/utils/supabase';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

const Profile = () => {
  const [image, setImage] = useState<string | null>();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;

    setImage(result.assets[0].uri);

    const {
      data: { user: User },
    } = await supabase.auth.getUser();
    const img = result.assets[0];
    const base64 = await FileSystem.readAsStringAsync(img.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const filePath = `${User?.id}/avatar.png`;
    const contentType = 'img/png';

    await supabase.storage
      .from('avatars')
      .upload(filePath, decode(base64), { contentType });
  };

  const loadUserAvatar = async () => {
    const {
      data: { user: User },
    } = await supabase.auth.getUser();

    supabase.storage
      .from('avatars')
      .download(`${User?.id}/avatar.png`)
      .then(({ data }) => {
        if (!data) return;
        const url = URL.createObjectURL(data);

        setImage(url);
      });
  };

  useEffect(() => {
    loadUserAvatar();
  }, []);

  return (
    <View>
      {image ? (
        <Image source={{ uri: image }} style={styles.avatar} />
      ) : (
        <View style={styles.avatar} />
      )}
      <Button title="Set Avatar" onPress={pickImage} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  avatar: {
    width: 200,
    height: 200,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    borderRadius: 100,
    margin: 40,
  },
});
