import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const Widget = () => {
	return (
		<div className="col-span-2 mt-2 px-2 hidden lg:inline">
			<div className="flex items-center p-2 my-2 bg-gray-100 space-x-2 rounded-full">
				<SearchIcon className="h-6 w-6" />
				<input
					type="text"
					className="outline-none bg-transparent flex-1 "
					placeholder="Search Twitter"
				/>
			</div>

			<TwitterTimelineEmbed
				sourceType="profile"
				screenName="elonmusk"
				options={{ height: 1000 }}
			/>
		</div>
	);
};

export default Widget;
