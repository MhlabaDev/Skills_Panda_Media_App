import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  TextInput,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Button,
  ListRenderItemInfo,
} from "react-native";
import { PostCard } from "../components/PostCard";
import { Post } from "../data/posts";
import { fetchPosts } from "../api/mockApi";
import { requestNotifPermissions, scheduleReminder } from "../notifications";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Image } from "expo-image";



export const PostsList: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [posts, setPosts] = useState<Post[]>([]);
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const flatListRef = useRef<FlatList<Post>>(null);
  const loadingMoreRef = useRef(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const scheduledReminders = useRef<Set<string>>(new Set());
  const onEndReachedCalledDuringMomentum = useRef(false);

  useEffect(() => {
    requestNotifPermissions().then((granted) => {
      if (!granted) {
        Alert.alert("Notifications permission denied", "You won't get reminders.");
      }
    });
    loadInitialPosts();
  }, []);

  const loadInitialPosts = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const { items, nextPage } = await fetchPosts(1);
      setPosts(items);
      setPage(nextPage ?? 1);
      setHasMore(!!nextPage);
      prefetchImages(items);
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setRefreshing(false);
    }
  };

  const loadMore = async (viaButton = false) => {
    if (loadingMoreRef.current || refreshing || !hasMore) return;
    loadingMoreRef.current = true;
    setLoading(true);
    try {
      const { items, nextPage } = await fetchPosts(page);
      const newPosts = items.filter(p => !posts.some(existing => existing.id === p.id));
      const updatedPosts = [...posts, ...newPosts];
      setPosts(updatedPosts);
      setPage(nextPage ?? page);
      setHasMore(!!nextPage);
      prefetchImages(newPosts);

   
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
      loadingMoreRef.current = false;
    }
  };

  const prefetchImages = (postsToPrefetch: Post[]) => {
    postsToPrefetch.forEach((post) => {
      Image.prefetch(post.imageUrl).catch(() => {});
    });
  };

  const handleRemind = async (post: Post) => {
    if (!post.dueAt) return;
    if (scheduledReminders.current.has(post.id)) {
      Alert.alert("Reminder Already Set", `You’ve already set a reminder for "${post.title}".`);
      return;
    }

    try {
      await scheduleReminder(post.id, post.title, new Date(post.dueAt));
      scheduledReminders.current.add(post.id);
      Alert.alert("Reminder scheduled!", `You'll be notified about "${post.title}".`);
    } catch {
      Alert.alert("Error", "Failed to schedule reminder.");
    }
  };

  const handleOpen = (post: Post) => {
    navigation.navigate("PostDetail", { postId: post.id });
  };

  const filteredPosts = useMemo(() => {
    const lower = filterText.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(lower) ||
      post.supplier.toLowerCase().includes(lower) ||
      post.amountZar.toString().includes(lower)
    );
  }, [filterText, posts]);

  const handleFilterChange = (text: string) => {
    setFilterText(text);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 300);
  };

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Post>) => (
    <PostCard post={item} onRemind={handleRemind} onOpen={handleOpen} />
  ), []);



  const ListHeader = (
    <View style={styles.filterContainer}>
      <TextInput
        placeholder="Search by title, supplier, or amount"
        value={filterText}
        onChangeText={handleFilterChange}
        style={styles.filterInput}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
      />
    </View>
  );

const ListFooter = () => {
  return (
    <View style={{ padding: 16, minHeight: 150, justifyContent: 'center' }}>
      {loading && <ActivityIndicator style={{ marginBottom: 16 }} />}
      {!hasMore && (
        <Text style={{ color: "#666", fontSize: 14, textAlign: "center" }}>
          No more posts to load.
        </Text>
      )}
      <View style={{ marginTop: 16 }}>
        <Button title="Load More" onPress={() => loadMore(true)} disabled={loading || !hasMore} />
        <View style={{ height: 10 }} />
        <Button title="Reload" onPress={loadInitialPosts} disabled={loading || refreshing} />
      </View>
    </View>
  );
};


  if (error && posts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <Text style={styles.errorHint}>Please check your connection or try again.</Text>
        <View style={{ marginTop: 16 }}>
          <Button title="Retry" onPress={loadInitialPosts} />
        </View>
      </View>
    );
  }

  return (
    <>
<FlatList
  ref={flatListRef}
  data={filteredPosts}
  keyExtractor={item => item.id}
  renderItem={renderItem}
  ListHeaderComponent={ListHeader}
  stickyHeaderIndices={[0]}
  onMomentumScrollBegin={() => {
    onEndReachedCalledDuringMomentum.current = false;
  }}
  onEndReached={() => {
    if (!onEndReachedCalledDuringMomentum.current && !loading && hasMore) {
      loadMore();
      onEndReachedCalledDuringMomentum.current = true;
    }
  }}
  onEndReachedThreshold={0.5}
  ListFooterComponent={ListFooter}
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadInitialPosts} />}
  keyboardShouldPersistTaps="handled"
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={7}
  maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
  contentContainerStyle={{ paddingBottom: 120 }}
/>
    </>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  filterContainer: {
    backgroundColor: "#f0f0f0",
    padding: 8,
  },
  filterInput: {
    backgroundColor: "white",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#c00",
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 16,
    color: "#900",
    textAlign: "center",
    marginBottom: 4,
  },
  errorHint: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  buttonsContainer: {
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
});
