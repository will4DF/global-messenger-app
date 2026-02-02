import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env'; // This pulls from your .env file

export default function BillingScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Now using the environment variable!
    axios.get(`${API_URL}/billing/history/1`)
      .then(res => setHistory(res.data))
      .catch(err => console.log("Fetch error:", err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.amount}>$${item.amount.toFixed(2)}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 15, borderRadius: 10, backgroundColor: '#f9f9f9', marginBottom: 10 },
  amount: { fontSize: 18, fontWeight: 'bold' },
  status: { color: 'green', fontWeight: '600' }
});
