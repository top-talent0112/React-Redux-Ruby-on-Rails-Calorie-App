class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.present? && (user.admin? || user.user_manager?)
        scope.all
      else
        scope.where(id: -1)
      end
    end
  end

  def index?
    user.admin? || user.user_manager?
  end
end