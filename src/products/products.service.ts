import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(user: User, createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: createProductDto.category,
      },
    });

    const product = await this.productRepository.save({
      category: category,
      name: createProductDto.name,
      description: createProductDto.description,
      imageUrl: createProductDto.imageUrl,
      price: createProductDto.price,
      inStock: createProductDto.inStock,
      owner: {
        id: user.id,
      },
    } as any);

    return product;
  }

  async findAllProduct() {
    return this.productRepository.find({
      relations: ['category'],
    });
  }

  async findOneProduct(id: string) {
    return await this.productRepository.findOne({
      where: {
        id,
      },
      relations: ['category'],
    });
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: ['category'],
    });

    if (!product) {
      throw new BadRequestException('No such product');
    }

    if (updateProductDto.category) {
      const category = await this.categoryRepository.findOne({
        where: {
          id: updateProductDto.category,
        },
      });

      // updating category
      if (product.category.id !== updateProductDto.category) {
        await this.productRepository.update(
          { id: id },
          {
            category: {
              id: updateProductDto.category,
            },
          },
        );
      }
    }

    const { category, ..._updateProductDto } = updateProductDto;

    await this.productRepository.update(
      {
        id: id,
      },
      {
        ..._updateProductDto,
      },
    );

    return await this.productRepository.findOne({
      where: {
        id,
      },
      relations: ['category'],
    });
  }

  async removeProduct(user: User, id: string) {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
        owner: {
          id: user.id,
        },
      },
    });

    if (!product) {
      throw new NotFoundException();
    }

    await this.productRepository.delete({
      id: id,
    });

    return { deleted: true };
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save({
      name: createCategoryDto.name,
    });
  }

  async findAllCategories() {
    return await this.categoryRepository.find({});
  }
}
