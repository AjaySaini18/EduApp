import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';


interface Course {
  id: string;
  title: string;
  thumbnail: any; 
  isLocked: boolean;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Class 12 Physics - Mechanics',
    thumbnail: require('../../assets/images/physics.jpg'),
    isLocked: false,
  },
  {
    id: '2',
    title: 'Class 11 Chemistry - Organic Basics',
    thumbnail: require('../../assets/images/chemestry.jpg'),
    isLocked: true,
  },
  {
    id: '3',
    title: 'Class 10 Maths - Algebra',
    thumbnail: require('../../assets/images/math.jpg'),
    isLocked: true,
  },
];

const HomeScreen: React.FC = () => {
  const handlePlay = (course: Course) => {
    if (course.isLocked) {
      router.push('/SubscriptionPlan'); // navigate to subscription plan screen
    } else {
      router.push('/video-player'); // go to video player
    }
  };
  

  const renderCourseItem = ({ item, index }: { item: Course; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 150)} style={styles.courseContainer}>
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.playButton, item.isLocked && styles.locked]}
          onPress={() => handlePlay(item)}
        >
          <Text style={styles.playButtonText}>{item.isLocked ? 'Locked 🔒' : 'Play ▶️'}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.container}>
      <Text style={styles.header}>🎓 Welcome to EduApp</Text>
      <FlatList
        data={mockCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#2c3e50',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
  courseContainer: {
    flexDirection: 'row',
    marginBottom: 18,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  courseInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#34495e',
  },
  playButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  locked: {
    backgroundColor: '#e74c3c',
  },
  playButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
