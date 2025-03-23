import { Button, Text } from "react-native-paper";
import { Dimensions, StyleSheet, View } from "react-native";
import { IProdutoCom } from "../interfaces";

interface ISButtonItemCozinha{
    item:IProdutoCom
    onClick: () => void
}

export function SButtonItemCozinha({ item, onClick }: ISButtonItemCozinha){
    return(
        <Button mode="contained" labelStyle={{color:'black', fontSize:16}} style={[styles.itemCozinha, {backgroundColor:item.comment? '#dee09b': 'white'}]} onPress={onClick}>
            <View style={{alignItems:'center'}}>
            <Text style={{fontWeight:'bold'}}>{item.nome}</Text>
            <Text style={{marginTop:3}}>{item.comment}</Text>
            </View>
        </Button>
    )
}

const styles = StyleSheet.create({
    itemCozinha: {
        marginBottom: 10,
        padding: 5,
        marginHorizontal: 10,
        borderRadius: 8,
        minWidth: 150,
        borderWidth:1,
        borderColor:'black'
    }
})