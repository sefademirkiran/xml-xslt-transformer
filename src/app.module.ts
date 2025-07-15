import { Module } from '@nestjs/common';
import { TransformService } from './transform/transform.service';
import { TransformController } from './transform/transform.controller';

@Module({
  imports: [],
  controllers: [TransformController],
  providers: [TransformService],
})
export class AppModule {}
