FactoryBot.define do
  factory :task do
    title { "MyString" }
    description { "MyText" }
    size { 1 }
    deadline { "2020-08-09" }
    category { "" }
  end
end
