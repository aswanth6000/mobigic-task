import request from 'supertest';
import { app } from '../../../app';

it('fails when a username that does not exist is supplied', async () => {
  await request(app)
    .post('/login')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(401);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/register')
    .send({
      email: 'test@test.com',
      username: 'test',
      password: 'password',
      confirmpassword: 'password'
    })
    .expect(200);

  await request(app)
    .post('/login')
    .send({
      email: 'test@test.com',
      password: 'aslkdfjalskdfj',
    })
    .expect(401);
});

it('should authenticate and return a token', async () => {
    await request(app)
    .post('/register')
    .send({
      email: 'test@test.com',
      username: 'test',
      password: 'password',
      confirmpassword: 'password'
    })
    .expect(200);
    
  const response = await request(app)
    .post('/login')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);
    expect(response.body.token).toBeDefined();
}, 10000);
