import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Text, RefreshControl} from 'react-native';
import {
  Button,
  ActivityIndicator,
  MD2Colors,
  TextInput,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {useFetchArticlesQuery} from '../redux/api/articlesApi';
import {defaultState} from '../redux/auth/authSlice';
import {
  setArticles,
  filterArticles,
  clearFilteredArticles,
  defaultArticles,
  resetArticles,
} from '../redux/articles/articlesSlice';
import {storage} from '../storage/storage';
const Article = React.lazy(() => import('../components/Articles/Article'));
import {FlatList} from 'react-native-gesture-handler';

const ArticlesScreen = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();

  const {data, error, isError, isFetching} = useFetchArticlesQuery(page);

  const {articlesData, filteredData, isEnd} = useSelector(
    state => state.articles,
  );

  useEffect(() => {
    if (articlesData === []) {
      dispatch(setArticles({data: data?.response?.docs, page: 0}));
    }
  }, [dispatch, data, page]);

  useEffect(() => {
    if (data?.response?.docs.length > 0) {
      dispatch(setArticles({data: data?.response?.docs, page: page}));
    }
  }, [dispatch, data]);

  const handleLoadMore = () => {
    if (!isEnd && !isFetching) {
      return setPage(page + 1);
    } else {
      return;
    }
  };

  const pullDownToRefresh = () => {
    setIsRefreshing(true);
    if (page !== 0) {
      setPage(0);
      dispatch(resetArticles());
    }

    setIsRefreshing(false);
  };

  const handleRefresh = async () => {
    return pullDownToRefresh();
  };

  const handleSearch = text => {
    setSearch(text);
    dispatch(filterArticles(text));
  };

  const handleClearSearch = () => {
    dispatch(clearFilteredArticles());
    setSearch('');
  };

  const LogoutUser = async () => {
    Promise.resolve(storage.clearAll())
      .then(dispatch(defaultArticles()))
      .then(dispatch(defaultState()));
    // await storage.clearAll();
    // dispatch(defaultArticles() && defaultState());
  };

  const handleLogout = async () => {
    LogoutUser();
  };

  return (
    <View style={styles.screen}>
      <TextInput
        style={{backgroundColor: '#aab1eebb'}}
        mode="flat"
        label="Search articles"
        textColor="#8A2BE2"
        autoCapitalize={false}
        value={search}
        onChangeText={handleSearch}
      />
      {search && (
        <Button style={styles.actions} onPress={handleClearSearch}>
          Clear Search
        </Button>
      )}
      {isError && (
        <View style={styles.apiErrorsContainer}>
          <Text style={styles.apiErrors}>
            {error.error || error.data?.message}
          </Text>
        </View>
      )}
      {search ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={() => (
            <View style={styles.noArticlesFoundContainer}>
              <Text style={styles.noArticlesFound}>No articles found!</Text>
            </View>
          )}
          renderItem={({item}) => {
            return (
              <Article
                title={item.headline.main}
                abstract={item.abstract}
                content={item.lead_paragraph}
                images={item.multimedia}
                date={item.pub_date}
                author={item.byline.original}
              />
            );
          }}
        />
      ) : (
        <FlatList
          data={articlesData}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={() => {
            if (!isFetching) {
              return (
                <View style={styles.noArticlesFoundContainer}>
                  <Text style={styles.noArticlesFound}>
                    No articles fetched!
                  </Text>
                </View>
              );
            }
          }}
          ListFooterComponent={
            isFetching && (
              <ActivityIndicator
                animating={true}
                color={MD2Colors.deepPurpleA700}
              />
            )
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.8}
          refreshControl={
            <RefreshControl
              onRefresh={handleRefresh}
              refreshing={isRefreshing}
            />
          }
          renderItem={({item}) => {
            return (
              <Article
                title={item.headline.main}
                abstract={item.abstract}
                content={item.lead_paragraph}
                images={item.multimedia}
                date={item.pub_date}
                author={item.byline.original}
              />
            );
          }}
        />
      )}
      <Button style={styles.actions} onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#aab1eebb',
  },
  actions: {
    width: '100%',
    marginBottom: 30,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  apiErrorsContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  apiErrors: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 7,
    color: 'red',
  },
  noArticlesFoundContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noArticlesFound: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 7,
    color: '#8A2BE2',
  },
});

export default ArticlesScreen;
