import { useState } from "react";

import styles from './TransducerForm.module.css';
import Button from "../../ui/Button/Button";

const TransducerForm = () => {
  const [isOutOfService, setIsOutOfService] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Transducer</h1>
      <fieldset>
        <legend>Please enter details below</legend>
        <p>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" required/>
        </p>
        <p>
          <label htmlFor="location">Location:</label>
          <select name="location" id="location" required>
            <option value="cmc">CMC</option>
            <option value="midtown">MIDTOWN</option>
            <option value="risman">RISMAN</option>
            <option value="crocker">CROCKER</option>
            <option value="streetsboro">STREETSBORO</option>
            <option value="betty_the_bus">BETTY THE BUS</option>
          </select>
        </p>
        <p>
          <label htmlFor="department">Department:</label>
          <select name="department" id="department" required>
            <option value="mfm">MFM</option>
            <option value="l&d">L&D</option>
            <option value="ta">TA</option>
            <option value="tv">TV</option>
            <option value="ivf">IVF</option>
          </select>
        </p>
        <p>
          <label htmlFor="room">Room:</label>
          <input type="text" name="room" id="room" required/>
        </p>
        <p>
          <label htmlFor="serial">Serial #:</label>
          <input type="text" name="serial" id="serial" required/>
        </p>
        <p>
          <label htmlFor="internal">Internal Identifier:</label>
          <input type="text" name="internal" id="internal" required/>
        </p>
        <p>
          <label htmlFor="control">Control #:</label>
          <input type="text" name="control" id="control" required/>
        </p>
        <p>
          <label htmlFor="received">Date Received:</label>
          <input type="date" name="received" id="received" required/>
        </p>
        <p>
          <label htmlFor="condition">Select Condition:</label>
          <select name="condition" id="condition" required>
            <option value="new">New</option>
            <option value="working">Working</option>
            <option value="refurbished">Refurbished</option>
            <option value="loaner">Loaner</option>
            <option value="broken">Broken (Out of Service)</option>
          </select>
        </p>
        <p>
          <label htmlFor="toggle_service">
            <input type="checkbox" name="toggle_service" id="toggle_service"/>
            Undo Out of Service:
          </label>
        </p>
        <p>
          <label htmlFor="note">Notes:</label>
          <textarea name="note" id="note" rows={4}/>
        </p>
      </fieldset>
      <div className={styles.form_actions}>
        <Button type="button">Cancel</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default TransducerForm;