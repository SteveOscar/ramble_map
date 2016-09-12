require 'json'
require 'csv'

class MapController < ApplicationController
  attr_reader :data_factory
  before_action :save_search_values, only: :ramble_map
  caches_page :welcome

  def welcome
    session[:tweeted] = false
    @countries = Country.all.order(:country_name).map{|u| [ u.country_name, u.id ] }
  end

  def ramble_map
    @data_factory = DataFactory.new(params)
    @map = params["region"]
    @country = Country.find(params["country"]).country_name
    generate_map_data
  end

  private

  def generate_map_data
    gon.country = @country
    gon.region = params["region"].gsub("-", "_")
    gon.relative_expenses = data_factory.relative_prices(params)
    gon.peace_index = data_factory.peace_index
    generate_currency_trends(data_factory.exchange_rates(params))
  end

  def generate_currency_trends(latest)
    base = Country.find(params["country"]).currency.code
    gon.percent_one_year = data_factory.compare_hourly_rates(1, base)
    gon.percent_two_years = data_factory.compare_hourly_rates(4, base)
    gon.percent_three_years = data_factory.compare_hourly_rates(8, base)
    # gon.percent_one_year = data_factory.compare_exchange_rates(latest, params, 3)
    # gon.percent_two_years = data_factory.compare_exchange_rates(latest, params, 3)
    # gon.percent_three_years = data_factory.compare_exchange_rates(latest, params, 3)
    gon.percent_max = gon.percent_two_years.sort_by{|k, v| -v.to_f}[3].last.to_i
    gon.percent_min = gon.percent_two_years.sort_by{|k, v| v.to_f}[3].last.to_i
    @stats = data_factory.stat_card_data(gon.percent_one_year, gon.relative_expenses)
    gon.conversion = {"Falkland Islands"=>"FKP", "Palestine"=>"ILS", "Portugal"=>"EUR", "Iran"=>"IRR", "Bahamas"=>"BSD", "Gambia"=>"GMD", "Sri Lanka"=>"LKR", "Bhutan"=>"BTN", "Belize"=>"BZD", "Chile"=>"CLP", "Brazil"=>"BRL", "Madagascar"=>"MGA", "Indonesia"=>"IDR", "Guinea"=>"GNF", "Brunei"=>"BND", "Namibia"=>"NAD", "India"=>"INR", "Guatemala"=>"GTQ", "Ireland"=>"EUR", "United Arab Emirates"=>"AED", "Mexico"=>"MXN", "North Korea"=>"KPW", "Cyprus"=>"EUR", "Malawi"=>"MWK", "Jamaica"=>"JMD", "Georgia"=>"GEL", "Mauritania"=>"MRO", "Belarus"=>"BYR", "Netherlands[L]"=>"EUR", "Moldova"=>"MDL", "Macedonia"=>"MKD", "Lebanon"=>"LBP", "Colombia"=>"COP", "Israel"=>"ILS", "Nicaragua"=>"NIO", "Libya"=>"LYD", "Spain"=>"EUR", "Iraq"=>"IQD", "Liberia"=>"LRD", "China"=>"CNY", "Mozambique"=>"MZN", "Cuba"=>"CUP", "Bangladesh"=>"BDT", "Morocco"=>"MAD", "Bolivia"=>"BOB", "Luxembourg"=>"EUR", "Cambodia"=>"KHR", "Zimbabwe"=>"BWP", "Bosnia and Herzegovina"=>"BAM", "Nigeria"=>"NGN", "Myanmar"=>"MMK", "Burundi"=>"BIF", "Azerbaijan"=>"AZN", "Botswana"=>"BWP", "Belgium"=>"EUR", "Slovakia"=>"EUR", "Croatia"=>"HRK", "Ghana"=>"GHS", "Malaysia"=>"MYR", "Bulgaria"=>"BGN", "Austria"=>"EUR", "Switzerland"=>"CHF", "Canada"=>"CAD", "Slovenia"=>"EUR", "Germany"=>"EUR", "Norway"=>"NOK", "Costa Rica"=>"CRC", "Italy"=>"EUR", "Lithuania"=>"EUR", "United Kingdom"=>"GBP", "Latvia"=>"EUR", "Laos"=>"LAK", "Mongolia"=>"MNT", "West Sahara"=>"MAD", "Somaliland"=>"SOS", "Democratic Republic of Congo"=>"CDF", "Niger"=>"XOF", "New Caledonia"=>"XPF", "Equatorial Guinea"=>"XAF", "Kazakhstan"=>"KZT", "South Africa"=>"ZAR", "South Sudan"=>"SDG", "Philippines"=>"PHP", "Fiji"=>"FJD", "Egypt"=>"EGP", "Côte d'Ivoire"=>"XOF", "Djibouti"=>"DJF", "Angola"=>"AOA", "Rwanda"=>"RWF", "Ecuador"=>"USD", "Jordan"=>"JOD", "Grenada"=>"XCD", "Chad"=>"XAF", "Venezuela"=>"VEF", "Panama"=>"USD", "Australia"=>"AUD", "Burkina Faso"=>"XOF", "Sudan"=>"SDG", "Oman"=>"OMR", "Haiti"=>"HTG", "Peru"=>"PEN", "Saudi Arabia"=>"SAR", "Yemen"=>"YER", "Romania"=>"RON", "Puerto Rico"=>"USD", "Senegal"=>"XOF", "Albania"=>"ALL", "Pakistan"=>"PKR", "Russia"=>"RUB", "Dominican Republic"=>"DOP", "Gabon"=>"XAF", "Kosovo"=>"EUR", "Benin"=>"XOF", "Central African Republic"=>"XAF", "Somalia"=>"SOS", "Afghanistan"=>"AFN", "Syria"=>"SYP", "Suriname"=>"SRD", "Paraguay"=>"PYG", "Congo"=>"XAF", "Vanuatu"=>"VUV", "Armenia"=>"AMD", "Guyana"=>"GYD", "Iceland"=>"ISK", "Denmark"=>"DKK", "New Zealand"=>"NZD", "Finland"=>"EUR", "Japan"=>"JPY", "Czech Republic"=>"CZK", "Poland"=>"PLN", "Hungary"=>"HUF", "Qatar"=>"QAR", "Kuwait"=>"KWD", "Estonia"=>"EUR", "South Korea"=>"KRW", "Uruguay"=>"UYU", "France"=>"EUR", "Serbia"=>"RSD", "Zambia"=>"ZMW", "Vietnam"=>"VND", "Papua New Guinea"=>"PGK", "Algeria"=>"DZD", "Uzbekistan"=>"UZS", "Honduras"=>"HNL", "Ethiopia"=>"ETB", "Guinea-Bissau"=>"XOF", "Kyrgyzstan"=>"KGS", "El Salvador"=>"USD", "Eritrea"=>"ERN", "Mali"=>"XOF", "Kenya"=>"KES", "Solomon Islands"=>"SBD", "Sweden"=>"SEK", "Taiwan"=>"TWD", "Montenegro"=>"EUR", "Sierra Leone"=>"SLL", "Argentina"=>"ARS", "Greece"=>"EUR", "Nepal"=>"NPR", "Lesotho"=>"LSL", "Tanzania"=>"TZS", "Togo"=>"XOF", "Tunisia"=>"TND", "United States"=>"USD", "Trinidad and Tobago"=>"TTD", "Swaziland"=>"SZL", "Turkmenistan"=>"TMT", "Tajikistan"=>"TJS", "Uganda"=>"UGX", "Thailand"=>"THB", "Cameroon"=>"XAF", "Turkey"=>"TRY", "Ukraine"=>"RUB"}
  end

  def save_search_values
    session[:country] = params["country"]
    session[:region] = params["region"]
  end

end
