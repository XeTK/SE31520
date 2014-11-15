class User < ActiveRecord::Base
  # Include all fields in this or related classes that may be searched
  @@search_columns = ["firstname", "surname", "grad_year", "phone", "email"]

  validates_presence_of :firstname, :surname, :grad_year, :email
  validates_numericality_of :grad_year,
                            greater_than_or_equal_to: 1970,
                            less_than_or_equal_to: Time.now.year.to_i
  validates_format_of :email,
                      with: /\A([\w\.\-\+]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i,
                      message: 'Bad email address format'
  validates_uniqueness_of :email

  has_one :image, dependent: :destroy
  has_one :user_detail, dependent: :destroy
  has_many :broadcasts
  accepts_nested_attributes_for :user_detail

  def firstname=(value)
    write_attribute :firstname, (value ? value.humanize : nil)
  end

  def surname=(value)
    write_attribute :surname, (value ? value.humanize : nil)
  end

  def self.per_page
    6
  end

  # Set of helper methods used by users controller

  def self.search_columns
    @@search_columns
  end

  def self.searchable_by(*column_names)
    @@search_columns = []
    [column_names].flatten.each do |name|
      @@search_columns << name
    end
  end

  def search(query, fields=nil, options={})
    with_scope find: {
        conditions: search_conditions(query, fields)} do
      find :all, options
    end
  end

  def self.search_conditions(query, fields=nil)
    return nil if query.blank?
    fields ||= @@search_columns

    # Split the query by commas as well as spaces, just in case
    words = query.split(",").map(&:split).flatten

    binds = {} # Query binding names for substitution to avoid SQL injection!
    or_frags = [] # OR fragments
    count = 1 # To help give bind symbols a unique name
    #cols = columns_hash() # All the column objects
    #puts "columns= #{cols}"

    words.each do |word|
      search_frags = [fields].flatten.map do |field|
        # If a string field then construct a LIKE frag
        # else if a numeric field then look for equality
        #puts "field= #{field}"
        #column = cols[field.to_s]
        #puts "column before = #{column}"
        #unless column.blank?
        #if column.text?
        "LOWER(#{field}) LIKE :word#{count}"
        #elsif column.
        #end
        #end
      end
      or_frags << "(#{search_frags.join(" OR ")})"
      binds["word#{count}".to_sym] = "%#{word.to_s.downcase}%"
      count += 1
    end
    puts "search conditions: #{[or_frags.join(" AND "), binds].to_s}"
    [or_frags.join(" AND "), binds]
  end
end
