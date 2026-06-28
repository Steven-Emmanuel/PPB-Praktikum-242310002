import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Praktikum2 = () => {
  const patientData = {
    name: 'STEVEN EMMANUEL',
    weight: 100,
    height: 300,
  };

  const dailyMeals = [
    { time: 'Sarapan', calories: 400 },
    { time: 'Makan Siang', calories: 600 },
    { time: 'Makan Malam', calories: 500 },
    { time: 'Camilan', calories: 300 },
  ];

  let totalCalories = 0;
  for (let i = 0; i < dailyMeals.length; i++) {
    totalCalories += dailyMeals[i].calories;
  }

  const heightInMeters = patientData.height / 100;
  
  const bmiValue = patientData.weight / (heightInMeters * heightInMeters);

  let bmiStatus = '';
  if (bmiValue < 18.5) {
    bmiStatus = 'Kurus';
  } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
    bmiStatus = 'Ideal';
  } else {
    bmiStatus = 'Gemuk';
  }

  let calorieStatus = '';
  if (totalCalories < 1500) {
    calorieStatus = 'Asupan kalori kurang';
  } else if (totalCalories >= 1500 && totalCalories <= 2200) {
    calorieStatus = 'Asupan kalori cukup';
  } else {
    calorieStatus = 'Asupan kalori berlebih';
  }

  let conclusion = '';
  if (bmiStatus === 'Ideal' && calorieStatus === 'Asupan kalori cukup') {
    conclusion = 'Berat badan sudah ideal dan asupan kalori sesuai.';
  } else {
    conclusion = 'Perlu penyesuaian pola makan dan aktivitas.';
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Evaluasi Berat Badan Ideal</Text>

      <Text style={styles.sectionTitle}>Pasien</Text>
      <Text style={styles.bodyText}>Nama: {patientData.name}</Text>
      <Text style={styles.bodyText}>Berat Badan: {patientData.weight} kg</Text>
      <Text style={styles.bodyText}>Tinggi Badan: {patientData.height} cm</Text>

      <Text style={styles.sectionTitle}>Porsi Makanan Harian</Text>
      {dailyMeals.map((meal, index) => (
        <Text key={index} style={styles.bodyText}>
          {meal.time} - {meal.calories} kalori
        </Text>
      ))}
      <Text style={styles.bodyText}>Total Kalori: {totalCalories}</Text>

      <Text style={styles.sectionTitle}>Hasil Perhitungan</Text>
      <Text style={styles.bodyText}>BMI: {bmiValue.toFixed(2)}</Text>
      <Text style={styles.bodyText}>Status BMI: {bmiStatus}</Text>
      <Text style={styles.bodyText}>Status Kalori: {calorieStatus}</Text>

      <Text style={styles.conclusionText}>{conclusion}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  bodyText: {
    fontSize: 14,
    marginBottom: 3,
    color: '#333',
  },
  conclusionText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 40,
  },
});

export default Praktikum2;