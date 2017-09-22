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