import React from "react";
import { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Contacts from "expo-contacts";

const URL = "https://www.google.com/";

export default function App() {
  const [contact, setContact] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.FirstName],
        });

        if (data.length > 0) {
          // setContact(data)
          // console.log("Ddddddd",data[0])
          // data.map((e,i)=>{
          //   if(e.phoneNumbers){
          //     // console.log("--------------------------------",e.phoneNumbers)
          //     console.log('number',e.phoneNumbers[0].number)
          //     console.log('name',e.firstName)

          //   }
          // })

console.log('lll',data.length)

          for (let i = 0; i < 549; i++) {
            const element = data[i];
            if (element.phoneNumbers) {
              console.log("number", element.phoneNumbers[0].number);
              console.log("name", element.firstName);
            }
          }


          const contact = data[0];
          // console.log(contact);
        }
      }
    })();
  }, []);
  const ref = useRef();
  const myIcon1 = (
    <Icon
      name="times-circle"
      size={25}
      color="gray"
      onPress={() => setshow(!show)}
    />
  ); // Defaults to regular

  const [show, setshow] = useState(false);
  const [refer, setRefer] = useState(null);
  console.log("sjow", show);
  const handleNavState = (state) => {
    console.log("state", state.url);
    console.log("refer", ref.current);
    if (state.url != "https://www.google.com/") {
      console.log("url");

      ref.current.stopLoading();
      ref.current.goBack();
      alert("Url incorrect!");
    } else {
      console.log("working");
    }
  };

  return (
    <View style={styles.container}>
      {contact.length > 0
        ? contact.map((e, i) => {
            {
              console.log(e, i);
            }
            return <Text key={i}>hh</Text>;
          })
        : ""}
      <View style={{ width: "100%", height: "100%" }}>
        {!show ? (
          <Text
            style={{
              color: "green",
              margin: 68,
              padding: 10,
              backgroundColor: "white",
              textAlign: "center",
            }}
            onPress={() => setshow(!show)}
          >
            {" "}
            Open Webview
          </Text>
        ) : (
          ""
        )}
        {show ? (
          <>
            <View style={styles.pos}>{myIcon1}</View>
            <View
              style={styles.shadowProp}
              shadowOffset={{ height: 10 }}
              shadowColor="red"
              borderRadius={10}
              shadowOpacity={0.5}
            >
              <WebView
                javaScriptCanOpenWindowsAutomatically={true}
                source={{ uri: URL }}
                onNavigationStateChange={(navState) => {
                  handleNavState(navState);
                }}
                ref={ref}
              />
            </View>
          </>
        ) : (
          ""
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 38,
    flex: 1,
    color: "green",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  shadowProp: {
    position: "relative",
    flex: 1,
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "white",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 2,
    shadowRadius: 3,
  },
  pos: {
    position: "absolute",
    top: 4,
    zIndex: 8,
    right: 4,
    padding: 3,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "green",
  },
});
