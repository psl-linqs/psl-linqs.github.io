---
layout: page
title: Frequently Asked Questions
nav-title: FAQ
order: 2
permalink: /faq/
---

   - [Do I need to specify the full target set?](#do-i-need-to-specify-the-full-target-set)
   - [I get an error like: "Can only call getAtom() on persisted RandomVariableAtoms (RVAs) using a PersistedAtomManager."](#i-get-an-error-like-can-only-call-getatom-on-persisted-randomvariableatoms-rvas-using-a-persistedatommanager)
   - [How do I get more debugging information?](#how-do-i-get-more-debugging-information)
   - [Can PSL run on Windows?](#can-psl-run-on-windows)
   - [What version of PSL should I use?](#what-version-of-psl-should-i-use)
   - [I get an error like: "Any variable used in a negated (non-functional) predicate must also participate in a positive (non-functional) predicate."](#i-get-an-error-like-any-variable-used-in-a-negated-non-functional-predicate-must-also-participate-in-a-positive-non-functional-predicate)
   - [Some `mvn` commands fail with "... handshake_failure ...".](#some-mvn-commands-fail-with--handshake_failure-)
   - [Some `mvn` commands fail with "Failed to transfer file: https://scm.umiacs.umd.edu/...".](#some-mvn-commands-fail-with-failed-to-transfer-file-httpsscmumiacsumdedu)

---

### Do I need to specify the full target set?

The short answer is yes, you should almost always specify all your targets.
This will typically give the best performance and reduce the chance for errors coming from incorrectly specified data.  
(Read below for the caveats.)

Now for the long answer:

Keep in mind the collective nature of PSL (and all SRL methods).
The goal is not to predict just one thing, but predict things with multiple and potentially complex dependencies.
Because of these dependencies, leaving out targets could severely impact the quality of your results.
For example, lets say you are trying to predict friendship.
We have three people: 'Alice', 'Bob', and 'Claire' and we are using a transitive rule like this:
```
Friends(A, B) & Friends(B, C) -> Friends(A, C)
```

Even if we were just interested in the target: `Friends('Alice', 'Claire')`, if we do not infer the value for dependent targets (`Friends('Alice', 'Bob')` and `Friends('Bob', 'Claire')` in this case) then we cannot properly reason about `Friends('Alice', 'Claire')`.
Ie, this ground rule would would not be generated: `Friends('Alice', 'Bob') & Friends('Bob', 'Claire') -> Friends('Alice', 'Claire')`.

So in general, we recommend that people define all their targets.
However if you have cliques in your data, then you can just specify the clique the desired target is in as your targets.
(Note that blocking will often introduce cliques in your data.)

You can also try using [lazy inference](https://linqs-data.soe.ucsc.edu/psl-docs/docs/psl/develop-head/org/linqs/psl/application/inference/LazyMPEInference.html) and specify just your desired target set as the targets.
Lazy inference will then grow the target set to all dependent atoms until it discovers no more.
Lazy inference is generally slower than normal inference (because it is iterative, whereas non-lazy is one-shot).
However, if you data does have a clique around your desired target, then lazy inference will typically find it and stop there.

---

### I get an error like: "Can only call getAtom() on persisted RandomVariableAtoms (RVAs) using a PersistedAtomManager."

This error indicates that PSL found a target atom that was not specified in the data.
You can fix it by modifying your data to specify the full target set.

See the question: [Do I need to specify the full target set?](#do-i-need-to-specify-the-full-target-set).

---

### How do I get more debugging information?

You can change the logging level of PSL to get more debugging information.
The logging level must be set at the beginning of the PSL run.
PSL supports all the standard [log4j logging levels](https://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/Level.html).

Using the `DEBUG` logging level is especially helpful if you want to get basic grounding information (like the number of ground rules per rule),
or if you want to get more information when requesting help.

#### CLI
To change the PSL logging level in the Command Line Interface, pass the `-D log4j.threshold=<LOGGING_LEVEL>` argument when invoking PSL.
For example to use the `DEBUG` logging level, you can pass the following argument to the CLI:
```
-D log4j.threshold=DEBUG
```

#### Groovy
To change the PSL logging level in the Groovy interface, you will need to edit the `src/main/resources/log4j.properties` file in your maven project.
Change the line that reads:
```
log4j.rootLogger=ERROR, A1
```

To now use the logging level you want.
For example to use the `DEBUG` logging level, change the line to:
```
log4j.rootLogger=DEBUG, A1
```

---

### Can PSL run on Windows?

Yes.  
PSL's only hard requirement is Java 7/8.
To use the Groovy interface, Maven should also be installed (although it is not strictly necessary for those with a lot of Java experience).
To use the CLI, nothing additional is required.

However, the examples that we provide via the [PSL Examples Repository](https://github.com/linqs/psl-examples) contains shell scripts meant for UNIX-based systems (mainly tested on Linux and Mac).
So Windows users will either need to use the Windows Linux Subsystem, a Unix-like environment like Cygwin, convert the script to a Windows-compatible script, or perform the operations in the script by hand.
(The scripts are simple and mainly involve just invoking PSL.)

---

### What version of PSL should I use?

PSL is constantly under development for new features, performance enhancements, and bug fixes.
So, there are several different version that you can choose from.

The current stable version is 2.0.0.
If you want to take advantage if features currently under development, you can use a [canary build](https://github.com/{{ site.github_username }}/psl/wiki/Working-With-Canary).

If you were using a version of PSL prior to 2.0.0 and would like to upgrade, you can follow the [Migration Guide](https://github.com/{{ site.github_username }}/psl/wiki/Migrating-to-PSL-2).

---

### I get an error like: "Any variable used in a negated (non-functional) predicate must also participate in a positive (non-functional) predicate."

Make sure that all your variables appear in either a non-negated atom in the body of the rule or a negated atom in the head of the rule.

For example, the following rule will be rejected by PSL:
```
10.0: Foo(A, B) & !Bar(B, C) -> Baz(A, C) ^2
```

This rule will cause the following error:
```
Any variable used in a negated (non-functional) predicate must also participate in a positive (non-functional) predicate.
The following variables do not meet this requirement: [C].
```

To fix this you can either rewrite the rule, or introduce a **scoping predicate**.
A scoping predicate is just a predicate that holds the possible values for a variable.
Scoping predicates typically only have one argument.
In this example, it would be a predicate that holds all the possible people.
A working version of this rule would be:
```
10.0: Scope(C) & Foo(A, B) & !Bar(B, C) -> !Baz(A, C) ^2
```

(Warning: The rest is a technical explanation.)

PSL purposefully enforces this semantic to prevent situations where you try and ground an infinite set.
In this example, the negated atom, `!Bar(B, C)`, is asking for all examples of the variables `B` and `C` for which the value of `Bar(B, C)` is **not** 1.0.
Because of PSL's closed world semantics (everything not observed has the value 0.0), this in an infinite set.

However if we can use other atoms to figure out the possible values for the variables `B` and `C`, then we no longer are dealing with an infinite set.
In this example, the other atom in the body, `Foo(A, B)`, uses `B` and is positive.
Therefore we now have a domain for `B`, but `C` remains unbound.
The introduction of the scoping predicate, `Scope(C)`, finally resolves the issue by using `C` in a positive atom.

---

### Some `mvn` commands fail with "... handshake_failure ...".

If you are getting a maven error like the one below:
```
ERROR] Failed to execute goal on project easycc:
   Could not resolve dependencies for project org.linqs.psl.example:easycc:jar:1.0-SNAPSHOT:
   Failed to collect dependencies at org.linqs:psl-groovy:jar:2.0.0:
   Failed to read artifact descriptor for org.linqs:psl-groovy:jar:2.0.0:
   Could not transfer artifact org.linqs:psl-groovy:pom:2.0.0 from/to psl-releases (http://maven.linqs.org/maven/repositories/psl-releases/):
   Received fatal alert: handshake_failure -> [Help 1]
```

Then it could be because of your version of Java (especially on Mac).
This has to do with your subversion of Java and is common across Java 7 and Java 8.

Run `java -version` and look at the number after the underscore.
If it is below `110`, then you should try updating tour version of Java.
We are not sure which exact version of Java fixed the issue, but we have confirmed being at or past `110` has resolved the issue.

---

### Some `mvn` commands fail with "Failed to transfer file: https://scm.umiacs.umd.edu/...".

If you are getting a maven error like the one below:
```
[ERROR] Failed to execute goal on project psl-core:
   Could not resolve dependencies for project edu.umd.cs:psl-core:jar:1.2.1:
   Failed to collect dependencies at edu.emory.mathcs:parallelcolt:jar:0.9.4:
   Failed to read artifact descriptor for edu.emory.mathcs:parallelcolt:jar:0.9.4:
   Could not transfer artifact edu.emory.mathcs:parallelcolt:pom:0.9.4 from/to psl-releases (https://scm.umiacs.umd.edu/maven/lccd/content/repositories/psl-releases/):
   Failed to transfer file: https://scm.umiacs.umd.edu/maven/lccd/content/repositories/psl-releases/edu/emory/mathcs/parallelcolt/0.9.4/parallelcolt-0.9.4.pom.
   Return code is: 503 , ReasonPhrase:Service Unavailable. -> [Help 1]
```

Or any of your maven errors include a link to `https://scm.umiacs.umd.edu/maven/lccd/content/repositories/psl-releases/`,
then you are pointing to our old maven repository.
The new ones are located at `http://maven.linqs.org/maven`.

Just go into your `pom.xml` file and replace the old maven address with the new one.  
Old Address: `https://scm.umiacs.umd.edu/maven/lccd/content/repositories/psl-releases/`  
New Address: `http://maven.linqs.org/maven/repositories/psl-releases/`

The new address will redirect to an https endpoint.
If you need to use that https endpoint directly (typically for firewall reasons), you can use the following:
```
https://linqs-data.soe.ucsc.edu/maven
```
