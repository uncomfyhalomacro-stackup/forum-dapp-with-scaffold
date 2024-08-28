// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Forum {
    // declare constructs for post
    struct Post {
        string title;
        string description;
        string date;
        bool spoil;
    }

    // Rule 1: a user can own multiple posts. so each of the
    // users are mapped to a list of posts that they made
    mapping(address => Post[]) public _posts;

    event PostSubmitted(address userAddress, Post post);

    function createPost(
        address userAddress,
        string memory _title,
        string memory _description,
        string memory _date,
        bool _spoil
    ) public {
        Post memory new_post = Post({title: _title, description: _description, date: _date, spoil: _spoil});
        _posts[userAddress].push(new_post);
        emit PostSubmitted(userAddress, new_post);
    }

    function getPostsFromAddress(address userAddress) public view returns (Post[] memory) {
        return _posts[userAddress];
    }
}
