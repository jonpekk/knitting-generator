class HomeController < ApplicationController
  def index
    render file: Rails.root.join('app', 'react', 'dist', 'index.html')
  end
end
