import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(PORT, () => {
      console.log(`server working on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
