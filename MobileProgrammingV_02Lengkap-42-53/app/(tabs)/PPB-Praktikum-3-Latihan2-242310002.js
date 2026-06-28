import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Latihan3() {
  const personalData = {
    name: "Anton Sukamto",
    nim: 20200101,
    address: "Jl. Rangga Gading No.01, Gudang, Kecamatan Bogor Tengah, Kota Bogor",
    email: "anton.sukamto@ibik.ac.id",
    phone_number: "081234567890",
    isStudent: true,
    hobbies: ["Coding", "Reading", "Gaming"],
    socialMedia: { github: "anton-dev", instagram: "@anton_s" },
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000" }}
        style={styles.bgImage}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/147/147144.png" }}
            style={styles.headers.img_avatar}
          />
          <Text style={styles.headers.title}>{personalData.name}</Text>
          <Text style={styles.headers.subtitle}>{personalData.nim}</Text>

          <View style={styles.identity.container}>
            <View style={styles.identity.card_input}>
              <Text style={styles.identity.title}>Phone</Text>
              <TextInput
                value={personalData.phone_number}
                style={styles.identity.input_text}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.identity.card_input}>
              <Text style={styles.identity.title}>Email</Text>
              <TextInput
                value={personalData.email}
                style={styles.identity.input_text}
              />
            </View>

            <View style={styles.identity.card_input}>
              <Text style={styles.identity.title}>Address</Text>
              <TextInput
                value={personalData.address}
                style={styles.identity.input_text}
                multiline
              />
            </View>

            <View style={styles.identity.card_input}>
              <Text style={styles.identity.title}>Active Student</Text>
              <TextInput
                value={personalData.isStudent ? "Yes" : "No"}
                style={styles.identity.input_text}
                editable={false}
              />
            </View>

            <View style={styles.identity.card_input}>
              <Text style={styles.identity.title}>Hobbies</Text>
              <TextInput
                value={personalData.hobbies.join(", ")}
                style={styles.identity.input_text}
                editable={false}
              />
            </View>

            <View style={styles.identity.card_input}>
              <Text style={styles.identity.title}>GitHub Profile</Text>
              <TextInput
                value={personalData.socialMedia.github}
                style={styles.identity.input_text}
                editable={false}
              />
            </View>

            <View style={{ marginTop: 15 }}>
              <TouchableOpacity style={styles.identity.button}>
                <Text style={styles.identity.button_text}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headers: {
    title: {
      fontWeight: "bold",
      fontSize: 40,
    },
    subtitle: {
      fontWeight: "bold",
      fontSize: 20,
      color: "#9b9d9f",
    },
    img_avatar: {
      width: 150,
      height: 150,
      borderRadius: 100,
      borderColor: "#0996d7",
      borderWidth: 4,
      padding: 2,
      backgroundColor: "#f2f2f2",
    },
  },
  identity: {
    container: {
      alignSelf: "stretch",
      padding: 10,
      marginTop: 20,
    },
    card_input: {
      borderWidth: 1,
      borderColor: "#9b9d9f",
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 10,
      backgroundColor: "white",
    },
    title: {
      color: "#9b9d9f",
      fontSize: 16,
      marginBottom: 0,
    },
    input_text: {
      color: "#000",
      fontSize: 16,
      padding: 0,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#0ea6d0",
      padding: 15,
      borderRadius: 10,
    },
    button_text: {
      fontSize: 18,
      color: "white",
      fontWeight: "bold",
    },
  },
});