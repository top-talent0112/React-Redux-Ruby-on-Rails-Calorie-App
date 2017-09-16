class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :rememberable, :trackable, :recoverable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :validatable

  enum role: {
    admin:        "admin",
    user_manager: "user_manager",
    regular:      "regular"
  }
end
