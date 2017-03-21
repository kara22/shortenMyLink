import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header";
import LinkCreate from"./components/link-create";
import {Links} from "../imports/collections/links";
import LinkList from "./components/link-list";


const App = () => {

  return(

    <div>
    <Header/>
    <LinkCreate/>
    <LinkList/>
    </div>

    );
};

Meteor.startup(()=> {
  ReactDOM.render(<App/>, document.querySelector(".render-target"));
});
