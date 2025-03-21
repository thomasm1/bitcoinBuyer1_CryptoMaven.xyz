export abstract class Constant {
    static MORALIS_CHAINS = [
        { id: "1", name: "ethereum", description: "Ethereum Mainnet", type: "Mainnet" },
        { id: "3", name: "ropstein", description: "Ethereum Ropsten", type: "Testnet" },
        { id: "4", name: "rinkeby", description: "Ethereum Rinkeby", type: "Testnet" },
        { id: "5", name: "goerli", description: "Ethereum Goerli", type: "Testnet" },
        { id: "137", name: "polygon", description: "Polygon Mainnet", type: "Mainnet" },
        { id: "80001", name: "mumbai", description: "Polygon Mumbai", type: "Testnet" },
        { id: "56", name: "bsc", description: "BSC Mainnet", type: "Mainnet" },
        { id: "97", name: "bsc testnet", description: "BSC Chain Testnet", type: "Testnet" },
        { id: "43114", name: "avalanche", description: "Avalanche C-Chain", type: "Mainnet" },
        { id: "43113", name: "fuji", description: "Avalanche Fuji", type: "Testnet" },
        { id: "250", name: "fantom", description: "Fantom", type: "Mainnet" },
        { id: "42161", name: "arbitrum", description: "Arbitrum", type: "Mainnet" },
    ]

    static MORALIS_CHAINS_MAP = {       
        "1": "ethereum",
        "3": "ropstein",
        "4": "rinkeby",
        "5": "goerli",
        "137": "polygon",
        "80001": "mumbai",
        "56": "bsc",
        "97": "bsc testnet",
        "43114": "avalanche",
        "43113": "fuji",
        "250": "fantom",
        "42161": "arbitrum",
    }

    static USERS_VIEW = [
        { id: 0,
            firstName: "Tom",
            lastName: "Milton",
            email: "thomas1.maestas@gmail.com",
            memberSince: "02-04-2020",
            groupType: "Admin",
            addresses: [
                {
                    id: 1,
                    description: "NFT - 0x1",
                    owner: "unknown",
                    address: "0x900bE021E38B8d08435A03c05657C8cFA837cAeF",
                    chain: "ethereum",
                    duration: "2:55",
                    ownerId: 5,
                    chainId: 4
                },
                {
                    id: 4,
                    description: "NFT - 0x1",
                    owner: "unknown",
                    address: "0x900bE021E38B8d08435A03c05657C8cFA837cAeF",
                    chain: "polygon",
                    duration: "2:55",
                    ownerId: 5,
                    chainId: 137
                },
            ]
        },
        { id: 1,
            firstName: "Walter",
            lastName: "White",
            email: "crypto.mavn@gmail.com",
            memberSince: "02-04-2020",
            groupType: "Premium",
            addresses: [
                {
                    id: 1,
                    description: "NFT - 0x1",
                    owner: "unknown",
                    address: "0xcfCa3FEBAceA3AbB643bA90C670D7c4E6D74b633",
                    chain: "ethereum",
                    duration: "2:55",
                    ownerId: 5,
                    chainId: 1
                },
                {
                    id: 4,
                    description: "NFT - 0x1",
                    owner: "unknown",
                    address: "0x900bE021E38B8d08435A03c05657C8cFA837cAeF",
                    chain: "pulsechain",
                    duration: "2:55",
                    ownerId: 5,
                    chainId: 1
                },
            ]
        },
    ]

    static NFTS_VIEW = {
            "0x900bE021E38B8d08435A03c05657C8cFA837cAeF": {
                native: "0.03435",
                tokens: [
                    "12.0 USDC",
                    "55.0 HEX",
                    "2.00265064 MATIC"
                ],
                nfts: [
                    {
                        name: "One day,Ujuuna killed in explosion, and his reincarnation is decided at generative.",
                        amount: 1,
                        metadata: {
                            name: "Ten Uju Gene #08380",
                            description: "ある日、イケハヤさんと対談し、未来にワクワクしながら布団に入るうじゅうな……。  \n    \n  （明日からも頑張ろう……）  \n    \n  そう思った矢先、爆死し、転生してしまううじゅうな。  \n    \n  念願の転生は思っていたのとは、なんか違うようで……。  \n    \n  その転生先はあなたの目で見届けてほしい。",
                            image: "https://storage.googleapis.com/uju-explosion/images/8380.png",
                            attributes: [
                                {
                                    value: "Tegaki",
                                    trait_type: "Base"
                                },
                                {
                                    value: "Tegaki",
                                    trait_type: "Base"
                                }
                            ]
                        }
                    }
                ]
            }
        }

}