import { useEffect, useState } from 'react';

import { FormState } from '../../models/model';
import { isValidDate } from '../../utils/validation';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import Select from '../../ui/Select/Select';
import Checkbox from '../../ui/Checkbox/Checkbox';
import Textarea from '../../ui/Textarea/Textarea';
import styles from './TransducerForm.module.css';

interface Props {
  isNew: boolean;
  formState: FormState;
  onSubmitForm: (event: React.FormEvent<HTMLFormElement>, validDate?: boolean) => void;
  onCancelForm: () => void;
  onChangeForm: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onIsChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: Error;
}

const TransducerForm = ({
  isNew,
  formState,
  onSubmitForm,
  onCancelForm,
  onChangeForm,
  onIsChecked,
  error
}: Props) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const validDate = isValidDate(formState.received);

  useEffect(() => {
    // Disable form on edit if "outOfService" was checked previously on new transducer
    if (!isNew) {
      formState.service ? setIsDisabled(true) : setIsDisabled(false);
    }
  }, [formState.service]);

  const handleEsc = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onCancelForm();
    }
  };

  return (
    <div onKeyDown={handleEsc} className={styles.container}>
      <form onSubmit={(event) => onSubmitForm(event, validDate)}>
        <h2 className={styles.title}>{isNew ? 'New' : 'Edit'} Transducer</h2>
        <Input
          className={styles.field}
          label="Name:"
          name="name"
          value={formState.name}
          onChange={onChangeForm}
          autoFocus
          required
          disabled={isDisabled}
        />
        <Select
          className={styles.field}
          label="Location:" 
          name="location" 
          value={formState.location}
          onChange={onChangeForm}
          required
          disabled={isDisabled}
          options={[
            "CMC", 
            "MIDTOWN", 
            "RISMAN", 
            "CROCKER", 
            "STREETSBORO", 
            "BETTY THE BUS"
          ]}
        />
        <Select
          className={styles.field}
          label="Department:" 
          name="department" 
          value={formState.department}
          onChange={onChangeForm}
          required
          disabled={isDisabled}
          options={["MFM", "L&D", "IVF"]}
        />
        <Select
          className={styles.field}
          label="Type:" 
          name="type" 
          value={formState.type}
          onChange={onChangeForm}
          required
          disabled={isDisabled}
          options={["TA", "TV"]}
        />
        <Input
          className={styles.field}
          label="Room:"
          name="room"
          value={formState.room}
          onChange={onChangeForm}
          required
          disabled={isDisabled}
        />
        <Input
          className={styles.field}
          label="Serial #:"
          name="serial" 
          value={formState.serial}
          onChange={onChangeForm}
          required
          disabled={isDisabled}
        />
        <Input
          className={styles.field}
          label="Internal Identifier:"
          name="internal"
          value={formState.internal}
          onChange={onChangeForm}
          required
          disabled={isDisabled}
        />
        <Input
          className={styles.field}
          label="Control #:"
          name="control"
          value={formState.control}
          onChange={onChangeForm}
          required
          disabled={isDisabled}
        />
        {isNew && (
          <Input
            className={styles.field}
            type="date" 
            label="Date Received:" 
            name="received" 
            value={formState.received}
            onChange={onChangeForm}
            required
            disabled={isDisabled}
          >
            <div className={styles.error}>
              {!validDate && (
                  <ErrorMessage errorMessage="Please enter valid date." />
              )}
            </div>
          </Input>
        )}
        <Select
          className={styles.field}
          label="Select Condition:" 
          name="condition" 
          value={formState.condition}
          onChange={onChangeForm}
          required
          disabled={isDisabled}
          options={[
            "New", 
            "Working", 
            "Refurbished", 
            "Loaner", 
            "Broken (Out of Service)"
          ]}
        />
        <Checkbox
          className={styles.checkbox_field}
          label="Out of Service" 
          name="service" 
          checked={formState.service}
          onChange={onIsChecked}
        />
        <hr className={styles.line_break} />
        <Textarea
          className={styles.field}
          label="Notes:" 
          name="notes" 
          value={formState.notes}
          onChange={onChangeForm}
        />
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
