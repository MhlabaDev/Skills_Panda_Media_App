import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Post } from "../data/posts";
import { isDueWithin24h } from "../utils/time";
import { formatZar } from "../utils/money";
import { Skeleton } from "../skeleton";

type Props = {
  post: Post;
  onRemind?: (post: Post) => void;
  onOpen?: (post: Post) => void;
};

export const PostCard: React.FC<Props> = ({ post, onRemind, onOpen }) => {
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    Image.prefetch(post.imageUrl).catch(() => {});
  }, [post.imageUrl]);

  return (
    <View style={styles.card}>
      <Pressable
        onPress={() => onOpen?.(post)}
        accessibilityRole="button"
        accessibilityLabel={`Open details for ${post.title}`}
        accessibilityHint="Opens post details screen"
      >
        <View style={styles.imageWrap}>
          {!loaded && !loadError && <Skeleton style={styles.placeholder} />}
          {!loadError ? (
            <Image
              style={styles.image}
              source={{ uri: post.imageUrl }}
              placeholder={{ uri: post.thumbnailUrl }}
              transition={200}
              cachePolicy="disk"
              onLoad={() => setLoaded(true)}
              onError={() => setLoadError(true)}
              contentFit="cover"
              accessibilityRole="image"
              accessibilityLabel={`Image for ${post.title}`}
            />
          ) : (
            <View style={[styles.placeholder, styles.errorImage]}>
              <Text style={styles.errorText}>Image unavailable</Text>
            </View>
          )}
        </View>
      </Pressable>

      <View style={styles.meta}>
        <Text style={styles.title} accessibilityRole="header">
          {post.title}
        </Text>
        <Text style={styles.sub}>
          {post.supplier} · {formatZar(post.amountZar)}
        </Text>

        {post.description && (
          <Text style={styles.description} numberOfLines={3}>
            {post.description}
          </Text>
        )}

        {isDueWithin24h(post.dueAt) && onRemind && (
          <Pressable
            onPress={() => onRemind(post)}
            style={styles.remindBtn}
            accessibilityRole="button"
            accessibilityLabel={`Remind me about ${post.title}`}
            accessibilityHint="Schedules a reminder notification"
          >
            <Text style={styles.remindTxt}>Remind me</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  imageWrap: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#eee",
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
  },
  errorImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  errorText: {
    color: "#555",
    fontSize: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  meta: {
    padding: 12,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  sub: {
    color: "#666",
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  remindBtn: {
    marginTop: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#43b0a1",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  remindTxt: {
    color: "#fff",
    fontWeight: "600",
  },
});
