import { TrackController } from './trackController';
import { Module } from '@nestjs/common';
import { TrackService } from './trackService';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from './schems/track.schema';
import { Comment, CommentSchema } from './schems/comments.schema';
import { FileService } from '../file/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [TrackController],
  providers: [TrackService, FileService],
})
export class TrackModule {}
