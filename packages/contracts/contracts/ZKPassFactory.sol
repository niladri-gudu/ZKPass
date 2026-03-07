// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ZKPass.sol";

contract ZKPassFactory {
    address public owner;

    struct Campaign {
        address contractAddress;
        bytes32 merkleRoot;
        uint256 createdAt;
    }

    Campaign[] public campaigns;

    event CampaignCreated(
        address indexed campaign,
        bytes32 merkleRoot
    );

    constructor() {
        owner = msg.sender;
    }

    function createCampaign(bytes32 merkleRoot) 
        external 
        returns (address)
    {
        require (msg.sender == owner, "Not owner");

        ZKPass pass = new ZKPass(
            merkleRoot, 
            msg.sender
        );

        campaigns.push(
            Campaign({
                contractAddress: address(pass),
                merkleRoot: merkleRoot,
                createdAt: block.timestamp
            })
        );

        emit CampaignCreated(address(pass), merkleRoot);

        return address(pass);
    }

    function getCampaigns() 
        external 
        view 
        returns (Campaign[] memory) 
    {
        return campaigns;
    }
}