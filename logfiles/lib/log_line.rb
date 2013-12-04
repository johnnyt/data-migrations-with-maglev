class LogLine
  def self.store
    @store ||= IdentitySet.new
  end

  def initialize(source)
    @source = source
  end
end
