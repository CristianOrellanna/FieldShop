const request = require('supertest');
const app = require('../app');

describe("GET pages", () => {
  test('Deberia responder con un status 200 a la peticion del index', async () => {
    const response = await request(app).get('/').send();
    expect(response.statusCode).toBe(200);
  })

  test('Deberia responder con un status 200 a la peticion del login', async () => {
    const response = await request(app).get('/login').send();
    expect(response.statusCode).toBe(200);
  })

  test('Deberia responder con un status 200 a la peticion del register', async () => {
    const response = await request(app).get('/register').send();
    expect(response.statusCode).toBe(200);
  })

  test('Deberia responder con un status 200 a la peticion del products', async () => {
    const response = await request(app).get('/products').send();
    expect(response.statusCode).toBe(200);
  })

  test('Deberia responder con un status 200 a la peticion del contact', async () => {
    const response = await request(app).get('/contact').send();
    expect(response.statusCode).toBe(200);
  })

  test('Deberia responder con un status 200 a la peticion del us', async () => {
    const response = await request(app).get('/us').send();
    expect(response.statusCode).toBe(200);
  })

  test('Deberia responder con un status 200 a la peticion del logout', async () => {
    const response = await request(app).get('/logout').send();
    expect(response.statusCode).toBe(200);
  })

})


