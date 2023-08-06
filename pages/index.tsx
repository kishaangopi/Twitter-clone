import type { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import SideBar from "../components/SideBar";
import Feed from "../components/Feed";
import Widget from "../components/Widget";
import Head from "next/head";
import { fetchTweets } from "../utils/fetchTweets";
import { Tweet } from "../typind";
import { Toaster } from "react-hot-toast";

interface Props {
	tweets: Tweet[];
}

const Home = ({ tweets }: Props) => {
	return (
		<div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden ">
			<Head>
				<title>Twitter Clone</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Toaster />
			<main className="grid grid-cols-9">
				<SideBar />
				<Feed tweets={tweets} />
				<Widget />
			</main>
		</div>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
	const tweets = await fetchTweets();
	return {
		props: {
			tweets,
		},
	};
};
