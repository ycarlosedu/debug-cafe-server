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
  UpdateProductDto,
  updateProductSchema,
} from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.findAll();
  }

  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.findOne({
      where: { id },
    });
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createProductSchema))
  createProduct(@Body() productData: CreateProductDto) {
    this.productService.createProduct(productData);

    return {
      product: productData,
    };
  }

  @UsePipes(new ZodValidationPipe(updateProductSchema))
  @Put()
  updateProduct(@Body() productData: UpdateProductDto) {
    this.productService.updateProduct({
      where: { id: productData.id },
      data: productData,
    });

    return {
      product: productData,
      message: 'Produto atualizado com sucesso!',
    };
  }
}
