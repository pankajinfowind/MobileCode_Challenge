

import { StyleSheet } from 'react-native';
import { UILabelsColor,FontFamily } from './Constant';

export default StyleSheet.create({
  unSelectBtn: {
    marginLeft: 40, marginRight: 40, marginBottom: 24, height: 56, backgroundColor: UILabelsColor.btnUnselect, borderRadius: 30, justifyContent: 'center', alignItems: 'center', shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
},
selectBtn: {
    marginLeft: 40, marginRight: 40, marginBottom: 24, height: 56, backgroundColor: UILabelsColor.appGreen, borderRadius: 30, justifyContent: 'center', alignItems: 'center', shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
},
screenContainer: { flex: 1, backgroundColor: UILabelsColor.appBG },
contentView:{ flexDirection: 'row', height: 56, alignItems: 'center', justifyContent: 'center' },
screenTitle:{ marginLeft: 24, marginTop: 4, color: UILabelsColor.white, fontFamily: FontFamily.metr_bold, fontSize: 24 },
btnTitle:{ color: UILabelsColor.white, fontFamily: FontFamily.metr_semiBold, fontSize: 16 }
});