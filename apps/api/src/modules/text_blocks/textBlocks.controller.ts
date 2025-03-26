import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import type { TextBlock } from "src/schemas/text_block.schema";
import { NotFoundInterceptor } from "src/utils/injectables";
import type { CreateTextBlockDto } from "./dto/create-textBlock.dto";
import type { UpdateTextBlockDto } from "./dto/update-textBlock.dto";
// biome-ignore lint/style/useImportType: <explanation>
import { TextBlocksService } from "./textBlocks.service";

@ApiBearerAuth()
@ApiTags("Text_Blocks")
@Controller("text_blocks")
@UseInterceptors(NotFoundInterceptor)
export class TextBlocksController {
	constructor(private readonly textBlocksService: TextBlocksService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Successfully fetched text_blocks.",
	})
	async findAll(): Promise<TextBlock[]> {
		return this.textBlocksService.findAll();
	}

	@Get(":id")
	@HttpCode(HttpStatus.OK)
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Successfully fetched text_block.",
	})
	getTodoById(@Param("id") id: string): Promise<TextBlock> {
		return this.textBlocksService.findOne(id);
	}

	@Post()
	// @UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.CREATED)
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "Successfully created text_block.",
	})
	@ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden." })
	async create(@Body() data: CreateTextBlockDto) {
		return this.textBlocksService.create(data);
	}

	@Patch(":id")
	@UseGuards(AuthGuard("jwt"))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Successfully updated text_block.",
	})
	@ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden." })
	async update(@Param("id") id: string, @Body() data: UpdateTextBlockDto) {
		return this.textBlocksService.update(id, data);
	}

	@Delete(":id")
	@UseGuards(AuthGuard("jwt"))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Successfully deleted text_block.",
	})
	@ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden." })
	async delete(@Param("id") id: string) {
		return this.textBlocksService.delete(id);
	}
}
