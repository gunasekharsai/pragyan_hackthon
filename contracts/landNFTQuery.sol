// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ILandNFT {
    function getLandParcel(uint256 tokenId) external view returns (int256, int256, string memory);
    function getUserLands(string memory uniqueId) external view returns (uint256[] memory);
    function tokenURI(uint256 tokenId) external view returns (string memory);
    function ownerOf(uint256 tokenId) external view returns (address);
    function tokenExists(uint256 tokenId) external view returns (bool);
}

contract LandNFTQuery {
    ILandNFT public landNFTContract;
    uint256 public constant MAX_TOKEN_ID = 1000000; // Adjust this based on your expected maximum number of tokens
    
    constructor(address _landNFTContractAddress) {
        landNFTContract = ILandNFT(_landNFTContractAddress);
    }
    
    function getUserLandsWithUniqueId(string memory uniqueId) public view returns (
        uint256[] memory tokenIds,
        int256[] memory latitudes,
        int256[] memory longitudes,
        string[] memory tokenURIs,
        address[] memory owners
    ) {
        // Implementation remains the same as before
    }
    
    function getAllLandParcels() public view returns (
        uint256[] memory tokenIds,
        int256[] memory latitudes,
        int256[] memory longitudes,
        string[] memory uniqueIds,
        string[] memory tokenURIs,
        address[] memory owners
    ) {
        uint256[] memory tempTokenIds = new uint256[](MAX_TOKEN_ID);
        int256[] memory tempLatitudes = new int256[](MAX_TOKEN_ID);
        int256[] memory tempLongitudes = new int256[](MAX_TOKEN_ID);
        string[] memory tempUniqueIds = new string[](MAX_TOKEN_ID);
        string[] memory tempTokenURIs = new string[](MAX_TOKEN_ID);
        address[] memory tempOwners = new address[](MAX_TOKEN_ID);
        
        uint256 count = 0;
        for (uint256 i = 0; i < MAX_TOKEN_ID; i++) {
            if (landNFTContract.tokenExists(i)) {
                (int256 lat, int256 long, string memory uid) = landNFTContract.getLandParcel(i);
                tempTokenIds[count] = i;
                tempLatitudes[count] = lat;
                tempLongitudes[count] = long;
                tempUniqueIds[count] = uid;
                tempTokenURIs[count] = landNFTContract.tokenURI(i);
                tempOwners[count] = landNFTContract.ownerOf(i);
                count++;
            }
        }
        
        tokenIds = new uint256[](count);
        latitudes = new int256[](count);
        longitudes = new int256[](count);
        uniqueIds = new string[](count);
        tokenURIs = new string[](count);
        owners = new address[](count);
        
        for (uint256 i = 0; i < count; i++) {
            tokenIds[i] = tempTokenIds[i];
            latitudes[i] = tempLatitudes[i];
            longitudes[i] = tempLongitudes[i];
            uniqueIds[i] = tempUniqueIds[i];
            tokenURIs[i] = tempTokenURIs[i];
            owners[i] = tempOwners[i];
        }
    }
}
