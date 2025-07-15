import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as xslt4node from 'xslt4node';

@Injectable()
export class TransformService {
  transform(): Promise<string> {
    const xmlPath = path.join(process.cwd(), 'src', 'file', 'ublSablon.xml');
    const xsltPath = path.join(process.cwd(), 'src', 'file', 'atasun.xslt');

    return new Promise((resolve, reject) => {
      xslt4node.transform(
        {
          xsltPath,
          sourcePath: xmlPath,
          result: String, // sonucu string olarak alınıyor..
        },
        (err: any, result: any) => {
          if (err) reject(err);
          else resolve(result);
        },
      );
    });
  }
}
