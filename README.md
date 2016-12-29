# Umass EMS Website

## Website

The Umass EMS Website is a website for members of UMass EMS, and others to access information about UMass EMS. It displays information about shifts, staff, the organization, membership, and CPR classes. Shift data can be dynamically filtered by shift features to assist with shift selection. Shift informtion updates in real time. The back end of this website is hosted by [gomix](https://gomix.com/) and [redis labs](https://redislabs.com/), which gathers and caches data from a google sheet. Google sheet JSONP serving as used here is described in [this](https://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/) guide. In the event of failure to get data from the gomix backend the google sheet is used directly.

This website is built using:

* Angular
* SASS
* Babel
* Gulp
* Bower
* Marked

## Installing dependencies

Bower:

`bower install`

Node:

`npm install`

## Building

To build (with watch):

`gulp`

To build (without watch):

`gulp build`

To watch:

`gulp watch`

## Development Server

Build, run server, and watch:

`npm start`

To run just run development server:

`node server`
