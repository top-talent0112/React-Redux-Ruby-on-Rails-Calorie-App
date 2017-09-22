class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.present? && (user.admin? || user.user_manager?)
        scope.where(role: [User.roles[:regular], User.roles[:user_manager]])
      else
        scope.where(id: -1)
      end
    end
  end

  def index?
    user.admin? || user.user_manager?
  end

  def show?
    (user.admin? || user.user_manager?) && (record.role == User.roles[:regular])
  end

  def create?
    user.admin? || user.user_manager?
  end

  def update?
    (user.admin? || user.user_manager?) && (record.role == User.roles[:regular])
  end

  def destroy?
    (user.admin? || user.user_manager?) && (record.role == User.roles[:regular])
  end
end