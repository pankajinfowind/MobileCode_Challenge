import React,{Component} from 'react';
import { View, SafeAreaView, Text } from 'react-native';

class CreditScreen extends Component{
    render(){
        return(
            <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
                <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                    <Text>This is CreditScreen!</Text>
                </View>
            </SafeAreaView>
        )
    }
}
export default CreditScreen;