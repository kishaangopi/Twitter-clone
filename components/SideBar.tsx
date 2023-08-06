import React from "react";

import {
	BellIcon,
	HashtagIcon,
	BookOpenIcon,
	CollectionIcon,
	DotsCircleHorizontalIcon,
	MailIcon,
	UserIcon,
	HomeIcon,
	BookmarkIcon,
} from "@heroicons/react/outline";
import SideBarRow from "./SideBarRow";
import { useSession, signIn, signOut } from "next-auth/react";

const SideBar = () => {
	const { data: session } = useSession();
	console.log(session?.user?.image);
	return (
		<div className="col-span-2 flex flex-col items-center md:items-start ">
			<img
				className="h-10 w-10 m-4"
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1200px-Twitter-logo.svg.png"
				alt="twitter logo"
				srcSet="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1200px-Twitter-logo.svg.png"
			/>
			<SideBarRow Icon={HomeIcon} title="Home" />
			<SideBarRow Icon={HashtagIcon} title="Explore" />
			<SideBarRow Icon={BellIcon} title="Notification" />
			<SideBarRow Icon={MailIcon} title="Messages" />
			<SideBarRow Icon={BookmarkIcon} title="Bookmarks" />
			<SideBarRow Icon={CollectionIcon} title="Lists" />
			<SideBarRow
				onClick={session ? signOut : signIn}
				Icon={UserIcon}
				title={session ? "Sign Out" : "Sign In"}
			/>
			<SideBarRow Icon={DotsCircleHorizontalIcon} title="More" />
		</div>
	);
};

export default SideBar;
