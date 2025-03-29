import { ADDRESSES } from "../data/db-data.js";
import { setTimeout } from "timers";
export function getAllAddresses(req, res) {
    res.status(200).json({ data: Object.values(ADDRESSES) });
}
export function getAddresses(req, res) {
    res.status(200).json(ADDRESSES);
}
export function getAddressesByName(req, res) {
    const nftRefName = req.params["name"];
    let nftRef = {};
    console.log(ADDRESSES);
    console.log(nftRefName);
    const nftRefsArray = Object.keys(ADDRESSES);
    console.log(nftRefsArray);
    console.log(nftRefsArray.length);
    for (let i = 0; i < nftRefsArray.length; i++) {
        if (nftRefsArray[i] == nftRefName) {
            nftRef = ADDRESSES[nftRefsArray[i]];
        }
    }
    console.log(nftRef);
    res.status(200).json(nftRef);
}
export function searchAddresses(req, res) {
    const queryParams = req.query;
    let addresses = Object.values(ADDRESSES);
    let chainId = queryParams.chainId, filterVal = queryParams.filter || '', filterVal2 = queryParams.filter2 || '', sortOrder = queryParams.sortOrder || 'asc', pageNumber = parseInt(queryParams.pageNumber) || 0, pageSize = parseInt(queryParams.pageSize) || 3;
    // assuming ownerID is a number
    //       let ownerId = parseInt(filterVal);
    // if (filterVal != isNaN) { 
    // addresses = Object.values(ADDRESSES).filter(address => address.ownerId == ownerId).sort((l1, l2) => l1.ownerId - l2.ownerId);
    // }
    if (filterVal == "" && filterVal2 == "") {
        addresses = Object.values(ADDRESSES).sort((a1, a2) => a1.ownerId - a2.ownerId);
        console.log("#1");
    }
    else if (filterVal != "" && filterVal2 == "") { // filter value is owner, filter 2 is chain
        addresses = addresses.filter((address) => address.owner.trim().toLowerCase().search(filterVal.toLowerCase()) >= 0);
        console.log("#2");
    }
    else if (filterVal != "" && filterVal2 != "") {
        console.log("#3");
        addresses = addresses.filter((addresses) => addresses.owner
            .trim().toLowerCase().search(filterVal.toLowerCase()) >= 0);
        addresses = addresses.filter((addresses) => addresses.chain
            .trim().toLowerCase().search(filterVal2.toLowerCase()) >= 0);
    }
    if (sortOrder == "desc") {
        addresses = addresses.reverse();
    }
    const initialPos = pageNumber * pageSize;
    const addressesPage = addresses.slice(initialPos, initialPos + pageSize);
    setTimeout(() => {
        res.status(200).json({ data: addressesPage });
    }, 500); // SPINNER TODO THEN REMOVE
}
//# sourceMappingURL=addresses.route.js.map