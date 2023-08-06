import { type } from "os";

export interface Tweet extends TweetBody {
	_id: string;
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	_type: "tweet";
	blockTweet: boolean;
}

export type TweetBody = {
	title: string;
	profileImage: string;
	username: string;
	image: string;
};

export type CommentBody = {
	comment: string;
	tweetId: string;
	username: string;
	profileImage: string;
};

export interface Comment extends CommentBody {
	_createdAt: string;
	_id: string;
	_rev: string;
	_type: "comment";
	_updatedAt: string;
	tweet: {
		_ref: string;
		_type: "reference";
	};
}
