import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Photos, PhotosSchema } from "src/schemas/photos.schema";
import { PhotosController } from "./photos.controller";
import { PhotosService } from "./photos.service";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Photos.name, schema: PhotosSchema }]),
	],
	controllers: [PhotosController],
	providers: [PhotosService],
	exports: [],
})
export class PhotosModule {}
