import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { Send } from 'lucide-react-native';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // 1. Fetch existing messages when the screen loads
  useEffect(() => {
    axios.get(`${API_URL}/chat-service/messages`)
      .then(res => setMessages(res.data))
      .catch(err => console.error("Chat fetch error:", err));
  }, []);

  // 2. Function to send a message
  const sendMessage = () => {
    if (inputText.trim().length === 0) return;

    const newMessage = {
      senderId: 1, // Your user ID (William)
      text: inputText,
      timestamp: new Date().toISOString(),
    };

    axios.post(`${API_URL}/chat-service/send`, newMessage)
      .then(res => {
        setMessages([...messages, res.data]);
        setInputText('');
      })
      .catch(err => console.error("Send error:", err));
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Global Chat</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble, 
            item.senderId === 1 ? styles.myMessage : styles.theirMessage
          ]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>
              {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Send color="#fff" size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingTop: 60, paddingBottom: 15, backgroundColor: '#f8f9fa', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  listContent: { padding: 20 },
  messageBubble: { padding: 12, borderRadius: 18, marginBottom: 10, maxWidth: '80%' },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
  theirMessage: { alignSelf: 'flex-start', backgroundColor: '#E9E9EB' },
  messageText: { color: '#fff', fontSize: 16 },
  myMessageText: { color: '#fff' },
  theirMessageText: { color: '#000' },
  timestamp: { fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 4, alignSelf: 'flex-end' },
  inputContainer: { flexDirection: 'row', padding: 15, borderTopWidth: 1, borderTopColor: '#eee', alignItems: 'center', marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, marginRight: 10 },
  sendButton: { backgroundColor: '#007AFF', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }
});
