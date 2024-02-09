import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../constant/Colors';
import SVGS from '../constant/Svgs';
import {useNavigation} from '@react-navigation/native';
import {translate} from '../../utility';
import {getFonts} from '../utils';
import {productSearchAPI} from '../services/apis/CategoryAPI';
import SortingFields from '../../constant/SortingFields';

const {SearchGrayIcon, SearchArrow, CrossIcon} = SVGS;

const AppSearch = props => {
  const [loading, setLoading] = useState(false);
  const [searchTxt, setSearchTxt] = useState('');
  const [searchData, setSearchData] = useState([]);
  const navigation = useNavigation();
  const {selectedLanguageItem} = useSelector(state => state.languageReducer);

  useEffect(() => {
    if (searchTxt !== '') {
      setLoading(true);
      const delayDebounceFn = setTimeout(async () => {
        const criteria = {
          searchText: searchTxt,
          mode: 'flat',
          fields: ['slug.en', 'name'],
        };
        await productSearchAPI(criteria, 1)
          .then(response => {
            setLoading(false);
            setSearchData(response?.data?.records || []);
          })
          .catch(() => {
            setLoading(false);
            setSearchData([]);
          });
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setLoading(false);
      setSearchData([]);
    }
  }, [searchTxt]);

  const handleFlatListRenderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.push('ProductDetail', {slug: item?.slug?.en})}>
      <View style={styles.itemContent}>
        <Text style={styles.itemText} numberOfLines={1}>
          {selectedLanguageItem?.language_id === 0
            ? item?.name?.en
            : item?.name?.ar}
        </Text>
        <View style={styles.arrowContainer}>
          <SearchArrow />
        </View>
      </View>
    </TouchableOpacity>
  );

  const keyExtractor = (item, index) => `${index}`;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchIconContainer}>
          <SearchGrayIcon />
        </View>
        <TextInput
          placeholder={props.placeholderText}
          onChangeText={text => setSearchTxt(text)}
          value={searchTxt}
          placeholderTextColor={Colors.GRAYDARK}
          style={styles.textInput}
          onSubmitEditing={() => {
            navigation.push('PLP', {
              headerTitle: `Search "${searchTxt}"`,
              criteria: {
                searchText: searchTxt,
                sortBy: {...SortingFields[1].value},
              },
            });
          }}
          returnKeyType="done"
        />
        {searchTxt && (
          <TouchableOpacity
            style={styles.clearIconContainer}
            onPress={() => {
              setSearchTxt('');
              props.onCrossPress ? props.onCrossPress(false) : null;
            }}>
            <CrossIcon />
          </TouchableOpacity>
        )}
      </View>

      {loading || searchData.length ? (
        <View style={styles.listContainer}>
          {loading ? (
            <ActivityIndicator color={Colors.themeColor} size={25} />
          ) : searchData.length > 0 && searchTxt ? (
            <FlatList
              data={searchData}
              keyboardShouldPersistTaps="handled"
              style={styles.flatList}
              renderItem={handleFlatListRenderItem}
              keyExtractor={keyExtractor}
              scrollEnabled={true}
              nestedScrollEnabled={true}
            />
          ) : null}
        </View>
      ) : searchTxt ? (
        <View style={styles.listContainer}>
          <Text style={styles.noDataText}>
            {translate('common.oopsNoProduct')}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default AppSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '3%',
    paddingHorizontal: '3%',
    height: 4.93,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    backgroundColor: Colors.GRAYRGBA,
  },
  searchIconContainer: {
    justifyContent: 'flex-start',
    width: 5,
  },
  textInput: {
    fontFamily: getFonts.REGULAR,
    fontWeight: '500',
    letterSpacing: 0.5,
    width: '100%',
    minHeight: 38,
    color: Colors.BLACK,
    paddingLeft: 2,
    paddingRight: 2,
    textAlign: 'left',
    height: '100%',
  },
  clearIconContainer: {
    justifyContent: 'flex-end',
    width: 5,
    position: 'absolute',
    right: 10,
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: Colors.WHITE,
    marginTop: '1%',
    borderRadius: '1%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minHeight: Dimensions.get('window').height / 2,
    height: 50,
  },
  flatList: {
    flex: 1,
  },
  itemContainer: {
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    borderBottomColor: Colors.GRAY,
    borderBottomWidth: 1,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontFamily: getFonts.MEDIUM,
    fontWeight: '600',
    letterSpacing: 0.5,
    lineHeight: 21,
    maxWidth: 2.3,
  },
  arrowContainer: {
    alignSelf: 'flex-end',
  },
  noDataText: {
    textAlign: 'center',
  },
});
