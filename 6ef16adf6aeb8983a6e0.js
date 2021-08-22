import "./css/normalize.css";
import "./css/style.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Unsplash, { toJson } from 'unsplash-js';
import App from './containers/app';
import reducer from './reducers/index';
import handelRawPhotoInfo from './functions/functions';
var initialState = {},
    photoArr = [];
var unsplash = new Unsplash({
  clientId: 'q5gJMmDYctWgCr4OywV-XxhZ_OrAVHak4VMyBstZLwI',
  accesskey: "q5gJMmDYctWgCr4OywV-XxhZ_OrAVHak4VMyBstZLwI",
  secret: "r7WQgWdzHWoLK-wFSDAhcbwAEpvpTWfiNctSoJLxCTM",
  callbackUrl: "https://inner-garden.netlify.app/auth"
});
var code = location.search.split('code=');

if (code) {
  unsplash.auth.userAuthentication(code).then(toJson).then(function (json) {
    unsplash.auth.setBearerToken(json.access_token);
    unsplash.search.photos('nature', length + 1, length + 11, 'latest').then(toJson).then(function (json) {
      photoArr = json.results;
      photoArr = photoArr.map(function (res) {
        return handelRawPhotoInfo(res);
      });
    });
  }).then(function () {
    unsplash.currentUser.profile().then(toJson).then(function (json) {
      initialState.user = {
        username: json.first_name + ' ' + json.last_name,
        userUrl: json.links.self + 'utm_source=inner_garden&utm_medium=referral'
      };
    });
  }).then(function () {
    initialState.unsplash = unsplash;
    initialState.photos = photoArr;
    initialState.currentPhoto = {};
  }).finally(function () {
    var store = createStore(reducer, initialState);
    ReactDOM.render( /*#__PURE__*/React.createElement(Provider, {
      store: store
    }, /*#__PURE__*/React.createElement(App, null)), document.querySelector('.root'));
  }).catch(function (err) {
    console.log(err);
  });
}