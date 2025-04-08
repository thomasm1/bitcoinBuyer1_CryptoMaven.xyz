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
          title: "",
          url: "",
        }}
        onSubmit={async (values) => {
          try {
            // Get the nftCoin object
            const response = nftCoinsService.getNftCoin(nftCoinId);
            const nftCoin = response.data;
            // Ensure nftCoin.metadata exists
            if (!nftCoin.metadata) {
              nftCoin.metadata = [];
            }

            // Assign an unique id to the new news.
            const id =
              Math.max(...nftCoin.metadata.map((news) => news.id), 0) + 1;
            // Add the news object to the nftCoin
            nftCoin.metadata.push({ ...values, id });

            nftCoinsService.addNftCoins(nftCoinId, values);


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
              label="Title"
              id="title"
              values={values}
              handleChange={handleChange}
              required
            />
            <FormGroup
              label="URL"
              id="url"
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
