import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../constant/Colors';
import {TextInput} from 'react-native-gesture-handler';
import {useCallback, useState} from 'react';
import {AppIcons} from '../constant/AppAsset';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProp} from '../navigation/AppNavigator';
export type SearchBarProps = {
  searchKeyPassed: string;
  setData?: Function;
};
const SearchBar = ({searchKeyPassed, setData}: SearchBarProps) => {
  const navigation = useNavigation<AppNavigationProp>();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>(searchKeyPassed);
  const onSearch = useCallback(() => {
    if (searchKey) {
      navigation.navigate('SearchResultScreen', {searchKey});
    }
  }, [searchKey]);
  return (
    <View
      style={[
        styles.container,
        isFocus && {borderWidth: 1, borderColor: Color.MAINCOLOR},
      ]}>
      <Image
        style={[styles.icon, isFocus && {tintColor: Color.MAINCOLOR}]}
        source={AppIcons.search}
      />
      <TextInput
        value={searchKey}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChangeText={text => {
          setSearchKey(text);
        }}
        style={styles.textinputContainer}
        placeholder="Tìm kiếm bài viết..."
        returnKeyType="search"
        onSubmitEditing={onSearch} // search
      />
      <TouchableOpacity
        onPress={() => {
          setSearchKey('');
        }}>
        <Image
          style={[styles.icon, isFocus && {tintColor: Color.MAINCOLOR}]}
          source={AppIcons.clear}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    resizeMode: 'center',
    width: 18,
    height: 18,
  },
  textinputContainer: {
    width: '70%',
    fontSize: 17,
  },
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    elevation: 5,
    width: '90%',
    height: 48,
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f3f4f6',
  },
});
export default SearchBar;
