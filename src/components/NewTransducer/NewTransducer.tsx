import { useContext, useState } from 'react';

import { TransducerContext, TransducerContextType } from '../../store/transducer-context';
import { FormState, createTransducerObject } from '../../utils/formUtils';
import Button from '../../ui/Button/Button';
import styles from './NewTransducer.module.css';
import { isValidDate } from '../../utils/validation';

const initialState: FormState = {
  name: '',
  location: '',
  department: '',
  room: '',
  type: '',
  serial: '',
  internal: '',
  control: '',
  received: '',
  condition: '',
  notes: '',
  service: false
};

type NewTransducerProps = {
  onCloseModal: () => void;
};

const NewTransducer = ({ onCloseModal }: NewTransducerProps) => {
  const [formValues, setFormValues] = useState<FormState>(initialState);
  const { addTransducer } = useContext<TransducerContextType>(TransducerContext);

  const validDate = isValidDate(formValues.received);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validDate) {
      return;
    }

    // Create new transducer object from form data
    const transducer = createTransducerObject(formValues);

    // Add transducer object to existing transducers array in context api
    addTransducer(transducer);

    // Reset form
    setFormValues(initialState);
    onCloseModal();
  };

  const handleCancel = () => {
    setFormValues(initialState);
    onCloseModal();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === 'condition') {
      if (value === 'Broken (Out of Service)' && !formValues.service) {
        setFormValues((prevState) => {
          return {
            ...prevState,
            ['service']: true,
          };
        });
      }
    }

    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleIsChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (checked && formValues.condition !== 'Broken (Out of Service)') {
      setFormValues((prevState) => {
        return {
          ...prevState,
          ['condition']: 'Broken (Out of Service)',
        };
      });
    } else if (!checked && formValues.condition === 'Broken (Out of Service)') {
      setFormValues((prevState) => {
        return {
          ...prevState,
          ['condition']: 'Working',
        };
      });
    }

    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: checked
      };
    });
  };

  return (
    <div className={styles.form_container}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.header}>New Transducer</h1>
        <fieldset className={styles.form_fieldset}>
          <legend className={styles.legend}>Please enter details below</legend>
          <div className={styles.field}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Enter name"
              autoFocus
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="location">Location:</label>
            <select
              name="location"
              id="location"
              value={formValues.location}
              onChange={handleChange}
              required
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
              value={formValues.department}
              onChange={handleChange}
              required
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
              value={formValues.type}
              onChange={handleChange}
              required
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
              value={formValues.room}
              onChange={handleChange}
              placeholder="Enter room"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="serial">Serial #:</label>
            <input
              type="text"
              name="serial"
              id="serial"
              value={formValues.serial}
              onChange={handleChange}
              placeholder="Enter Serial #"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="internal">Internal Identifier:</label>
            <input
              type="text"
              name="internal"
              id="internal"
              value={formValues.internal}
              onChange={handleChange}
              placeholder="Enter internal identifier"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="control">Control #:</label>
            <input
              type="text"
              name="control"
              id="control"
              value={formValues.control}
              onChange={handleChange}
              placeholder="Enter control #"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="received">Date Received:</label>
            <input
              type="date"
              name="received"
              id="received"
              value={formValues.received}
              onChange={handleChange}
              required
            />
            <div>{!validDate && <p style={{color: 'orange'}}>Please enter valid date.</p>}</div>
          </div>
          <div className={styles.field}>
            <label htmlFor="condition">Select Condition:</label>
            <select
              name="condition"
              id="condition"
              value={formValues.condition}
              onChange={handleChange}
              required
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
                checked={formValues.service}
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
              value={formValues.notes}
              onChange={handleChange}
              placeholder="Enter a note"
              rows={4}
            />
          </div>
        </fieldset>
        <div className={styles.form_actions}>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default NewTransducer;
