// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 public storedData;
    address public owner;

    // Struct para armazenar as informações da transferência
    struct TransferRecord {
        address from;
        uint256 amount;
        uint256 timestamp;
    }

    // Array para armazenar os registros das transferências
    TransferRecord[] public transferRecords;

    // Evento para transferências
    event TransferRecorded(address from, uint256 amount, uint256 timestamp);

    constructor() {
        owner = msg.sender;
    }

    // Função para armazenar um número
    function store(uint256 x) public {
        storedData = x;
    }

    // Função para obter o número armazenado
    function retrieve() public view returns (uint256) {
        return storedData;
    }

    // Função para registrar a transferência
    function recordTransfer(uint256 amount) public {
        transferRecords.push(TransferRecord({
            from: msg.sender,
            amount: amount,
            timestamp: block.timestamp
        }));

        emit TransferRecorded(msg.sender, amount, block.timestamp);
    }

    // Função para consultar os registros de transferência
    function getTransferRecords() public view returns (TransferRecord[] memory) {
        return transferRecords;
    }
}
