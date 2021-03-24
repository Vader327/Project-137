import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      url: "https://b6b5f9660e9b.ngrok.io"
    };
  }

  componentDidMount() {
    this.getPlanets();
  }

  getPlanets = () => {
    axios
      .get(this.state.url)
      .then(response => {
        this.setState({
          listData: response.data.data
        });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  renderItem = ({ item, index }) => (
    <TouchableHighlight style={styles.listContainer} underlayColor="#eaeaea"
    onPress={() => this.props.navigation.navigate("Details", { planet_name: item.name })}>
      <View>
        <Text style={{fontSize: 18, fontWeight: "bold", color: "#FE4F34", marginBottom: 5}}>{item.name}</Text>
        <Text>{`Distance from Earth : ${item.distance}`}</Text>
      </View>
    </TouchableHighlight>
  )

  render() {
    if (this.state.listData.length === 0) {
      return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator color="#FE654F" size="large" style={{marginBottom: 20}} />
          <Text style={{fontSize: 20}}>Loading</Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>        
        <View style={{flex: 0.1, justifyContent: "center", alignItems: "center", backgroundColor: "#FE654F"}}>
          <Text style={{fontSize: 30, fontWeight: "bold", color: "#ffffff"}}>Stars</Text>
        </View>

        <View style={{flex: 0.9}}>
          <FlatList
            ref={ref => (this.flatListRef = ref)}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.listData}
            renderItem={this.renderItem}
          />

          <View style={styles.toTop}>
            <Ionicons name="chevron-up" size={30} onPress={()=>{this.flatListRef.scrollToOffset({animated: true, offset: 0})}} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#fff",
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
  },
  toTop: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  }
});