// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ZKPassPaymaster {
    address public owner;

    event Sponsored(address indexed user);

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {}

    function sponsor(address user) external {
        emit Sponsored(user);
    }

    function withdraw() external {
        require (msg.sender == owner, "Not owner");

        uint256 balance = address(this).balance;

        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
}