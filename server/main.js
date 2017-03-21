import { Meteor } from 'meteor/meteor';
import {Links} from "../imports/collections/links";
import {WebApp} from "meteor/webapp";
import ConnectRoute from "connect-route";


Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('links', function (){
    return Links.find({});
  });
});

//localhost:3000/ NO MATCH
//localhost:3000/books/harry poter NO MATCH
//localhost:3000/abcd MATCH

//Executed whenever a user visits a route like
//localhost:3000/abcd

function onRoute(req, res, next) {

  // Take the token out of the urland try to find a
  // Matching  link in the Links collection

    const link = Links.findOne({token: req.params.token});




    if (link) {

    // If we find a link object, send the user to
    //the long link
      Links.update(link, {$inc: {clicks: 1}});
      res.writeHead(307, { 'Location': link.url});
      res.end();

    } else {

    // If we dont find a link object, send the user to
    //our normal react app
    next();

    }
}

const middleware = ConnectRoute(function(router) {
  router.get("/:token", onRoute );
});

WebApp.connectHandlers.use(middleware);
