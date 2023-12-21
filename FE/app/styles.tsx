import {StyleSheet}  from "react-native";

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'dimgray'
    },
    topContainer: {
        flex: 1,
        padding: 20,
        alignItems : "baseline",
        justifyContent : "space-around",
      marginTop: 50,
    },
    topDetails: {
        flexDirection: 'row',
        alignItems : 'center',
    },
    avatar: {
        width:60,
        height: 60,
        borderRadius: 50,
        marginRight: 10,
        borderColor: 'black',
        borderWidth: 2,
    },
    tabRow: {
        backgroundColor: 'black',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        position: 'absolute',
        overflow: 'hidden',
        alignItems : 'center',
        justifyContent : 'space-around',
    },
    row: {
        flexDirection: 'row',
        alignItems : 'center',
    },
    greetings: {
        color: 'white',
        fontSize: 25,
      marginRight: 30,
    },
    icon: {
        width: 45,
        height: 45,
        backgroundColor: 'transparent',
        borderRadius: 50,
        marginLeft: 10,
    },
    categoriesTab: {
        paddingTop: 10,
        paddingLeft: 20,
        marginBottom: 10,
    },
    category: {
        borderRadius: 50,
        minWidth: 50,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        alignItems: 'center',
    },
    subtitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: "500",
    },
    title: {
        color: "white",
        fontSize: 19,
        fontWeight: "bold",
        marginHorizontal: 10,
        marginTop: 10,
    },
    playlist: {
        height: 55,
        width: 175,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginVertical: 8,
        backgroundColor: "#282828",
        borderRadius: 4,
        elevation: 3,
    },
    playlists: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    progressbar: {
        height: "100%",
        backgroundColor: "white",
    }
  })
  
export default styles