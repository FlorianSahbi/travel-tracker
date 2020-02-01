function newMarkerSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.marker({ mutation_in: ['CREATED'] }).node()
}

const newMarker = {
  subscribe: newMarkerSubscribe,
  resolve: payload => {
    return payload
  },
}

module.exports = {
  newMarker,
}