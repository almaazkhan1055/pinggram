import { Text, View } from "react-native";
import { MenuOption } from "react-native-popup-menu";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export const MenuItem = ({ text, action, value, icon }) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View
        style={{
          paddingHorizontal: 4,
          paddingVertical: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: hp(1.7), fontWeight: 500, color: "#6B7280" }}>
          {text}
        </Text>
        <Text>{icon}</Text>
      </View>
    </MenuOption>
  );
};
