import { useEffect, useState } from 'react';

import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import { FormState } from '../../utils/formUtils';
import { isValidDate } from '../../utils/validation';
import Button from '../../ui/Button/Button';
import styles from './TransducerForm.module.css';

type TransducerFormProps = {
  isNew: boolean;
  formState: FormState;
  onSubmitForm: (event: React.FormEvent<HTMLFormElement>, validDate?: boolean) => void;
  onCancelForm: () => void;
  onEscForm: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onChangeForm: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onIsChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: Error;
};

const TransducerForm = ({
  isNew,
  formState,
  onSubmitForm,
  onCancelForm,
  onEscForm,
  onChangeForm,
  onIsChecked,
  error
}: TransducerFormProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const validDate = isValidDate(formState.received);

  useEffect(() => {
    // Disable form on edit if "outOfService" was checked previously on new transducer
    if (!isNew) {
      formState.service ? setIsDisabled(true) : setIsDisabled(false);
    }
  }, [formState.service]);

  return (
    <div onKeyDown={onEscForm} className={styles.container}>
      <form onSubmit={(event) => onSubmitForm(event, validDate)}>
        <h2 className={styles.title}>{isNew ? 'New' : 'Edit'} Transducer</h2>
        <div className={styles.field}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formState.name}
            onChange={onChangeForm}
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
            onChange={onChangeForm}
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
            onChange={onChangeForm}
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
            onChange={onChangeForm}
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
            onChange={onChangeForm}
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
            onChange={onChangeForm}
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
            onChange={onChangeForm}
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
            onChange={onChangeForm}
            required
            disabled={isDisabled}
          />
        </div>
        {isNew && (
          <div className={styles.field}>
            <label htmlFor="received">Date Received:</label>
            <input
              type="date"
              name="received"
              id="received"
              value={formState.received}
              onChange={onChangeForm}
              required
              disabled={isDisabled}
            />
            <div className={styles.error}>
              {!validDate && (
                <ErrorMessage errorMessage="Please enter valid date." />
              )}
            </div>
          </div>
        )}
        <div className={styles.field}>
          <label htmlFor="condition">Select Condition:</label>
          <select
            name="condition"
            id="condition"
            value={formState.condition}
            onChange={onChangeForm}
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
              onChange={onIsChecked}
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
            onChange={onChangeForm}
            rows={4}
          />
        </div>
        {error && <ErrorMessage errorMessage={error.message} />}
        <div className={styles.form_actions}>
          <Button type="button" onClick={onCancelForm}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default TransducerForm;
