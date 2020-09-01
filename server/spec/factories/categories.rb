FactoryBot.define do
  factory :category do
    category { "MyString" }
    color { "MyString" }
  end
end

# == Schema Information
#
# Table name: categories
#
#  id         :bigint           not null, primary key
#  color      :string(255)
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
