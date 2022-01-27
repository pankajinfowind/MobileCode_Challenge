import React,{Component} from 'react';
import { View, SafeAreaView, Text } from 'react-native';

class HomeScreen extends Component{
    render(){
        return(
            <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
                <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                    <Text>This is HomeScreen!</Text>
                </View>
            </SafeAreaView>
        )
    }
}
export default HomeScreen;