import { ReactNode, createContext, useState } from 'react';

import { TRANSDUCERS, Transducer } from '../data/data';

export type TransducerContextType = {
  transducers: Transducer[];
  addTransducer: (transducer: Transducer) => void;
};

export const TransducerContext = createContext<TransducerContextType>({
  transducers: [],
  addTransducer: () => {},
});

type TransducerContextProviderProps = {
  children: ReactNode;
};

const TransducerContextProvider = ({children}: TransducerContextProviderProps) => {
  const [transducers, setTransducers] = useState<Transducer[]>(TRANSDUCERS);

  const handleAddTransducer = (transducer: Transducer) => {
    setTransducers((prevState: Transducer[]) => {
      return [transducer, ...prevState];
    });
  };

  const ctxValue: TransducerContextType = {
    transducers: transducers,
    addTransducer: handleAddTransducer,
  };

  return (
    <TransducerContext.Provider value={ctxValue}>
      {children}
    </TransducerContext.Provider>
  );
};

export default TransducerContextProvider;
