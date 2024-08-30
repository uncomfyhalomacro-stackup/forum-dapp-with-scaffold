// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";

contract AbiExportScript is Script {
    function run() external {
        writeScriptToFrontend();
    }

    function writeScriptToFrontend() public {
        // Path is relative to foundry project root
        string memory forumJsonFile = vm.readFile("./out/Forum.sol/Forum.json");
        vm.writeFile("../forum/src/contracts/Forum.json", forumJsonFile);
    }
}
