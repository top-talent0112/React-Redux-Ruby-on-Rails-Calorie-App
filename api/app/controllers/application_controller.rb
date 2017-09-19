class ApplicationController < ActionController::API
  include Pundit

  attr_reader :current_user

  before_action :authenticate_token!

  after_action :verify_authorized
  after_action :verify_policy_scoped, only: [:index]

  rescue_from ActionController::ParameterMissing, with: :render_parameter_missing_error
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from Pundit::NotAuthorizedError, with: :render_pundit_error
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response


  def auth_token
    @auth_token = request.headers.fetch('Authorization', '')
  end

  def authenticate_token!
    payload = JwtHelper.decode(auth_token)
    @current_user = User.find(payload['id'])
  rescue ActiveRecord::RecordNotFound
    render_error(:unauthorized, nil, "Token is invalid")
  rescue JWT::ExpiredSignature
    render_error(:unauthorized, nil, "Token has been expired")
  rescue JWT::DecodeError
    render_error(:unauthorized, nil, "Token is invalid")
  end


  def render_parameter_missing_error(exception)
    render_error(:bad_request, "parameter missing", [exception.to_s.split(":")[1].strip])
  end

  def render_unprocessable_entity_response(exception)
    render_error(:unprocessable_entity, "invalid record", exception.record.errors)
  end

  def render_not_found_response(exception)
    render_error(:not_found, "record not found", nil)
  end


  def render_pundit_error
    render_error(:unauthorized, nil, "Not authorized to perform the action")
  end


  def render_success(response)
    render json: response
  end

  def render_error(status, error_type, error_content)
    render status: status, json: {error_type: error_type, error_content: error_content}
  end


  def paginate_info(collection)
    {
      per_page: collection.limit_value,
      current_page: collection.current_page,
      total_pages: collection.total_pages,
      count: collection.count,
      total_count: collection.total_count
    }
  end
end