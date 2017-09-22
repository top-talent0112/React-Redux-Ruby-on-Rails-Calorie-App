module V1
  class UsersController < ApiController
    before_action :find_user, only: [:show, :update, :destroy]

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
        .per(params[:per_page] || 10)
      render_success(
        paginate_info: paginate_info(users),
        users: ActiveModel::Serializer::CollectionSerializer.new(users, serializer: UserSerializer)
      )
    end

    swagger_api :show do |api|
      summary "get a user"
      param :path, :id, :string, :required
    end
    def show
      authorize @user
      render_success(@user)
    end

    swagger_api :create do |api|
      summary "create a user"
      param :form, :email, :string, :required
      param :form, :password, :string, :required
      param :form, :name, :string, :required
      param :form, :calories, :integer, :optional
    end
    def create
      params.require([:email, :password, :name])
      user = User.new(
        email: params[:email],
        password: params[:password],
        name: params[:name],
        role: User.roles[:regular],
        calories: params[:calories]
      )
      authorize user
      user.save!
      render_success(user)
    end

    swagger_api :update do |api|
      summary "update a user"
      param :path, :id, :string, :required
      param :form, :email, :string, :optional
      param :form, :name, :string, :optional
      param :form, :calories, :integer, :optional
    end
    def update
      authorize @user
      @user.email = params[:email] if params[:email].present?
      @user.name = params[:name] if params[:name].present?
      @user.calories = params[:calories] if params[:calories].present?
      @user.save!
      render_success(@user)
    end

    swagger_api :destroy do |api|
      summary "destroy a user"
      param :path, :id, :string, :required
    end
    def destroy
      authorize @user
      @user.destroy
      render_success(@user)
    end

    private

    def find_user
      @user = User.find(params[:id])
    end
  end
end