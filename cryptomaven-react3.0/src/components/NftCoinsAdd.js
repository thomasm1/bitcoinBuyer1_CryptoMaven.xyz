import React from "react"; 
import Form from "./Form";
import {   JWT_TOKEN } from "../config";
import FormGroup from "./FormGroup";
import  nftCoinsService  from "../services/NftCoinsService";

const NftCoinsAdd = ({ nftCoinSelected }) => {
  const nftCoinId = nftCoinSelected.id; // Get nftCoinId directly
  const bearerToken = localStorage.getItem("accessToken") || JWT_TOKEN;

  return (
    <div className="address-create-container">
      <Form
        initialValues={{
      
          "name": "",
          "amount": 0.0,
          "metadata": {}
          // "metadata": {
          //     "metadataId": 0,
          //     "name": "",
          //     "description": "",
          //     "image": "",
          //     "external_url": "",
          //     "attributes": [
          //         {
          //             "attrid": 0,
          //             "attribute_value": "",
          //             "trait_type": ""
          //         }
          //       ]
          //     }

        }}
        onSubmit={async (values) => {
          try {
            // Get the nftCoin object
            const response = nftCoinsService.getNftCoin(nftCoinId);
            const nftCoin = response.data;
            // Ensure nftCoin.metadata exists
            if (!nftCoin.metadata) {
              nftCoin.metadata = {}
            }

            // // Assign an unique id to the new news.
            // const id =
            //   Math.max(...nftCoin.metadata.map((news) => news.id), 0) + 1;
            // Add the news object to the nftCoin 
            nftCoinsService.updateNftCoins(nftCoinId, values);


            alert("Research URL added successfully!");
          } catch (error) {
            console.error("Error adding URL:", error);
            alert("Error adding URL. Please check the console for details.");
          }
        }}
      >
        {({ values, handleChange }) => (
          <>
            <FormGroup
              label="NftCoin Name"
              id="name"
              values={values}
              handleChange={handleChange}
              required
            />
            <FormGroup
              label="amount"
              id="amount"
              values={values}
              handleChange={handleChange}
              required
            />
            
            <FormGroup
              label="metadata"
              id="metadata"
              values={values}
              handleChange={handleChange}
              required
            />
          </>
        )}
      </Form>
    </div>
  );
};

export default NftCoinsAdd;
