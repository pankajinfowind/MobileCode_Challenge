import React, { Component } from 'react'
import { View, Text, SafeAreaView, Image, ScrollView, Dimensions, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import styles from './Utility/Styles'
import {FREEZE_CARD,freeze,WEEKLY_SPENDING_LIMIT,DEPOSITE_MONEY_TO_YOUR_ACCOUNT,DEBIT_CARD_SPENDING_LIMIT,TOP_UP_ACCOUNT, close_eye, open_eye, backArrow, greenLogo, spendingLimit, UILabels, transfer, SpendingLimitsPrice, UILabelsColor, FontFamily, toggle_active, toggle_inactive, windowWidth, insight } from './Utility/Constant'
import {Get_Card_Info_Request} from '../src/APIManager/ApiManager'
import {GetCard} from './redux/actions/authAction'
import { connect } from 'react-redux'
//this.props.navigation.navigate('SpendingLimit')
class DebitCardScreen extends Component {
    state = {
        toggleIndex: 0,
        isHiddenCardDetails: true,
    }
    async componentDidMount(){
        await this.props.GetCard()
        console.log("Screen calling ",this.props.cardInfo)
    }
    limit = (index) => {
        if (this.state.toggleIndex == 0) {
            this.setState({ toggleIndex: index })
        } else {
            this.setState({ toggleIndex: 0 })
        }
        this.props.navigation.navigate('SpendingLimit',this.state.cardInfo)
    }
    card_Visibility = () => {
        const { isHiddenCardDetails } = this.state
        if (isHiddenCardDetails) {
            this.setState({ isHiddenCardDetails: false })
        } else {
            this.setState({ isHiddenCardDetails: true })
        }
    }
    getCardInfo(){
        response = Get_Card_Info_Request().then(async response => {
            if (response.status == 200) {
                console.log("Card dataaaa is",response.data)
                this.setState({cardInfo:response.data})
            }
        }).catch(async error => {
            console.log('error is = ', error)
            alert("Network failed please try again.")
        })
    }
    getCardNumber = (fullNumber)=>{
        let stringArray = fullNumber.split(" ");
        console.log("Seprate value is ",stringArray)
        return stringArray
    }
    render() {
        const { toggleIndex, isHiddenCardDetails } = this.state
        const {cardInfo} = this.props
        return (
            <SafeAreaView style={styles.screenContainer}>
                <View style={DebitStyles.headerLbl}>
                    <Text style={styles.screenTitle}>
                        {UILabels.creditCard}
                    </Text>
                    <View style={{ flex: 1 }}></View>
                    <Image style={{ marginRight: 24.41 }} source={greenLogo} />
                </View>
                <View style={{ backgroundColor: UILabelsColor.appBG }}>
                    <View style={{height: 19, marginLeft: 24, marginTop: 24 }}>
                        <Text style={DebitStyles.availBalTitle}>{UILabels.Available_bal}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={DebitStyles.doubleDollar}>
                            <Text style={DebitStyles.greenViewText}>{UILabels.currency}</Text>
                        </View>
                        <View style={{ marginLeft: 10, marginTop: -2 }}>
                            <Text style={DebitStyles.availbeBalLbl}>{cardInfo.available_balance ? cardInfo.available_balance:null}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={DebitStyles.ScrollView_Container}>
                    <View style={DebitStyles.MainContent_Container}>
                        {toggleIndex ==1 ?
                        <><View style={DebitStyles.limit_container}>
                            <Text style={DebitStyles.debit_card_spending_limit}>{DEBIT_CARD_SPENDING_LIMIT}</Text>
                            <View style={{ flex: 1 }}></View>
                            <Text style={DebitStyles.limit_exist}>{ cardInfo.spend_money ? cardInfo.spend_money:null}</Text>
                            <Text style={DebitStyles.selected_limit}>| { cardInfo.card_limit ? cardInfo.card_limit:null}</Text>
                        </View>
                        <View style={DebitStyles.bar_container}>
                            <View style={DebitStyles.limit_bar}></View>
                        </View></>:null}
                        <View style={[DebitStyles.top_up_acc_container,toggleIndex ==0 ? {marginTop:150}:{marginTop:32}]}>
                            <Image source={insight} />
                            <View style={{ marginLeft: 12 }}>
                                <Text style={DebitStyles.topup_acc}>{TOP_UP_ACCOUNT}</Text>
                                <Text style={DebitStyles.topup_text}>{DEPOSITE_MONEY_TO_YOUR_ACCOUNT}</Text>
                            </View>
                        </View>
                        <View style={DebitStyles.weekly_spend_limte_container}>
                            <Image source={transfer} />
                            <View style={{ marginLeft: 12 }}>
                                <Text style={DebitStyles.topup_acc}>{WEEKLY_SPENDING_LIMIT}</Text>
                                <Text style={DebitStyles.topup_text}>{toggleIndex == 0 ? UILabels.weekly_limit_Notset : UILabels.weekly_limit_Set}</Text>
                            </View>
                            <View style={{ flex: 1 }}></View>
                            <TouchableOpacity style={{ marginRight: 24 }}
                                onPress={() => this.limit(1)}
                            >
                                <Image source={toggleIndex == 1 ? toggle_active : toggle_inactive} />

                            </TouchableOpacity>
                        </View>
                        <View style={DebitStyles.freeze_card_container}>
                            <Image source={freeze} />
                            <View style={{ marginLeft: 12 }}>
                                <Text style={DebitStyles.topup_acc}>{FREEZE_CARD}</Text>
                                <Text style={DebitStyles.topup_text}>Your debit card is currently active</Text>
                            </View>
                            <View style={{ flex: 1 }}></View>
                            <TouchableOpacity style={{ marginRight: 10 }}>
                                <Image source={toggle_inactive} />

                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 24, height: 41, flexDirection: 'row', marginTop: 32 }}>
                            <Image source={require('../assets/images/newcard/newcard.png')} />
                            <View style={{ marginLeft: 12 }}>
                                <Text style={DebitStyles.topup_acc}>Get a new card</Text>
                                <Text style={DebitStyles.topup_text}>This deactivates your current debit card</Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: 24, height: 41, flexDirection: 'row', marginTop: 32 }}>
                            <Image source={require('../assets/images/deactivateCard/deactivateCard.png')} />
                            <View style={{ marginLeft: 12 }}>
                                <Text style={DebitStyles.topup_acc}>Deactivated cards</Text>
                                <Text style={DebitStyles.topup_text}>Your previously deactivated cards</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: windowWidth - 40, alignSelf: 'center', position: 'absolute' }}>
                        <View style={{ flex: 1 }}></View>
                        {/* <View style={{flexDirection:"row" ,alignSelf: 'flex-end', width: windowWidth - 200, borderTopLeftRadius: 6, borderTopRightRadius: 6, flexDirection: 'row', height: 40, backgroundColor: '#FFFFFF' }}> */}
                        <TouchableOpacity style={{ flexDirection: "row", alignSelf: 'flex-end', width: windowWidth - 200, borderTopLeftRadius: 6, borderTopRightRadius: 6, flexDirection: 'row', height: 40, backgroundColor: '#FFFFFF' }}
                            onPress={() => this.card_Visibility()}
                        >
                            <View >
                                <Image style={{ marginLeft: 15, marginTop: 8 }} source={isHiddenCardDetails ? open_eye : close_eye} />
                            </View>
                            <View>
                                <Text style={{ color: '#01D167', marginTop: 8, marginLeft: 6 }}>{isHiddenCardDetails ? UILabels.show_card : UILabels.hide_card}</Text>
                            </View>
                        </TouchableOpacity>
                        {/* </View> */}

                        <View style={{ flex: 1, backgroundColor: '#01D167', borderRadius: 10, marginTop: -7 }}>
                            <View style={{ flex: 1 }}></View>
                            <View style={{ marginTop: 24, marginRight: 24, alignSelf: 'flex-end', flexDirection: 'row', width: 74, height: 21 }}>
                                <Image source={require('../assets/images/Home/Home.png')} />
                                <Text style={{marginLeft:5,marginTop:3,fontFamily:FontFamily.metr_medium,fontSize:16, color: '#FFFFFF' }}>aspire</Text>
                            </View>
                            <View style={{ height: 30, marginTop: 15, marginLeft: 24 }}>
                                <Text style={DebitStyles.card_holder_name}>{ cardInfo.name_on_card}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' ,marginTop:9}}>
                                <Text style={DebitStyles.card_number}>{ cardInfo.card_number ? (isHiddenCardDetails ? '••••' : this.getCardNumber(cardInfo.card_number)[0]):null}</Text>
                                <View style={{ flex: 1 }}></View>
                                <Text style={DebitStyles.card_number}>{ cardInfo.card_number ? (isHiddenCardDetails ? '••••' : this.getCardNumber(cardInfo.card_number)[1]):null}</Text>
                                <View style={{ flex: 1 }}></View>
                                <Text style={DebitStyles.card_number}>{ cardInfo.card_number ? (isHiddenCardDetails ? '••••' : this.getCardNumber(cardInfo.card_number)[2]):null}</Text>
                                <View style={{ flex: 1 }}></View>
                                <Text style={[{marginRight:78},DebitStyles.card_number]}>{ cardInfo.card_number ? (this.getCardNumber(cardInfo.card_number)[3]):null}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Text style={[{ marginLeft: 24 },DebitStyles.card_validity]}>Thru:</Text>
                                <Text style={[{ marginLeft: 4},DebitStyles.card_number1]}>12/20</Text>
                                <Text style={[{ marginLeft: 32},DebitStyles.card_validity]}>CVV:</Text>
                                <Text style={[{ marginLeft: 8},DebitStyles.card_number1]}>{isHiddenCardDetails ? '***' : '456'}</Text>
                            </View>
                            <View style={{ marginTop: 4, flexDirection: 'row', marginBottom: 24 }}>
                                <View style={{ flex: 1 }}></View>
                                <Image style={{ marginRight: 24 }} source={require('../assets/images/VisaLogo/VisaLogo.png')} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const DebitStyles = StyleSheet.create({
    availBalTitle: { color: UILabelsColor.white, fontFamily: FontFamily.metr_medium, fontSize: 14 },
    headerLbl:{ flexDirection: 'row', height: 56, alignItems: 'center' },
    doubleDollar:{
        borderRadius: 4, 
        width: 40, 
        height: 22, 
        backgroundColor: '#01D167', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft: 24
    },
    avail_bal_container:{
        width: 114, 
        height: 19, 
        marginLeft: 24, 
        marginTop: 24 
    },
    ScrollView_Container:{
        overflow: 'visible', 
        borderTopRightRadius: 24, 
        borderTopLeftRadius: 24,
        marginTop:10 
    },
    MainContent_Container:{
        flex: 1, 
        backgroundColor: 'white', 
        borderTopRightRadius: 24, 
        borderTopLeftRadius: 24,
        marginTop:90
    },
    limit_container:{
        marginLeft: 24, 
        height: 41, 
        flexDirection: 'row',
        marginTop:160 

    },
    bar_container:{
        marginTop: -20, 
        height: 15, 
        borderRadius: 30, 
        marginLeft: 24, 
        marginRight: 24
    },
    limit_bar:{
        borderRightColor: "transparent", 
        borderRightWidth: 10, 
        borderTopWidth: 13, 
        width: 78, 
        borderColor: '#01D167', 
        borderTopLeftRadius: 30, 
        borderBottomLeftRadius: 30
    },
    top_up_acc_container:{
        marginLeft: 24, 
        height: 41, 
        flexDirection: 'row', 
        marginRight:24
        //marginTop: 32 
    },
    weekly_spend_limte_container:{
        marginLeft: 24, 
        height: 41, 
        flexDirection: 'row', 
        marginTop: 32
    },
    freeze_card_container:{
        marginLeft: 24, 
        height: 41, 
        flexDirection: 'row', 
        marginTop: 32
    },
    new_card_container:{
        marginLeft: 24, 
        height: 41, 
        flexDirection: 'row', 
        marginTop: 32 
    },
    deactivate_card_container:{
        marginLeft: 24, 
        height: 41, 
        flexDirection: 'row', 
        marginTop: 32 
    },
    card_Visibility_container:{
        width: windowWidth - 40, 
        alignSelf: 'center',
        position:'absolute'
    },
    card_visibility_btn:{
        flexDirection: "row", 
        alignSelf: 'flex-end', 
        width: windowWidth - 200, 
        borderTopLeftRadius: 6, 
        borderTopRightRadius: 6, 
        flexDirection: 'row', 
        height: 40, 
        backgroundColor: '#FFFFFF' 
    },
    card_main_container:{
        flex: 1, 
        backgroundColor: '#01D167', 
        borderRadius: 10, 
        marginTop: -7
    },
    card_logo:{
        marginTop: 24, 
        marginRight: 24, 
        alignSelf: 'flex-end', 
        flexDirection: 'row', 
        width: 74, 
        height: 21
    },
    name_container:{
        height: 30, 
        marginTop: 24, 
        marginLeft: 24 
    },
    name_style:{
        color: '#FFFFFF', 
        fontWeight: 'bold', 
        fontSize: 18 
    },
    topup_text:{marginTop:8,fontFamily:FontFamily.metr_regular, color:UILabelsColor.lightGray, fontSize: 13 },
    topup_acc:{fontFamily:FontFamily.metr_medium, color: '#25345F',fontSize:14},
    card_validity:{fontFamily:FontFamily.metr_semiBold, marginLeft: 24, fontSize:14,color: '#FFFFFF'},
    card_number:{fontFamily:FontFamily.metr_semiBold, marginLeft: 24, fontSize:14,color: '#FFFFFF', letterSpacing: 3},
    card_holder_name:{fontFamily:FontFamily.metr_bold, color: '#FFFFFF',  fontSize: 22},
    card_number1:{fontFamily:FontFamily.metr_semiBold, fontSize:14,color: '#FFFFFF', letterSpacing: 3},
    selected_limit:{fontFamily:FontFamily.metr_medium, marginLeft: 10, marginRight: 24, color: '#22222233', fontSize: 13 },
    limit_exist:{fontFamily:FontFamily.metr_semiBold, color: '#01D167', fontSize: 13 },
    debit_card_spending_limit:{fontFamily:FontFamily.metr_medium,color: '#222222', fontSize: 13},
    greenViewText: { color: UILabelsColor.white, fontFamily: FontFamily.metr_bold, fontSize: 13 },
    availbeBalLbl: { color: UILabelsColor.white, fontFamily: FontFamily.metr_bold, fontSize: 24 },
})
// export default DebitCardScreen;
const mapStateToProps = (state) => {
    return {
      cardInfo: state.auth.cardInfo,
    }
  }
export default connect(mapStateToProps,{GetCard})(DebitCardScreen)