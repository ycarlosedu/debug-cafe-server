import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Session,
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
import { UserToken } from 'src/auth/auth.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  private readonly logger = new Logger(ProductController.name);

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
  async createProduct(
    @Body() productData: CreateProductDto,
    @Session() userSession: UserToken,
  ) {
    const product = await this.productService.createProduct(productData);

    this.logger.log(
      `Produto criado: ${product.name}, por ${userSession.email}`,
    );

    return {
      product,
      message: 'Produto criado com sucesso!',
    };
  }

  @OnlyManager()
  @UsePipes(new ZodValidationPipe(updateProductSchema))
  @Put()
  async updateProduct(
    @Body() productData: UpdateProductDto,
    @Session() userSession: UserToken,
  ) {
    const product = await this.productService.updateProduct({
      where: { id: productData.id },
      data: productData,
    });

    this.logger.log(
      `Produto ${product.name} atualizado por ${userSession.email}`,
    );

    return {
      product,
      message: 'Produto atualizado com sucesso!',
    };
  }
}
