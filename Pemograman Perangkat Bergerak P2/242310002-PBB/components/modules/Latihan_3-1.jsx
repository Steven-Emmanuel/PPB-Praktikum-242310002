import { setStatusBarBackgroundColor, StatusBar } from "expo-status-bar";
import { Button, Image, ScrollView, StyleSheet, Text } from "react-native";
import filler from "../../components/page/filler";

const latihan_3 = () => {
    return (
        <ScrollView style={styles.container}>
        <Text style={styles.title}>Latihan 3</Text>
        <Image
            Source={require("../../assets/images/icon.png")}
            style={style.image}
        />
        <filler />
        <button
        title="Go To Latihan 2"
        onPress={() => console.log("Go To Latihan 2")}
        />
        <StatusBar Style="auto" />
        </ScrollView>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        BackgroundColor: "#fff",
    },
    title: {
        fontsize: 24,
        fontweight: "bold",
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
});

export default latihan_3;