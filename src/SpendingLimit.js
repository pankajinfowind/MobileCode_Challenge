import React, { Component } from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import styles from './Utility/Styles'
import { backArrow, greenLogo, spendingLimit, UILabels, SpendingLimitsPrice, UILabelsColor, FontFamily } from './Utility/Constant'
import { Update_Limit } from '../src/APIManager/ApiManager'
import { connect } from 'react-redux'
import {GetCard,UpdateCardLimit} from './redux/actions/authAction'
class SpendingLimit extends Component {
    state = {
        isLimitSelected: false,
        selectedLimit: '',
        isLoader: false,
    }
    async componentDidMount() {
    //  await this.props.GetCard()
     console.log("Selected card info ",this.props.cardInfo)
    }
    selectLimit = (limit) => {
        this.setState({ selectedLimit: limit, isLimitSelected: true })
    }
    async saveLimit() {
        const { isLimitSelected, selectedLimit } = this.state
        const {cardInfo} = this.props
        console.log("Selected card info ",cardInfo)
        if (isLimitSelected && cardInfo) {
            await this.props.UpdateCardLimit(cardInfo.id, selectedLimit)
            this.props.navigation.goBack()
        }
    }
    render() {
        const { isLimitSelected, selectedLimit } = this.state
        return (
            <SafeAreaView style={styles.screenContainer}>
                <View style={styles.contentView}>
                    <TouchableOpacity style={{ marginStart: 24 }} onPress={() => this.props.navigation.goBack()}>
                        <Image source={backArrow} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}></View>
                    <Image style={{ marginRight: 24.41 }} source={greenLogo} />
                </View>
                <Text style={styles.screenTitle}>
                    {UILabels.spendingLimit}
                </Text>
                <View style={screenStyle.screenView}>
                    <View style={screenStyle.limitSubvieHeader}>
                        <Image source={spendingLimit} ></Image>
                        <Text style={screenStyle.limitInfoLbl}>
                            {UILabels.limitInfo}
                        </Text>
                    </View>
                    <View style={screenStyle.selectedLimitLbl}>
                        <View style={screenStyle.greenCurrencyView}>
                            <Text style={screenStyle.greenViewText}>
                                {UILabels.currency}
                            </Text>
                        </View>
                        <Text style={screenStyle.selectedValueLbl}>
                            {selectedLimit}
                        </Text>
                    </View>
                    <Text style={screenStyle.limitDescription}>
                        {UILabels.limitDescription}
                    </Text>
                    <View style={screenStyle.limitView}>
                        <TouchableOpacity style={screenStyle.chooseLimitBtn} onPress={() => this.selectLimit(SpendingLimitsPrice.fiveK)}>
                            <Text style={screenStyle.limitBtnText}>
                                {UILabels.currency + SpendingLimitsPrice.fiveK}
                            </Text>
                        </TouchableOpacity>
                        <View style={{ width: 12 }}></View>
                        <TouchableOpacity style={screenStyle.chooseLimitBtn} onPress={() => this.selectLimit(SpendingLimitsPrice.tenK)}>
                            <Text style={screenStyle.limitBtnText}>
                                {UILabels.currency + SpendingLimitsPrice.tenK}
                            </Text>
                        </TouchableOpacity>
                        <View style={{ width: 12 }}></View>
                        <TouchableOpacity style={screenStyle.chooseLimitBtn} onPress={() => this.selectLimit(SpendingLimitsPrice.twentyK)}>
                            <Text style={screenStyle.limitBtnText}>
                                {UILabels.currency + SpendingLimitsPrice.twentyK}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity style={isLimitSelected ? styles.selectBtn : styles.unSelectBtn} onPress={() => this.saveLimit()}>
                        <Text style={styles.btnTitle}>
                            {UILabels.save}
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator />
                    <ActivityIndicator size="large" />
                    <ActivityIndicator size="small" color="#0000ff" />
                    <ActivityIndicator size="large" color="#00ff00" />
                </View> */}
            </SafeAreaView>
        )
    }
}
//  export default SpendingLimit;
const mapStateToProps = (state) => {
    return {
        cardInfo: state.auth.cardInfo,
        isLimitUpdated:state.auth.isLimitUpdated
    }
  }
export default connect(mapStateToProps,{GetCard,UpdateCardLimit})(SpendingLimit)

const screenStyle = StyleSheet.create({
    screenView: { flex: 1, backgroundColor: UILabelsColor.white, borderTopRightRadius: 25, borderTopLeftRadius: 25, marginTop: 40 },
    limitSubvieHeader: { flexDirection: 'row', marginTop: 32, marginLeft: 24, alignItems: 'center' },
    limitInfoLbl: { marginLeft: 12, color: UILabelsColor.darkGray, fontFamily: FontFamily.metr_medium, fontSize: 14 },
    selectedLimitLbl: {
        flexDirection: 'row', marginTop: 13, marginLeft: 24, marginRight: 24, alignItems: 'center', height: 39, borderBottomColor: UILabelsColor.lightGray,
        borderBottomWidth: 0.5
    },
    greenCurrencyView: { width: 40, height: 24, backgroundColor: UILabelsColor.appGreen, alignItems: 'center', justifyContent: 'center' },
    greenViewText: { color: UILabelsColor.white, fontFamily: FontFamily.metr_bold, fontSize: 13 },
    selectedValueLbl: { marginLeft: 10, color: UILabelsColor.darkGray, fontFamily: FontFamily.metr_bold, fontSize: 24 },
    limitDescription: { marginLeft: 20, marginTop: 16, color: UILabelsColor.lightGray, fontFamily: FontFamily.metr_regular, fontSize: 12 },
    limitView: { marginLeft: 24, marginTop: 32, height: 40, marginRight: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    chooseLimitBtn: { flex: 1, height: '100%', backgroundColor: UILabelsColor.greenOpacity, justifyContent: 'center', alignItems: 'center' },
    limitBtnText: { color: UILabelsColor.appGreen, fontFamily: FontFamily.metr_semiBold, fontSize: 12 }

});