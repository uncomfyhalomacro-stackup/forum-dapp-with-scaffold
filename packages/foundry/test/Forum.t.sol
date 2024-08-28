// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Test, console} from "forge-std/Test.sol";
import {Forum} from "../src/Forum.sol";

contract ForumTest is Test {
    Forum public forum;
    Forum.Post public post;

    function setUp() public {
        // create dummy address. this will "prank" for a msg.sender address
        vm.prank(address(1));
        string memory _title = "StackUp";
        string memory _description = "Empowering Developers at Scale!";
        string memory _date = "2027-03-03";
        bool _spoil = false;
        forum = new Forum();
        forum.createPost(msg.sender, _title, _description, _date, _spoil);
    }

    function testGetPost() public view {
        Forum.Post[] memory _posts = forum.getPostsFromAddress(msg.sender);
        assertEq(_posts[0].title, "StackUp");
        assertEq(_posts[0].description, "Empowering Developers at Scale!");
        assertEq(_posts[0].date, "2027-03-03");
        assertEq(_posts[0].spoil, false);
    }
}
