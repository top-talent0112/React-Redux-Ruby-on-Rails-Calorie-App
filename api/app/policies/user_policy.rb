class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.present? && (user.admin? || user.user_manager?)
        scope.where(role: [User.roles[:regular], User.roles[:user_manager]]).where.not(id: user.id)
      else
        scope.where(id: -1)
      end
    end
  end

  def index?
    user.admin? || user.user_manager?
  end

  def regulars?
    user.admin? || user.user_manager?
  end

  def show?
    user.admin? || user.user_manager?
  end

  def create?
    user.admin? || user.user_manager?
  end

  def update?
    user.admin? || user.user_manager?
  end

  def destroy?
    user.admin? || user.user_manager?
  end
end