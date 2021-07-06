---
layout: wiki
---

## Style

Follow the [Google style guide](https://google.github.io/styleguide/javaguide.html) with the following exceptions:
 - Non static imports are separated into in three blocks (in this order):
   - Classes within the PSL project (including utils/experimental).
   - Third party classes not part of the Java standard library.
   - Java standard library classes.
 - Indentation is 4 spaces.
   - Soft tabs
 - Consecutive blank lines are not allowed.
 - Avoid block comments (`/* */`) inside methods.
 - Don't use `@author` tags in javadoc comments.

## Continuous Integration

PSL uses continuous integration (currently [Travis](https://travis-ci.com/github/linqs/psl)) to run several different processes for each push.
The specifics of the CI settings can be found in the [.travis.yml](https://github.com/linqs/psl/blob/develop/.travis.yml) configuration file and the [.ci](https://github.com/linqs/psl/blob/develop/.ci) directory.

### Tests

The tests run in the CI are run through maven using:
```
mvn integration-test -B
```

### Lint Checks

Lint checks are done using [SpotBugs](https://spotbugs.github.io/).
An exclusion filter is located at [.ci/spotbugs-exclude.xml](https://github.com/linqs/psl/blob/develop/.ci/spotbugs-exclude.xml).
Documentation on how to write filter statements can be found [here](https://spotbugs.readthedocs.io/en/stable/filter.html).
Filters should be written to be specific and as narrow as reasonable.

The lint checks can be run through maven using:
```
mvn spotbugs:check
```

### Docs

Building PSL also involves building the PSL javadocs.
When a release is done (a tag that looks like a version is pushed),
the documentation will automatically be pushed to the [PSL website](https://psl.linqs.org/api/).
See [.ci/deploy-docs.sh](https://github.com/linqs/psl/blob/develop/.ci/deploy-docs.sh) for all the details.
