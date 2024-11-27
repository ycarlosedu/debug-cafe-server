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
  CreateCategoryDto,
  createCategorySchema,
  UpdateCategoryDto,
  updateCategorySchema,
} from './category.dto';
import { CategoryService } from './category.service';
import { OnlyManager, Public } from 'src/constants';
import { UserToken } from 'src/auth/auth.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  private readonly logger = new Logger(CategoryController.name);

  @Public()
  @Get()
  getAllCategories() {
    return this.categoryService.findAll();
  }

  @Public()
  @Get('/:id')
  getCategoryById(@Param('id') id: string) {
    return this.categoryService.findOne({
      where: { id },
    });
  }

  @OnlyManager()
  @Post()
  @UsePipes(new ZodValidationPipe(createCategorySchema))
  async createCategory(
    @Body() categoryData: CreateCategoryDto,
    @Session() userSession: UserToken,
  ) {
    const category = await this.categoryService.createCategory(categoryData);
    this.logger.log(
      `Categoria criada: ${category.name}, por: ${userSession.email}`,
    );

    return {
      category,
      message: 'Categoria adicionada com sucesso!',
    };
  }

  @OnlyManager()
  @UsePipes(new ZodValidationPipe(updateCategorySchema))
  @Put()
  updateCategory(
    @Body() categoryData: UpdateCategoryDto,
    @Session() userSession: UserToken,
  ) {
    this.categoryService.updateCategory({
      where: { id: categoryData.id },
      data: categoryData,
    });
    this.logger.log(
      `Categoria atualizada: ${categoryData.name}, por: ${userSession.email}`,
    );

    return {
      category: categoryData,
      message: 'Categoria atualizada com sucesso!',
    };
  }
}
