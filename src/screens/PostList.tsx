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
import { ALL_POSTS, Post } from "../data/posts";
import { requestNotifPermissions, scheduleReminder } from "../notifications";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Image } from "expo-image";

const PAGE_SIZE = 10;
const ITEM_HEIGHT = 160;

const PostCardWrapper = React.memo(({ post, onRemind, onOpen }: {
  post: Post;
  onRemind: (post: Post) => void;
  onOpen: (post: Post) => void;
}) => {
  return <PostCard post={post} onRemind={onRemind} onOpen={onOpen} />;
});

export const PostsList: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const flatListRef = useRef<FlatList<Post>>(null);
  const loadingMoreRef = useRef(false);

  const scheduledReminders = useRef<Set<string>>(new Set());
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    requestNotifPermissions().then((granted) => {
      if (!granted) {
        Alert.alert("Notifications permission denied", "You won't get reminders.");
      }
    });
    loadInitialPosts();
  }, []);

  const fetchPostsPage = async (pageNumber: number): Promise<Post[]> => {
    await new Promise((res) => setTimeout(res, 600)); // simulate delay
    const start = pageNumber * PAGE_SIZE;
    return ALL_POSTS.slice(start, start + PAGE_SIZE);
  };

  const loadInitialPosts = async () => {
    setRefreshing(true);
    setError(null);
    setHasMore(true);
    try {
      const firstPagePosts = await fetchPostsPage(0);
      setPosts(firstPagePosts);
      setFilteredPosts(filterPosts(filterText, firstPagePosts));
      setPage(0);
      setHasMore(firstPagePosts.length === PAGE_SIZE);
      prefetchImages(firstPagePosts);
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setRefreshing(false);
    }
  };

  const loadMore = async (viaButton: boolean = false) => {
    if (loadingMoreRef.current || refreshing || !hasMore) return;

    loadingMoreRef.current = true;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const nextPosts = await fetchPostsPage(nextPage);
      const newPosts = nextPosts.filter(p => !posts.some(existing => existing.id === p.id));

      if (newPosts.length === 0) {
        setHasMore(false);
        return;
      }

      const updatedPosts = [...posts, ...newPosts];
      setPosts(updatedPosts);
      setFilteredPosts(filterPosts(filterText, updatedPosts));
      setPage(nextPage);
      setHasMore(nextPosts.length === PAGE_SIZE);
      prefetchImages(newPosts);

      if (viaButton && newPosts.length > 0) {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index: posts.length,
            animated: true,
            viewPosition: 0,
          });
        }, 300);
      }
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

  const filterPosts = (text: string, data: Post[]) => {
    const lowered = text.toLowerCase();
    return data.filter((post) =>
      post.title.toLowerCase().includes(lowered) ||
      post.supplier.toLowerCase().includes(lowered) ||
      post.amountZar.toString().includes(lowered)
    );
  };

  const handleFilterChange = (text: string) => {
    setFilterText(text);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setFilteredPosts(filterPosts(text, posts));
    }, 300);
  };

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Post>) => {
    return <PostCardWrapper post={item} onRemind={handleRemind} onOpen={handleOpen} />;
  }, []);

const getItemLayout = useCallback(
  (_data: ArrayLike<Post> | null | undefined, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }),
  []
);


  const ListHeader = useMemo(() => (
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
  ), [filterText]);

  const ListFooter = () => {
    if (loading) return <ActivityIndicator style={{ margin: 16 }} />;
    if (!hasMore) {
      return (
        <View style={{ padding: 16, alignItems: "center" }}>
          <Text style={{ color: "#666", fontSize: 14 }}>No more posts to load.</Text>
        </View>
      );
    }
    return null;
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
        getItemLayout={getItemLayout}
        ListHeaderComponent={ListHeader}
        stickyHeaderIndices={[0]}
        onEndReached={() => {
          if (!loading && hasMore) loadMore();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={ListFooter}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadInitialPosts} />}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={7}
        removeClippedSubviews
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
      />
      <View style={styles.buttonsContainer}>
        <Button
          title="Load More"
          onPress={() => loadMore(true)}
          disabled={loading || !hasMore}
        />
        <View style={{ height: 10 }} />
        <Button
          title="Reload"
          onPress={loadInitialPosts}
          disabled={loading || refreshing}
        />
      </View>
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