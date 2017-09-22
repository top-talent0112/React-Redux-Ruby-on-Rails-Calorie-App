module V1
  class AuthsController < ApiController
    skip_before_action :authenticate_token!

    swagger_controller :users, "User Auth"

    swagger_api :sign_up do |api|
      summary "Sign up with username and password"
      param :form, :email,    :string, :required
      param :form, :password, :string, :required
      param :form, :name,    :string, :required
    end
    def sign_up
      skip_authorization
      params.require([:email, :password, :name])
      user = User.new(
        email:    params[:email],
        password: params[:password],
        name:     params[:name],
        role:     User.roles[:regular]
      )
      user.save!
      user_json = UserSerializer.new(user).as_json
      render_success({
        profile: user_json,
        token: JwtHelper.encode(user_json)
      })
    end

    swagger_api :sign_in do |api|
      summary "Sign in with username and password"
      param :form, :email,    :string, :required
      param :form, :password, :string, :required
    end
    def sign_in
      skip_authorization
      params.require([:email, :password])
      user = User.find_for_authentication(email: params[:email])
      if user.present? && user.valid_password?(params[:password])
        user_json = UserSerializer.new(user).as_json
        render_success({
          profile: user_json,
          token: JwtHelper.encode(user_json)
        })
      else
        render_error(:unauthorized, nil, "Invalid Email or Password")
      end
    end
  end
end