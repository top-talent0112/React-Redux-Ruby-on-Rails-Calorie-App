module V1
  class UsersController < ApiController
    swagger_controller :users, "User Management"

    swagger_api :index do |api|
      summary "list users"
      param :query, :page, :integer, :optional
      param :query, :per_page, :integer, :optional
    end
    def index
      authorize User
      users = policy_scope(User)
        .page(params[:page] || 1)
        .per(params[:per_page] || 20)
      render_success(
        paginate_info: paginate_info(users),
        users: ActiveModel::Serializer::CollectionSerializer.new(users, serializer: UserSerializer)
      )
    end
  end
end