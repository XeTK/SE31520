require 'test_helper'

class BroadcastsControllerTest < ActionController::TestCase
  setup do
    @user = users(:one)
    @user_details = user_details(:one)
    @broadcast = broadcasts(:one)
    @request.session[:user_id] = @user.id
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:broadcasts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create broadcast" do
    assert_difference('Broadcast.count') do
      post :create, broadcast: { content: @broadcast.content, user_id: @broadcast.user_id }, feeds: ["twitter"] 
    end

    #assert_redirected_to 
    broadcast_path(assigns(:broadcast))
    assert_response :success
  end

  test "should show broadcast" do
    get :show, id: @broadcast
    assert_response :success
  end

  #test "should get edit" do
  #  get :edit, id: @broadcast
  #  assert_response :success
  #end

  #test "should update broadcast" do
  #  patch :update, id: @broadcast, broadcast: { content: @broadcast.content, user_id: @broadcast.user_id }
  #  assert_redirected_to broadcast_path(assigns(:broadcast))
  #end

  test "should destroy broadcast" do
    assert_difference('Broadcast.count', -1) do
      delete :destroy, id: @broadcast
    end

    assert_redirected_to broadcasts_path
  end
end
