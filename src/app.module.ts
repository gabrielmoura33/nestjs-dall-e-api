import { Module } from '@nestjs/common';

import { ImageGenerationModule } from './image-generation/image-generation.module';
@Module({
  imports: [ImageGenerationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
