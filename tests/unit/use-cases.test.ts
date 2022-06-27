import CreatePost from '../../src/use-cases/create-post';
import DeletePost from '../../src/use-cases/delete-post';
import GetPosts from '../../src/use-cases/get-posts';

let idForDelete: number;

test('should create a new post', async function () {
  const createPost = new CreatePost();

  const { id } = await createPost.execute({
    title: 'teste',
    content: 'testando',
  });

  expect(id).toBeTruthy();

  idForDelete = +id;
});

test('should get all posts', async function () {
  const getAllPosts = new GetPosts();

  const posts = await getAllPosts.execute();

  expect(posts).toHaveLength(1);
});

test('should delete a post', async function () {
  const deletePost = new DeletePost();

  await deletePost.execute({ id: idForDelete });
});
