# RambleMap
## Interactive map for visualizing international trends.

Author: Steven Olson

Live Version: [http://www.ramblemap.com/](http://www.ramblemap.com/)

### Overview

This application, built in Ruby on Rails, is designed to allow users to explore world-wide patterns and trends for exchange rate, expenses, and other datasets. It was built with long-term travelers and expats in mind, people who are interested in getting a bird's-eye view of a region's financial situation.  

Internal datasets were built from World Bank and IEP data, while up-to-date and historical exchange rates are pulled from the OpenExchangeRates API. The mapping library is [http://jvectormap.com/](jVectorMap), which acts as a local JavaScript API. The Twitter API and Twitter-Omniauth allow for sign-in and tweeting of maps.

The application is deployed on Heroku with a Postgres database. Performance is increased through low and high-level caching, and a background rake task to fill the most popular API call caches nightly.

### Main Application Page

![Screenshot](http://i.imgur.com/I2rk42f.png)

### Dependencies

To run this application locally, you would need to obtain API keys from OpenExchangeRates and Twitter.

Gem dependencies can be found in the Gemfile.

### Setup

If you wish to download the project and set it up locally, run the following commands:

1. `git clone https://github.com/SteveOscar/ramble_map.git`
2. `bundle`
3. `bundle exec figaro install` - This sets up figaro on your local machine. You will need to obtain the keys mentioned in the above section and save them in your `application.yml` file.
4. `rake db:setup` to seed the db with countries and datasets

### Test Suite

The application is tested with Minitest, using [Capybara](https://github.com/jnicklas/capybara) for feature tests, and [VCR](https://github.com/vcr/vcr) for API call stubbing. [SimpleCov](https://github.com/colszowka/simplecov) is used to provide basic test coverage results.

The test suite can be run from the main directory of the project by running the command `rake test`. The project has test coverage at the following levels: model, service, controller, and integration.
