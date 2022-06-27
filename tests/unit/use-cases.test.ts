import CreatePost from '../../src/application/create-post';
import DeletePost from '../../src/application/delete-post';
import GetPosts from '../../src/application/get-posts';
import PostDatabaseRepository from '../../src/infra/repository/post-database-repository';

let idForDelete: number;

test('should create a new post', async function () {
  const postRepository = new PostDatabaseRepository();
  const createPost = new CreatePost(postRepository);

  const id = await createPost.execute({
    title: 'teste',
    content: 'testando',
  });

  expect(id).toBeTruthy();

  idForDelete = +id;
});

test('should get all posts', async function () {
  const postRepository = new PostDatabaseRepository();
  const getAllPosts = new GetPosts(postRepository);

  const posts = await getAllPosts.execute();

  expect(posts).not.toHaveLength(0);
});

test('should delete a post', async function () {
  const postRepository = new PostDatabaseRepository();
  const deletePost = new DeletePost(postRepository);

  await deletePost.execute({ id: idForDelete });
});
