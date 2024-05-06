const request = require('supertest');
const app = require('../app');

describe("POST pages", () => {

  test('Deberia responder con un status 200 al ingresar los datos en formulario register', async () => {
    const usuarioNuevo = {
      user: 'testUser',
      name: 'testName',
      rol: 'testRol',
      pass: 'testPass',
      sexo: 'testSexo',
      region: 'testRegion',
      comuna: 'testComuna',
      direccion: 'testDireccion'
    };
    const response = await request(app).post('/register').send(usuarioNuevo);
    expect(response.statusCode).toBe(200);
  })

  test('Deberia responder con un status 200 al ingresar los datos en login', async () => {
    const usuarioRegistrado = {
      user: 'testUser',
      pass: 'testPass',
    };
    const response = await request(app).post('/login').send(usuarioRegistrado);
    expect(response.statusCode).toBe(200);
  })

})
