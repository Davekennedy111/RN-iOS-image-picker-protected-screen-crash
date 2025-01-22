import { useState } from "react";
import { View, TextInput } from "react-native"

export const ProtectedInputScreen = () => {
    const [value, setValue] = useState('')
    return (
        <View style={{ padding: 10 }}>
            <TextInput
                onChangeText={setValue}
                placeholder={"Type here with AssistiveTouch enabled"}
                value={value}
            />
        </View>
    );
}
