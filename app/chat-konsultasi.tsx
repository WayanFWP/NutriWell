import BackgroundWrapper from '@/components/background-wrapper';
import FooterNavigation from '@/components/footer-navigation';
import { useFooterNavigation } from '@/utils/footer-navigation';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface ChatMessage {
  id: string;
  text: string;
  isFromDoctor: boolean;
  timestamp: string;
}

export default function ChatKonsultasiScreen() {
  const pathname = usePathname();
  const { footerItems, activeItem } = useFooterNavigation(pathname);
  const { doctorName } = useLocalSearchParams<{ doctorName: string }>();
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Selamat siang! Saya Dr. Budi. Bagaimana saya bisa membantu Anda hari ini terkait nutrisi dan kesehatan?',
      isFromDoctor: true,
      timestamp: '10:30',
    },
    {
      id: '2',
      text: 'Selamat siang dok, saya ingin konsultasi tentang diet yang tepat untuk menurunkan berat badan.',
      isFromDoctor: false,
      timestamp: '10:32',
    },
    {
      id: '3',
      text: 'Baik, saya akan membantu Anda. Bisa ceritakan kondisi kesehatan Anda saat ini dan target penurunan berat badan yang ingin dicapai?',
      isFromDoctor: true,
      timestamp: '10:33',
    },
    {
      id: '4',
      text: 'Saat ini berat badan saya 75kg dengan tinggi 165cm. Target saya ingin turun sekitar 10kg dalam 6 bulan.',
      isFromDoctor: false,
      timestamp: '10:35',
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: message.trim(),
        isFromDoctor: false,
        timestamp: new Date().toLocaleTimeString('id-ID', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate doctor response after 2 seconds
      setTimeout(() => {
        const doctorResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: 'Terima kasih atas informasinya. Berdasarkan BMI Anda, target tersebut sangat realistis dan sehat.',
          isFromDoctor: true,
          timestamp: new Date().toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
        };
        setMessages(prev => [...prev, doctorResponse]);
      }, 2000);
    }
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#2E8B8B" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.doctorInfo}>
            <Image
              source={require('@/assets/Assets-images/Speech_idle.png')}
              style={styles.doctorAvatar}
            />
            <Text style={styles.doctorName}>
              {doctorName || 'Dr. Budi Setiawan, M. Gizi, Sp.G.K'}
            </Text>
          </View>
        </View>

        {/* Chat Container */}
        <View style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>Chat Bersama Ahli</Text>
          </View>

          <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageWrapper,
                  msg.isFromDoctor ? styles.doctorMessageWrapper : styles.userMessageWrapper,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    msg.isFromDoctor ? styles.doctorMessage : styles.userMessage,
                  ]}
                >
                  <Text style={[
                    styles.messageText,
                    msg.isFromDoctor ? styles.doctorMessageText : styles.userMessageText,
                  ]}>
                    {msg.text}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Message Input */}
          <View style={styles.inputContainer}>
            <View style={styles.messageInputWrapper}>
              <TextInput
                style={styles.messageInput}
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message"
                placeholderTextColor="#999"
                multiline
              />
              <TouchableOpacity style={styles.micButton}>
                <Image
                  source={require('@/assets/Assets-images/Mic.png')}
                  style={styles.micIcon}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        <FooterNavigation 
          items={footerItems}
          activeItem={activeItem}
        />
      </SafeAreaView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  backButton: {
    marginRight: 15,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  doctorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 20,
    marginBottom: 100,
    overflow: 'hidden',
  },
  chatHeader: {
    backgroundColor: '#E8F5E8',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D4E6D4',
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  messageWrapper: {
    marginBottom: 15,
  },
  doctorMessageWrapper: {
    alignItems: 'flex-start',
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
  },
  doctorMessage: {
    backgroundColor: '#4CAF50',
    borderBottomLeftRadius: 5,
  },
  userMessage: {
    backgroundColor: 'white',
    borderBottomRightRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  doctorMessageText: {
    color: 'white',
  },
  userMessageText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#F8F8F8',
    alignItems: 'flex-end',
    gap: 10,
  },
  messageInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    maxHeight: 100,
    textAlignVertical: 'top',
  },
  micButton: {
    padding: 5,
  },
  micIcon: {
    width: 20,
    height: 20,
    tintColor: '#666',
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
