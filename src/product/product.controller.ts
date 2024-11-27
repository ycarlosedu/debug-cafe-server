import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zodValidation';
import {
  CreateProductDto,
  createProductSchema,
  SearchProductDto,
  searchProductSchema,
  UpdateProductDto,
  updateProductSchema,
} from './product.dto';
import { ProductService } from './product.service';
import { OnlyManager, Public } from 'src/constants';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get()
  getAllProducts() {
    return this.productService.findAll();
  }

  @Public()
  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.findOne({
      where: { id },
    });
  }

  @Public()
  @Post('/search')
  @UsePipes(new ZodValidationPipe(searchProductSchema))
  getProductByName(@Body() search: SearchProductDto) {
    return this.productService.findAll({
      where: {
        AND: {
          name: { contains: search.name },
          categories: {
            some: {
              productCategoryId: { equals: search.category },
            },
          },
        },
        OR: [
          {
            name: { contains: search.name },
          },
        ],
      },
    });
  }

  @OnlyManager()
  @Post()
  @UsePipes(new ZodValidationPipe(createProductSchema))
  async createProduct(@Body() productData: CreateProductDto) {
    const product = await this.productService.createProduct(productData);

    return {
      product,
      message: 'Produto criado com sucesso!',
    };
  }

  @OnlyManager()
  @UsePipes(new ZodValidationPipe(updateProductSchema))
  @Put()
  async updateProduct(@Body() productData: UpdateProductDto) {
    const product = await this.productService.updateProduct({
      where: { id: productData.id },
      data: productData,
    });

    return {
      product,
      message: 'Produto atualizado com sucesso!',
    };
  }
}
