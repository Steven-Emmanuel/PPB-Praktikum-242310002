import React from "react";
import { View, Text } from "react-native";

const SampleVariableInJSX = () => {
    const title = "Contoh Gambar pengguna variable pada jsx";
    const personalData = {
        Nama: "Anton_Sukamto",
        jurusan: "Teknologi Informasi",
        aktif: true,
    };
    const extracurricular = ["Basketball", "Robotics", "Monitoring"];
    const a = 10, b = 20;

    return (
        <View>
            <Text>{title}</Text>
            <Text>Jawaban penjumlahan: {a + b}</Text>

            <Text>Memanggil data array pada JSX</Text>
            <Text>Extracurricular</Text>
            {extracurricular.map((item, index) => (
                <Text key={index}>- {item}</Text>
            ))}

            <Text>Memanggil Data Object pada JSX</Text>
            <Text>Fullname: {personalData.Nama}</Text>
            <Text>Departement: {personalData.jurusan}</Text>
            <Text>Status: {personalData.aktif ? "Active" : "Not Active"}</Text>
        </View>
    );
};

export default samplevariableinjsx;