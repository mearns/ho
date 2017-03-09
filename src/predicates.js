
const predicateDefinitions = {
    always: {
        supplier: (result) => {
            const resultBoolean = Boolean(result);
            return () => resultBoolean;
        },
        describer: (result) => `${Boolean(result)}`
    },
    anything: {
        supplier: () => {
            return () => true;
        },
        describer: 'anything'
    },
    nothing: {
        supplier: () => {
            return () => false;
        },
        describer: 'nothing'
    },
    hasProperty: {
        supplier: (named) => ((obj) => (named in obj)),
        describer: (named) => `has property "${named}"`
    },
    isPropertyOf: {
        supplier: (obj) => ((name) => (name in obj)),
        describer: (obj) => `is property of [${obj}]`
    }
};

function createAndBuilder(predicateA, predicateBSupplier) {
    return (...args) => {
        const predicateB = createPredicateBuilder(predicateBSupplier)(...args);
        const predicate = createDecoratedPredicate((subject) => {
            return predicateA(subject) && predicateB(subject);
        });
        predicate.toString = () => `([${predicateA}] AND [${predicateB}])`;
        return predicate;
    };
}

function createOrBuilder(predicateA, predicateBSupplier) {
    return (...args) => {
        const predicateB = createPredicateBuilder(predicateBSupplier)(...args);
        const predicate = createDecoratedPredicate((subject) => {
            return predicateA(subject) || predicateB(subject);
        });
        predicate.toString = () => `([${predicateA}] OR [${predicateB}])`;
        return predicate;
    };
}

function createNotBuilder(supplier) {
    return (...args) => {
        const affirmativePredicate = createPredicateBuilder(supplier)(...args);
        const predicate = createDecoratedPredicate((subject) => !affirmativePredicate(subject));
        predicate.toString = () => `(NOT [${affirmativePredicate}])`;
        return predicate;
    };
}

function createPredicateBuilder({supplier, describer: _describer}) {
    const describer = (typeof _describer === 'function')
        ? _describer
        : () => _describer;
    return (...args) => {
        const predicate = createDecoratedPredicate(supplier(...args));
        const specificDescription = describer(...args);
        predicate.toString = () => specificDescription;
        return predicate;
    };
}

function createDecoratedPredicate(func) {
    const predicate = (subject) => Boolean(func(subject));
    predicate.and = Object.keys(predicateDefinitions).reduce((ands, predicateName) => {
        ands[predicateName] = createAndBuilder(predicate, predicateDefinitions[predicateName]);
        return ands;
    }, (f) => {
        return createAndBuilder(predicate, {supplier: () => f, describer: () => f.toString()})();
    });
    predicate.or = Object.keys(predicateDefinitions).reduce((ors, predicateName) => {
        ors[predicateName] = createOrBuilder(predicate, predicateDefinitions[predicateName]);
        return ors;
    }, (f) => {
        return createOrBuilder(predicate, {supplier: () => f, describer: () => f.toString()})();
    });
    // TODO: Add 'not' to chains.
    return predicate;
}


function predicates(f) {
    const predicate = createDecoratedPredicate(f);
    predicate.toString = () => f.toString();
    return predicate;
}

Object.keys(predicateDefinitions).reduce((builders, predicateName) => {
    builders[predicateName] = createPredicateBuilder(predicateDefinitions[predicateName]);
    return builders;
}, predicates);

// XXX: smart-to string, if predicates have some particular property.
// XXX: invokable for 'not'
predicates.not = Object.keys(predicateDefinitions).reduce((notBuilders, predicateName) => {
    notBuilders[predicateName] = createNotBuilder(predicateDefinitions[predicateName]);
    return notBuilders;
}, (f) => {
    return createNotBuilder({supplier: () => f, describer: () => f.toString()})();
});

module.exports = predicates;
