async function main() {
    const [owner] = await ethers.getSigners();
    const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Endereço do contrato implantado

    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.attach(contractAddress);

    // Vamos registrar uma transferência de valor fictício (10 unidades de valor)
    const amount = 10;

    console.log(`Recording a transfer of ${amount} units...`);

    // Chama a função para registrar a transferência
    const tx = await simpleStorage.recordTransfer(amount);

    // Aguarda a transação ser minerada
    await tx.wait();

    console.log(`Transfer of ${amount} recorded successfully!`);

    // Agora vamos verificar o histórico de transferências
    const transferRecords = await simpleStorage.getTransferRecords();

    console.log("Transfer records:");
    transferRecords.forEach((record, index) => {
        console.log(`Transfer ${index + 1}:`);
        console.log(`From: ${record.from}`);
        console.log(`Amount: ${record.amount}`);
        console.log(`Timestamp: ${new Date(record.timestamp * 1000).toLocaleString()}`);
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
