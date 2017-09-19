class Meal < ApplicationRecord
  belongs_to :user
  validates :user, presence: true
  validates :title, presence: true
  validates :time, presence: true
  validates :calories, numericality: { only_integer: true, greater_than: 0 }
end