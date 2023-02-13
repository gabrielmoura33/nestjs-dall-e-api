import { Body, Controller, Param, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  IImageGenerationProps,
  ImageGenerationService,
} from 'src/interfaces/image-generation';

@Controller('image-generation')
export class ImageGenerationController {
  constructor(private imageGenerationService: ImageGenerationService) {}
  @Post('/')
  async generateSingleImage(@Body() params: IImageGenerationProps) {
    const userUuid = randomUUID();

    await this.imageGenerationService.generateSingleImage({
      ...params,
      userUuid,
    });
  }

  @Post('/generate-variation/:source')
  async generateImageVariation(@Param() source: string) {
    //Implement Image variation
  }
}
