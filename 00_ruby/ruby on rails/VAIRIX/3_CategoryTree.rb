# A category tree is a representation of a set of categories and their parent-child
# relationships. Each category has a unique name (no two categories have the
# same name). A category can have a parent category. Categories without a
# parent category are called root categories.
# To add a category to a category tree, the name and the parent of the category
# should be provided. When adding a root category, a nil value should be
# provided as the parent. A call to get children should return an array containing
# the direct children of the specified category in any order.
# ArgumentError should be thrown when adding a category that has already
# been added anywhere in the Category Tree or if a parent is specified but does
# not exist.

class CategoryTree
  def initialize
    @tree = {}
  end

  def add_category(category, parent)
    raise ArgumentError if @tree.key?(category) || (parent && !@tree.key?(parent))
    @tree[category] = parent
  end

  def get_children(category)
    @tree.select { |k, v| v == category }.keys
  end
end

c = CategoryTree.new
c.add_category('A', nil)
c.add_category('B', 'A')
c.add_category('C', 'A')
puts (c.get_children('A') || []).join(',') # => B,C

# ArgumentError is raised when needed
