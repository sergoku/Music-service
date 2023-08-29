import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Track } from './track.schema';
import * as mongoose from 'mongoose';
export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  userName: string;
  @Prop()
  text: string;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Track' })
  trackId: Track;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
