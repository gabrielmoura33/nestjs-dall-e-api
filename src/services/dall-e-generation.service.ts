import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { writeFileSync } from 'fs';
import * as path from 'node:path';
import { Configuration, OpenAIApi } from 'openai';
import {
  IImageGenerationProps,
  ImageGenerationService,
} from 'src/interfaces/image-generation';
@Injectable()
export class DallEImageGenerationService implements ImageGenerationService {
  private OpenAiAuthToken: string;
  private OpenAiConfiguration: Configuration;
  constructor(private configService: ConfigService) {
    this.OpenAiAuthToken = this.configService.get('OPEN_AI_AUTH_KEY');
    this.OpenAiConfiguration = new Configuration({
      apiKey: this.OpenAiAuthToken,
    });
  }

  async generateSingleImage({
    prompt,
    numberOfImages,
    userUuid,
    size,
  }: IImageGenerationProps): Promise<void> {
    const OpenAiClient = new OpenAIApi(this.OpenAiConfiguration);

    try {
      const response = await OpenAiClient.createImage({
        prompt,
        n: numberOfImages,
        size,
      });

      const imageUrl = response.data.data[0].url || null;

      if (imageUrl) {
        const imgResult = await fetch(imageUrl);

        const blob = await imgResult.blob();
        const buffer = Buffer.from(await blob.arrayBuffer());

        writeFileSync(
          `${path.resolve(__dirname, '..', 'tmp')}/${Date.now()}.png`,
          buffer,
        );
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  regenerateImage(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  editImage(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
