import {StyleSheet, View, Image, Alert} from 'react-native';
import {AppAnimations, AppIcons, AppImages} from '../constant/AppAsset';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useCallback, useState, useEffect} from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {uploadImage} from '../service/UploadImage';
import {Asset} from 'react-native-image-picker';
type ImageAddedProps = {
  img: Asset;
  onUpdateComplete: Function;
  onDelete: Function;
};
const ImageAdded = ({img, onDelete, onUpdateComplete}: ImageAddedProps) => {
  const [isUploading, setIsUploading] = useState<boolean>(true);
  const showImage = useCallback(() => {}, []);
  const upload = async () => {
    try {
      const res = await uploadImage(img);
      setIsUploading(false);
      onUpdateComplete(res.data.path);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    upload();
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showImage} style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: img.uri}} />
      </TouchableOpacity>
      {isUploading && (
        <View
          style={{
            borderRadius: 10,
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.4)',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AnimatedLottieView source={AppAnimations.loadingAnm} autoPlay loop />
        </View>
      )}
      <View style={styles.removeButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            onDelete(img.uri);
          }}
          style={styles.removeTochContainer}>
          <Image style={styles.removeIcon} source={AppIcons.clear2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  removeIcon: {
    resizeMode: 'contain',
    width: 7,
    height: 7,
  },
  removeTochContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonContainer: {
    position: 'absolute',
    top: -5,
    backgroundColor: 'white',
    right: -5,
    width: 24,
    height: 24,
    elevation: 2,
    borderRadius: 7.5,
  },

  container: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    elevation: 1,
    width: 80,
    borderRadius: 10,
    height: 120,
  },
  imageContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
});
export default ImageAdded;
