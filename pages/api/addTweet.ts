// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { TweetBody } from "../../typind";

type Data = {
	name: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const data: TweetBody = JSON.parse(req.body);
	const mutations = {
		mutations: [
			{
				create: {
					_type: "tweet",
					title: data.title,
					username: data.username,
					blockTweet: false,
					profileImage: data.profileImage,
					image: data.image,
				},
			},
		],
	};

	const result = await fetch(
		`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
		{
			method: "post",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
			},
			body: JSON.stringify(mutations),
		}
	);
	const json = await result.json();
	console.log("hii");
	res.status(200).json({ name: "John Doe" });
}
