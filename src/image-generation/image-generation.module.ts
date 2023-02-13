import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageGenerationService } from 'src/interfaces/image-generation';
import { DallEImageGenerationService } from 'src/services/dall-e-generation.service';
import { ImageGenerationController } from './image-generation.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: ImageGenerationService,
      useClass: DallEImageGenerationService,
    },
  ],
  controllers: [ImageGenerationController],
})
export class ImageGenerationModule {}
