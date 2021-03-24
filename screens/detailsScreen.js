import React from 'react';
import { View, Text, Alert, StyleSheet, ActivityIndicator} from 'react-native';
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';

export default class DetailsScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          details: {},
          imagePath: "",
          url: `https://b6b5f9660e9b.ngrok.io/star_data?name=${this.props.navigation.getParam(
            "planet_name"
          )}`
        };
    }

    componentDidMount() {
        this.getDetails();
      }
      getDetails = () => {
        const { url } = this.state;
        axios
          .get(url)
          .then(response => {
            this.setState({details: response.data.data});
          })
          .catch(error => {
            Alert.alert(error.message);
          });
      };
      

  render() {
    const { details } = this.state;
    if (details.distance) {
      return (
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <Ionicons name="chevron-back" color="#ffffff" size={30} style={styles.icon}
            onPress={()=>{this.props.navigation.goBack()}} />
            <Text style={{fontSize: 30, fontWeight: "bold", color: "#ffffff"}}>{details.name}</Text>
          </View>

          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={styles.container}>
              <Text style={styles.cardItem}>{`Name : ${details.name}`}</Text>
              <Text style={styles.cardItem}>{`Distance from Earth : ${details.distance}`}</Text>
              <Text style={styles.cardItem}>{`Gravity : ${details.gravity}`}</Text>
              <Text style={styles.cardItem}>{`Planet Mass : ${details.mass}`}</Text>
              <Text style={styles.cardItem}>{`Planet Radius : ${details.radius}`}</Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator color="#FE654F" size="large" style={{marginBottom: 20}} />
        <Text style={{fontSize: 20}}>Loading</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 15,
    elevation: 7,
    width: '80%',
    alignSelf: 'center',
  },
  cardItem: {
    fontSize: 20,
    marginBottom: 5,
  },
  header: {
    width: '100%',
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#FE654F",
    paddingVertical: 17,
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'flex-start',
    position: 'absolute',
    left: 10,
    top: 25,
  }
});