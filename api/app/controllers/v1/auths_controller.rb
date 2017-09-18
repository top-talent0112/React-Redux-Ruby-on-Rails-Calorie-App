module V1
  class AuthsController < ApiController
    swagger_controller :users, "User Auth"

    swagger_api :sign_up do |api|
      summary "Sign up with username and password"
      param :form, :email,    :string, :required
      param :form, :password, :string, :required
    end
    def sign_up
      params.require([:email, :password])
      user = User.new(
        email:    params[:email],
        password: params[:password],
        role:     User.roles[:regular]
      )
      user.save!
      user_json = UserSerializer.new(user).as_json
      user_json[:token] = JwtHelper.encode(user_json)
      render_success(user_json)
    end

    swagger_api :sign_in do |api|
      summary "Sign in with username and password"
      param :form, :email,    :string, :required
      param :form, :password, :string, :required
    end
    def sign_in
      params.require([:email, :password])
      user = User.find_for_authentication(email: params[:email])
      if user.present? && user.valid_password?(params[:password])
        user_json = UserSerializer.new(user).as_json
        user_json[:token] = JwtHelper.encode(user_json)
        render_success(user_json)
      else
        render_error(:unauthorized, nil, "Invalid Email or Password")
      end
    end
  end
end