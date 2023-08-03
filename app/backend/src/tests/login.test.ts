import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Tests', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  it('return an error if no password credentials are sent to login route', async function() {
    chaiHttpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "All fields must be filled"})
  });

  it('return an error if no email credentials are sent to login route', async function() {
    chaiHttpResponse = await chai.request(app).post('/login').send({ password: 'admin' });

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "All fields must be filled"})
  });

  it('return token if all credentials are sent to login route', async function() {
    chaiHttpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token')
  });

});
