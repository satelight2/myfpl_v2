import {Asset} from 'react-native-image-picker';
import AxiosInstance from '../helper/axiosInstance';
import axios from 'axios';
export const uploadImage = async (img: Asset) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: img.uri,
      type: img.type,
      name: img.fileName,
    });
    const res = await axios.post(
      'https://fpoly-hcm.herokuapp.com/api/media/upload',
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );
    return res.data;
  } catch (err) {
    // console.log(err.message);
  }
};
// export const uploadImage = async (img: ImagePickerResponse) => {
//     if (!img.assets) return;
//     let formData = new FormData();
//     const image = img.assets[0];
//     if (image.uri && image.type && image.fileName) {
//       formData.append('image', {
//         uri: image.uri,
//         type: image.type,
//         name: image.fileName,
//       });
//       try {
//         console.log('uploading..  ');
//         const response = await AxiosInstance('multipart/form-data').post(
//           'media/upload',
//           formData,
//         );
//         return response.data?.path;
//       } catch (err) {
//         console.log((err as Error).message);
//       }
//     }
//   };
