import {ApiResponseType} from "./interfaces";
import React from "react";

export const SingleEntryElement = ({
									   membro,
									   isBaseImage,
									   onClick
								   }: { membro: ApiResponseType, isBaseImage: boolean, onClick?: () => void }) => {
	return (
		<section className={"membro"} onClick={onClick}>
			<img
				src={isBaseImage ? process.env?.REACT_APP_CDN_URL + "/" + membro.baseimages[0] : process.env?.REACT_APP_CDN_URL + "/" + membro.relatedimages[0]}
				alt={membro.name}/>
			<pre style={{color: "black", textAlign: "center"}}>{membro.name}</pre>
		</section>
	)
};
