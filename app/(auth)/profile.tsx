import { useState } from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const [image, setImage] = useState<string | null>();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

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
