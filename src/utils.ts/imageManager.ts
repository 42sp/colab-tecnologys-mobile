import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

// import { ImageManipulator } from 'expo-image-manipulator'

export async function pickAndCompressImage() {

  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images',
    base64: true,
    allowsEditing: true,
    quality: 1,
    aspect: [1, 1],
  });

  if (result.canceled || !result.assets.length) return null;

  const asset = result.assets[0];

  // Desta forma não estava funcionando
  // const context = ImageManipulator.manipulate(asset.uri)
  // context.resize({width: 300, height: 300})
  // const image = await context.renderAsync();
  // const compressed = await image.saveAsync({
  //   format: ImageManipulator.SaveFormat.JPEG,
  //   base64: true,
  //   compress: 0.5,
  // });

  const compressed = await ImageManipulator.manipulateAsync(
    asset.uri,
    [{ resize: { width: 300, height: 300 } }],
    {
      compress: 0.5,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: true,
    }
  );

  return {
    uri: `data:image/jpeg;base64,${compressed.base64}`,
    fileId: `${Date.now()}-${Math.random().toString(36).slice(2,16)}.jpg`,
  };
}
