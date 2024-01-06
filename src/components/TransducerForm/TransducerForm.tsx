import { ChangeEvent, FormEvent, useState } from "react";

import styles from './TransducerForm.module.css';
import Button from "../../ui/Button/Button";
import { Transducer, Location, Department, Condition } from "../../data/data";

interface FormState {
  name: string;
  location: string;
  department: string;
  room: string;
  serial: string;
  internal: string;
  control: string;
  received: string;
  condition: string;
  note: string;
};

type TransducerFormProps = {
  closeForm: () => void;
};

const initialState: FormState = {
  name: '',
  location: '',
  department: '',
  room: '',
  serial: '',
  internal: '',
  control: '',
  received: '',
  condition: '',
  note: ''
};

const TransducerForm = ({closeForm}: TransducerFormProps) => {
  const [isOutOfService, setIsOutOfService] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormState>(initialState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const transducer: Transducer = {
      name: formValues.name,
      location: formValues.location as Location,
      department: formValues.department as Department,
      room: formValues.room,
      serialNumber: formValues.serial,
      internalIdentifier: formValues.internal,
      controlNumber: formValues.control,
      dateReceived: new Date(formValues.received),
      notes: formValues.note,
      currentCondition: [
        {
          condition: formValues.condition as Condition,
          conditionChangedDate: new Date(),
          outOfService: isOutOfService
        }
      ]
    };
    
    // Reset form
    setFormValues(initialState);
    setIsOutOfService(false);
  };

  const handleCancel = () => {
    setFormValues(initialState);
    setIsOutOfService(false);
    closeForm();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setIsOutOfService((prevState) => !prevState);
  };

  return (
    <div className={styles.form_container}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.header}>New Transducer</h1>
        <fieldset className={styles.form_fieldset}>
          <legend className={styles.legend}>Please enter details below</legend>
          <p className={styles.field}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" value={formValues.name} onChange={handleChange} placeholder="Enter name" required/>
          </p>
          <p className={styles.field}>
            <label htmlFor="location">Location:</label>
            <select name="location" id="location" value={formValues.location} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="cmc">CMC</option>
              <option value="midtown">MIDTOWN</option>
              <option value="risman">RISMAN</option>
              <option value="crocker">CROCKER</option>
              <option value="streetsboro">STREETSBORO</option>
              <option value="betty_the_bus">BETTY THE BUS</option>
            </select>
          </p>
          <p className={styles.field}>
            <label htmlFor="department">Department:</label>
            <select name="department" id="department" value={formValues.department} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="mfm">MFM</option>
              <option value="l&d">L&D</option>
              <option value="ta">TA</option>
              <option value="tv">TV</option>
              <option value="ivf">IVF</option>
            </select>
          </p>
          <p className={styles.field}>
            <label htmlFor="room">Room:</label>
            <input type="text" name="room" id="room" value={formValues.room} onChange={handleChange} placeholder="Enter room" required/>
          </p>
          <p className={styles.field}>
            <label htmlFor="serial">Serial #:</label>
            <input type="text" name="serial" id="serial" value={formValues.serial} onChange={handleChange} placeholder="Enter Serial #" required/>
          </p>
          <p className={styles.field}>
            <label htmlFor="internal">Internal Identifier:</label>
            <input type="text" name="internal" id="internal" value={formValues.internal} onChange={handleChange} placeholder="Enter internal identifier"required/>
          </p>
          <p className={styles.field}>
            <label htmlFor="control">Control #:</label>
            <input type="text" name="control" id="control" value={formValues.control} onChange={handleChange} placeholder="Enter control #"required/>
          </p>
          <p className={styles.field}>
            <label htmlFor="received">Date Received:</label>
            <input type="date" name="received" id="received" value={formValues.received} onChange={handleChange} required/>
          </p>
          <p className={styles.field}>
            <label htmlFor="condition">Select Condition:</label>
            <select name="condition" id="condition" value={formValues.condition} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="new">New</option>
              <option value="working">Working</option>
              <option value="refurbished">Refurbished</option>
              <option value="loaner">Loaner</option>
              <option value="broken">Broken (Out of Service)</option>
            </select>
          </p>
          <p className={styles.checkbox_field}>
            <label htmlFor="checkbox">
              <input type="checkbox" name="checkbox" checked={isOutOfService} onChange={handleCheckbox} id="checkbox"/>
              Undo Out of Service
            </label>
          </p>
          <hr className={styles.line_break}/>
          <p className={styles.field}>
            <label htmlFor="note">Notes:</label>
            <textarea name="note" id="note" value={formValues.note} onChange={handleChange} placeholder="Enter a note" rows={4}/>
          </p>
        </fieldset>
        <div className={styles.form_actions}>
          <Button type="button" onClick={handleCancel}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default TransducerForm;