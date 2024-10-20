// import React, { useState } from 'react';
// import { postBidding } from '../../actions/authService';

// const AuctionForm = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     startingBid: '',
//     endDate: ''
//   });

//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await postBidding(formData);
//       if (response.status === 201) {
//         setSuccess("Auction created successfully!");
//         setError(null);
//       } else {
//         setError("Failed to create auction.");
//       }
//     } catch (err) {
//       setError("An error occurred: " + err.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Create Auction</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Starting Bid</label>
//           <input
//             type="number"
//             name="startingBid"
//             value={formData.startingBid}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>End Date</label>
//           <input
//             type="datetime-local"
//             name="endDate"
//             value={formData.endDate}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button type="submit">Create Auction</button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>{success}</p>}
//     </div>
//   );
// };

// export default AuctionForm;


import React, { useState } from 'react';
import { postBidding } from '../../actions/authService';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Divider } from 'primereact/divider';
import './AuctionForm.css'; // Add your custom CSS for 50% width

const AuctionForm = ({closeForm}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingBid: null,
    endDate: null,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (e) => {
    setFormData({ ...formData, startingBid: e.value });
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, endDate: e.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postBidding(formData);
      if (response.status === 201) {
        setSuccess('Auction created successfully!');
        setError(null);
        closeForm();
      } else {
        setError('Failed to create auction.');
      }
    } catch (err) {
      setError('An error occurred: ' + err.message);
    }
  };

  return (
    <div className="p-card p-shadow-3 p-p-3">
      <h2>Create Auction</h2>
      <Divider />
      <form onSubmit={handleSubmit}>
        <div className="p-fluid p-grid">
          <div className="p-col-12 p-md-6 custom-width"> {/* Add custom-width for 50% width */}
            <div className="p-field">
              <label htmlFor="title">Title</label>
              <InputText
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter auction title"
              />
            </div>
          </div>
          <div className="p-col-12 p-md-6 custom-width">
            <div className="p-field">
              <label htmlFor="startingBid">Starting Bid</label>
              <InputNumber
                id="startingBid"
                name="startingBid"
                value={formData.startingBid}
                onValueChange={handleNumberChange}
                mode="currency"
                currency="USD"
                placeholder="Enter starting bid"
              />
            </div>
          </div>
          <div className="p-col-12 custom-width">
            <div className="p-field">
              <label htmlFor="description">Description</label>
              <InputTextarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Enter a detailed description"
                autoResize
              />
            </div>
          </div>
          <div className="p-col-12 custom-width">
            <div className="p-field">
              <label htmlFor="endDate">End Date</label>
              <Calendar
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleDateChange}
                showTime
                dateFormat="yy-mm-dd"
                placeholder="Select end date and time"
              />
            </div>
          </div>
        </div>
        <Button label="Create Auction" className="p-button-success p-mt-3" type="submit" />
      </form>

      {error && <Message severity="error" text={error} className="p-mt-3" />}
      {success && <Message severity="success" text={success} className="p-mt-3" />}
    </div>
  );
};

export default AuctionForm;

