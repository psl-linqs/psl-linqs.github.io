# PSL Website

This repository is the canonical website reference for the [Probabilistic Soft Logic (PSL)](https://github.com/linqs/psl) machine learning framework made by the [LINQS machine learning lab](https://linqs.soe.ucsc.edu/).

## Building the Site Locally

To build our site, we use the [Jekyll framework](https://jekyllrb.com/).
Jekyll should be pretty simple to setup.
There are many resources on the internet to get you started, most notably the [Jekyll website itself](https://jekyllrb.com/docs/step-by-step/01-setup/).

Here are my quick install steps (I only run Linux, so you may have to consult a more through guide for your OS):
1) First, you need to have `ruby` installed. Along with ruby comes its package manager `gem`.
2) Install `bundler` (which handles building the project) and `jekyll` using gem: `gem install bundler jekyll`.
3) Build the site in the repository's root: `bundle exec jekyll serve`. This will build the site and launch a local webserver, so you can open it in a browser.
4) Open a web browser and go to the site: http://localhost:4000 . The website will automatically update/rebuild with any changes you make.

## Updating Dependencies

You can update the dependencies in the standard Jekyll way.
First remove `Gemfile.lock`,
then run `bundle update`.
```
rm Gemfile.lock
bundle update
```
