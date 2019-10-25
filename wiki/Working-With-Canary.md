---
layout: wiki
---

## What is Canary?
The Canary is a published build of PSL that is based on the development branch.
The name "Canary" comes from the iconic use of a [canary in a coal mine](https://en.wikipedia.org/wiki/Sentinel_species#Historical_examples) to detect toxic gas.
The build is somewhere near the tip of the development tree.
It is updated whenever the PSL developers feel a significant change has been made in development.

## Versioned Canary
Canaries use the naming convention `CANARY-X.Y.Z` where `X.Y` matches the major/minor number of the next stable release and `Z` just increments by one for each canary build.

Unfortunately, we do not yet have any fancy infrastructure to check what canary versions are available, so the easiest way will be to just look at the [maven repository](https://linqs-data.soe.ucsc.edu/maven/repositories/psl-releases/org/linqs/psl-groovy/).

## Old Unversioned Canary
Previously, an unversioned canary build (just called `CANARY`) was released alongside the versioned canary.
This was useful for developers who always wanted to latest build.
However as we are migrating our infrastructure, it is increasingly difficult to have a build's name carry over to several different versions.
So, we dropped support for the unversioned canary build.

## Using Canary

### Java/Groovy

The use canary, simply change your PSL version in your `pom.xml` to `CANARY` or `CANARY-X.Y.Z` (with the proper substitution for `X.Y.Z`).

```xml
<dependencies>
    ...
    <dependency>
        <groupId>org.linqs</groupId>
        <artifactId>psl-groovy</artifactId>
        <version>CANARY</version>
    </dependency>
    ...
</dependencies>
```

```xml
<dependencies>
    ...
    <dependency>
        <groupId>org.linqs</groupId>
        <artifactId>psl-groovy</artifactId>
        <version>CANARY-2.1.0</version>
    </dependency>
    ...
</dependencies>
```

### CLI

Using the canary in the CLI just means grabbing the new jar file from the [Maven repository](https://linqs-data.soe.ucsc.edu/maven/repositories/psl-releases/org/linqs/psl-cli).

### Python

PIP requires different version naming conventions, so the canary builds will look a little different.
They are named: `X.Y.0.devZ`.
Like the other packages, `X.Y` matches the major/minor number of the next stable release and `Z` just increments by one for each canary build.

The published versions can be seen here on [PyPI](https://pypi.org/project/pslpython/#history).
