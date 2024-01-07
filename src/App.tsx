import { useState } from 'react';

import Header from './components/Header/Header';
import Transducers from './components/Transducers/Transducers';
import { TRANSDUCERS, Transducer } from './data/data';

const App = () => {
  const [transducers, setTransducers] = useState<Transducer[]>(TRANSDUCERS);

  const handleAddTransducer = (transducer: Transducer) => {
    setTransducers((prevState: Transducer[]) => {
      return [transducer, ...prevState];
    });
  };

  return (
    <>
      <Header onAddTransducer={handleAddTransducer}/>
      <main>
        <Transducers transducers={transducers} />
      </main>
    </>
  );
};

export default App;
