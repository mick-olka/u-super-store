"use client";

import NoImage from "@/app/[lang]/assets/images/no-img.png";
import { Selector } from "@/app/[lang]/components/inputs/selector";
import { Carousel } from "@/app/[lang]/components/ui";
import { globalConfig } from "@/shared/configs/global";
import { useDictionary } from "@/shared/hooks";
import type { I_PhotosBlock } from "@/shared/models";
import Image from "next/image";
import { type ReactNode, useEffect, useState } from "react";

interface I_Props {
	photos: I_PhotosBlock[];
	onSpecificationSelect?: (p: I_PhotosBlock | null) => void;
	defaultPhoto?: string;
}

export const Gallery = ({
	photos,
	onSpecificationSelect,
	defaultPhoto,
}: I_Props) => {
	const isOnlyOneVariant = photos.length < 2;
	const [current, setCurrent] = useState<string | null>(
		isOnlyOneVariant && photos[0] ? photos[0]._id : "all",
	);
	const [photosBlock, setPhotosBlock] = useState<I_PhotosBlock[] | null>(
		photos,
	);
	const dictionary = useDictionary();

	const handleItemSelect = (id: string | null) => {
		if (id === "all") {
			setPhotosBlock(photos);
		} else {
			const item = photos.find((p) => p._id === id);
			setPhotosBlock(item ? [item] : null);
		}
		setCurrent(id);
		onSpecificationSelect?.(id === "all" ? null : photosBlock?.[0] || null);
	};

	const gallery = (): ReactNode[] => {
		if (photosBlock && photosBlock.length > 0) {
			return photosBlock.flatMap((block) =>
				block.path_arr.map((s) => (
					<Image
						key={s}
						alt={s}
						width={640}
						height={640}
						src={`${globalConfig.apiUrl}/upload/${s}`}
						className="object-contain"
					/>
				)),
			);
		}
		return [
			<Image
				key={1}
				alt={"No photo"}
				width={640}
				height={640}
				src={defaultPhoto || NoImage}
				className="object-contain"
			/>,
		];
	};

	useEffect(() => {
		if (current === "all") {
			setPhotosBlock(photos);
		} else {
			setPhotosBlock(
				photos.find((p) => p._id === current)
					? // biome-ignore lint/style/noNonNullAssertion: <explanation>
						[photos.find((p) => p._id === current)!]
					: null,
			);
		}
	}, [photos, current]);

	const list = isOnlyOneVariant
		? photos.map((p) => ({
				name: `${p.main_color.ua} ${p.pill_color.ua}`,
				value: p._id,
			}))
		: [
				{ name: "...", value: "all" },
				...photos.map((p) => ({
					name: `${p.main_color.ua} ${p.pill_color.ua}`,
					value: p._id,
				})),
			];

	return (
		<div className="max-w-lg max-h-lg">
			<Carousel autoSlide={true}>{gallery()}</Carousel>
			<p className="m-2 size-4 font-light">
				{dictionary.product.specification}
			</p>
			<Selector list={list} onItemSelect={handleItemSelect} value={current} />
		</div>
	);
};
