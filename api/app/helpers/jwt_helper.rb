module JwtHelper
  def self.encode(payload, remember = false)
    if remember
      expiration = 15.days.from_now.to_i
    else
      expiration = 24.hours.from_now.to_i
    end
    JWT.encode(payload.merge(exp: expiration), Rails.application.secrets.secret_key_base)
  end

  def self.decode(token)
    JWT.decode(token, Rails.application.secrets.secret_key_base, true, { :algorithm => 'HS256' }).first
  end
end