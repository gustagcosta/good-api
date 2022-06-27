import Post from '../domain/entity/post';
import PostRepository from '../domain/repository/post-repository';

export default class GetPosts {
  constructor(readonly postRepository: PostRepository) {}

  async execute(): Promise<Post[]> {
    return this.postRepository.get();
  }
}
