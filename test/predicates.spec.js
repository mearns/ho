// Support
import {expect} from 'chai';

// Module under test
import predicates from '../src/predicates';

describe('The predicates module', () => {

    describe('invoked as a function', () => {
        it('should return a function that is delegates to the passed in function', () => {
            // given
            const matchingSubject = 'matching-value';
            const nonMatchingSubject = 'non-matching-value';
            const testFunction = (subject) => (subject === matchingSubject);

            // when
            const predicateUnderTest = predicates(testFunction);

            // then
            expect(predicateUnderTest(matchingSubject)).to.be.true;
            expect(predicateUnderTest(nonMatchingSubject)).to.be.false;
        });

        it('should cast values returned by the provided function to Booleans', () => {
            // given
            const truthyValue = 1;
            const nonTruthyValue = 0;
            const testFunction = (subject) => subject;

            // when
            const predicateUnderTest = predicates(testFunction);

            // then
            expect(predicateUnderTest(truthyValue)).to.be.true;
            expect(predicateUnderTest(nonTruthyValue)).to.be.false;
        });

        it('should return a predicate whose toString method delegates to the provided function', () => {
            // given
            const expectedString = 'expected-string-314159';
            const testFunction = () => {};
            testFunction.toString = () => expectedString;

            // when
            const predicateUnderTest = predicates(testFunction);

            // then
            expect(predicateUnderTest.toString()).to.deep.equal(expectedString);
        });
    });

    describe('the "always" predicate', () => {
        describe('toString() method', () => {
            it('should provide an appropriate toString for true values', () => {
                // when
                const predicateUnderTest = predicates.always(true);

                // then
                expect(predicateUnderTest.toString()).to.deep.equal('true');
            });

            it('should provide an appropriate toString for truthy numeric values', () => {
                // when
                const TRUTHY_NUMBER = 1;
                const predicateUnderTest = predicates.always(TRUTHY_NUMBER);

                // then
                expect(predicateUnderTest.toString()).to.deep.equal('true');
            });

            it('should provide an appropriate toString for empty array values', () => {
                // when
                const predicateUnderTest = predicates.always([]);

                // then
                expect(predicateUnderTest.toString()).to.deep.equal('true');
            });

            it('should provide an appropriate toString for empty object values', () => {
                // when
                const predicateUnderTest = predicates.always({});

                // then
                expect(predicateUnderTest.toString()).to.deep.equal('true');
            });

            it('should provide an appropriate toString for non-empty string values', () => {
                // when
                const predicateUnderTest = predicates.always(' ');

                // then
                expect(predicateUnderTest.toString()).to.deep.equal('true');
            });

            it('should provide an appropriate toString for false values', () => {
                // when
                const predicateUnderTest = predicates.always(false);

                // then
                expect(predicateUnderTest.toString()).to.deep.equal('false');
            });

            it('should provide an appropriate toString for null values', () => {
                // when
                const predicateUnderTest = predicates.always(null);

                // then
                expect(predicateUnderTest.toString()).to.deep.equal('false');
            });

            it('should provide an appropriate toString for undefined values', () => {
                // when
                const predicateUnderTest = predicates.always();

                // then
                expect(predicateUnderTest.toString()).to.deep.equal('false');
            });

            it('should provide an appropriate toString for 0 values', () => {
                // when
                const FALSEY_NUMBER = 0;
                const predicateUnderTest = predicates.always(FALSEY_NUMBER);

                // then
                expect(predicateUnderTest.toString()).to.deep.equal('false');
            });

            it('should provide an appropriate toString for empty string values', () => {
                // when
                const predicateUnderTest = predicates.always('');

                // then
                expect(predicateUnderTest.toString()).to.deep.equal('false');
            });
        });

        it('should return true if the specified value is true', () => {
            const predicateUnderTest = predicates.always(true);
            expect(predicateUnderTest()).to.be.true;
        });

        it('should return false if the specified value is false', () => {
            const predicateUnderTest = predicates.always(false);
            expect(predicateUnderTest()).to.be.false;
        });

        it('should return false if the specified value is null', () => {
            const predicateUnderTest = predicates.always(null);
            expect(predicateUnderTest()).to.be.false;
        });

        it('should return false if there is no specified value', () => {
            const predicateUnderTest = predicates.always();
            expect(predicateUnderTest()).to.be.false;
        });
    });

    describe('the "anything" predicate', () => {
        it('should provide an appropriate toString() method', () => {
            // when
            const predicateUnderTest = predicates.anything();

            // then
            expect(predicateUnderTest.toString()).to.deep.equal('anything');
        });

        it('should return true', () => {
            const predicateUnderTest = predicates.anything();
            expect(predicateUnderTest()).to.be.true;
        });
    });

    describe('the "nothing" predicate', () => {
        it('should provide an appropriate toString() method', () => {
            // when
            const predicateUnderTest = predicates.nothing();

            // then
            expect(predicateUnderTest.toString()).to.deep.equal('nothing');
        });

        it('should return false', () => {
            const predicateUnderTest = predicates.nothing();
            expect(predicateUnderTest()).to.be.false;
        });
    });

    describe('the "hasProperty" predicate', () => {
        it('should provide an appropriate toString', () => {
            // given
            const testPropertyName = 'testPropertyName';

            // when
            const predicateUnderTest = predicates.hasProperty(testPropertyName);

            // then
            expect(predicateUnderTest.toString()).to.deep.equal(`has property "${testPropertyName}"`);
        });

        it('should return true if the subject has the named property', () => {
            // given
            const testPropertyName = 'testPropertyName';
            const testSubject = {[testPropertyName]: 'bar'};

            // when
            const predicateUnderTest = predicates.hasProperty(testPropertyName);

            // then
            expect(predicateUnderTest(testSubject)).to.be.true;
        });

        it('should return true if the subject has the named property with a null value', () => {
            // given
            const testPropertyName = 'testPropertyName';
            const testSubject = {[testPropertyName]: null};

            // when
            const predicateUnderTest = predicates.hasProperty(testPropertyName);

            // then
            expect(predicateUnderTest(testSubject)).to.be.true;
        });

        it('should return true if the subject has the named property with an undefined value', () => {
            // given
            const testPropertyName = 'testPropertyName';
            const testSubject = {[testPropertyName]: undefined};    // eslint-disable-line no-undefined

            // when
            const predicateUnderTest = predicates.hasProperty(testPropertyName);

            // then
            expect(predicateUnderTest(testSubject)).to.be.true;
        });

        it('should return false if the subject does not have the named property', () => {
            // given
            const testPropertyName = 'testPropertyName';
            const testSubject = {[`notThe${testPropertyName}`]: 'bar'};

            // when
            const predicateUnderTest = predicates.hasProperty(testPropertyName);

            // then
            expect(predicateUnderTest(testSubject)).to.be.false;
        });
    });

    describe('the "isPropertyOf" predicate', () => {
        it('should provide an appropriate toString', () => {
            // given
            const testObject = {foo: 'bar'};

            // when
            const predicateUnderTest = predicates.isPropertyOf(testObject);

            // then
            expect(predicateUnderTest.toString()).to.deep.equal(`is property of [${testObject}]`);
        });

        it('should return true if the subject is the name of a property in the specified object', () => {
            // given
            const testPropertyName = 'testPropertyName';
            const testObject = {[testPropertyName]: 'bar'};

            // when
            const predicateUnderTest = predicates.isPropertyOf(testObject);

            // then
            expect(predicateUnderTest(testPropertyName)).to.be.true;
        });

        it('should return true if the subject is the name of a null property in the specified object', () => {
            // given
            const testPropertyName = 'testPropertyName';
            const testObject = {[testPropertyName]: null};

            // when
            const predicateUnderTest = predicates.isPropertyOf(testObject);

            // then
            expect(predicateUnderTest(testPropertyName)).to.be.true;
        });

        it('should return true if the subject is the name of a property with an ' +
            'undefined value in the specified object', () => {
            // given
            const testPropertyName = 'testPropertyName';
            const testObject = {[testPropertyName]: undefined}; // eslint-disable-line no-undefined

            // when
            const predicateUnderTest = predicates.isPropertyOf(testObject);

            // then
            expect(predicateUnderTest(testPropertyName)).to.be.true;
        });
    });

    describe('the "not" modifier', () => {
        it('should turn a true predicate into a false predicate', () => {
            const predicateUnderTest = predicates.not.always(true);
            expect(predicateUnderTest()).to.be.false;
        });

        it('should turn a false predicate into a true predicate', () => {
            const predicateUnderTest = predicates.not.always(false);
            expect(predicateUnderTest()).to.be.true;
        });

        it('should provide an appropriate toString method', () => {
            const predicateUnderTest = predicates.not.always(false);
            expect(predicateUnderTest.toString()).to.deep.equal('(NOT [false])');
        });
    });

    describe('chains', () => {

        it('should evaluate a.and.b.or.c as (ab)+c (left-binding)', () => {
            [
                [false, false, false, false],
                [false, false, true, true],
                [false, true, false, false],
                [false, true, true, true],
                [true, false, false, false],
                [true, false, true, true],
                [true, true, false, true],
                [true, true, true, true]
            ].forEach(([aIsTrue, bIsTrue, cIsTrue, expectedResult]) => {
                // test validation
                expect(expectedResult).to.equal((aIsTrue && bIsTrue) || cIsTrue);

                // when
                const predicateUnderTest = predicates.always(aIsTrue).and.always(bIsTrue).or.always(cIsTrue);

                // then
                expect(predicateUnderTest()).to.equal(expectedResult);
            });
        });

        describe('the "and" chain', () => {
            it('should provide an appropriate toString', () => {
                // when
                const predicateUnderTest = predicates.anything().and.hasProperty('foo');

                // then
                expect(predicateUnderTest.toString()).to.deep.equal('([anything] AND [has property "foo"])');
            });

            it('should produce a predicate that is true if both input predicates are true', () => {
                // given
                const testPropertyName1 = 'testPropertyName1';
                const testPropertyName2 = 'testPropertyName2';
                const testSubject = {
                    [testPropertyName1]: 'one',
                    [testPropertyName2]: 'two'
                };

                // when
                const predicateUnderTest = predicates.hasProperty(testPropertyName1).and.hasProperty(testPropertyName2);

                // then
                expect(predicateUnderTest(testSubject)).to.be.true;
            });

            it('should produce a predicate that is false if only the first input predicate is false', () => {
                // given
                const testPropertyName1 = 'testPropertyName1';
                const testPropertyName2 = 'testPropertyName2';
                const testSubject = {
                    [`not${testPropertyName1}`]: 'one',
                    [testPropertyName2]: 'two'
                };

                // when
                const predicateUnderTest = predicates.hasProperty(testPropertyName1).and.hasProperty(testPropertyName2);

                // then
                expect(predicateUnderTest(testSubject)).to.be.false;
            });

            it('should produce a predicate that is false if only the second input predicate is false', () => {
                // given
                const testPropertyName1 = 'testPropertyName1';
                const testPropertyName2 = 'testPropertyName2';
                const testSubject = {
                    [testPropertyName1]: 'one',
                    [`not${testPropertyName2}`]: 'two'
                };

                // when
                const predicateUnderTest = predicates.hasProperty(testPropertyName1).and.hasProperty(testPropertyName2);

                // then
                expect(predicateUnderTest(testSubject)).to.be.false;
            });

            it('should produce a predicate that is false if both input predicates is false', () => {
                // given
                const testPropertyName1 = 'testPropertyName1';
                const testPropertyName2 = 'testPropertyName2';
                const testSubject = {
                    [`not${testPropertyName1}`]: 'one',
                    [`not${testPropertyName2}`]: 'two'
                };

                // when
                const predicateUnderTest = predicates.hasProperty(testPropertyName1).and.hasProperty(testPropertyName2);

                // then
                expect(predicateUnderTest(testSubject)).to.be.false;
            });

            describe('when invoked as a function', () => {
                it('should produce a predicate that is true if both input predicates are true', () => {
                    // when
                    const predicateUnderTest = predicates.anything().and(() => true);

                    // then
                    expect(predicateUnderTest()).to.be.true;
                });

                it('should produce a predicate that is false if only the first input predicate is true', () => {
                    // when
                    const predicateUnderTest = predicates.anything().and(() => false);

                    // then
                    expect(predicateUnderTest()).to.be.false;
                });

                it('should produce a predicate that is false if only the second input predicate is true', () => {
                    // when
                    const predicateUnderTest = predicates.nothing().and(() => true);

                    // then
                    expect(predicateUnderTest()).to.be.false;
                });

                it('should produce a predicate that is false if both input predicates are false', () => {
                    // when
                    const predicateUnderTest = predicates.nothing().and(() => false);

                    // then
                    expect(predicateUnderTest()).to.be.false;
                });

                it('should provide an appropriate toString method', () => {
                    // given
                    const expectedString = 'expected string 314159';
                    const testPredicateFunction = () => true;
                    testPredicateFunction.toString = () => expectedString;

                    // when
                    const predicateUnderTest = predicates.nothing().and(testPredicateFunction);

                    // then
                    expect(predicateUnderTest.toString()).to.deep.equal(`([nothing] AND [${expectedString}])`);
                });
            });
        });

        describe('the "or" chain', () => {
            it('should provide an appropriate toString', () => {
                // when
                const predicateUnderTest = predicates.anything().or.hasProperty('foo');

                // then
                expect(predicateUnderTest.toString()).to.deep.equal('([anything] OR [has property "foo"])');
            });

            it('should produce a predicate that is true if both input predicates are true', () => {
                // given
                const testPropertyName1 = 'testPropertyName1';
                const testPropertyName2 = 'testPropertyName2';
                const testSubject = {
                    [testPropertyName1]: 'one',
                    [testPropertyName2]: 'two'
                };

                // when
                const predicateUnderTest = predicates.hasProperty(testPropertyName1).or.hasProperty(testPropertyName2);

                // then
                expect(predicateUnderTest(testSubject)).to.be.true;
            });

            it('should produce a predicate that is true if only the first input predicate is false', () => {
                // given
                const testPropertyName1 = 'testPropertyName1';
                const testPropertyName2 = 'testPropertyName2';
                const testSubject = {
                    [`not${testPropertyName1}`]: 'one',
                    [testPropertyName2]: 'two'
                };

                // when
                const predicateUnderTest = predicates.hasProperty(testPropertyName1).or.hasProperty(testPropertyName2);

                // then
                expect(predicateUnderTest(testSubject)).to.be.true;
            });

            it('should produce a predicate that is true if only the second input predicate is false', () => {
                // given
                const testPropertyName1 = 'testPropertyName1';
                const testPropertyName2 = 'testPropertyName2';
                const testSubject = {
                    [testPropertyName1]: 'one',
                    [`not${testPropertyName2}`]: 'two'
                };

                // when
                const predicateUnderTest = predicates.hasProperty(testPropertyName1).or.hasProperty(testPropertyName2);

                // then
                expect(predicateUnderTest(testSubject)).to.be.true;
            });

            it('should produce a predicate that is false if both input predicates is false', () => {
                // given
                const testPropertyName1 = 'testPropertyName1';
                const testPropertyName2 = 'testPropertyName2';
                const testSubject = {
                    [`not${testPropertyName1}`]: 'one',
                    [`not${testPropertyName2}`]: 'two'
                };

                // when
                const predicateUnderTest = predicates.hasProperty(testPropertyName1).or.hasProperty(testPropertyName2);

                // then
                expect(predicateUnderTest(testSubject)).to.be.false;
            });

            describe('when invoked as a function', () => {
                it('should produce a predicate that is true if both input predicates are true', () => {
                    // when
                    const predicateUnderTest = predicates.anything().or(() => true);

                    // then
                    expect(predicateUnderTest()).to.be.true;
                });

                it('should produce a predicate that is true if only the first input predicate is true', () => {
                    // when
                    const predicateUnderTest = predicates.anything().or(() => false);

                    // then
                    expect(predicateUnderTest()).to.be.true;
                });

                it('should produce a predicate that is true if only the second input predicate is true', () => {
                    // when
                    const predicateUnderTest = predicates.nothing().or(() => true);

                    // then
                    expect(predicateUnderTest()).to.be.true;
                });

                it('should produce a predicate that is false if both input predicates are false', () => {
                    // when
                    const predicateUnderTest = predicates.nothing().or(() => false);

                    // then
                    expect(predicateUnderTest()).to.be.false;
                });

                it('should provide an appropriate toString method', () => {
                    // given
                    const expectedString = 'expected string 314159';
                    const testPredicateFunction = () => true;
                    testPredicateFunction.toString = () => expectedString;

                    // when
                    const predicateUnderTest = predicates.nothing().or(testPredicateFunction);

                    // then
                    expect(predicateUnderTest.toString()).to.deep.equal(`([nothing] OR [${expectedString}])`);
                });
            });
        });
    });
});
