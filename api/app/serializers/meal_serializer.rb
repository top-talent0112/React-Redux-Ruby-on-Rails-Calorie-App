class MealSerializer < ActiveModel::Serializer
  attributes :id, :title, :time, :calories
  belongs_to :user

  def time
    object.time.strftime("%Y-%m-%d %H:%M:%S")
  end
end