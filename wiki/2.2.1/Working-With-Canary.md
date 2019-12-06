---
layout: wiki
---

## What is Canary?
The Canary is a published build of PSL that is based on the development branch.
The name "Canary" comes from the iconic use of a [canary in a coal mine](https://en.wikipedia.org/wiki/Sentinel_species#Historical_examples) to detect toxic gas.
The build is somewhere near the tip of the development tree.
A new build is released whenever the PSL developers feel a significant change has been made.

## Canary Versions
Canaries are versioned slightly differently than regular releases.
The version will be called `CANARY-X.Y.Z` where `X.Y` matches the major/minor number of the next stable release and `Z` just increments by one for each canary build.

## Using Canary

### Java

The use canary, simply change your PSL version in your `pom.xml` to `CANARY-X.Y.Z` (with the proper substitution for `X.Y.Z`).

```xml
<dependencies>
    ...
    <dependency>
        <groupId>org.linqs</groupId>
        <artifactId>psl-java</artifactId>
        <version>CANARY-2.1.1</version>
    </dependency>
    ...
</dependencies>
```

### CLI

Using the canary in the CLI just means grabbing the new jar file from the [Maven repository](https://mvnrepository.com/artifact/org.linqs/psl-cli).

### How do I update my Canary?
If you are using the versioned canary, then just update your version numbers in your pom.
If you are using the unversioned canary, then you will have to delete the old canary from your Maven cache.
On Linux/Mac, this is at: `~/.m2/repository/org/linqs/psl*/CANARY`
