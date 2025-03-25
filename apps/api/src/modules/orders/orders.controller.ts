import {
    Controller,
    Get,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Param,
    Delete,
    Patch,
    Query,
    UseGuards,
    UseInterceptors,
    BadRequestException,
    Req,
  } from "@nestjs/common";
  import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
  import { CreateOrderDto } from "./dto/create-order.dto";
  import { UpdateOrderDto } from "./dto/update-order.dto";
  import { OrdersService } from "./orders.service";
  import { Order } from "src/schemas/order.schema";
  import { PromisePaginationResT } from "src/utils/interfaces";
  import mongoose from "mongoose";
  import { AuthGuard } from "@nestjs/passport";
  import { NotFoundInterceptor } from "src/utils/injectables";
  import { IsAdminGuard } from "../auth/auth.guard";
  import { ReqWithUser } from "src/schemas/user.schema";
  
  type OrderI = Order & { _id: mongoose.Types.ObjectId };
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiTags("Orders")
  @Controller("orders")
  @UseInterceptors(NotFoundInterceptor)
  export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}
  
    @Get()
    @UseGuards(IsAdminGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
      status: HttpStatus.OK,
      description: "Successfully fetched orders.",
    })
    @ApiQuery({
      name: "page",
      type: String,
      description: "Orders page",
      example: "1",
      required: false,
    })
    @ApiQuery({
      name: "limit",
      type: String,
      description: "Orders limit",
      example: "3",
      required: false,
    })
    @ApiQuery({
      name: "regex",
      type: String,
      description: "Orders search",
      required: false,
    })
    async findAll(
      @Query("page") page: string,
      @Query("limit") limit: string,
      @Query("regex") regex: string
    ): PromisePaginationResT<OrderI> {
      if (Number(page) > 0 && Number(limit) > 0)
        return this.ordersService.findAll({ page, limit, regex });
      throw new BadRequestException();
    }
  
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
      status: HttpStatus.OK,
      description: "Successfully fetched order.",
    })
    getTodoById(@Param("id") id: string): Promise<OrderI> {
      return this.ordersService.findOne(id);
    }
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
      status: HttpStatus.CREATED,
      description: "Successfully created order.",
    })
    async create(
      @Req() req: ReqWithUser,
      @Body() data: CreateOrderDto
    ): Promise<OrderI> {
      const userId = req.user.sub;
      return this.ordersService.create(data, userId);
    }
  
    @Patch(":id")
    @UseGuards(IsAdminGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
      status: HttpStatus.OK,
      description: "Successfully updated order.",
    })
    async update(
      @Param("id") id: string,
      @Body() data: UpdateOrderDto
    ): Promise<OrderI> {
      return this.ordersService.update(id, data);
    }
  
    @Delete(":id")
    @UseGuards(IsAdminGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
      status: HttpStatus.OK,
      description: "Successfully deleted order.",
    })
    async delete(
      @Req() req: ReqWithUser,
      @Param("id") id: string
    ): Promise<OrderI> {
      return this.ordersService.delete(id, req.user.sub);
    }
  }