import { StyleSheet, Text, View } from 'react-native';
// import Test2 from './components/Test2'
// import Test from './components/Test'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store'
import Instructions from './Pages/Instructions';
import Analysis from './Pages/Analysis';
// import Instructions from './Pages/Instructions';
const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider 
    store={store}
    >
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Instructions"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Instructions" component={Instructions} />
        <Stack.Screen name="Analysis" component={Analysis} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#FEFDF7',
    justifyContent: 'flex-end',
  },
});
