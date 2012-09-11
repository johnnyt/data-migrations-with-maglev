require 'spec_helper'

describe Generate do

  describe '.random_gender' do
    it 'returns a random gender' do
      Generate::GENDERS.should include Generate.random_gender
    end
  end

end
