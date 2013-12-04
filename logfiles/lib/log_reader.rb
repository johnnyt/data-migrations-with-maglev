class LogReader
  attr_reader :filename

  def initialize(filename)
    raise "#{filename} does not exist" unless File.exist? filename
    @filename = filename
  end

  def each_line
    IO.foreach(filename){|l| yield l}
  end

  def lines
    @lines ||= begin
      lines = []
      each_line{|l| lines << l }
      lines
    end
  end
end
