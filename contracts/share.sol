pragma solidity ^0.8.4;

import '../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol';
// import '../node_modules/@openzeppelin/contracts/drafts/Counters.sol';
import '../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol';
import '../node_modules/@openzeppelin/contracts/utils/Counters.sol';
import '../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

contract share is ERC721 {
    
    using Counters for Counters.Counter;
    Counters.Counter private _shareIds;
    // Ids to associate each share with its pertinent company and info
    mapping (uint256 => string) public _company_names;
    
    // Base URI
    string private _baseURIextended;
    // mapping for token URIs
    mapping (uint256 => string) private _tokenURIs;

    // admin and contract addresses
    address admin = msg.sender;
    address companyContractAddress;
    
    // require admin
     modifier adminOnly() {
        require(msg.sender == admin, "This function is restricted to the contract's owner");_;
    }
    // require company contract or admin
     modifier adminOrCompanyContract() {
        require(msg.sender == companyContractAddress || msg.sender == admin, "This function is restricted to the contract's owner and company contract");_;
    }
    
    constructor() ERC721("Company Share", "COMPSHR") {}
    
    // function to update Company contract location after deplyoment
    function setCompanyContractLocation(address _newLocation) public adminOnly returns (address)
    {
        companyContractAddress = _newLocation;
        return companyContractAddress;
    }
    
    function mintShares(address to, string memory _companyName, uint256 _num_shares, string memory _shareURI) public adminOrCompanyContract returns (uint256)
    {
        uint256 sharesMinted = 0;
        while (sharesMinted < _num_shares) {
            
        _shareIds.increment();

        // get new share id
        uint256 newShareId = _shareIds.current();
        // mint the share
        _safeMint(to, newShareId);
        // set token URI
        _setTokenURI(newShareId, _shareURI);
        // declare the company that this share corresponds to
        _company_names[newShareId] = _companyName;
        
        // increment shares minted
        sharesMinted++;
         
        }
        
        // return number of shares minted
        return sharesMinted;
    }
    
    // sets base URI
    function setBaseURI(string memory baseURI_) external adminOnly 
    {
        _baseURIextended = baseURI_;
    }
    
    // sets token URI
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual 
    {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
    
}