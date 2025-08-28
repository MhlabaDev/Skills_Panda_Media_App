
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ALL_POSTS } from "../data/posts";
import { Image } from "expo-image";
import { formatZar } from "../utils/money";

export const PostDetail: React.FC = () => {
  const route = useRoute<RouteProp<{ PostDetail: { postId: string } }, "PostDetail">>();
  const post = ALL_POSTS.find((p) => p.id === route.params.postId);

  if (!post) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Post not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: post.imageUrl }}
        contentFit="cover"
        accessibilityLabel={`Image for ${post.title}`}
      />

      <View style={styles.meta}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.supplier}>{post.supplier}</Text>
        <Text style={styles.amount}>{formatZar(post.amountZar)}</Text>

        {post.dueAt && (
          <Text style={styles.dueDate}>
            Due: {new Date(post.dueAt).toLocaleString()}
          </Text>
        )}

        {post.description && (
          <Text style={styles.description}>{post.description}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingBottom: 24,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#eee",
  },
  meta: {
    padding: 16,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  supplier: {
    fontSize: 16,
    color: "#555",
  },
  amount: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  dueDate: {
    fontSize: 14,
    color: "#777",
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginTop: 12,
    lineHeight: 22,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#c00",
    fontWeight: "bold",
  },
});
