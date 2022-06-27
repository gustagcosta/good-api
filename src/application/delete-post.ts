import mysql from 'promise-mysql';
import PostRepository from '../domain/repository/post-repository';

type Input = {
  id: number;
};

export default class DeletePost {
  constructor(readonly postRepository: PostRepository) {}

  async execute(input: Input): Promise<void> {
    await this.postRepository.delete(input.id);
  }
}
