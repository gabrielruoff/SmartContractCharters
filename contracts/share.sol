pragma solidity ^0.8.4;

import '../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol';

import '../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol';
import '../node_modules/@openzeppelin/contracts/utils/Counters.sol';
import '../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20URIStorage.sol';

contract Share is ERC20 {
    
    using Counters for Counters.Counter;
    Counters.Counter private _shareIds;
    // Ids to associate each share with its pertinent company and info
    mapping (uint256 => string) public _company_names;
    
    // Base URI
    string private _baseURIextended;
    // token URI
    string private _tokenURI;

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
    
    constructor() ERC20("Company Share", "COMPSHR") {}
    
    // function to update Company contract location after deplyoment
    function setCompanyContractLocation(address _newLocation) public adminOnly returns (address)
    {
        companyContractAddress = _newLocation;
        return companyContractAddress;
    }
    
    function mintShares(address to, string memory _companyName, uint256 _num_shares) public adminOrCompanyContract returns (uint256)
    {
        uint256 sharesMinted = 0;
        while (sharesMinted < _num_shares) {
            
        _shareIds.increment();

        // get new share id
        uint256 newShareId = _shareIds.current();
        // mint the share
        _safeMint(to, newShareId);
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
    function _setTokenURI(uint256 tokenId, string memory tokenURI) adminOnly internal virtual 
    {
        require(_exists(tokenId), "ERC20Metadata: URI set of nonexistent token");
        _tokenURI = tokenURI;
    }
    
}