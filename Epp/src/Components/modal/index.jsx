import React from "react"
import { Modal, StyleSheet, View, Dimensions } from "react-native"

const ModalPopUp = ({ visible, children }) => {
    return (
        <Modal transparent visible={visible} animationType="slide"> 
            <View style={styles.modalBackGround}>
                <View style={[styles.modalContainer]}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: Dimensions.get('screen').width * 0.85,
        height: Dimensions.get('screen').height * 0.93,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 20,
        elevation: 20,
        position: "relative"
    },
})

export { ModalPopUp }