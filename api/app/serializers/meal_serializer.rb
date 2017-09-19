class MealSerializer < ActiveModel::Serializer
  attributes :id, :title, :time, :calories
  belongs_to :user
end