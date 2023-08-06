import React from "react";
import { SVGProps } from "react";

interface Props {
	Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
	title: string;
	onClick?: () => {};
}

const SideBarRow = ({ Icon, title, onClick }: Props) => {
	return (
		<div
			onClick={() => onClick?.()}
			className="flex items-center px-4 py-3 rounded-full hover:bg-gray-100 cursor-pointer max-w-fit transition-all duration-200 group "
		>
			<Icon className="h-6 w-6 mr-2" />
			<p className="group-hover:text-twitter hidden md:inline-flex font-light text-base lg:text-lg">
				{title}
			</p>
		</div>
	);
};

export default SideBarRow;
