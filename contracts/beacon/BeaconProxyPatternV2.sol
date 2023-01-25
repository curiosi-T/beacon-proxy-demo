// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {VersionAware} from "./VersionAware.sol";

contract BeaconProxyPatternV2 is Initializable, VersionAware {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

   function initialize(string calldata name) external initializer {
        versionAwareContractName = string.concat("Beacon Proxy Pattern: V2, ", name);
    }

    function getContractNameWithVersion()
        public
        view
        override
        returns (string memory)
    {
        return versionAwareContractName;
    }
}
