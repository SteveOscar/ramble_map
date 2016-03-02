require 'test_helper'

class UserCanViewPppDataTest < ActionDispatch::IntegrationTest
  VCR.use_cassette('PPP_from_USA') do
    visit root_path

    assert_equal '/', current_path

    select('United States', :from => 'country')
    select('World', :from => 'region')
    select('Relatie Expense', :from => 'data_type')
    select('1 Year', :from => 'time')

    click_on "Submit"

    assert_equal display_map_path, current_path
    assert page.has_content?('currency: USD')
    assert page.has_content?('1 year')
  end
end
