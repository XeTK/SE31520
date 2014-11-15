class ExtensionFeed < ActiveRecord::Base

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
end

end