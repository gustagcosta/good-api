import Post from "../entity/post";

export default interface PostRepository {
  save(post: Post): Promise<number>;
  get(): Promise<Post[]>;
  delete(id: number): Promise<void>;
}
