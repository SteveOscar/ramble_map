require 'csv'

class Seed

  def initialize
    currency_codes
    country_data
    ppp_data
    peace_data
  end

  def currency_codes
    data = CSV.read("./public/currencies.csv")
    data.each do |code|
      Currency.create(code: code[0])
      puts "made currency code #{code[0]}"
    end
  end

  def country_data
    data = CSV.read("./public/currency_and_map.csv")
    data.each do |country|
      input = country.first.split("\t")
      Country.create(country_name: input[0],
                     map_code: input[2],
                     currency_id: Currency.find_by(code: input[1]).id)
      puts "created #{input[0]}"
    end
  end

  def ppp_data
    data = CSV.read("./public/PPP_data.csv")
    data.each do |row|
      country = Country.where("country_name LIKE ?", "%#{row.first}%").first
      if country
        country.update(ppp: row.last[0..5])
        puts "#{country.country_name} PPP is #{row.last}"
      end
    end
  end

  def peace_data
    data = CSV.read("./public/peace_index.csv")
    data.each do |row|
      country = Country.where("country_name LIKE ?", "%#{row.first}%").first
      if country
        country.update(peace_rank: row[1], peace_score: row[2])
        puts "#{country.country_name} peace score is #{row.last}"
      end
    end
  end

end

Seed.new
