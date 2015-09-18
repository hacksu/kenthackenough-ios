KentHackEnough iOS App 
===================


About
-------
KHE for iOS is built upon the [react](https://facebook.github.io/react/) and [react-native](https://facebook.github.io/react-native/) frameworks from Facebook.

> *note: our app is entirely react-native. Meaning there is no swift or obj-c code besides the included facebook library's and the app delegate files that load the main react native components.


Install
-------------



### <a class="anchor" name="requirements"></a>Requirements [#](#requirements)

1.  OS X - Only OS X is currently supported
2.  [Homebrew](http://brew.sh/) is the recommended way to install nvm, watchman, and flow.
*   Install [Node.js](https://nodejs.org/) 4.0 or newer.*   Install **nvm** with Homebrew or [its setup instructions here](https://github.com/creationix/nvm#installation). Then run `nvm install node && nvm alias default node`, which installs the latest version of Node.js and sets up your terminal so you can run it by typing `node`. With nvm you can install multiple versions of Node.js and easily switch between them.
    *   New to [npm](https://docs.npmjs.com/)?
4.  `brew install watchman`. We recommend installing [watchman](https://facebook.github.io/watchman/docs/install.html), otherwise you might hit a node file watching bug.
5.  `brew install flow`, if you want to use [flow](http://www.flowtype.org).

We recommend periodically running `brew update && brew upgrade` to keep your programs up-to-date.

[Xcode](https://developer.apple.com/xcode/downloads/) 6.3 or higher is required. It can be installed from the App Store.

[source](https://facebook.github.io/react-native/docs/getting-started.html#quick-start)

</div></div>


----------

###<a class="anchor" name="running">Running [#](#running)

 1.

    npm install -g react-native-cli


2.

 - Open (double click) in "/kenthackenough-ios/KHE/ios"

> KHE.xcodeproj


3.

Run Xcode project

> *note you should see a terminal window open and start building the jsx. If you don't you can manually go to the root of the directory and run npm start
