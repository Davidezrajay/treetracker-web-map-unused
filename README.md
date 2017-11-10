# embed-map
a map that organizations using GreenStand/TreeTracker can embed in their own websites to show trees they are helping to plant

## Easy to setup
1. clone the repo
1. make your own local git branch
1. you'll need some simple server like [http-server](https://www.npmjs.com/package/http-server) from npm
    * `npm install -g http-server` or if that doesn't work try `sudo npm install -g http-server`
1. navigate to root directory in console/terminal and type `http-server`
1. you should be able to see the project in your browser at http://127.0.0.1:8080

## As it stands
This isn't ready for its intended purpose. I have a search box where you can type in the name of a place and the map should recenter on that place. Maybe you think that is nifty, maybe not. It is not really what we need though.

## What we have to do (just my thoughts)
* make this, or something similar work as an embedable map!
* we need an API endpoint(s) to separate out an organization's trees from all trees in the database.
* an easy way to implement a request to that endpoint, so that a non developer could do it.
* a greenstand Google maps API key.
* ?
