import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../../database/models/ExampleModel';
import SequelizeTeams from '../database/models/SequelizeTeams';

import { Response } from 'superagent';
const allTeams = require('./mocks/teamsArray.json');

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  it('should return the list of all Teams', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(allTeams as any);
    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(allTeams)
  });

  it('should return one Team when searched by id', async function () {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(allTeams[0] as any);
    chaiHttpResponse = await chai.request(app).get('/teams/1');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(allTeams[0]);
  });

  it('should return return an error when id doesnt exist', async function () {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(null);
    chaiHttpResponse = await chai.request(app).get('/teams/99999');

    expect(chaiHttpResponse.status).to.equal(404);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "Team of id 99999 not found" })
  });
});
