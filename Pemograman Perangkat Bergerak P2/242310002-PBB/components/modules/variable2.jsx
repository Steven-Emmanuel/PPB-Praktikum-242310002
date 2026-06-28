import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const Latihan2 = () => {
    const personalData = {
        name: "Anton Sukamto",
        jurusan: "Teknik Informatika",
        aktif: true,
    };
    const course_lists= [
        {id : 1, course_name: "Pemrograman Web", code: "PPB01"},
        {id : 2, course_name: "Pemrograman Mobile", code: "PPB02"},
        {id : 3, course_name: "Pemrograman Dasar", code: "PPB03"},
    ];
    const extracurriculars = ["Basketball", "Robotics", "Mentoring"];
    const total_point = 120;
    const criteria = total_point >= 300;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Personal Information</Text>
            <Text>Fullname: {personalData.name}</Text>
            <Text>Jurusan: {personalData.jurusan}</Text>
            <Text>Status Aktif: {personalData.aktif ? "Aktif" : "Tidak Aktif"}</Text>

            <Text style={styles.title}>My Courses</Text>
            {course_lists.map((course) => (
                <Text key={course.id}>
                    {course.course_name} - {course.code}
                </Text>
            ))}

            <Text style={styles.title}>Extracurricular Activities</Text>
            {extracurriculars.map((activity, index) => (
                <Text key={index}>- {activity}</Text>
            ))}

            <Text style={styles.title}>Evaluation Criteria</Text>
            <Text>Criteria Met: {criteria ? "Eligible" : "Not Eligible"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
    },
});

export default variable2;