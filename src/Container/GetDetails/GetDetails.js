import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, Pressable, StyleSheet, Image} from 'react-native';
import {Title} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'Student_Table.db'});

const GetDetails = ({navigation}) => {
  const [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Student_Table', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }, [flatListItems]);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080',
        }}
      />
    );
  };

  const deleteItems = studentId => {
    console.log('User Id:=', studentId);
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  Student_Table where student_id=?',
        [studentId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  };

  // const gotoUpdateDetails = studentId => {
  //   console.log('Student Id:=', studentId,);
  //   navigation.navigate('UpdateDetails', studentId)
  // };

  const gotoUpdateDetails = (sId, sName, sClass, sRoll, sContact, sAddress) => {
    navigation.navigate('UpdateDetails', {
      student_id: sId,
      student_name: sName,
      student_class: sClass,
      student_roll: sRoll,
      student_phone: sContact,
      student_address: sAddress,
    });
  };

  const getGeoLoction = (lati, longi) => {
    navigation.navigate('LocationMapping', {
        latitude: lati,
        longitude: longi,
    });
  };

  let listItemView = item => {
    return (
      <>
        <View
          key={item.student_id}
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            margin: 10,
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.head}>
              ID :<Text style={styles.subHead}>{item.student_id}</Text>
            </Text>
            <Text style={styles.text}>
              NAME :<Text style={styles.subText}>{item.student_name}</Text>
            </Text>
            <Text style={styles.text}>
              CLASS :<Text style={styles.subText}>{item.student_class}</Text>
            </Text>
            <Text style={styles.text}>
              ROLL :<Text style={styles.subText}>{item.student_roll}</Text>
            </Text>
            <Text style={styles.text}>
              CONTACT :<Text style={styles.subText}>{item.student_phone}</Text>
            </Text>
            <Text style={styles.text}>
              ADDRESS :
              <Text style={styles.subText}>{item.student_address}</Text>
            </Text>
            <Text style={styles.text}>
              LONGITUDE :<Text style={styles.subText}>{item.longitude}</Text>
            </Text>
            <Text style={styles.text}>
              LATITUDE :<Text style={styles.subText}>{item.latitude}</Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              right: 20,
              position: 'absolute',
              paddingTop: 30,
            }}>
            <Pressable onPress={() => deleteItems(item.student_id)}>
              <Image
                source={require('../../Assets/Images/trash2.png')}
                style={styles.img}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                gotoUpdateDetails(
                  item.student_id,
                  item.student_name,
                  item.student_class,
                  item.student_roll,
                  item.student_phone,
                  item.student_address,
                )
              }>
              <Image
                source={require('../../Assets/Images/update.png')}
                style={styles.img}
              />
            </Pressable>
            <Pressable
              onPress={() => getGeoLoction(item.longitude, item.latitude)}>
              <Image
                source={require('../../Assets/Images/trash1.png')}
                style={styles.img}
              />
            </Pressable>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'darkcyan'}}>
      <Title
        style={{
          textAlign: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: 25,
          marginTop: 20,
        }}>
        Student Master Table Details
      </Title>
      <FlatList
        data={flatListItems}
        ItemSeparatorComponent={listViewItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => listItemView(item)}
        style={{
          textAlign: 'left',
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  subText: {
    textAlign: 'left',
    color: 'darkcyan',
    fontWeight: 'bold',
    fontSize: 14,
  },
  head: {
    textAlign: 'left',
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subHead: {
    textAlign: 'left',
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  img: {
    height: 60,
    width: 60,
    marginLeft: 20,
  },
});
export default GetDetails;
