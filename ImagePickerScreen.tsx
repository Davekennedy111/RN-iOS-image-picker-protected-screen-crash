import { Button, Text, View } from "react-native"
import { launchCamera } from "react-native-image-picker";
import { RootStackParamList } from "./App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

export const ImagePickerScreen = () => {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<
                RootStackParamList,
                'ImagePickerScreen'
            >
        >();

    return (
        <View>
            <Text>Image picker screen</Text>
            <Button onPress={() => launchCamera({ mediaType: 'photo' })} title="Open camera" />
            <Button onPress={() => navigation.navigate('ProtectedInputScreen')} title="Go to protected input screen" />
        </View>
    );
}
