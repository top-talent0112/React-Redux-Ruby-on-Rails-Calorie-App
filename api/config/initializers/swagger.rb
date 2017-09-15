class Swagger::Docs::Config
  def self.transform_path(path, api_version)
    "apidocs/#{path}"
  end
end

Swagger::Docs::Config.base_api_controller = V1::ApiController

Swagger::Docs::Config.register_apis({
  '1.0' => {
    controller_base_path: '',
    api_file_path:        'public/apidocs',
    base_path:            ENV['HOST'],
    parent_controller:    V1::ApiController,
    clean_directory:      true
  }  
})