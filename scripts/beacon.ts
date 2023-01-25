import { ethers, upgrades } from "hardhat"

async function main() {
    const BeaconProxyPatternV1 = await ethers.getContractFactory("BeaconProxyPatternV1");

    // deploy beacon + implementation
    const beacon = await upgrades.deployBeacon(BeaconProxyPatternV1);
    await beacon.deployed();
    console.log(`Beacon with V1 as implementation is deployed to address: ${beacon.address}`);

    // deploy proxy1
    const beaconProxy1 = await upgrades.deployBeaconProxy(beacon.address, BeaconProxyPatternV1, ["alice"]);
    await beaconProxy1.deployed();
    console.log(`Proxy1 pointing to V1 as implementation is deployed to address: ${beaconProxy1.address}`);
    let versionAwareContractName = await beaconProxy1.getContractNameWithVersion();
    console.log(`Version from Proxy1 Implementation: ${versionAwareContractName}`);

    // deploy proxy2
    const beaconProxy2 = await upgrades.deployBeaconProxy(beacon.address, BeaconProxyPatternV1, ["bob"]);
    await beaconProxy1.deployed();
    console.log(`Proxy2 pointing to V1 as implementation is deployed to address: ${beaconProxy2.address}`);
    versionAwareContractName = await beaconProxy2.getContractNameWithVersion();
    console.log(`Version from Proxy2 Implementation: ${versionAwareContractName}`);

    // point beacon to v2
    const BeaconProxyPatternV2 = await ethers.getContractFactory("BeaconProxyPatternV2");
    const upgradedBeacon = await upgrades.upgradeBeacon(beacon.address, BeaconProxyPatternV2);
    console.log(`Beacon with V2 as implementation is deployed to address: ${upgradedBeacon.address}`);

    versionAwareContractName = await beaconProxy1.getContractNameWithVersion();
    console.log(`Version from Proxy1 Implementation: ${versionAwareContractName}`);
    versionAwareContractName = await beaconProxy2.getContractNameWithVersion();
    console.log(`Version from Proxy 2 Implementation: ${versionAwareContractName}`);

    //const initTx = await beaconProxy1.initialize();
    //const receipt = await initTx.wait();
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  