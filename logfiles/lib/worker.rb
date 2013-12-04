class Worker
  attr_reader :filename, :batch_size

  def initialize(filename='./data/haproxy1')
    raise "#{filename} does not exist" unless File.exist? filename
    @filename = filename
    @batch_size = 100
  end

  def batch
    @batch ||= reset_batch
  end

  def reset_batch
    @batch = IdentitySet.new
  end

  def commit_batch
    begin
      Maglev.persistent do
        puts "Adding #{batch.size}"
        LogLine.store.add_all batch
      end
      Maglev.commit_transaction

    rescue Maglev::CommitFailedException
      redo
    ensure
      #reset_batch
    end
  end

  def process_file
    reader = LogReader.new @filename

    reader.each_line do |line|
      batch << LogLine.new(line)
      #commit_batch if batch.size >= batch_size
    end

    commit_batch
  end
end
