export interface Coin 
{
  id?: number,
  native?: string,
  tokens?: [
    string,
    string 
  ],
  nfts?: [
    {
      name?:  string;
      amount?: number;
      metadata?: {
        name?: string,
        description?:string,
        image?:string
        attributes?: [
          {
            value?: string,
            trait_type?: string
          } 
        ]
      } 
    }
  ]
}

// @Id
// int id;
// int name;
// int amount;
// @OneToOne
// @JoinColumn(name = "metadata_metaid")
// Metadata metadata;
// int nft_address_id;

// {
//   "native": "0.020137885071665717",
//   "tokens": [
//       "12.0 USDC",
//       "69.54927571 MATIC",
//       "35.117792413387084938 BUSD",
//       "55.0 HEX"
//   ],
//   "nfts": [
//       {
//           "name": "One day,Ujuuna killed in explosion, and his reincarnation is decided at generative.",
//           "amount": 1,
//           "metadata": {
//               "name": "Ten Uju Gene #08380",
//               "description": "ある日、イケハヤさんと対談し、未来にワクワクしながら布団に入るうじゅうな……。  \n    \n  （明日からも頑張ろう……）  \n    \n  そう思った矢先、爆死し、転生してしまううじゅうな。  \n    \n  念願の転生は思っていたのとは、なんか違うようで……。  \n    \n  その転生先はあなたの目で見届けてほしい。",
//               "image": "https://storage.googleapis.com/uju-explosion/images/8380.png",
//               "attributes": [
//                   {
//                       "value": "Tegaki",
//                       "trait_type": "Base"
//                   },
//                   {
//                       "value": "Knight",
//                       "trait_type": "1st panel"
//                   },
//                   {
//                       "trait_type": "1st panel option",
//                       "value": "None"
//                   },
//                   {
//                       "trait_type": "2nd panel",
//                       "value": "Boss"
//                   },
//                   {
//                       "value": "None",
//                       "trait_type": "2nd panel option"
//                   },
//                   {
//                       "trait_type": "3rd panel",
//                       "value": "Fall"
//                   },
//                   {
//                       "value": "Nobuyuki",
//                       "trait_type": "3rd panel option"
//                   },
//                   {
//                       "trait_type": "4th panel",
//                       "value": "Reincarnation"
//                   },
//                   {
//                       "trait_type": "4th panel option",
//                       "value": "Sailor suit uncle"
//                   },
//                   {
//                       "value": "Massage8",
//                       "trait_type": "Massage"
//                   }
//               ]
//           }
//       },
//       {
//           "name": "One day,Ujuuna killed in explosion, and his reincarnation is decided at generative.",
//           "amount": 1,
//           "metadata": {
//               "name": "Ten Uju Gene #08260",
//               "description": "ある日、イケハヤさんと対談し、未来にワクワクしながら布団に入るうじゅうな……。  \n    \n  （明日からも頑張ろう……）  \n    \n  そう思った矢先、爆死し、転生してしまううじゅうな。  \n    \n  念願の転生は思っていたのとは、なんか違うようで……。  \n    \n  その転生先はあなたの目で見届けてほしい。",
//               "image": "https://storage.googleapis.com/uju-explosion/images/8260.png",
//               "attributes": [
//                   {
//                       "trait_type": "Base",
//                       "value": "Tegaki silver"
//                   },
//                   {
//                       "trait_type": "1st panel",
//                       "value": "Knight"
//                   },
//                   {
//                       "value": "None",
//                       "trait_type": "1st panel option"
//                   },
//                   {
//                       "value": "UFO",
//                       "trait_type": "2nd panel"
//                   },
//                   {
//                       "trait_type": "2nd panel option",
//                       "value": "Kiyoshi"
//                   },
//                   {
//                       "trait_type": "3rd panel",
//                       "value": "Sentaku"
//                   },
//                   {
//                       "value": "None",
//                       "trait_type": "3rd panel option"
//                   },
//                   {
//                       "trait_type": "4th panel",
//                       "value": "God"
//                   },
//                   {
//                       "trait_type": "4th panel option",
//                       "value": "Uju2"
//                   },
//                   {
//                       "trait_type": "Massage",
//                       "value": "Massage13"
//                   }
//               ]
//           }
//       }
//   ]
// }