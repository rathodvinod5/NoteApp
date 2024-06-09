import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, Text, SafeAreaView, StatusBar, TouchableOpacity, Modal, Keyboard} from 'react-native';
import { useNotes } from '../context/NoteContext';
import { useNavigation } from '@react-navigation/native';
import { List, Searchbar } from 'react-native-paper';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import STYLES from './styles';


const HomeScreen = () => {
  const [showSortMenuModal, setShowSortMenuModal] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByTitle, setSortByTitle] = useState(false);
  const [showSeachQuery, setShowSearchQuery] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { state, loadNotes, sortNotesByTitle, sortNotesByDate, resetSortNotesByTitle, resetSortNotesByDate } = useNotes();
  const navigation = useNavigation();

  // useEffect(() => {
  //   loadNotes();
  // }, []);

  const NoteTtems = (item) => {
    return (
      <View style={[STYLES.itemStyles, { backgroundColor: !showSortMenuModal ? 'white' : 'tranparent' } ]}>
        <List.Item
          title={item.item.title}
          description={`${new Date(item.item.timestamp).toLocaleDateString()} ${item.item.content}`}
          titleStyle={STYLES.listTitleStyles}
          onPress={() => navigation.navigate('Note', { note: item.item })}
          style={{ zIndex: 1, }}
          contentContainerStyle={{ zIndex: 1, }}
        />
      </View>
    );
  }

  const showModal = () => {
    setShowSortMenuModal(true);
  };
  const hideModal = () => {
    setShowSortMenuModal(false);
  };

  const handleSortByDate = () => {
    if(sortByTitle) setSortByTitle(false);

    if(sortByDate) {
      setSortByDate(false);
      resetSortNotesByDate();
    } else {
      setSortByDate(true);
      sortNotesByDate();
    }
    setShowSortMenuModal(false);
  }

  const handleSortByTitle = () => {
    if(sortByDate) setSortByDate(false);

    if(sortByTitle) {
      setSortByTitle(false);
      sortNotesByTitle();
    } else {
      setSortByTitle(true);
      resetSortNotesByTitle();
    }
    setShowSortMenuModal(false);
  }

  const handleCloseSearchInput = () => {
    Keyboard.dismiss();
    setSearchQuery('');
    setShowSearchQuery(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'white'}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showSortMenuModal}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          hideModal();
        }}>
        <View style={STYLES.centeredView}>
          <View style={STYLES.modalView}>
            <View style={STYLES.sortMenuHeader}>
              <Text>Sort By</Text>
              <TouchableOpacity style={{ padding: 6}} onPress={hideModal}>
                <IonicIcons name="close" size={28} />
              </TouchableOpacity>
            </View>
            <List.Item
              title={"Date"}
              titleStyle={[STYLES.listTitleStyles, { color: sortByDate ? 'white' : 'black'}]}
              onPress={handleSortByDate}
              style={{ borderBottomWidth: 1, borderColor: 'gray', backgroundColor: sortByDate ? 'teal' : 'transparent' }}
            />
            <List.Item
              title={"Title"}
              titleStyle={[STYLES.listTitleStyles, { color: sortByTitle ? 'white' : 'black'}]}
              onPress={handleSortByTitle}
              style={{ backgroundColor: sortByTitle ? 'teal' : 'transparent' }}
            />
          </View>
        </View>
      </Modal>

      <View style={STYLES.container}>
        
        {showSeachQuery ? (
          <View style={STYLES.headerTitleCont}>
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={{ width: '82%'}}
            />
            <TouchableOpacity 
              activeOpacity={0.8} 
              onPress={handleCloseSearchInput}
              style={{ padding: 4, flex: 1 }}
            >
              <Text style={STYLES.closeButtonStyles}>Close</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={STYLES.headerTitleCont}>
            <Text style={STYLES.headerTitle}>Notes</Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={{ padding: 10 }}
              onPress={() => setShowSearchQuery(true)}
            >
              <IonicIcons name="search" size={28} />
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={{ padding: 10 }}
              onPress={showModal}
            >
              <IonicIcons name="options-outline" size={28} />
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={showSeachQuery && searchQuery ? state.notes.filter(item => {
            if(item.title.toLowerCase().includes(searchQuery.toLowerCase())) return item;
          }) 
            : showSeachQuery ? [] : state.notes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <NoteTtems item={item} />}
          contentContainerStyle={{
            gap: 10,
            marginTop: 20
          }}
        />

        <Button
          title="New Note"
          onPress={() => navigation.navigate('Note')}
          style={STYLES.createNoteButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
