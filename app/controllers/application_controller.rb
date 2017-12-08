class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, prepend: true
  before_action :authenticate_user!, except: :root

  def root
    redux_store("foo", props: { isAuthenticated: user_signed_in? })
  end
end
