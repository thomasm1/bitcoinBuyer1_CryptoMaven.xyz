import React, {  Component  } from "react";
import NftCoinsList from "./NftCoinsList";
import Filter from "./Filter"; 
import  nftCoinsService   from "../services/NftCoinsService";
// import {   useLocation } from 'react-router-dom';

class NftCoinsParent extends Component {
    // const location = useLocation();
    constructor() {
        super();
        this.state = {
            nftCoins: [],
            footerText:
                "&copy; 2021 All Rights Reserved | thomasmaestas.net | The NftCoins Room",
            filtered: [],
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
        const filteredNftCoins = this.state.nftCoins
            .map((nftCoin) => ({
                ...nftCoin,
                news: nftCoin.metadata.filter((item) =>
                (item.title.toLowerCase().includes(keywords.toLowerCase()) ||
                    item.url.toLowerCase().includes(keywords.toLowerCase()))
                ),
            }))
            .filter((nftCoin) => nftCoin.metadata.length > 0);

        this.setState({ filtered: filteredNftCoins });
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
                                <NftCoinsList nftCoinsProp={this.state.filtered} />
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
