import React from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import { Tweet } from "../typind";
import TweetBox from "./TweetBox";
import TweetComponent from "./TweetComponent";
import { fetchTweets } from "../utils/fetchTweets";
import toast, { Toaster } from "react-hot-toast";

interface Props {
	tweets: Tweet[];
}
const Feed = ({ tweets: tweetProp }: Props) => {
	const [tweets, setTweets] = React.useState<Tweet[]>(tweetProp);
	const refresh = async () => {
		const refreshToast = toast.loading("Refreshing ...");
		const tweets = await fetchTweets();
		setTweets(tweets);
		toast.success("Feed Updated", { id: refreshToast });
	};
	return (
		<div className="col-span-7 lg:col-span-5 border-x max-h-screen overflow-y-scroll scrollbar-hide">
			<div className="flex items-center justify-between ">
				<h1 className="p-5 text-xl font-bold pb-0">Home</h1>
				<RefreshIcon
					onClick={refresh}
					className="w-8 h-8 mr-5 mt-5  text-twitter cursor-pointer  hover:rotate-180 transform-all ease-out duration-500 active:scale-125"
				/>
			</div>
			<TweetBox setTweets={setTweets} />
			<div className="">
				{tweets.map((tweet) => (
					<TweetComponent key={tweet._id} tweet={tweet} />
				))}
			</div>
		</div>
	);
};

export default Feed;
