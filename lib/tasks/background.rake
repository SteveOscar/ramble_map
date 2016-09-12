task :background => :environment do
  countries = [Country.find_by(country_name: 'Australia').id.to_s,
               Country.find_by(country_name: 'United States').id.to_s,
               Country.find_by(country_name: 'United Kingdom').id.to_s,
               Country.find_by(country_name: 'Brazil').id.to_s,
               Country.find_by(country_name: 'Russia').id.to_s,
               Country.find_by(country_name: 'Germany').id.to_s,
               Country.find_by(country_name: 'Switzerland').id.to_s,
               Country.find_by(country_name: 'Argentina').id.to_s,
               Country.find_by(country_name: 'China').id.to_s,
               Country.find_by(country_name: 'Japan').id.to_s
              ]

  countries.each do |code|
    df = ExchangeRateService.new({country: code})
    df.get_data
    # df.get_historical_data(1.year.ago.strftime('%Y-%m-%d'))
    # df.get_historical_data(2.years.ago.strftime('%Y-%m-%d'))
    # df.get_historical_data(3.years.ago.strftime('%Y-%m-%d'))
  end
  cutoff = Time.now.utc - 12.hours
  Historical.where("time < ?", cutoff).delete_all
end
