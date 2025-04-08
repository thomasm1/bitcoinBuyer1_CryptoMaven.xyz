import React from "react";
import axios from "axios";
import Form from "./Form";
import { ADDRESSES_BASE_URL } from "../config";
import FormGroup from "./FormGroup";
import addressesService from "../services/addressesService";


const AddressCreate = () => {
 

  return (
    <div className="addresses-create-container">
      <Form
        initialValues={{
          address: "",
          email: "your-email@email.com",
          description: "description" 
        }}
        onSubmit={async (values) => {
          addressesService.createAddress(values);
          // try {
          //   await axios.post(`${ADDRESSES_BASE_URL}/addresses`, {
          //     ...values,
          //     did: Date.now(),
          //     date: Date.now(),
          //     author: "anonymous",
          //     email: "anonymous@gmail.com",
          //     nftCoinId: 12,
          //     blogcite: values.blogcite.join(', '), // Join the selected citations into a comma-separated string
          //   });
          //   alert("Address created successfully!");
          // } catch (error) {
          //   console.error("Error creating addresses:", error);
          //   alert("Error creating addresses. Please check the console for details.");
          // }
        }}
      >
        {({ values, handleChange }) => ( // Render prop function
          <>
            <FormGroup
              label="Address" id="address"  type="text"
              values={values}
              handleChange={handleChange} required />
            <FormGroup
              label="Description"
              id="description" type="textarea"
              values={values}
              handleChange={handleChange} />
                      <FormGroup
              label="Email"
              id="email" type="email" 
              values={values}
              handleChange={handleChange} />
                      <FormGroup
              label="Block Explorer URL"
              id="blockExplorerUrl" type="text"
   
              values={values}
              handleChange={handleChange} />
{/*              
            <FormGroup label="State" id="state" type="select" values={values} handleChange={handleChange}>
              <option value="published">Save</option>
              <option value="draft">Research Only</option>
            </FormGroup> */}
          </>
        )}
      </Form>
    </div>
  );
};

export default AddressCreate;
