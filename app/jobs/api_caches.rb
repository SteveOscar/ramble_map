class ApiCaches
  @queue = :sleep

  def self.perform(seconds)
    sleep(seconds)
  end
end
