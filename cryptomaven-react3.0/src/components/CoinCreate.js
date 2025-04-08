import React from "react"; 
import Form from "./Form";
import FormGroup from "./FormGroup";
import coinsService from "../services/coinsService";

const CoinCreate = ({ addressId }) => {

  const handleSubmit = async (values) => {
    try {
             await coinsService.addCoin(values, addressId); 
      alert("Coin created successfully!");

      } catch (error) {
        console.error("Error creating coin:", error);
        alert("Error creating coin. Please check the console for details.");
      }
  };

  return (
    <div>
      <Form
        initialValues={{
          body: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => ( // <--- Render prop function
            <FormGroup label="New Coin" id="body" values={values} handleChange={handleChange} />
        )}
      </Form>
    </div>
  );
};

export default CoinCreate;
