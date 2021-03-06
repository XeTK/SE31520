class ExtensionFeed < ActiveRecord::Base
# This is the class attrabutes.
begin
	validates_presence_of :name, :email, :content

	def name=(value)
		write_attribute :name, (value ? value.humanize : nil)
	end

	def email=(value)
		write_attribute :email, (value ? value.humanize : nil)
	end

	def content=(value)
		write_attribute :content, (value ? value.humanize : nil)
	end

	def self.per_page
		8
	end
end

end