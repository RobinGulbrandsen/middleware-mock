const supertest = require('supertest');
const {expect} = require('chai');
const sinon = require('sinon');

describe('server', () => {

    let middleware;
    let server;

    beforeEach(() => {
        middleware = require('./middleware');
        sinon.stub(middleware, 'setUser').callsFake(function(req, res, next) {

            //Fake middleware to set a token for test purpose
            res.set('Authorization', 'Bearer TEST');
            req.user = {
                username: 'test',
                roles: ['admin', 'member', 'test']
            };

            return next();
        });
        server = require('./server');
    });

    afterEach(function() {
        middleware.setUser.restore();
    });

    it('should set test user in middleware', (done) => {
        const serverInstance = server.start(1332);
        supertest(serverInstance)
            .get('/')
            .expect('Authorization', 'Bearer TEST')
            .expect(200)
            .end(err => {
                server.close();
                if (err) throw err;
                done();
            });
    });

});