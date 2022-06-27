import Post from '../domain/entity/post';
import PostRepository from '../domain/repository/post-repository';

type Input = {
  title: string;
  content: string;
};

export default class CreatePost {
  constructor(readonly postRepository: PostRepository) {}

  async execute(input: Input): Promise<number> {
    return await this.postRepository.save(new Post(input.title, input.content));
  }
}
