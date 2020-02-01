function location(parent, args, context) {
  return context.prisma.marker({ id: parent.id }).location()
}

module.exports = {
  location
}