# Admins
User.create!(email: "admin@calories.com", password: "password", name: "Administrator", role: User.roles[:admin])

# User Managers
User.create!(email: "pep@calories.com", password: "password", name: "Pep Guardiola", role: User.roles[:user_manager])
User.create!(email: "enrique@calories.com", password: "password", name: "Luis Enrique", role: User.roles[:user_manager])

# Users
User.create!(email: "messi@calories.com", password: "password", name: "Lionel Messi", role: User.roles[:regular])
User.create!(email: "suarez@calories.com", password: "password", name: "Luis Suarez", role: User.roles[:regular])
User.create!(email: "iniesta@calories.com", password: "password", name: "Andres Iniesta", role: User.roles[:regular])
User.create!(email: "bousquets@calories.com", password: "password", name: "Sergio Bousquets", role: User.roles[:regular])
User.create!(email: "pique@calories.com", password: "password", name: "Gerard Pique", role: User.roles[:regular])