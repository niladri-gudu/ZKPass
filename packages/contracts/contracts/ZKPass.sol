// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract ZKPass {
    bytes32 public immutable merkleRoot;
    address public immutable owner;

    mapping(address => bool) public claimed;

    event Claimed(address indexed user, uint256 timestamp);

    constructor(bytes32 _merkleRoot, address _owner) {
        merkleRoot = _merkleRoot;
        owner = _owner;
    }

    function claim(bytes32[] calldata proof) external {
        require (!claimed[msg.sender], "Already claimed");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));

        bool valid = MerkleProof.verify(
            proof,
            merkleRoot,
            leaf
        );

        require(valid, "Invalid proof");

        claimed[msg.sender] = true;

        emit Claimed(msg.sender, block.timestamp);
    }

    function isEligible(address user, bytes32[] calldata proof)
        external
        view
        returns (bool)
    {
        if (claimed[user]) {
            return false;
        }

        bytes32 leaf = keccak256(abi.encodePacked(user));

        return MerkleProof.verify(
            proof, 
            merkleRoot, 
            leaf
        );
    }   
}