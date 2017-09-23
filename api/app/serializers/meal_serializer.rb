class MealSerializer < ActiveModel::Serializer
  attributes :id, :title, :date, :time, :calories
  belongs_to :user

  def date
    object.time.strftime("%Y-%m-%d")
  end

  def time
    object.time.strftime("%H:%M:%S")
  end
end