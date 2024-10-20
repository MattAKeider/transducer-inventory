import { act } from 'react';
import { renderHook } from '@testing-library/react';

import { INITIAL_FORM_STATE } from '../data/testData';
import useForm from '../../src/hooks/useForm';

describe('useForm', () => {
  test('should return a default state', () => {
    const { result } = renderHook(() => useForm(INITIAL_FORM_STATE));
    expect(result.current.state).toEqual(INITIAL_FORM_STATE);
  });

  test('should change name state after changing input', () => {
    const event = {
      target: {
        name: 'name',
        value: 'test'
      }
    } as React.ChangeEvent<HTMLInputElement>;

    const { result, rerender } = renderHook(() => useForm(INITIAL_FORM_STATE));
    expect(result.current.state).toEqual(INITIAL_FORM_STATE);

    const { handleChange } = result.current;
    act(() => handleChange(event));
    rerender();

    expect(result.current.state.name).toBe('test');
  });

  test('should toggle checkbox state after event', () => {
    const event = {
      target: {
        name: 'service',
        checked: true
      }
    } as React.ChangeEvent<HTMLInputElement>;

    const { result, rerender } = renderHook(() => useForm(INITIAL_FORM_STATE));
    expect(result.current.state).toEqual(INITIAL_FORM_STATE);

    const { handleIsChecked } = result.current;
    act(() => handleIsChecked(event));
    rerender();

    expect(result.current.state.service).toBe(true);
  });

  test('should reset form values to default', () => {
    const event = {
      target: {
        name: 'name',
        value: 'test'
      }
    } as React.ChangeEvent<HTMLInputElement>;

    const { result, rerender } = renderHook(() => useForm(INITIAL_FORM_STATE));
    expect(result.current.state).toEqual(INITIAL_FORM_STATE);

    const { handleChange, handleReset } = result.current;
    act(() => handleChange(event));
    rerender();

    expect(result.current.state.name).toBe('test');
    expect(result.current.state).not.toEqual(INITIAL_FORM_STATE);

    act(() => handleReset());
    rerender();

    expect(result.current.state).toEqual(INITIAL_FORM_STATE);
  });

  test('should toggle out of service checkbox if condition is set to broken or not', () => {
    const event = {
      target: {
        name: 'condition',
        value: 'Broken (Out of Service)'
      }
    } as React.ChangeEvent<HTMLInputElement>;

    const { result, rerender } = renderHook(() => useForm(INITIAL_FORM_STATE));
    expect(result.current.state).toEqual(INITIAL_FORM_STATE);

    const { handleChange } = result.current;
    act(() => handleChange(event));
    rerender();

    expect(result.current.state.service).toBe(true);
    expect(result.current.state.condition).toBe('Broken (Out of Service)');

    const updatedEvent = {
      target: {
        name: 'condition',
        value: 'Working'
      }
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => handleChange(updatedEvent));
    rerender();

    expect(result.current.state.service).toBe(false);
    expect(result.current.state.condition).toBe('Working');
  });
});
