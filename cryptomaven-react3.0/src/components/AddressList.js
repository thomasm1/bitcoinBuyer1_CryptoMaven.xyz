import React, { useState, useEffect } from "react";
import CoinCreate from "./CoinCreate";
import CoinList from "./CoinList";
import { NavLink } from "react-router-dom";
import addressesService from "../services/addressesService"; 

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await addressesService.listAddresses();
        setAddresses(res);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setError("Failed to fetch addresses.");
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2 className="text-center">List of Addresses</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Block Explorer</th>
            <th>Email</th>
            <th>Chains</th>
            <th>Coins</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address) => (
            <React.Fragment key={address.id}>
              <tr>
                <td>
                  <NavLink
                    to={`/addresses/${address.id}`}
                    style={{
                      textDecoration: "none",
                      color: "blue",
                      fontWeight: "bold",
                    }}
                  >
                    {address.description}
                  </NavLink>
                </td>
                <td>{address.blockExplorerUrl}</td>
                <td>{address.email}</td>
                <td>
                  {address.chains.map((chain) => (
                    <span key={chain.id} className="badge badge-secondary" style={{ margin: "2px" }}>
                      {chain.name}
                    </span>
                  ))}
                </td>
                <td>
                  {address.coins.map((coin) => (
                    <span key={coin.id} className="badge badge-secondary" style={{ margin: "2px" }}>
                      {coin.name}
                    </span>
                  ))}
                </td>
                <td>
                  <button className="btn btn-info" onClick={() => addressesService.updateAddress(address.id)}>
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => addressesService.removeAddress(address.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ fontStyle: "italic", backgroundColor: "#f9f9f9" }}>
                  Address: {address.address}
                  <div style={{ float: "right" }}>
                    <img
                      src={address.iconUrl}
                      alt={address.description}
                      className="address-icon detail-label"
                      width="30"
                      height="30"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="6">
                  <CoinList coins={address.coins || []} />
                  <CoinCreate addressId={address.id} />
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddressList;
