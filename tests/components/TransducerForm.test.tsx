import { render, screen } from "@testing-library/react";

import TransducerForm from "../../src/components/TransducerForm/TransducerForm";
import { initialState } from "../../src/components/NewTransducer/NewTransducer";
import { FormState } from "../../src/models/model";

describe('TransducerForm', () => {
  function renderComponent(isNew: boolean, state: FormState, error: Error) {
    render(
      <TransducerForm 
        isNew={isNew} 
        formState={state} 
        onSubmitForm={vi.fn()} 
        onChangeForm={vi.fn()} 
        onCancelForm={vi.fn()}
        onEscForm={vi.fn()}
        onIsChecked={vi.fn()}
        error={error}
      />
    );

    return {
      heading: screen.getByRole('heading'),
      input: screen.getByRole('textbox', {name: 'Name:'}),
      checkbox: screen.getByRole('checkbox'),
    };
  }

  test('should render with some default values', () => {
    const { heading, input, checkbox } = renderComponent(true, initialState, null);

    expect(heading).toHaveTextContent('New Transducer');
    expect(input).toHaveTextContent('');
    expect(checkbox).not.toBeChecked();
  });

  test('should render heading with edit form', () => {
    const { heading } = renderComponent(false, initialState, null);

    expect(heading).toHaveTextContent('Edit Transducer');
  });

  test('should render values as disabled if out of service condition is set', () => {
    const newState = {...initialState, service: true};
    const { input, checkbox } = renderComponent(false, newState, null);

    expect(input).toBeDisabled();
    expect(checkbox).toBeChecked();
  });

  test('should render error if date is not valid', () => {
    const newState = {...initialState, received: '10-10-3000'};
    renderComponent(true, newState, null);

    expect(screen.getByText('Date Received:')).toBeInTheDocument();
    expect(screen.getByText(/please enter/i)).toHaveTextContent('Please enter valid date.');
  });

  test('should not render error if date is valid', () => {
    const newState = {...initialState, received: '10-10-2020'};
    renderComponent(true, newState, null);

    expect(screen.getByText('Date Received:')).toBeInTheDocument();
    expect(screen.queryByText(/please enter/i)).not.toBeInTheDocument();
  });

  test('should render an error', () => {
    const errorMessage = 'Error submitting form';
    renderComponent(true, initialState, Error(errorMessage));

    expect(screen.getByText(/error submitting/i)).toHaveTextContent(errorMessage);
  });
});