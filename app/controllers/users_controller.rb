class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find_by(_id: BSON::ObjectId(params[:id]))
    render json: @user.as_document
  end

end
