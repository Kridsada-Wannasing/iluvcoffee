import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // เฉพาะตัว property ที่มีอยู่ตามรูปแบบของ dto เท่านั้น
      forbidNonWhitelisted: true, // throw error ออกไป ถ้ามี property ที่ไม่ตรงกันกับ dto
      transform: true, // แปลง payload ที่ส่งเข้ามาจาก client ให้เป็น instance ของ dto ตัวนั้น
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
