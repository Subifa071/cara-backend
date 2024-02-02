import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JWTAdminGuard } from '../auth/admin.guard';
import { User } from '../users/entities/user.entity';
import { ActiveUser } from '../utils/User';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JWTAdminGuard)
  @Post('category')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.productsService.createCategory(createCategoryDto);
  }

  @UseGuards(JWTAdminGuard)
  @Get('category')
  async findAllCategories() {
    return await this.productsService.findAllCategories();
  }

  @UseGuards(JWTAdminGuard)
  @Post()
  async create(
    @ActiveUser() user: User,
    @Body() createProductDto: CreateProductDto,
  ) {
    return await this.productsService.createProduct(user, createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productsService.findAllProduct();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOneProduct(id);
  }

  @UseGuards(JWTAdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  @UseGuards(JWTAdminGuard)
  @Delete(':id')
  async remove(@ActiveUser() user: User, @Param('id') id: string) {
    return await this.productsService.removeProduct(user, id);
  }
}
