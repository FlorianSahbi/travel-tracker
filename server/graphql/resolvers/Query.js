async function markers(parent, args, context) {
  return await context.prisma.markers();
}

module.exports = {
  markers,
}