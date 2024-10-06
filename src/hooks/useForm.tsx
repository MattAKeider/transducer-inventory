import { useReducer } from "react";

import { FormState } from "../utils/formUtils";

type Type = 'CHANGE_INPUT' | 'CHANGE_CHECKBOX' | 'RESET';

export type Action = {
  type: Type,
  payload: {
    name?: string;
    value?: string;
    checked?: boolean;
    initialState?: FormState
  };
};

const reducer = (state: FormState, action: Action): FormState => {
  switch(action.type) {
    case 'CHANGE_INPUT': {
      if (action.payload.name === 'condition') {
        if (action.payload.value === 'Broken (Out of Service)') {
          return {
            ...state,
            [action.payload.name]: action.payload.value,
            ['service']: true
          };
        } else {
          return {
            ...state,
            [action.payload.name]: action.payload.value,
            ['service']: false
          };
        }
      }

      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    }

    case 'CHANGE_CHECKBOX': {
      if (action.payload.checked) {
        return {
          ...state,
          [action.payload.name]: action.payload.checked,
          ['condition']: 'Broken (Out of Service)'
        };
      }

      return {
        ...state,
        [action.payload.name]: action.payload.checked,
        ['condition']: 'Working'
      };
    }

    case 'RESET': {
      return { ...action.payload.initialState };
    }

    default: {
      throw Error('Unknown action ' + action.type);
    }
  }
};

const useForm = (defaultFormState: FormState) => {
  const [state, dispatch] = useReducer(reducer, defaultFormState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    dispatch({
      type: 'CHANGE_INPUT',
      payload: {
        name,
        value,
      },
    });
  };

  const handleIsChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    dispatch({
      type: 'CHANGE_CHECKBOX',
      payload: {
        name,
        checked,
      },
    });
  };

  const handleReset = () => {
    dispatch({
      type: 'RESET',
      payload: {
        initialState: defaultFormState,
      },
    });
  };

  // Reset form on escape key
  const handleEsc = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      dispatch({
        type: 'RESET',
        payload: {
          initialState: defaultFormState,
        },
      });
    }
  };

  return { 
    state, 
    handleChange, 
    handleIsChecked, 
    handleReset, 
    handleEsc 
  };
};

export default useForm;