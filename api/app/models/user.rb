class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :rememberable, :trackable, :recoverable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :validatable

  validates :name, presence: true
  validates :calories, numericality: { only_integer: true, greater_than: 0, :allow_nil => true }

  enum role: {
    admin:        "admin",
    user_manager: "user_manager",
    regular:      "regular"
  }
end
