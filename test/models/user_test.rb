require 'test_helper'

class UserTest < ActiveSupport::TestCase

  fixtures :users

  test "invalid with empty attributes" do
    user = User.new
    assert !user.valid? # Check to see if user.errors is not empty
    assert user.errors[:firstname].any?
    assert user.errors[:surname].any?
    assert user.errors[:grad_year].any?
    assert user.errors[:email].any?
  end

  test "grad_year date range between 1970 and this year" do
    user = User.new(:firstname => "Chris",
                    :surname => "Loftus",
                    :email => "cwl1@aber.ac.uk")
    # Do boundary checks
    user.grad_year = 1969
    assert !user.valid?
    # We could check the error message here as follows but I think this is
    # too volatile to test and also will vary (eventually) depending on locale
    # assert_equal "expected error message", user.errors.on(:grad_year)

    user.grad_year = 1970
    assert user.valid?

    user.grad_year = Time.now.year.to_i + 1
    assert !user.valid?

    user.grad_year = Time.now.year.to_i
    assert user.valid?
  end

  # Try writing some tests to check that the email is formatted correctly

  test "unique email" do
    user = User.new(firstname: "Chris",
                    surname: "Loftus",
                    grad_year: 1985,
                    email: users(:one).email)
    assert !user.valid?
  end
end
