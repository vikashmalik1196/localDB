import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Geolocation from '@react-native-community/geolocation';
import {CustomInput} from '../../Component';
const db = openDatabase({name: 'Student_Table.db'});

const InsertDetails = ({route, navigation}) => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [studentRoll, setStudentRoll] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentAddress, setStudentAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  let userTrackInfo = {};

  //st_data(dommy json data)
  const st_data = [
    {
      st_id: 101,
      st_name: 'Brajesh',
      st_class: 9,
      st_roll: 14,
      st_phone: 8378949746,
      st_address: 'Tata',
      Longitude: longitude,
      Latitude: latitude,
    },
    {
      st_id: 102,
      st_name: 'Rajesh',
      st_class: 9,
      st_roll: 26,
      st_phone: 9273649746,
      st_address: 'Raipur',
      Longitude: '9.96233',
      Latitude: '49.80404',
    },
    {
      st_id: 103,
      st_name: 'Rakesh',
      st_class: 9,
      st_roll: 12,
      st_phone: 8373765746,
      st_address: 'Korba',
      Longitude: '9.96233',
      Latitude: '49.80404',
    },
    {
      st_id: 104,
      st_name: 'Dinesh',
      st_class: 9,
      st_roll: 34,
      st_phone: 8323479746,
      st_address: 'Dhanbad',
      Longitude: '9.96233',
      Latitude: '49.80404',
    },
    {
      st_id: 105,
      st_name: 'Ramesh',
      st_class: 9,
      st_roll: 18,
      st_phone: 8379088946,
      st_address: 'Rourkela',
      Longitude: '9.96233',
      Latitude: '49.80404',
    },
    {
      st_id: 106,
      st_name: 'Sailesh',
      st_class: 9,
      st_roll: 9,
      st_phone: 8370923676,
      st_address: 'Balugaon',
      Longitude: '9.96233',
      Latitude: '49.80404',
    },
    {
      st_id: 107,
      st_name: 'Umesh',
      st_class: 9,
      st_roll: 20,
      st_phone: 8373099046,
      st_address: 'Puri',
      Longitude: '9.96233',
      Latitude: '49.80404',
    },
    {
      st_id: 108,
      st_name: 'Rupesh',
      st_class: 9,
      st_roll: 26,
      st_phone: 8373008806,
      st_address: 'CRPF',
      Longitude: '9.96233',
      Latitude: '49.80404',
    },
    {
      st_id: 109,
      st_name: 'Kamlesh',
      st_class: 9,
      st_roll: 16,
      st_phone: 8373789746,
      st_address: 'Gopalpur',
      Longitude: '9.96233',
      Latitude: '49.80404',
    },
    {
      st_id: 110,
      st_name: 'Naresh',
      st_class: 9,
      st_roll: 10,
      st_phone: 8374569746,
      st_address: 'Sonpur',
      Longitude: '9.96233',
      Latitude: '49.80404',
    },
    {
      st_id: 111,
      st_name: 'Vikash',
      st_class: 9,
      st_roll: 27,
      st_phone: 837308946,
      st_address: 'Sambalpur',
      Longitude: '9.96233',
      Latitude: '49.80404',
    },
    {
      st_id: 112,
      st_name: 'Santosh',
      st_class: 9,
      st_roll: 18,
      st_phone: 837306746,
      st_address: 'Berhampur',
      Longitude: '9.96233',
      Latitude: '50.76891',
    },
    {
      st_id: 113,
      st_name: 'Sagar',
      st_class: 9,
      st_roll: 35,
      st_phone: 9131049746,
      st_address: 'Khurda',
      Longitude: '6.11499',
      Latitude: '51.53548',
    },
    {
      st_id: 114,
      st_name: 'Srikant',
      st_class: 9,
      st_roll: 11,
      st_phone: 9993049746,
      st_address: 'Cuttck',
      Longitude: '6.11499',
      Latitude: '50.76891',
    },
  ];

  //Creating Student Table
  const createStudentTable = () => {
    getLocation();
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Student_Table'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS Student_Table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Student_Table(student_id INTEGER PRIMARY KEY AUTOINCREMENT, student_name VARCHAR(30), student_class INT(15), student_roll INT(15), student_phone INT(15), student_address VARCHAR(255), longitude VARCHAR(100), latitude VARCHAR(100))',
              [],
            );
          }
        },
      );
    });
  };

  //Inserting Student Table
  const insertStudentTable = () => {
    console.log(
      studentId,
      studentName,
      studentClass,
      studentRoll,
      studentPhone,
      studentAddress,
      longitude,
      latitude,
    );
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO Student_Table (student_Id, student_name, student_class, student_roll, student_phone, student_address, longitude, latitude) VALUES (?,?,?,?,?,?,?,?)',
        [
          studentId,
          studentName,
          studentClass,
          studentRoll,
          studentPhone,
          studentAddress,
          longitude,
          latitude,
        ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Successfully Inserted',
              [
                {
                  text: 'Ok',
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
    });
  };

  //Inserting std_data(dommy json data) in Student Table
  const insertStdData = () => {
    console.log(st_data);
    st_data.forEach((ele, index) => {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO Student_Table (student_id, student_name, student_class, student_roll, student_phone, student_address, longitude, latitude) VALUES (?,?,?,?,?,?,?,?)',
          [
            ele.st_id,
            ele.st_name,
            ele.st_class,
            ele.st_roll,
            ele.st_phone,
            ele.st_address,
            ele.Longitude,
            ele.Latitude,
          ],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Successfully Inserted',
                [
                  {
                    text: 'Ok',
                  },
                ],
                {cancelable: false},
              );
            } else alert('Registration Failed');
          },
        );
      });
    });
  };

  //Finding Longitude and Latitude of the Device
  const getLocation = () => {
    Geolocation.getCurrentPosition(info => [
      (userTrackInfo = {
        latitude: setLatitude(`${info.coords.latitude}`),
        longitude: setLongitude(`${info.coords.longitude}`),
      }),
    ]);
    console.log('Location', userTrackInfo);
    console.log('Latitude', latitude);
    console.log('Longitude', longitude);
  };

  useEffect(() => {
    createStudentTable();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.textInputContainer}>
        <CustomInput
          label="Student ID"
          keyboardType="number-pad"
          onChangeText={value => setStudentId(value)}
        />
        <CustomInput
          label="Student Name"
          onChangeText={value => setStudentName(value)}
        />
        <CustomInput
          label="Student Class"
          keyboardType="number-pad"
          onChangeText={value => setStudentClass(value)}
        />
        <CustomInput
          label="Student Roll no."
          keyboardType="number-pad"
          onChangeText={value => setStudentRoll(value)}
        />
        <CustomInput
          label="Student Contact"
          keyboardType="number-pad"
          onChangeText={value => setStudentPhone(value)}
        />
        <CustomInput
          label="Student Address"
          onChangeText={value => setStudentAddress(value)}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.touchableOpacity1}
          onPress={insertStudentTable}>
          <Text style={styles.touchableOpacityText}>INSERT DETAILS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableOpacity1}
          onPress={insertStdData}>
          <Text style={styles.touchableOpacityText}>INSERT DETAILS (JSON)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableOpacity2}
          onPress={() => navigation.navigate('GetDetails')}>
          <Text style={styles.touchableOpacityText}>SHOW DETAILS </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:'white'

    
  },
  textInputContainer:{
 
  },
  btnContainer:{
    flexDirection:'row',
    position:'absolute',
    bottom:0,
  },
  touchableOpacity1: {
    backgroundColor: 'darkcyan',
    borderRadius: 15,

  },
  touchableOpacity2: {
    backgroundColor: 'darkcyan',
    borderRadius: 15,
 
  },

  touchableOpacityText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
});

export default InsertDetails;
