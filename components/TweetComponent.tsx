import React from "react";
import { CommentBody, Tweet, TweetBody } from "../typind";
import TimeAgo from "react-timeago";
import {
	ChatAlt2Icon,
	HeartIcon,
	SwitchHorizontalIcon,
	UploadIcon,
} from "@heroicons/react/outline";
import { fetchComments } from "../utils/fetchComments";
import { Comment } from "../typind";
import { useSession, signIn, signOut } from "next-auth/react";
import toast from "react-hot-toast";

interface Props {
	tweet: Tweet;
}
const TweetComponent = ({ tweet }: Props) => {
	const { data: session } = useSession();
	const [comments, setComments] = React.useState<Comment[]>([]);
	const [commentBoxOpen, setCommandBoxOpen] = React.useState<boolean>(false);
	const [newComment, setNewComment] = React.useState("");

	const refreshComments = async () => {
		const comments: Comment[] = await fetchComments(tweet._id);
		setComments(comments);
	};
	React.useEffect(() => {
		refreshComments();
	}, []);

	const postComment = async () => {
		const commentInfo: CommentBody = {
			profileImage:
				session?.user?.image ||
				"https://www.motorbeam.com/wp-content/uploads/2015-Kawasaki-Ninja-H2R-Wallpaper.jpg",
			comment: newComment,
			username: session?.user?.name || "Unknown User",
			tweetId: tweet._id,
		};

		const result = await fetch(`/api/addComment`, {
			body: JSON.stringify(commentInfo),
			method: "POST",
		});
		const json = await result.json();
		const updatedComments = await fetchComments(tweet._id);
		setComments(updatedComments);
		console.log(updatedComments);
		toast("Comment Added", {
			icon: "😁",
		});
	};

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		postComment();
		setNewComment("");
		setCommandBoxOpen(false);
	};

	return (
		<div className="flex flex-col border-y border-gray-100 p-4">
			<div className="flex space-x-3 items-start">
				<img
					src={tweet.profileImage}
					alt=""
					className="h-10 w-10 rounded-full object-cover"
				/>
				<div>
					<div className="flex items-center">
						<p className="font-bold mr-2">{tweet.username}</p>
						<p className="hidden sm:inline text-sm text-gray-500 mr-1">
							@{tweet.username.replace(/\s+/g, "").toLowerCase()}
						</p>

						<TimeAgo
							className="text-sm text-gray-400"
							date={tweet._createdAt}
						/>
					</div>
					<p className="pb-3">{tweet.title}</p>
					{tweet.image && (
						<img
							src={tweet.image}
							alt=""
							className="w-10/12 rounded-lg mx-auto shadow-md mb-1 w-"
						/>
					)}
				</div>
			</div>
			<div className="flex items-center justify-between p-3">
				<div className="flex space-x-2 items-center">
					<ChatAlt2Icon
						className="h-5 w-5 text-gray-500 cursor-pointer"
						onClick={() => setCommandBoxOpen(!commentBoxOpen)}
					/>
					<p>{comments.length}</p>
				</div>
				<SwitchHorizontalIcon className="h-5 w-5 text-gray-500 cursor-pointer" />
				<HeartIcon className="h-5 w-5 text-gray-500 cursor-pointer" />
				<UploadIcon className="h-5 w-5 text-gray-500 cursor-pointer" />
			</div>
			{commentBoxOpen && session?.user && (
				<form action="" className="flex items-center justify-between mx-1">
					<input
						value={newComment}
						onChange={(e) => {
							setNewComment(e.target.value);
						}}
						type="text"
						placeholder="Add a comment..."
						className=" flex-1 mr-2 bg-slate-100 px-2 py-2
						rounded-md outline-none"
					/>
					<button type="submit" onClick={handleSubmit}>
						Post
					</button>
				</form>
			)}
			{comments.length > 0 && (
				<div className="mt-5 my-2 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5 scrollbar-hide">
					{comments.map((comment) => (
						<div key={comment._id} className="flex space-x-2 relative">
							<hr className="absolute left-5 top-10 border-x border-twitter/30 h-8" />
							<img
								src={comment.profileImage}
								alt=""
								className="h-7 w-7 rounded-full object-cover mt-2"
							/>
							<div>
								<div className="flex items-center space-x-1">
									<p className="font-bold">{comment.username}</p>
									<p className="hidden text-sm text-gray-500 md:inline">
										@{comment.username.replace(/\s+/g, "").toLowerCase()}
									</p>
									<TimeAgo
										className="text-sm text-gray-400"
										date={comment._createdAt}
									/>
								</div>
								<p>{comment.comment}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default TweetComponent;
