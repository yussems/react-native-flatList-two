import React, { useRef, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  BackHandler,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("screen");
const IMAGE_SIZE = 80;
const SPACING = 10;

const DATA = [
  "https://images.pexels.com/photos/1144687/pexels-photo-1144687.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/2400594/pexels-photo-2400594.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/3876407/pexels-photo-3876407.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/3331094/pexels-photo-3331094.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/4220967/pexels-photo-4220967.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];

export default function App() {
  const topRef = useRef();
  const thumbRef = useRef();
  const [activeindex, setActiveIndex] = useState(0);
  const scrollToActiveIndex = (index) => {
    setActiveIndex(index)
    topRef?.current?.scrollToOffset({
      offset:index*width,
      animated:true
    })
    if(index *(IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated:true
      })
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated:true
      })
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <FlatList
        ref={topRef}
        data={DATA}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(ev) => {
          setActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
        }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item }}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />
      <FlatList
        ref={thumbRef}
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ position: "absolute", bottom: IMAGE_SIZE }}
        contentContainerStyle={{ padding: SPACING }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
             onPress={() => scrollToActiveIndex(index)}
            >
              <Image
                source={{ uri: item }}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor: activeindex === index ? "#fff" : "transparent",
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
