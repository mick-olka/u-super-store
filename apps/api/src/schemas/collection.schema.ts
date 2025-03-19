import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { HydratedDocument } from "mongoose";
import { type I_Locales, getMongoRef, locales } from "./data";
import { Product } from "./product.schema";

export type CollectionDocument = HydratedDocument<Collection>;

interface I_ProductPopulated {
	_id: string;
	name: I_Locales;
	url_name: string;
	price: number;
	old_price: number;
	thumbnail: string;
	index: number;
}

@Schema()
export class Collection {
	@Prop(locales)
	name: I_Locales;

	@Prop({ unique: true })
	url_name: string;

	@Prop(getMongoRef(Product.name, { isArray: true }))
	items: I_ProductPopulated[];

	@Prop({ default: [], type: [String] })
	keywords: string[];

	@Prop({ type: locales, required: false })
	description: I_Locales;

	@Prop({ default: 0, required: false })
	index: number;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
