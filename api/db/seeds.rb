def create_user(email, password, name, role)
  user = User.create!(
    email: email,
    password: password,
    name: name,
    role: role
  )
end
# Admins
create_user("admin1@calories.com", "password", "Administrator",User.roles[:admin])

# User Managers
create_user("manager1@calories.com", "password", "Pep Guardiola", User.roles[:user_manager])
create_user("manager2@calories.com", "password", "Luis Enrique", User.roles[:user_manager])

# Users
create_user("player1@calories.com", "password", "Lionel Messi", User.roles[:regular])
create_user("player2@calories.com", "password", "Luis Suarez", User.roles[:regular])
create_user("player3@calories.com", "password", "Andres Iniesta", User.roles[:regular])
create_user("player4@calories.com", "password", "Sergio Bousquets", User.roles[:regular])
create_user("player5@calories.com", "password", "Gerard Pique", User.roles[:regular])


def create_meal(user, title, time, calories)
  meal = Meal.create!(
    user: user,
    title: title,
    time: time,
    calories: calories
  )
end

i = 0
10.times {
  create_meal(User.find_by(email: "player1@calories.com"), "Breakfast", (Time.now.utc-i.days).change({hour:7, min:0, sec:0}), rand(50)+100)
  create_meal(User.find_by(email: "player1@calories.com"), "Lunch", (Time.now.utc-i.days).change({hour:13, min:0, sec:0}), rand(50)+100)
  create_meal(User.find_by(email: "player1@calories.com"), "Dinner", (Time.now.utc-i.days).change({hour:19, min:0, sec:0}), rand(50)+100)
  create_meal(User.find_by(email: "player2@calories.com"), "Breakfast", (Time.now.utc-i.days).change({hour:7, min:0, sec:0}), rand(50)+100)
  create_meal(User.find_by(email: "player2@calories.com"), "Lunch", (Time.now.utc-i.days).change({hour:13, min:0, sec:0}), rand(50)+100)
  create_meal(User.find_by(email: "player2@calories.com"), "Dinner", (Time.now.utc-i.days).change({hour:19, min:0, sec:0}), rand(50)+100)
  create_meal(User.find_by(email: "player3@calories.com"), "Breakfast", (Time.now.utc-i.days).change({hour:7, min:0, sec:0}), rand(50)+100)
  create_meal(User.find_by(email: "player3@calories.com"), "Lunch", (Time.now.utc-i.days).change({hour:13, min:0, sec:0}), rand(50)+100)
  create_meal(User.find_by(email: "player3@calories.com"), "Dinner", (Time.now.utc-i.days).change({hour:19, min:0, sec:0}), rand(50)+100)
  create_meal(User.find_by(email: "player4@calories.com"), "Breakfast", (Time.now.utc-i.days).change({hour:7, min:0, sec:0}), rand(50)+100)
  create_meal(User.find_by(email: "player4@calories.com"), "Lunch", (Time.now.utc-i.days).change({hour:13, min:0, sec:0}), rand(50)+100)
  create_meal(User.find_by(email: "player4@calories.com"), "Dinner", (Time.now.utc-i.days).change({hour:19, min:0, sec:0}), rand(50)+100)
  create_meal(User.find_by(email: "player5@calories.com"), "Breakfast", (Time.now.utc-i.days).change({hour:7, min:0, sec:0}), rand(50)+100)
  create_meal(User.find_by(email: "player5@calories.com"), "Lunch", (Time.now.utc-i.days).change({hour:13, min:0, sec:0}), rand(50)+100)
  create_meal(User.find_by(email: "player5@calories.com"), "Dinner", (Time.now.utc-i.days).change({hour:19, min:0, sec:0}), rand(50)+100)
  i = i + 1
}