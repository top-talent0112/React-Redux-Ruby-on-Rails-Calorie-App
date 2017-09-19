module V1
  class MealsController < ApiController
    before_action :find_meal, only: [:show, :update, :destroy]

    swagger_controller :meals, "Meal Management"

    swagger_api :index do |api|
      summary "list meals"
      param :query, :page, :integer, :optional
      param :query, :per_page, :integer, :optional
    end
    def index
      authorize Meal
      meals = policy_scope(Meal)
        .page(params[:page] || 1)
        .per(params[:per_page] || 20)
      render_success(
        paginate_info: paginate_info(meals),
        meals: ActiveModel::Serializer::CollectionSerializer.new(meals, serializer: MealSerializer)
      )
    end

    swagger_api :show do |api|
      summary "get a meal"
      param :path, :id, :string, :required
    end
    def show
      authorize @meal
      render_success(@meal)
    end

    swagger_api :create do |api|
      summary "create a meal"
      param :form, :user, :string, :optional
      param :form, :title, :string, :required
      param :form, :time, :integer, :required
      param :form, :calories, :integer, :required
    end
    def create
      authorize Meal
      if current_user.admin?
        params.require([:user, :title, :time, :calories])
      elsif current_user.regular?
        params.require([:title, :time, :calories])
      end
      meal = Meal.create!(
        user: current_user.admin? ? User.find(params[:user]) : current_user,
        title: params[:title],
        time: DateTime.strptime(Integer(params[:time]).to_s,"%s"),
        calories: params[:calories]
      )
      render_success(meal)
    rescue ArgumentError => e
      render_error(:bad_request, "invalid record", {"time": ["not a number"]})
    end

    swagger_api :update do |api|
      summary "update a meal"
      param :path, :id, :string, :required
      param :form, :title, :string, :optional
      param :form, :time, :integer, :optional
      param :form, :calories, :integer, :optional
    end
    def update
      authorize @meal
      @meal.title = params[:title] if params[:title].present?
      @meal.time = DateTime.strptime(Integer(params[:time]).to_s,"%s") if params[:time].present?
      @meal.calories = params[:calories] if params[:calories].present?
      @meal.save!
      render_success(@meal)
    rescue ArgumentError => e
      render_error(:bad_request, "invalid record", {"time": ["not a number"]})
    end

    swagger_api :destroy do |api|
      summary "destroy a meal"
      param :path, :id, :string, :required
    end
    def destroy
      authorize @meal
      @meal.destroy
      render_success(@meal.destroyed?)
    end

    private

    def find_meal
      @meal = Meal.find(params[:id])
    end
  end
end