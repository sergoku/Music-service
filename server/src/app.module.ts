import { Module } from '@nestjs/common';
import { TrackModule } from './track/trackModule';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TrackModule,
    FileModule,

    MongooseModule.forRoot(
      'mongodb+srv://123:123@musicplayer.0lzi9vx.mongodb.net/?retryWrites=true&w=majority',
    ),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
  ],
})
export class AppModule {}
