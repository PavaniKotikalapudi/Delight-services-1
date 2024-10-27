import React, { useState } from 'react';

import useFetchPincode from './Hooks/useFetchPincode'; // Adjust the path to match your project structure

const PincodeLookup = () => {
  const [pincode, setPincode] = useState('');
  const { data, loading, error } = useFetchPincode(pincode);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any additional actions on form submission if necessary
  };

  return (
    <div>
      <h1>Pincode Lookup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter Pincode"
        />
        <button type="submit">Lookup</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h2>Results:</h2>
          {data[0].PostOffice.map((office) => (
            <div key={office.Name}>
              <p>Name: {office.Name}</p>
              <p>District: {office.District}</p>
              <p>State: {office.State}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PincodeLookup;
