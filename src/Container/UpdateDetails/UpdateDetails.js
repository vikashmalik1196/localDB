import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {CustomInput} from '../../Component';
const db = openDatabase({name: 'Student_Table.db'});

const UpdateDetails = ({route, navigation}) => {
  const [sId, setSId] = useState('');
  const [sName, setSName] = useState('');
  const [sClass, setSClass] = useState('');
  const [sRoll, setSRoll] = useState('');
  const [sPhone, setSPhone] = useState('');
  const [sAddress, setSAddress] = useState('');

  useEffect(() => {
    setSId(route.params.student_id.toString());
    setSName(route.params.student_name);
    setSClass(route.params.student_class.toString());
    setSRoll(route.params.student_roll.toString());
    setSPhone(route.params.student_phone.toString());
    setSAddress(route.params.student_address);
  }, []);

  const updateStudentTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE Student_Table set student_name=?, student_class=?, student_roll=?, student_phone=?, student_address=? where student_id=?',
        [sName, sClass, sRoll, sPhone, sAddress, sId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert('Record Updated Successfully...');
            navigation.navigate('GetDetails');
          } else Alert.alert('Error');
        },
      );
    });
  };
  // console.log(route.params);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.mainContainer}>
        {/* <CustomInput
          disabled={true}
          label="Student ID"
          onChangeText={text => setSId(text)}
          value={sId}
          style={{color:"red"}}
        /> */}
        <Text
          style={{color: 'grey', fontSize: 12,alignSelf:"flex-start",marginLeft:35}}>
          Student Id
        </Text>
        <Text
          style={{color: 'red', fontWeight: 'bold', fontSize: 15,alignSelf:"flex-start",marginLeft:35}}
          onChangeText={text => setSId(text)}>
          {sId}
        </Text>
        <CustomInput
          label="Student Name"
          onChangeText={text => setSName(text)}
          value={sName}
        />
        <CustomInput
          label="Student Class"
          keyboardType="number-pad"
          onChangeText={text => setSClass(text)}
          value={sClass}
        />
        <CustomInput
          label="Student Roll no."
          keyboardType="number-pad"
          onChangeText={text => setSRoll(text)}
          value={sRoll}
        />
        <CustomInput
          label="Student Contact"
          keyboardType="number-pad"
          onChangeText={text => setSPhone(text)}
          value={sPhone}
        />
        <CustomInput
          label="Student Address"
          onChangeText={text => setSAddress(text)}
          value={sAddress}
        />
      </View>
      <View style={{margin: 15, backgroundColor: 'white'}}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={updateStudentTable}>
          <Text style={styles.touchableOpacityText}>Update Details</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    backgroundColor: 'white',
  },

  touchableOpacity: {
    backgroundColor: 'darkcyan',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 5,
  },

  touchableOpacityText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
    padding: 8,
  },
});

export default UpdateDetails;
