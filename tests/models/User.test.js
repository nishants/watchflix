const
  User = require('../../app/models/user'),
  {expect} = require('chai');

describe("User", ()=> {
  beforeEach(done => {
    User.remove({}).then(()=>  done());
  });
  describe("Create user", ()=> {
    it('should create a user', done => {
      new User({
        userId: 100,
        languages: [
          {id: 'en'}, {id: 'es'}
        ],
        favoriteActors: [
          {name: 'actor1'}, {name: 'actor2'}
        ],
        favoriteDirectors: [
          {name: 'director 1'}, {name: 'director 2'}
        ]
      }).save().then(()=> {
          User.findByUserId(100).then(user=> {
            expect(user.userId).to.equal('100');
            expect(user.languages.map(lang => ({id: lang.id}))).to.eql([{id: 'en'}, {id: 'es'}]);
            expect(user.favoriteActors.map(actor => ({name: actor.name}))).to.eql([{name: 'actor1'}, {name: 'actor2'}]);
            expect(user.favoriteDirectors.map(director => ({name: director.name}))).to.eql([{name: 'director 1'}, {name: 'director 2'}]);
            done();
          });
        });
    });
  });

});
