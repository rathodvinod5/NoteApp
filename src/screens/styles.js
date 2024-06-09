import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: '600'
    },
    itemStyles: {
       
    },
    createNoteButton: {
        position: 'absolute',
        bottom: 30,
        left: 0, 
        right: 0
    },
    textAreaStyles: { 
        flex: 1, 
        textAlignVertical: 'top',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 18,
        marginBottom: 20
    },
    richTextOptionCont: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        gap: 2
    },
    richTextButton: {
        padding: 6,
        backgroundColor: 'gray',
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    richTextButtonTitle: {
        fontSize: 20,
        color: 'white'
    },
    noteHeaderLeftCont: {
        // display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -6,
        paddingRight: 6,
        paddingBottom: 2
    },
    backButtonTitle: {
        fontSize: 20,
        marginLeft: 6,
    },
    listTitleStyles: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginBottom: 4,
        color: 'grey',
        zIndex: 1
    },
    deleteButtonStyles: {
        // backgroundColor: 'white',
        borderRadius: 3,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitleCont: {
         display: 'flex',
         flexDirection: 'row',
         alignItems: 'center',
         paddingRight: 6,
         paddingBottom: 2
    },
    modalContentCont: { 
        backgroundColor: 'white', 
        padding: 20, 
        marginHorizontal: 20,
        borderRadius: 10 
    },
    sortMenuHeader: { 
        width: '100%',
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: 15,
        paddingRight: 5,
        borderBottomWidth: 1, borderColor: 'gray'
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 6,
        backgroundColor: 'gray'
      },
      modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      closeButtonStyles: { 
        color: 'tomato', 
        fontSize: 17, 
        textAlign: 'center' 
    }
});