import Pkmn from '../lib';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('pkmn api integration tests', function () {
    let p;
    this.timeout(5000);

    beforeEach(() => {
        p = new Pkmn();
    });

    describe('end', () => {
        it('should fail for malformed query', () => {
            p.query = 'ayyy.lmao';
            return expect(p.end()).to.eventually.be.rejected;
        });
    });
    describe('get', () => {
        it('should get resource by name', () => {
            return expect(p.get('pokemon', 'bulbasaur'))
                .to.eventually.be.fulfilled;
        });

        it('should get resource by resource_uri', () => {
            var uri = '/api/v1/description/4';
            return expect(p.get(uri).get('pokemon').get('name'))
                .to.eventually.equal('bulbasaur');
        });

        it('should reject for too few arguments', () => {
            return expect(p.get('pokemon')).to.eventually.be.rejected;
        });

        it('should get several resources for id array', () => {
            let names = p.get('pokemon', ['bulbasaur', 1, 1])
                .reduce((name, poke) =>
                    name === poke.name ? 'Bulbasaur' : false, 'Bulbasaur');


            expect(names).to.eventually.equal('Bulbasaur');
        });
    });
    describe('resource', () => {
        it('should get resource by resource_uri', () => {
            const uri = '/api/v1/description/4/';
            return expect(p.resource(uri).get('pokemon').get('name'))
                .to.eventually.equal('bulbasaur');
        });
    });
    describe('pokemon', () => {
        let poke;
        before(() => {
            poke = p.pokemon(1);
        });

        it('should get pokemon', () => {
            return expect(poke).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(poke).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(poke).to.eventually.have.property('name');
        });

        it('should be \'Bulbasaur\'', () => {
            return expect(poke.get('name'))
                .to.eventually.equal('Bulbasaur');
        });

        it('should fail to get nonexistent pokemon', () => {
            return expect(p.pokemon('Rick_James')).to.eventually.be.rejected;
        });

    });


    describe('game', () => {
        let game;
        before(() => {
            game = p.game(1);
        });
        it('should get pokedexs', () => {
            return expect(game).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(game).to.eventually.be.an('object');
        });

        it('should have a release year', () => {
            return expect(game)
                .to.eventually.have.property('release_year');
        });

        it('should be 1996', () => {
            return expect(game.get('release_year'))
                .to.eventually.equal(1996);
        });

        it('should fail to get nonexistent game', () => {
            return expect(p.game('ayyy_lmao')).to.eventually.be.rejected;
        });
    });
    describe('pokedex', () => {
        let pokedex;
        before(() => {
            pokedex = p.pokedex(1);
        });
        it('should get the pokedex', () => {
            return expect(pokedex).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(pokedex).to.eventually.be.an('object');
        });

        it('should have a name property', () => {
            return expect(pokedex).to.eventually.have.property('name');
        });

        it('should be \'national\'', () => {
            return expect(pokedex.get('name'))
                .to.eventually.equal('national');
        });

    });
    describe('type', () => {
        let type;
        before(() => {
            type = p.type(1);
        });
        it('should get type', () => {
            return expect(type).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(type).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(type).to.eventually.have.property('name');
        });

        it('should be \'Normal\'', () => {
            return expect(type.get('name'))
                .to.eventually.equal('Normal');
        });

        it('should fail to get nonexistent type', () => {
            return expect(p.type('stupid')).to.eventually.be.rejected;
        });
    });
    describe('move', () => {
        let move;
        before(() => {
            move = p.move(1);
        });
        it('should get moves', () => {
            return expect(move).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(move).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(move).to.eventually.have.property('name');
        });

        it('should be \'Pound\'', () => {
            return expect(move.get('name'))
                .to.eventually.equal('Pound');
        });

        it('should fail to get nonexistent moves', () => {
            return expect(p.move('kamehameha')).to.eventually.be.rejected;
        });
    });
    describe('ability', () => {
        let ability;
        before(() => {
            ability = p.ability(1);
        });
        it('should get abilities', () => {
            return expect(ability).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(ability).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(ability).to.eventually.have.property('name');
        });

        it('should be \'Stench\'', () => {
            return expect(ability.get('name'))
                .to.eventually.equal('Stench');
        });

        it('should fail to get nonexistent abilities', () => {
            return expect(p.ability('instant_transmission'))
                .to.eventually.be.rejected;
        });
    });
    describe('egg', () => {
        let egg;
        before(() => {
            egg = p.egg(1);
        });
        it('should get eggs', () => {
            return expect(egg).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(egg).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(egg).to.eventually.have.property('name');
        });

        it('should be \'Monster\'', () => {
            return expect(egg.get('name'))
                .to.eventually.equal('Monster');
        });

        it('should fail to get nonexistent eggs', () => {
            return expect(p.egg('scrambled')).to.eventually.be.rejected;
        });
    });
    describe('description', () => {
        let description;
        before(() => {
            description = p.description(2);
        });
        it('should get descriptions', () => {
            return expect(description).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(description).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(description).to.eventually.have.property('name');
        });

        it('should be \'Bulbasaur_gen_1\'', () => {
            return expect(description.get('name'))
                .to.eventually.equal('Bulbasaur_gen_1');
        });

        it('should fail to get nonexistent descriptions', () => {
            return expect(p.description('super_hairy'))
                .to.eventually.be.rejected;
        });
    });
    describe('sprite', () => {
        let sprite;
        before(() => {
            sprite = p.sprite(1);
        });
        it('should get sprites', () => {
            return expect(sprite).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(sprite).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(sprite).to.eventually.have.property('name');
        });

        it('should be \'Bulbasaur_red_blue\'', () => {
            return expect(sprite.get('name'))
                .to.eventually.equal('Bulbasaur_red_blue');
        });

        it('should fail to get nonexistent sprites', () => {
            return expect(p.sprite('obey_your_thirst'))
                .to.eventually.be.rejected;
        });
    });

});
