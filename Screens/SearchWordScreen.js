import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default class SearchWordScreen extends React.Component {

    constructor() {
      super();
      this.state = {
  
        word: "",
        text: "",
        isSearchPressed: false,
        lexicalCategory: "",
        examples: [],
        definition: "",
  
        word2: []
  
      }
    }
  
    getWord = (word) => {
  
      var searchWord = word.toLowerCase();
      var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchWord + ".json"
      return fetch(url).then(
        (data) => {
          if (data.status === 200) {
            return data.json();
          } else {
            return null;
          }
        }
      )
        .then(
          (response) => {
  
            var responseObject = response
  
            if (responseObject) {
              var wordData = responseObject.definitions[0];
              var definition = wordData.description;
              var lexicalCategory = wordData.wordtype
  
              this.setState({
                text: this.state.word,
                definition: definition,
                lexicalCategory: lexicalCategory
              })
            } else {
              this.setState({
                text: this.state.text,
                definition: "Not Found"
  
              })
            }
  
          }
        )
  
    }
    render() {
      return (
        <View style={{ backgroundColor: "#DDBB99", flex: 2 }}>
          <Text style={styles.heading}>Dictionary App</Text>
  
          <TextInput placeholder="Enter The Word" onChangeText={(word) => {
            this.setState({
              word: word,
              text: "Loading....",
              isSearchPressed: false,
              lexicalCategory: "",
              examples: [],
              definition: "",
  
            })
          }}
            placeholderTextColor=''
            value={this.state.word}
            style={styles.textInput} />
  
          <TouchableOpacity style={styles.button}>
            <Text onPress={() => { this.getWord(this.state.word), this.setState({ isSearchPressed: true }) }} style={[styles.text, { color: "white" }]}>Search</Text>
          </TouchableOpacity>
                  
            <View style={styles.textContainer}>
              <Text style={styles.text}>Word:</Text>
              <Text style={styles.text}>{this.state.text}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Type:</Text>
              <Text style={styles.text}>{this.state.lexicalCategory}</Text>
            </View>
            <View style={[styles.textContainer, { flexDirection: "right", flexWrap: "wrap" }]}>
              <Text style={styles.text}>Definition:</Text>
              <Text style={styles.text}>{this.state.definition}</Text>          
            </View>                          
          
  
        </View>
  
      )
    }
  
  }
  
  const styles = StyleSheet.create({
  
    heading: {
  
      color: "#661111",
      alignSelf: "center",
      fontSize: 40, 
  
    },
  
    textInput: {
  
      borderWidth: 3,
      borderRadius: 5,
      width: 200,
      marginTop: 50,
      alignSelf: "center",
      textAlign: "center",    
  
    },
  
    image: {
  
      alignSelf: "center",
      marginTop: 50
  
    },
  
    text: {
  
      textAlign: "center",    
      color: "white",
  
    },
  
    button: {
  
      marginTop: 50,
      alignSelf: "center",
      backgroundColor: "#661111",
      width: 100,
      height: 30,
      borderRadius: 5,
      justifyContent: "center"
  
    },
    textContainer: {
      marginTop: 50,
      alignSelf: "center",
      backgroundColor: "#661111",
      borderRadius: 5,
      justifyContent: "center"
    }
  
  })