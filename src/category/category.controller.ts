import { Body, Controller, Get, Post, Put, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zodValidation';
import {
  CreateCategoryDto,
  createCategorySchema,
  UpdateCategoryDto,
  updateCategorySchema,
} from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.findAll();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createCategorySchema))
  createCategory(@Body() categoryData: CreateCategoryDto) {
    this.categoryService.createCategory(categoryData);

    return {
      category: categoryData,
    };
  }

  @UsePipes(new ZodValidationPipe(updateCategorySchema))
  @Put()
  updateCategory(@Body() categoryData: UpdateCategoryDto) {
    this.categoryService.updateCategory({
      where: { id: categoryData.id },
      data: categoryData,
    });

    return {
      category: categoryData,
      message: 'Categoria atualizada com sucesso!',
    };
  }
}
