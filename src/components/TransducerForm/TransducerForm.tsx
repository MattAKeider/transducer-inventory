import { useEffect, useState } from 'react';

import { Action, FormState, initialState } from '../../utils/formUtils';
import { isValidDate } from '../../utils/validation';
import Button from '../../ui/Button/Button';
import styles from './TransducerForm.module.css';

type TransducerFormProps = {
  isNew: boolean;
  formState: FormState;
  dispatchAction: (value: Action) => void;
  onSubmitForm: (validDate: boolean, event: React.FormEvent<HTMLFormElement>) => void;
  onCancelForm: () => void;
};

const TransducerForm = ({ isNew, formState, dispatchAction, onSubmitForm, onCancelForm }: TransducerFormProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const validDate = isValidDate(formState.received);

  useEffect(() => {
    // Disable form on edit if "outOfService" was checked previously on new transducer
    if (!isNew) {
      formState.service ? setIsDisabled(true) : setIsDisabled(false);
    }
  }, [formState.service]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    dispatchAction({
      type: 'CHANGE_INPUT',
      payload: {
        name,
        value
      }
    });
  };

  const handleIsChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    dispatchAction({
      type: 'CHANGE_CHECKBOX',
      payload: {
        name,
        checked
      }
    });
  };

  // Reset form on escape key
  const handleEsc = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      dispatchAction({
        type: 'RESET',
        payload: {
          initialState
        }
      });
    }
  };

  return (
    <div onKeyDown={handleEsc} className={styles.form_container}>
      <form onSubmit={(event) => onSubmitForm(validDate, event)}>
        <h1 className={styles.header}>{ isNew ? 'New' : 'Edit' } Transducer</h1>
        <fieldset className={styles.form_fieldset}>
          <legend className={styles.legend}>Please { isNew ? 'enter' : 'edit' } details below</legend>
          <div className={styles.field}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Enter name"
              autoFocus
              required
              disabled={isDisabled}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="location">Location:</label>
            <select
              name="location"
              id="location"
              value={formState.location}
              onChange={handleChange}
              required
              disabled={isDisabled}
            >
              <option value="">Select</option>
              <option value="CMC">CMC</option>
              <option value="MIDTOWN">MIDTOWN</option>
              <option value="RISMAN">RISMAN</option>
              <option value="CROCKER">CROCKER</option>
              <option value="STREETSBORO">STREETSBORO</option>
              <option value="BETTY THE BUS">BETTY THE BUS</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="department">Department:</label>
            <select
              name="department"
              id="department"
              value={formState.department}
              onChange={handleChange}
              required
              disabled={isDisabled}
            >
              <option value="">Select</option>
              <option value="MFM">MFM</option>
              <option value="L&D">L&D</option>
              <option value="IVF">IVF</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="type">Type:</label>
            <select
              name="type"
              id="type"
              value={formState.type}
              onChange={handleChange}
              required
              disabled={isDisabled}
            >
              <option value="">Select</option>
              <option value="TA">TA</option>
              <option value="TV">TV</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="room">Room:</label>
            <input
              type="text"
              name="room"
              id="room"
              value={formState.room}
              onChange={handleChange}
              placeholder="Enter room"
              required
              disabled={isDisabled}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="serial">Serial #:</label>
            <input
              type="text"
              name="serial"
              id="serial"
              value={formState.serial}
              onChange={handleChange}
              placeholder="Enter Serial #"
              required
              disabled={isDisabled}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="internal">Internal Identifier:</label>
            <input
              type="text"
              name="internal"
              id="internal"
              value={formState.internal}
              onChange={handleChange}
              placeholder="Enter internal identifier"
              required
              disabled={isDisabled}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="control">Control #:</label>
            <input
              type="text"
              name="control"
              id="control"
              value={formState.control}
              onChange={handleChange}
              placeholder="Enter control #"
              required
              disabled={isDisabled}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="received">Date Received:</label>
            <input
              type="date"
              name="received"
              id="received"
              value={formState.received}
              onChange={handleChange}
              required
              disabled={isDisabled}
            />
            <div className={styles.error}>{!validDate && <p>Please enter valid date.</p>}</div>
          </div>
          <div className={styles.field}>
            <label htmlFor="condition">Select Condition:</label>
            <select
              name="condition"
              id="condition"
              value={formState.condition}
              onChange={handleChange}
              required
              disabled={isDisabled}
            >
              <option value="">Select</option>
              <option value="New">New</option>
              <option value="Working">Working</option>
              <option value="Refurbished">Refurbished</option>
              <option value="Loaner">Loaner</option>
              <option value="Broken (Out of Service)">
                Broken (Out of Service)
              </option>
            </select>
          </div>
          <div className={styles.checkbox_field}>
            <label htmlFor="service">
              <input
                type="checkbox"
                name="service"
                checked={formState.service}
                onChange={handleIsChecked}
                id="service"
              />
              Out of Service
            </label>
          </div>
          <hr className={styles.line_break} />
          <div className={styles.field}>
            <label htmlFor="notes">Notes:</label>
            <textarea
              name="notes"
              id="notes"
              value={formState.notes}
              onChange={handleChange}
              placeholder="Enter a note"
              rows={4}
              disabled={isDisabled}
            />
          </div>
        </fieldset>
        <div className={styles.form_actions}>
          <Button type="button" onClick={onCancelForm}>
            Cancel
          </Button>
          <Button type="submit" disabled={isDisabled}>{ isNew ? 'Submit' : 'Edit' }</Button>
        </div>
      </form>
    </div>
  );
};

export default TransducerForm;