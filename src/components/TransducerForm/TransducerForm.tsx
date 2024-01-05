import { useState } from "react";

import styles from './TransducerForm.module.css';
import Button from "../../ui/Button/Button";

const TransducerForm = () => {
  const [isOutOfService, setIsOutOfService] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //event.currentTarget.reset();
  };

  return (
    <div className={styles.form_container}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.header}>New Transducer</h1>
        <fieldset className={styles.form_fieldset}>
          <legend className={styles.legend}>Please enter details below</legend>
          <p className={styles.field}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" placeholder="Enter name" required/>
          </p>
          <p className={styles.field}>
            <label htmlFor="location">Location:</label>
            <select name="location" id="location" required>
              <option defaultValue="">Select</option>
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
            <select name="department" id="department" required>
              <option defaultValue="">Select</option>
              <option value="mfm">MFM</option>
              <option value="l&d">L&D</option>
              <option value="ta">TA</option>
              <option value="tv">TV</option>
              <option value="ivf">IVF</option>
            </select>
          </p>
          <p className={styles.field}>
            <label htmlFor="room">Room:</label>
            <input type="text" name="room" id="room" placeholder="Enter room" required/>
          </p>
          <p className={styles.field}>
            <label htmlFor="serial">Serial #:</label>
            <input type="text" name="serial" id="serial" placeholder="Enter Serial #" required/>
          </p>
          <p className={styles.field}>
            <label htmlFor="internal">Internal Identifier:</label>
            <input type="text" name="internal" id="internal" placeholder="Enter internal identifier"required/>
          </p>
          <p className={styles.field}>
            <label htmlFor="control">Control #:</label>
            <input type="text" name="control" id="control" placeholder="Enter control #"required/>
          </p>
          <p className={styles.field}>
            <label htmlFor="received">Date Received:</label>
            <input type="date" name="received" id="received" required/>
          </p>
          <p className={styles.field}>
            <label htmlFor="condition">Select Condition:</label>
            <select name="condition" id="condition" required>
              <option defaultValue="">Select</option>
              <option value="new">New</option>
              <option value="working">Working</option>
              <option value="refurbished">Refurbished</option>
              <option value="loaner">Loaner</option>
              <option value="broken">Broken (Out of Service)</option>
            </select>
          </p>
          <p className={styles.checkbox_field}>
            <label htmlFor="toggle_service">
              <input type="checkbox" name="toggle_service" id="toggle_service"/>
              Undo Out of Service
            </label>
          </p>
          <hr className={styles.line_break}/>
          <p className={styles.field}>
            <label htmlFor="note">Notes:</label>
            <textarea name="note" id="note" placeholder="Enter a note" rows={4}/>
          </p>
        </fieldset>
        <div className={styles.form_actions}>
          <Button type="button">Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default TransducerForm;