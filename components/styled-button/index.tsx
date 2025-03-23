import { Button } from "react-native-paper";
import { Dimensions, StyleSheet } from "react-native";
import { IProdutoCom } from "../interfaces";

export function SButtonItemCozinha(Item:IProdutoCom){
    function handleButton(){
        console.log('yes')
    }
    return(
        <Button mode="contained" style={styles.itemCozinha} onPress={handleButton}>Login</Button>
    )
}

const styles = StyleSheet.create({
    itemCozinha: {
        fontSize: 16,
        marginBottom: 10,
        backgroundColor: 'gray',
        padding: 5,
        marginHorizontal: 10,
        borderRadius: 8,
        minWidth: 150
    }
})