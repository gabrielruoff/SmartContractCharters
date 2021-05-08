pragma solidity ^0.8.4;
import "remix_tests.sol"; // injected by remix-tests
import "./Company.sol";

contract MyTest {
    
  // Deploy our ERC721 contract to the ethereum blockchain allowing ‘Company’ tokens to be minted.
  Company company;

  function beforeAll() public {
    // deploy share contract
    Share share;
    // mint erc721 token
    company = new Company(0x72656d6978000000000000000000000000000000000000000000000000000000, 'testcompany', 'testURI', 1000, 2);
    // point erc20 token to erc721 token
    share.setCompanyContractLocation(0x72656d6978000000000000000000000000000000000000000000000000000000);
  }

  function initialNameTest() public returns (bool) {
      // make a share
      shares.mintShares()
    return Assert.equal(share.name(), 'testcompany', "initial value is not correct");
  }

  function initialValueShouldNotBe200() public returns (bool) {
    return Assert.notEqual(foo.get(), 200, "initial value is not correct");
  }

  function shouldTriggerOneFail() public {
    Assert.equal(uint(1), uint(2), "uint test 1 fails");
    Assert.notEqual(uint(1), uint(2), "uint test 2 passes");
  }

  function shouldTriggerOnePass() public {
    Assert.equal(uint(1), uint(1), "uint test 3 passes");
  }
}