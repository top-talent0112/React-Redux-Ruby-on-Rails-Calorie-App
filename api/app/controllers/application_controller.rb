class ApplicationController < ActionController::API

  rescue_from ActionController::ParameterMissing, with: :render_parameter_missing_error
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def render_parameter_missing_error(exception)
    render_error(:bad_request, "parameter missing", [exception.to_s.split(":")[1].strip])
  end

  def render_unprocessable_entity_response(exception)
    render_error(:unprocessable_entity, "invalid record", exception.record.errors)
  end


  def render_success(response)
    render json: response
  end

  def render_error(status, error_type, error_content)
    render status: status, json: {error_type: error_type, error_content: error_content}
  end

end