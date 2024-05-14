import {StyleSheet, Text, View} from 'react-native';

const DetailItem = ({Icon, label, labelStyle}) => (
  <View style={style.col}>
    <Icon size={40} style={style.icon} />
    <Text style={labelStyle}>{label}</Text>
  </View>
);
const style = StyleSheet.create({
  icon: {
    marginBottom: 10,
  },
  col: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
export default DetailItem;
