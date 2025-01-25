// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LandNFT is ERC721, ERC721URIStorage, Ownable {
    struct LandParcel {
        int256 latitude;
        int256 longitude;
        string uniqueId;  // Unique identification number for the land owner
    }

    mapping(uint256 => LandParcel) private _landParcels;
    mapping(string => uint256[]) private _userLands;  // Mapping from uniqueId to token IDs
    uint256 private _tokenIdCounter;

    constructor(address initialOwner) ERC721("LandNFT", "LAND") Ownable(initialOwner) {}

    function safeMint(address to, int256 latitude, int256 longitude, string memory uri, string memory uniqueId) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _landParcels[tokenId] = LandParcel(latitude, longitude, uniqueId);
        _userLands[uniqueId].push(tokenId);
    }

    function getLandParcel(uint256 tokenId) public view returns (int256, int256, string memory) {
        require(_exists(tokenId), "LandNFT: Query for nonexistent token");
        LandParcel memory parcel = _landParcels[tokenId];
        return (parcel.latitude, parcel.longitude, parcel.uniqueId);
    }

    function getUserLands(string memory uniqueId) public view returns (uint256[] memory) {
        return _userLands[uniqueId];
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return _landParcels[tokenId].latitude != 0 || _landParcels[tokenId].longitude != 0;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
