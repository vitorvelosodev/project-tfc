import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import JWT from '../utils/JWT';

import { Response } from 'superagent';
const allMatches = require('./mocks/matchesArray.json');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing matches', () => {

  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })
  it('should return all matches', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(allMatches as any);
    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(allMatches);
  });

  it('should finish match when sent on patch', async function () {
    sinon.stub(JWT, 'revalidateToken').returns(true);

    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish').set('Authorization', 'Bearer token');
    
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finished' });
  });

  it('should update match when sent on body', async function () {
    sinon.stub(SequelizeMatches, 'update').resolves();
    sinon.stub(JWT, 'revalidateToken').returns(true);

    chaiHttpResponse = await chai.request(app).patch('/matches/1/').set('Authorization', 'Bearer token');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match updated' })
  });

  it('should create match when sent on body', async function () {
    // sinon.stub(SequelizeMatches, 'create').resolves();
    sinon.stub(JWT, 'revalidateToken').returns(true);

    chaiHttpResponse = await chai.request(app).post('/matches/').set('Authorization', 'Bearer token').send({
      "homeTeamId": 8,
      "awayTeamId": 2,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    });

    expect(chaiHttpResponse.status).to.equal(201);
    expect(chaiHttpResponse.body).to.have.property('id');
  });

  it('should not create match when teams are the same', async function () {
    // sinon.stub(SequelizeMatches, 'create').resolves();
    sinon.stub(JWT, 'revalidateToken').returns(true);

    chaiHttpResponse = await chai.request(app).post('/matches/').set('Authorization', 'Bearer token').send({
      "homeTeamId": 8,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    });

    expect(chaiHttpResponse.status).to.equal(422);
    expect(chaiHttpResponse.body).to.have.property('message');
  });
});
