export default {
	name: "tweet",
	title: "Tweet",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Text in tweet",
			type: "string",
		},
		{
			name: "blockTweet",
			title: "Block Tweet",
			description: "ADMIN Controls: Toggle if tweet is deemed inappropriate.",
			type: "boolean",
		},
		{
			name: "username",
			title: "Username",
			type: "string",
		},
		{
			name: "profileImage",
			title: "Profile image",
			type: "string",
		},

		{
			name: "image",
			title: "Tweet Image",
			type: "string",
		},
	],
};
