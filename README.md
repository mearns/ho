# ho

A javascript library of higher-order functions.

## Status

Not yet released.

## Concepts

A **predicate** is a function that maps one value (called the _subject_) to a _boolean_ value.

A **chain-function** is a function that maps an ordered pair of predicates to a single predicate.

A **modifier-function** is a function that maps one predicate to one predicate.

A **predicate builder** is a function that returns a _predicate_.

A **predicate collection** is an object that has _predicate builders_ attached to it as properties.

A **collection modifier** is a property attached to a _predicate collection_ that returns a new
_predicate collection_, by creating new predicate builders that map predicates through a particular modifier.

A **predicate chain** is a property attached to a _predicate_ that returns a new _predicate collection_,
by creating new predicate builders that map predicates through a particular chain, along with the source
predicate that it's attached to.
