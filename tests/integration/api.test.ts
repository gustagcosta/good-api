import axios from 'axios';

let id: number;

test('testing route POST /posts', async function () {
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

test('testing route GET /posts', async function () {
  const response = await axios({
    url: `http://${process.env.HOST}:${process.env.PORT}/posts`,
    method: 'get',
  });

  expect(response.data).not.toHaveLength(0);
});

test('testing route DELETE /posts/:id', async function () {
  const deleteResponse = await axios({
    url: `http://${process.env.HOST}:${process.env.PORT}/posts/${id}`,
    method: 'delete',
  });

  expect(deleteResponse.status).toBe(200);
});