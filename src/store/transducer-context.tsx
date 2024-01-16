import { ReactNode, createContext, useReducer } from 'react';

import { TRANSDUCERS, Transducer } from '../data/data';

export type TransducerContextType = {
  transducers: Transducer[];
  addTransducer: (transducer: Transducer) => void;
};

export const TransducerContext = createContext<TransducerContextType>({
  transducers: [],
  addTransducer: () => {},
});

type Type = 'ADD_TRANSDUCER' | 'DELETE_TRANSDUCER' | 'EDIT_TRANSDUCER';

type Action = { 
  type: Type, 
  payload: {
    transducer?: Transducer;
    id?: string;
  }
};

const reducer = (state: Transducer[], action: Action): Transducer[] => {
  switch(action.type) {
    case 'ADD_TRANSDUCER':
      return [action.payload.transducer, ...state];
    default: 
      return state;
  };
};

type TransducerContextProviderProps = {
  children: ReactNode;
};

const TransducerContextProvider = ({children}: TransducerContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, TRANSDUCERS);

  const handleAddTransducer = (transducer: Transducer) => {
    // Reset notes property to start empty for editing action
    transducer.notes = '';
    
    dispatch({
      type: 'ADD_TRANSDUCER',
      payload: {
        transducer
      } 
    });
  };

  const ctxValue: TransducerContextType = {
    transducers: state,
    addTransducer: handleAddTransducer,
  };

  return (
    <TransducerContext.Provider value={ctxValue}>
      {children}
    </TransducerContext.Provider>
  );
};

export default TransducerContextProvider;
