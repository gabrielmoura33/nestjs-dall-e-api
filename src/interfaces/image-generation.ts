import { CreateImageRequestSizeEnum } from 'openai';

export interface IImageGenerationProps {
  prompt: string;
  numberOfImages: number;
  size: CreateImageRequestSizeEnum;
  userUuid: string;
}
export abstract class ImageGenerationService {
  abstract generateSingleImage(props: IImageGenerationProps): Promise<void>;
  abstract regenerateImage(): Promise<void>;
  abstract editImage(): Promise<void>;
}
