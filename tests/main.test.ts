import axios from 'axios';

let id: number;

test('should create a new post', async function () {
  const response = await axios({
    url: `http://${process.env.HOST}:${process.env.PORT}/posts`,
    method: 'post',
    data: {
      title: 'test',
      content: 'a new post',
    },
  });

  expect(response.status).toBe(201);

  id = response.data.id;
});

test('should get all posts', async function () {
  const response = await axios({
    url: `http://${process.env.HOST}:${process.env.PORT}/posts`,
    method: 'get',
  });

  expect(response.data).toHaveLength(1);
});

test('should delete a post', async function () {
  const deleteResponse = await axios({
    url: `http://${process.env.HOST}:${process.env.PORT}/posts/${id}`,
    method: 'delete',
  });

  expect(deleteResponse.status).toBe(200);
});
