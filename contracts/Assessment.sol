// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

//import "hardhat/console.sol";

contract Assessment {
   
    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    

    mapping(address => uint256) public balanceOf;
    mapping(address => address) public ownerOf;                                                                                                                                         
      
    function getBalanceFromWalletAddress(address walletAddress) public view returns(uint256) {
    return balanceOf[walletAddress];
    }
    

    function depositamount(uint256 _amount) public payable {
        uint _previousbalance= balanceOf[msg.sender];
        balanceOf[msg.sender] += _amount;
        assert(balanceOf[msg.sender] == _previousbalance + _amount);
        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdrawamount(uint256 _withdrawAmount) public {
       
        uint _previousBalance = balanceOf[msg.sender];
        if (balanceOf[msg.sender] < _withdrawAmount) {
            revert InsufficientBalance({
                balance: _previousBalance,
                withdrawAmount: _withdrawAmount
            });
        }

        balanceOf[msg.sender] -= _withdrawAmount;
        assert(balanceOf[msg.sender] == (_previousBalance - _withdrawAmount));
        emit Withdraw(_withdrawAmount);
    }
    
    function checkBalance() public view returns(uint256) {
    address account = msg.sender;
    return balanceOf[account];
    }
    
    function increaseBalance(uint _amount) public payable {
        uint _previousBalance = balanceOf[msg.sender];
        balanceOf[msg.sender] += _amount;
       assert(balanceOf[msg.sender] == _previousBalance + _amount);
    //   emit increaseBalance(_amount);
    }

    function decreaseBalance(uint _amount) public payable{
        uint _previousBalance = balanceOf[msg.sender];
    
        balanceOf[msg.sender] -= _amount;
        assert(balanceOf[msg.sender] == _previousBalance - _amount);
   //     emit decreaseBalance(_amount);
    }
}
 
