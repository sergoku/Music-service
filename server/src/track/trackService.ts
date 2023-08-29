import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schems/track.schema';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schems/comments.schema';
import { CreateTrackDto } from './dto/createTrack.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/createComment.dto';
import { FileService, FileType } from '../file/file.service';
@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}
  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    return track;
  }
  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(offset).limit(count);
    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }

  async search(nameOfSong: string): Promise<Track[]> {
    const tracks = await this.trackModel
      .find({
        name: { $regex: `^${nameOfSong}`, $options: 'i' },
      })
      .populate('comments');
    return tracks;
  }

  async delete(id: ObjectId): Promise<Track> {
    const deletedTrack = await this.trackModel.findByIdAndDelete(id);
    return deletedTrack;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment._id as unknown as Comment);
    await track.save();
    return comment;
  }
  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }
}
