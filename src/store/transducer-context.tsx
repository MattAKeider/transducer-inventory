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

type ActionType = 'ADD_TRANSDUCER' | 'DELETE_TRANSDUCER' | 'EDIT_TRANSDUCER';

type ActionPayload = {
  transducer?: Transducer;
  id?: string;
};

type TransducerAction = { 
  type: ActionType, 
  payload: ActionPayload 
};

const reducerFn = (state: Transducer[], action: TransducerAction): Transducer[] => {
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
  const [transducers, dispatch] = useReducer(reducerFn, TRANSDUCERS);

  const handleAddTransducer = (transducer: Transducer) => {
    dispatch({
      type: 'ADD_TRANSDUCER',
      payload: {
        transducer
      } 
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
