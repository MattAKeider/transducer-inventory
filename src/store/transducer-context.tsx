import { ReactNode, createContext, useReducer } from 'react';

import { Transducer } from '../data/data';

export type TransducerContextType = {
  transducers: Transducer[];
  addTransducer: (transducer: Transducer) => void;
  editTransducer: (transducer: Transducer) => void;
  deleteTransducer: (id: string) => void;
};

export const TransducerContext = createContext<TransducerContextType>({
  transducers: [],
  addTransducer: () => {},
  editTransducer: () => {},
  deleteTransducer: () => {}
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
  const transducers: Transducer[] = [...state];
  
  switch(action.type) {
    case 'ADD_TRANSDUCER': {
      return [action.payload.transducer, ...state];
    }
    case 'EDIT_TRANSDUCER': {
      const findIndex = state.findIndex((state: Transducer) => state.id === action.payload.transducer.id);
      transducers.splice(findIndex, 1, action.payload.transducer);
      return transducers;
    }
    case 'DELETE_TRANSDUCER': {
      const filtered = transducers.filter((transducer: Transducer) => transducer.id !== action.payload.id);
      return filtered;
    }
    default: {
      return transducers;
    }
  }
};

type TransducerContextProviderProps = {
  children: ReactNode;
};

const TransducerContextProvider = ({children}: TransducerContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, []);

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

  const handleEditTransducer = (transducer: Transducer) => {
    dispatch({
      type: 'EDIT_TRANSDUCER',
      payload: {
        transducer
      }
    });
  };

  const handleDeleteTransducer = (id: string) => {
    dispatch({
      type: 'DELETE_TRANSDUCER',
      payload: {
        id
      }
    });
  };

  const ctxValue: TransducerContextType = {
    transducers: state,
    addTransducer: handleAddTransducer,
    editTransducer: handleEditTransducer,
    deleteTransducer: handleDeleteTransducer,
  };

  return (
    <TransducerContext.Provider value={ctxValue}>
      {children}
    </TransducerContext.Provider>
  );
};

export default TransducerContextProvider;
