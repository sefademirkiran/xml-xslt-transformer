import { Controller, Get, Res } from '@nestjs/common';
import { TransformService } from './transform.service';
import { Response } from 'express';

@Controller('transform')
export class TransformController {
  constructor(private readonly transformService: TransformService) { }

  @Get('html')
  async getHtml(@Res() res: Response) {
    const html = await this.transformService.transform();
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }

}
