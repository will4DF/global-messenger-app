import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { User, GraduationCap, Award, Briefcase } from 'lucide-react-native';

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching your profile from the User Service
    axios.get(`${API_URL}/user/profile/1`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Profile fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={{flex: 1}} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <User size={60} color="#fff" />
        </View>
        <Text style={styles.name}>{user?.name || "William"}</Text>
        <Text style={styles.role}>Hi there! I'm usign ______ </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>382</Text>
          <Text style={styles.statLabel}>Friends</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>?</Text>
          <Text style={styles.statLabel}>?</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <GraduationCap size={24} color="#666" />
          <Text style={styles.infoText}>Computer Science at BYU-I</Text>
        </View>
        <View style={styles.infoRow}>
          <Briefcase size={24} color="#666" />
          <Text style={styles.infoText}>AI Advertising Operations</Text>
        </View>
        <View style={styles.infoRow}>
          <Award size={24} color="#666" />
          <Text style={styles.infoText}>Spanish (Native) | English (Fluent)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', paddingTop: 80, paddingBottom: 30, backgroundColor: '#f8f9fa' },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  name: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a' },
  role: { fontSize: 16, color: '#666', marginTop: 5 },
  statsContainer: { flexDirection: 'row', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#007AFF' },
  statLabel: { fontSize: 12, color: '#999', textTransform: 'uppercase' },
  statDivider: { width: 1, backgroundColor: '#eee' },
  infoSection: { padding: 25 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  infoText: { marginLeft: 15, fontSize: 16, color: '#444' }
});
