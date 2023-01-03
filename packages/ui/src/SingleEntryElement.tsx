import { ApiResponseType } from "./interfaces";
import React from "react";

export const SingleEntryElement = ({
	membro,
	isBaseImage,
	onClick,
}: {
	membro: ApiResponseType;
	isBaseImage: boolean;
	onClick?: () => void;
}) => {
	return (
		<section className={"membro"} onClick={onClick}>
			<img
				src={
					isBaseImage
						? process.env?.REACT_APP_CDN_URL + "/" + membro.baseimages[0]
						: process.env?.REACT_APP_CDN_URL + "/" + membro.relatedimages[0]
				}
				alt={membro.name}
			/>
			<h4
				style={{
					color: "#222",
					fontWeight: "lighter",
					textAlign: "center",
					margin: 0,
					padding: 0,
				}}
			>
				{membro.name}
			</h4>
		</section>
	);
};
