import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, FlatList, TextInput, Button, Alert, Image} from 'react-native';
import {useState} from "react";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);

  const find = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + keyword)
        .then(response => response.json())
        .then(data => setResult(data.meals))
        .catch(error => {
          Alert.alert('Error', error);
        });
  }

  return (
    <View style={styles.container}>
      <FlatList style={{marginLeft : "5%", width: 300}} data={result} keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) =>
                    <View>
                      <Text style={{fontSize: 18, fontWeight: "bold", borderTopColor: "gray", borderTopWidth: 1}}>{item.strMeal}</Text>
                      <Image style={{width:100, height: 100}}
                             source={{uri: item.strMealThumb}} />

                    </View>} />

        <TextInput style={{fontSize: 15, width: 200, borderColor: 'gray', borderWidth: 1, textAlign: "center"}}
                   placeholder="keyword" value={keyword} onChangeText={text => setKeyword(text)} />
        <Button title={"Find"} onPress={find} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    marginTop: 40
  },
});
