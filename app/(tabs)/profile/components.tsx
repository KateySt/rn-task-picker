import React from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  VirtualizedList,
  ActivityIndicator,
} from 'react-native';

export default function AllComponentsScreen() {
  const data = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => Alert.alert('Refresh')}
          />
        }
      >
        <Text style={styles.header}>React Native Core Components</Text>

        <TextInput style={styles.input} placeholder="Enter text..." />

        <Button
          title="Press me"
          onPress={() => Alert.alert('Button pressed')}
        />

        <TouchableOpacity
          onPress={() => Alert.alert('TouchableOpacity pressed')}
        >
          <Text style={styles.touchable}>TouchableOpacity</Text>
        </TouchableOpacity>

        <TouchableHighlight
          onPress={() => Alert.alert('TouchableHighlight pressed')}
          underlayColor="#DDDDDD"
        >
          <Text style={styles.touchable}>TouchableHighlight</Text>
        </TouchableHighlight>

        <TouchableWithoutFeedback
          onPress={() => Alert.alert('TouchableWithoutFeedback')}
        >
          <Text style={styles.touchable}>TouchableWithoutFeedback</Text>
        </TouchableWithoutFeedback>

        <Switch value={true} />

        <ActivityIndicator size="large" color="#0000ff" />

        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.image}
        />

        <FlatList
          data={data}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text>{item}</Text>}
          style={{ height: 150 }}
        />

        <SectionList
          sections={[
            { title: 'Section 1', data: ['A', 'B'] },
            { title: 'Section 2', data: ['C', 'D'] },
          ]}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Text>{item}</Text>}
          renderSectionHeader={({ section }) => (
            <Text style={{ fontWeight: 'bold' }}>{section.title}</Text>
          )}
          style={{ height: 150 }}
        />

        <VirtualizedList
          data={data}
          initialNumToRender={4}
          getItem={(data, index) => data[index]}
          getItemCount={() => data.length}
          renderItem={({ item }) => <Text>{item}</Text>}
          keyExtractor={(item) => item}
          style={{ height: 150 }}
        />

        <Modal transparent={true} visible={false}>
          <View>
            <Text>Modal Content</Text>
          </View>
        </Modal>

        <KeyboardAvoidingView behavior="padding">
          <TextInput placeholder="Inside KeyboardAvoidingView" />
        </KeyboardAvoidingView>

        <Pressable onPress={() => Alert.alert('Pressed')}>
          <Text style={styles.touchable}>Pressable</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  touchable: {
    backgroundColor: '#EEE',
    padding: 10,
    marginVertical: 6,
    textAlign: 'center',
  },
  image: {
    width: 40,
    height: 40,
    marginVertical: 12,
  },
});
