import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback, Alert, SafeAreaView, StatusBar } from 'react-native';
import { useNotes } from '../context/NoteContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import STYLES from './styles';

const NoteScreen = () => {
  const { addNote, editNote, deleteNote } = useNotes();
  const navigation = useNavigation();
  const route = useRoute();
  const [note, setNote] = useState(route.params?.note 
    || { title: '', content: '', timestamp: Date.now(), isContentsBold: false, isContentsItalic: false });
  const [fontBold, setFontBold] = useState(route.params?.note ? note.isContentsBold :false);
  const [fontItalic, setFontItalic] = useState(route.params?.note ? note.isContentsItalic : false);

  const handleSave = () => {
    if (note.id) {
      editNote(note);
    } else {
      addNote({ ...note, id: Date.now().toString() });
    }
    navigation.goBack();
  };

  const onClickBold = () => {
    const newStatus = !fontBold;
    setNote({ ...note, isContentsBold: newStatus });
    setFontBold(newStatus);
  }

  const onClickItalic = () => {
    const newStatus = !fontItalic;
    setNote({ ...note, isContentsItalic: newStatus });
    setFontItalic(newStatus);
  }

  let fontStyles = {};
  if(fontBold) {
    fontStyles = {
      fontWeight: 'bold'
    }
  }
  if(fontItalic) {
    fontStyles = {
      ...fontStyles,
      fontStyle: 'italic'
    }
  }

  const onPressDeleteIcon = () =>
    Alert.alert(
      "Are you sure you want to delete this note?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            deleteNote(note.id);
            navigation.goBack();
          } 
        }
      ]
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'white'}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, padding: 16 }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TouchableOpacity 
              style={STYLES.noteHeaderLeftCont} 
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="left" size={28} />
              <Text style={STYLES.backButtonTitle}>Notes</Text>
            </TouchableOpacity>

            <View style={{ flex: 1 }} />

            <View>
              <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={onPressDeleteIcon}
                style={STYLES.deleteButtonStyles}
              >
                <AntDesign name="delete" style={{ fontWeight: 'bold' }} size={26} />
              </TouchableOpacity> 
            </View>
          </View>

          <TextInput
            placeholder="Title"
            value={note.title}
            onChangeText={(text) => setNote(prev => ({ ...prev, title: text }))}
            style={{ fontSize: 24, marginBottom: 16, marginTop: 10 }}
          />
          <View style={STYLES.richTextOptionCont}> 
            <TouchableOpacity
              activeOpacity={0.8}
              style={STYLES.richTextButton}
              onPress={onClickBold}
            >
              <Text style={[STYLES.richTextButtonTitle, { fontWeight: 'bold' }]}>B</Text>
              </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={STYLES.richTextButton}
              onPress={onClickItalic}
            >
              <Text style={[STYLES.richTextButtonTitle, { fontStyle: 'italic' }]}>I</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Content"
            value={note.content}
            onChangeText={(text) => setNote(prev => ({ ...prev, content: text }))}
            style={[STYLES.textAreaStyles, fontStyles]}
            multiline
            onSubmitEditing={Keyboard.dismiss}
          />
          <Button title="Save" onPress={handleSave} />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default NoteScreen;
