var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Donor unit tests:', () => {
	var id:string = '';
    it('Should create a Donor instance', (done: Function) => {
        api.post('/Donors').send({
            "firstName": "ssss",
		    "lastName": "aaaa",
		    "contactNumber": "0072 789 1234 567",
		    "email": "1234567@163.com",
		    "bloodGroup": "B",
		    "location": {
		      "lat": 23.203198643163937,
		      "lng": 113.1946024152324
		    }
        }).expect(200).end(function(err:any, res:any) {
        	res.body.should.have.property('id');
        	id = res.body.id;
		    done(err);
		});
    });

    it('Should get all Donor instances', (done: Function) => {
        api.get('/Donors')
        .expect(200)
        .end(function(err:any, res:any) {
		    done(err);
		});
    });

    it('Should find a Donor instance', (done: Function) => {
        api.get('/Donors/'+id)
        .expect(200)
        .end(function(err:any, res:any) {
        	res.body.id.should.equal(id);
		    done(err);
		});
    });

    it('Should update a existed Donor instance', (done: Function) => {
        api.put('/Donors/'+id).send({
            "firstName": "newname",
		    "id":id
        }).expect(200).end(function(err:any, res:any) {
        	res.body.firstName.should.equal("newname");
		    done(err);
		});
    });

    it('Should delete a Donor instance', (done: Function) => {
        api.delete('/Donors/'+id)
        .expect(200)
        .end(function(err:any, res:any) {
		    done(err);
		});
    });

    //TODO:more failed test cases to cover
    it('Should failed to create a Donor instance with invalid email', (done: Function) => {
        api.post('/Donors').send({
            "firstName": "ssss",
		    "lastName": "aaaa",
		    "contactNumber": "0072 789 1234 567",
		    "email": "invalid email",
		    "bloodGroup": "B",
		    "location": {
		      "lat": 23.203198643163937,
		      "lng": 113.1946024152324
		    }
        }).expect(422,done);
    });

    it('Should failed to create a Donor instance with bad format contact number', (done: Function) => {
        api.post('/Donors').send({
            "firstName": "ssss",
		    "lastName": "aaaa",
		    "contactNumber": "72 789 1234 567",
		    "email": "1234567@163.com",
		    "bloodGroup": "B",
		    "location": {
		      "lat": 23.203198643163937,
		      "lng": 113.1946024152324
		    }
        }).expect(422,done);
    });

    it('Should failed to create a Donor instance with missed required first name', (done: Function) => {
        api.post('/Donors').send({
            "lastName": "ssss",
		    "contactNumber": "+72 789 1234 567",
		    "email": "1234567@163.com",
		    "bloodGroup": "B",
		    "location": {
		      "lat": 23.203198643163937,
		      "lng": 113.1946024152324
		    }
        }).expect(422,done);
    });
});
