import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/navigation/types";
import { PostDetail } from "./src/screens/PostDetail";
import { navigationRef } from "./src/navigation/RootNavigation";
import { PostsList } from "./src/screens/PostList";
import * as Notifications from "expo-notifications";

const Stack = createNativeStackNavigator<RootStackParamList>();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const postId = response.notification.request.content.data?.postId;

      if (typeof postId === "string") {
        console.log("Tapped notification for postId:", postId);

        const navigateToPost = () => {
          if (navigationRef.isReady()) {
            navigationRef.navigate("PostDetail", { postId });
          } else {
            console.warn("Navigation not ready yet, retrying...");
            setTimeout(navigateToPost, 500);
          }
        };

        navigateToPost();
      } else {
        console.warn("No valid postId found in notification data.");
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={PostsList} />
        <Stack.Screen name="PostDetail" component={PostDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
