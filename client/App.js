import { StyleSheet, Text, View } from 'react-native';
// import Test2 from './components/Test2'
// import Test from './components/Test'
import { Provider } from 'react-redux';
import store from './store'
import Instructions from './Pages/Instructions';
// import Instructions from './Pages/Instructions';

export default function App() {
  return (
    <Provider 
    store={store}
    >
      <Instructions/>
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
