async function marker(parent, { latitude, longitude }, context, info) {
  return await context.prisma.createMarker({
    location: {
      create: {
        latitude, longitude
      }
    }
  })
}

module.exports = {
  marker
}