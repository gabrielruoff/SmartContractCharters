pragma solidity ^0.8.4;

import '../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol';

import '../node_modules/@openzeppelin/contracts/utils/Counters.sol';
import '../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol';

import './Share.sol';

contract Company is ERC721 {
    
    // instance of share contract
    Share public shareContract;
    
    using Counters for Counters.Counter;
    using SafeMath for uint256;
    Counters.Counter private _tokenIds;
    mapping (uint256 => string) public _company_names;
    address admin = msg.sender;
    
    // Base URI
    string private _baseURIextended;
    // mapping for token URIs
    mapping (uint256 => string) private _tokenURIs;

    constructor(address _shareContractAddress) ERC721("Company", "COMP") {
        // point Company contract to share contract upon deployment
        shareContract = Share(_shareContractAddress);
    }
    
    // require admin
     modifier adminOnly() {
        require(msg.sender == admin, "This function is restricted to the contract's owner");_;
    }
    
     // function to update share contract after deplyoment
    function setShareContract(address _newLocation) public adminOnly returns (address)
    {
        shareContract = Share(_newLocation);
        return _newLocation;
    }
    
    // mint a token
    function createCompany(address companyOwner, string memory companyName, string memory _shareURI, uint256 totalShares, uint256 brokerCut) public adminOnly returns (uint256)
    {
        _tokenIds.increment();

        // get new item id
        uint256 newItemId = _tokenIds.current();
        // mint the token
        _safeMint(companyOwner, newItemId);
        
        // register the company name
        _company_names[newItemId] = companyName;
        
        // mint totalShares * brokerCut/100 amount of shares to broker
        uint256 shares_to_broker = totalShares.mul(brokerCut).div(100);
        uint256 shares_to_owner = totalShares.sub(shares_to_broker);
        
        // mint shares to owner
        shareContract.mintShares(companyOwner, companyName, shares_to_owner, _shareURI);
        // mint shares to broker
        shareContract.mintShares(msg.sender, companyName, shares_to_broker, _shareURI);
        

        return newItemId;
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