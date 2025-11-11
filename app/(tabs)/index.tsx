import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { useMutation } from "convex/react";
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, StatusBar, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const resetTodos = useMutation(api.todos.clearAllTodos)

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView
        style={homeStyles.safeArea}
      >
        <Header />
        <TouchableOpacity onPress={toggleDarkMode}><Text>dark mode</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {
          Alert.alert(
            '确认清除',
            '确定要清空所有待办事项吗？此操作不可恢复。',
            [
              { text: '取消', style: 'cancel' },
              { text: '确定', onPress: () => resetTodos({}) }
            ]
          );
        }}>
          <Text>clear todos!!!</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
