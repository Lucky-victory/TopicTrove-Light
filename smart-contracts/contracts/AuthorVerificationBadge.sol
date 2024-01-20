// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AuthorVerificationBadge is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    address platformAddress;

    modifier onlyPlatform() {
        require(msg.sender == platformAddress, "Only platform allowed");
        _;
    }

    constructor(
        address _platformAddress
    ) ERC721("TopicTrove Verification Badge", "TVB") {
        platformAddress = _platformAddress;
    }

    function safeMint(address to) public onlyPlatform returns (uint256) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(
            tokenId,
            "https://bafybeiaovcphcjqf7y52v6e6bukooewlzkidopw6ntxllgrt6scfxeycci.ipfs.nftstorage.link/Badge.svg"
        );
        return tokenId;
    }

    function burn(uint256 tokenId) external {
        require(
            ownerOf(tokenId) == msg.sender,
            "Only owner of the token can burn it"
        );
        _burn(tokenId);
    }

    // The following functions are overrides

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721) {
        require(
            from == address(0) || to == address(0),
            "Token not transferable"
        );
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
