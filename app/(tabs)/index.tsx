import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useSubscription } from "../context/SubscriptionContext";
import { useAuth } from "../context/AuthContext";
import { Feather, MaterialIcons } from "@expo/vector-icons";

interface Course {
  id: string;
  title: string;
  thumbnail: any;
  isLocked: boolean;
  category: string;
}

const { width } = Dimensions.get('window');

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Mechanics Masterclass",
    thumbnail: require("../../assets/images/physics.jpg"),
    isLocked: false,
    category: "Physics"
  },
  {
    id: "2",
    title: "Organic Chemistry Fundamentals",
    thumbnail: require("../../assets/images/chemestry.jpg"),
    isLocked: true,
    category: "Chemistry"
  },
  {
    id: "3",
    title: "Algebra Essentials",
    thumbnail: require("../../assets/images/math.jpg"),
    isLocked: true,
    category: "Mathematics"
  },
];

const HomeScreen: React.FC = () => {
  const { isSubscribed, loading: subscriptionLoading } = useSubscription();
  const { user, logout } = useAuth();

  if (subscriptionLoading) {
    return (
      <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  const updatedCourses = mockCourses.map((course) => ({
    ...course,
    isLocked: isSubscribed ? false : course.isLocked,
  }));

  const handlePlay = (course: Course) => {
    if (course.isLocked) {
      router.push("/SubscriptionPlan");
    } else {
      router.push("/video-player");
    }
  };

  const renderCourseItem = ({ item, index }: { item: Course; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 150)}
      style={styles.courseCard}
    >
      <Image source={item.thumbnail} style={styles.courseImage} />
      <View style={styles.courseContent}>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <TouchableOpacity
          style={[styles.actionButton, item.isLocked && styles.lockedButton]}
          onPress={() => handlePlay(item)}
        >
          {item.isLocked ? (
            <>
              <MaterialIcons name="lock-outline" size={16} color="#fff" />
              <Text style={styles.buttonText}>Upgrade to Unlock</Text>
            </>
          ) : (
            <>
              <Feather name="play" size={16} color="#fff" />
              <Text style={styles.buttonText}>Start Learning</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <LinearGradient colors={["#f8fafc", "#e2e8f0"]} style={styles.container}>
      {/* Header Section */}
      <LinearGradient
        colors={["#4f46e5", "#6366f1"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{user?.username}</Text>
              {isSubscribed && (
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumText}>PREMIUM</Text>
                </View>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Feather name="log-out" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Courses</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={updatedCourses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 24,
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    color: "#e0e7ff",
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  username: {
    color: "#fff",
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    marginRight: 8,
  },
  premiumBadge: {
    backgroundColor: "rgba(253, 224, 71, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fde047",
  },
  premiumText: {
    color: "#fde047",
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1,
  },
  logoutButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: "#1e293b",
  },
  seeAll: {
    fontSize: 14,
    color: "#4f46e5",
    fontFamily: 'Inter_500Medium',
  },
  listContainer: {
    paddingBottom: 30,
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  courseImage: {
    width: "100%",
    height: 150,
  },
  courseContent: {
    padding: 16,
  },
  categoryTag: {
    backgroundColor: "#e0e7ff",
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  categoryText: {
    color: "#4f46e5",
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    textTransform: 'uppercase',
  },
  courseTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: "#1e293b",
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: "#4f46e5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedButton: {
    backgroundColor: "#ef4444",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
});

export default HomeScreen;