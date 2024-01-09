import Header from './components/Header/Header';
import Transducers from './components/Transducers/Transducers';
import TransducerContextProvider from './store/transducer-context';

const App = () => {
  return (
    <TransducerContextProvider>
      <Header />
      <main>
        <Transducers />
      </main>
    </TransducerContextProvider>
  );
};

export default App;
