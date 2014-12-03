require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  setup do
    @user = users(:one)
    @user_details = user_details(:one)
    @request.session[:user_id] = @user.id
  end

  test "should get index" do
    @request.env['HTTPS'] = nil
    get :index
    assert_response :success
    assert_not_nil assigns(:users)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create user" do
    assert_difference('User.count') do
      post :create, user: { email: @user.email + 's',
                            firstname: @user.firstname,
                            grad_year: @user.grad_year,
                            jobs: @user.jobs,
                            phone: @user.phone,
                            surname: @user.surname }
    end

    assert_redirected_to "#{user_path(assigns(:user))}?page=1"
  end

  test "should show user" do
    get :show, id: @user.id
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @user
    assert_response :success
  end

  test "should update user" do
    patch :update, id: @user.id, user: { id: @user.id, email: @user.email, firstname: @user.firstname, grad_year: @user.grad_year, jobs: @user.jobs, phone: @user.phone, surname: @user.surname }
    assert_redirected_to "#{user_path(assigns(:user))}?page=1"
  end

  test "should destroy user" do
    assert_difference('User.count', -1) do
      delete :destroy, id: @user
    end

    assert_redirected_to "#{users_path}?page=1"
  end
end
