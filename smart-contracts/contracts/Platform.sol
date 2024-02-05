// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./lib/Errors.sol";
import "./IAuthorVerificationBadge.sol";

contract Platform is Ownable {
    
    IAuthorVerificationBadge public verificationBadge;

    uint256 public verifiedAuthorsCount;

    mapping(address => VerifiedAuthor) public addressToVerifiedAuthors;
    mapping(uint256 => EligiblePost) public postIdToPost;
    mapping(uint256 => RequestedPost) public requestedPostIdToRequestedPost;
    mapping(address => mapping(uint256 => bool)) public upvoteStatus;

    struct VerifiedAuthor {
        uint256 sbtId;
        address authorAddress;
        uint256 tippedAmount;
        bool exists;
        uint256[] eligiblePostsIds;
        //uint256 platformBalance;
    }

    VerifiedAuthor[] verifiedAuthors;

    struct RequestedPost {
        uint256 id;
        address requester;
        uint256 stakeAmount;
        uint256 amountReceived;
        address[] patrons;
        bool exists;
        //bool validated;
    }

    RequestedPost[] public requestedPosts;

    struct EligiblePost {
        uint256 id;
        address author;
        uint256 tippedAmount;
        uint256 totalUpvotes;
        bool exists;
    }

    EligiblePost[] public eligiblePosts;

    //--------------------------------------------------------------------
    // EVENTS

    event AuthorVerified(uint256 sbtId, address authorAddress);

    event MonetizedPostCreated(uint256 id, address creator);

    function verifyAccount() external {
        if (addressToVerifiedAuthors[msg.sender].exists) {
            revert Errors.AlreadyVerified(msg.sender);
        }
        //isVerified[msg.sender] = true;
        uint256 sbtId = verificationBadge.safeMint(msg.sender);
        uint256[] memory postIds = new uint256[](0);
        VerifiedAuthor memory _verifiedAuthor = VerifiedAuthor(
            sbtId,
            msg.sender,
            0,
            true,
            postIds
        );
        addressToVerifiedAuthors[msg.sender] = _verifiedAuthor;
        verifiedAuthors.push(_verifiedAuthor);

        emit AuthorVerified(sbtId, msg.sender);
    }

    function setNFTs(address _verificationBadge) public onlyOwner {
        verificationBadge = IAuthorVerificationBadge(_verificationBadge);
    }

    function monetizePost(uint256 _postId, address _author) external {
        EligiblePost memory post = postIdToPost[_postId];
        VerifiedAuthor storage verifiedAuthor = addressToVerifiedAuthors[
            msg.sender
        ];
        if (post.exists) {
            revert Errors.AlreadyEligiblePost(_postId);
        }

        if (!verifiedAuthor.exists) {
            revert Errors.InvalidMember(msg.sender);
        }
        if (msg.sender != _author) {
            revert Errors.UnAuthorizedCaller(msg.sender);
        }

        postIdToPost[_postId] = EligiblePost(_postId, _author, 0, 0, true);
        eligiblePosts.push(postIdToPost[_postId]);
        verifiedAuthor.eligiblePostsIds.push(_postId);

        emit MonetizedPostCreated(_postId, _author);
    }

    function tipPostCreator(uint256 _postId) public payable {
        EligiblePost memory _post = postIdToPost[_postId];
        VerifiedAuthor memory author = addressToVerifiedAuthors[_post.author];
        if (msg.sender == _post.author) {
            revert("You can't tip yourself");
        }

        if (!_post.exists) {
            revert Errors.InEligiblePost(_postId);
        }
        require(msg.value > 0, "Tip amount must be greater than 0");

        payable(_post.author).transfer(msg.value);
        _post.tippedAmount += msg.value;
        author.tippedAmount += msg.value;

        postIdToPost[_postId] = _post;
        addressToVerifiedAuthors[_post.author] = author;
    }

    function upvotePost(uint256 _postId) external {
        VerifiedAuthor memory verifiedAuthor = addressToVerifiedAuthors[
            msg.sender
        ];
        EligiblePost memory post = postIdToPost[_postId];
        bool _upvoteStatus = upvoteStatus[msg.sender][_postId];

        if (!post.exists) {
            revert Errors.InEligiblePost(_postId);
        }

        if (verificationBadge.balanceOf(msg.sender) < 0) {
            revert Errors.InvalidSbtHolder(msg.sender);
        }

        // if (!verifiedAuthor.exists) {
        //     revert Errors.InvalidMember(msg.sender);
        // }

        if (_upvoteStatus) {
            revert Errors.AlreadyUpvotedError();
        }

        _upvoteStatus = true;
        post.totalUpvotes += 1;
        addressToVerifiedAuthors[msg.sender] = verifiedAuthor;
        upvoteStatus[msg.sender][_postId] = _upvoteStatus;
        postIdToPost[_postId] = post;
    }

    function tipCreator(address _author) external payable {
        VerifiedAuthor memory verifiedAuthor = addressToVerifiedAuthors[
            _author
        ];
        if (msg.sender == _author) {
            revert("You can't tip yourself");
        }
        if (!verifiedAuthor.exists) {
            revert Errors.InvalidMember(_author);
        }
        require(msg.value > 0, "Tip amount must be greater than 0");
        payable(_author).transfer(msg.value);

        verifiedAuthor.tippedAmount += msg.value;
        addressToVerifiedAuthors[_author] = verifiedAuthor;
    }

    function requestPost(
        uint256 _requestedPostId,
        uint256 stakeAmount
    ) external payable {
        RequestedPost storage requestedPost = requestedPostIdToRequestedPost[
            _requestedPostId
        ];
        if (requestedPost.exists) {
            revert Errors.PostAlreadyRequested();
        }

        requestedPost.id = _requestedPostId;
        requestedPost.requester = msg.sender;
        requestedPost.stakeAmount = stakeAmount;
        requestedPost.amountReceived += msg.value;
        requestedPost.patrons.push(msg.sender);
        requestedPost.exists = true;
    }

    function tipRequestedPost(uint256 _requestedPostId) external payable {
        RequestedPost storage requestedPost = requestedPostIdToRequestedPost[
            _requestedPostId
        ];

        if (!requestedPost.exists) {
            revert Errors.InvalidRequestedPost();
        }

        requestedPost.amountReceived += msg.value;
        requestedPost.patrons.push(msg.sender);
    }
}
