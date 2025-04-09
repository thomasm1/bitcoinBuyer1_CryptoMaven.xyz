import React, {  Component  } from "react";
import NftCoinsList from "./NftCoinsList";
import Filter from "./Filter"; 
import  nftCoinsService   from "../services/NftCoinsService";
// import {   useLocation } from 'react-router-dom';

 
class NftCoinsParent extends Component  {
    // const location = useLocation();
    constructor(props) {
        super(props);
        this.state = {
            nftCoins: [],
            footerText:
                "&copy; 2021 All Rights Reserved | thomasmaestas.net | The NftCoins Room",
            filtered: [],
            filteredMetadata: {},
            filteredAttributes: [],
            loading: true,
        };
    } 

    componentDidMount() {
        this.fetchNftCoins();
    }

    fetchNftCoins = async () => {
        try {
            const nftCoins = await nftCoinsService.getNftCoins(); 
            console.log("NftCoinsParent fetchNftCoins:", nftCoins);
            this.setState({ nftCoins: nftCoins, filtered: nftCoins, loading: false });
        } catch (error) {
            console.error("Error fetching nftCoins:", error);
            this.setState({ loading: false });
        }
    };

    getKeywords = (keywords) => {
        if (keywords === "") {
            this.setState({ filtered: this.state.nftCoins });
            return;
        }
        const filteredNfts = this.state.nftCoins
            .filter((nftCoin) =>   (nftCoin.name.toLowerCase().includes(keywords.toLowerCase()) || // name
                nftCoin.amount.toString().includes(keywords)));   ///////// digits);

        this.setState({ filtered: filteredNfts });

        const filteredMeta = this.state.nftCoins 
                .filter((nftCoin ) =>
                (nftCoin.metadata?.name.toLowerCase().includes(keywords.toLowerCase()) || // name
                    nftCoin.metadata?.description.toLowerCase().includes(keywords.toLowerCase())));  ///////// digits

        this.setState({ filteredMetadata: filteredMeta })

        const filteredAttrs = this.state.nftCoins
            .map((nftCoin) => ({
                ...nftCoin, ////////////////check this
                attributes: nftCoin.metadata?.attributes
                .filter((attrItem) =>
                (attrItem.attribute_value.toLowerCase().includes(keywords.toLowerCase()) || // name
                attrItem.trait_type.toLowerCase().includes(keywords.toLowerCase()))   ///////// digits
                ),
            }))
            .filter((nftCoin) =>  nftCoin.metadata?.length > 0);
        this.setState({ filteredAttributes: filteredAttrs })
    };
    render() {
        return (
            <div>
                <header className="app-header">
                    <div className="header-content row">
                        <h6>Record Address </h6>

                        <Filter getKeywords={this.getKeywords}>
                            {this.state.loading && <div>Loading...</div>}
                            {!this.state.loading && (
                                <NftCoinsList nftCoinsFilteredProp={this.state.filtered} />
                            )}
                        </Filter>
                    </div>
                    <hr />
                    <hr />
                </header>
            </div>
        );
    }
}

export default  NftCoinsParent; 
