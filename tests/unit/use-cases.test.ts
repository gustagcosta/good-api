import CreatePost from '../../src/application/create-post';
import DeletePost from '../../src/application/delete-post';
import GetPosts from '../../src/application/get-posts';
import MysqlAdapter from '../../src/infra/database/mysql-adapter';
import PostDatabaseRepository from '../../src/infra/repository/post-database-repository';

let idForDelete: number;

const connection = new MysqlAdapter();
const postRepository = new PostDatabaseRepository(connection);

test('should create a new post', async function () {
  const createPost = new CreatePost(postRepository);

  const id = await createPost.execute({
    title: 'teste',
    content: 'testando',
  });

  expect(id).toBeTruthy();

  idForDelete = +id;
});

test('should get all posts', async function () {
  const getAllPosts = new GetPosts(postRepository);

  const posts = await getAllPosts.execute();

  expect(posts).not.toHaveLength(0);
});

test('should delete a post', async function () {
  const deletePost = new DeletePost(postRepository);

  await deletePost.execute({ id: idForDelete });

  await connection.close()
});
