import React, { useRef } from "react";
import {
	CalendarIcon,
	EmojiHappyIcon,
	LocationMarkerIcon,
	PhotographIcon,
	SearchCircleIcon,
} from "@heroicons/react/outline";
import { TweetBody } from "../typind";
import { useSession, signIn, signOut } from "next-auth/react";
import { Tweet } from "../typind";
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
	setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>;
}

const TweetBox = ({ setTweets }: Props) => {
	const { data: session } = useSession();
	const [input, setInput] = React.useState("");
	const [imageBoxOpen, setImageBoxOpen] = React.useState(false);
	const [image, setImage] = React.useState<string>("");
	const imageInputRef = useRef<HTMLInputElement>(null);

	const addImageToTweet = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault;
		if (!imageInputRef.current?.value) {
			return;
		}
		setImage(imageInputRef.current.value);
		console.log(image);
		imageInputRef.current.value = "";
		setImageBoxOpen(false);
	};

	const postTweet = async () => {
		const tweetBody: TweetBody = {
			title: input,
			username: session?.user?.name || "Unknown User",
			profileImage:
				session?.user?.image ||
				"https://www.motorbeam.com/wp-content/uploads/2015-Kawasaki-Ninja-H2R-Wallpaper.jpg",
			image: image,
		};

		const result = await fetch(`/api/addTweet`, {
			body: JSON.stringify(tweetBody),
			method: "POST",
		});
		console.log(result);
		const json = await result.json();
		const newTweets = await fetchTweets();
		console.log(newTweets);
		setTweets(newTweets);
		toast("Tweet Posted", {
			icon: "😁",
		});
	};

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		postTweet();
		setImage("");
		setInput("");
		setImageBoxOpen(false);
	};

	return (
		<div className="flex space-x-4 mt-8 px-4 mb-2">
			<div>
				<img
					className="h-14 w-14 rounded-full object-cover bg-black"
					src={
						session?.user?.image ||
						"https://www.libera.fi/wp-content/uploads/2019/02/blank-profile-picture-973460__480.png"
					}
					alt=""
				/>
			</div>
			<div className="w-full">
				<form action="">
					<input
						value={input}
						onChange={(e) => {
							setInput(e.target.value);
						}}
						type="text"
						placeholder="What's Happening"
						className="h-12 w-full outline-none text-xl placeholder:text-gray-400"
					/>
					<div className="flex justify-between items-center">
						<div className="flex w-32 mt-4 text-twitter gap-1">
							<PhotographIcon
								onClick={() => {
									setImageBoxOpen(!imageBoxOpen);
								}}
								className="h-5 w-5 transition-all duration-100 ease-out hover:scale-150"
							/>
							<SearchCircleIcon className="h-5 w-5" />
							<EmojiHappyIcon className="h-5 w-5" />
							<CalendarIcon className="h-5 w-5" />
							<LocationMarkerIcon className="h-5 w-5" />
						</div>

						<button
							onClick={handleSubmit}
							disabled={!input}
							type="submit"
							className="px-6 py-2 bg-twitter rounded-full text-white font-bold disabled:opacity-40"
						>
							Tweet
						</button>
					</div>
					{imageBoxOpen && (
						<form
							action="
						"
							className="mt-2 rounded-lg bg-twitter py-4 px-4 flex justify-between"
						>
							<input
								ref={imageInputRef}
								type="text"
								className="rounded-sm bg-transparent text-white flex-1 mx-4 outline-none placeholder:text-white"
								placeholder="Enter Image URL..."
							/>
							<button
								type="submit"
								onClick={addImageToTweet}
								className="text-white"
							>
								Add Image
							</button>
						</form>
					)}
				</form>
				{image && (
					<img
						className="mt-4 rounded-xl shadow-xl object-contain"
						src={image}
						alt=""
					/>
				)}
			</div>
		</div>
	);
};

export default TweetBox;
