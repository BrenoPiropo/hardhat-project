async function main() {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();

    await simpleStorage.deployed();
    console.log(`SimpleStorage deployed to: ${simpleStorage.address}`);

    // Enviar 10 dólares ao contrato
    const [owner] = await ethers.getSigners(); // Pega o deployer da rede local
    const priceOfEtherInDollars = 2000; // Preço fictício do Ether ($2000)
    const amountInEther = 10 / priceOfEtherInDollars; // Converte $10 para Ether
    const amountInWei = ethers.utils.parseEther(amountInEther.toString()); // Converte para wei

    const tx = await owner.sendTransaction({
        to: simpleStorage.address,
        value: amountInWei,
    });

    await tx.wait();
    console.log(`Sent $10 worth of Ether (${amountInEther} ETH) to the contract`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
