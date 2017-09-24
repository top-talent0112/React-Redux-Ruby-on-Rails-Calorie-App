class MealPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.present? && user.admin?
        scope.all
      elsif user.present? && user.regular?
        scope.where(user: user)
      else
        scope.where(id: -1)
      end
    end
  end

  def index?
    user.admin? || user.regular?
  end

  def calories_today?
    user.regular?
  end

  def show?
    user.admin? || (user.regular? && record.user == user)
  end

  def create?
    user.admin? || user.regular?
  end

  def update?
    user.admin? || (user.regular? && record.user == user)
  end

  def destroy?
    user.admin? || (user.regular? && record.user == user)
  end
end