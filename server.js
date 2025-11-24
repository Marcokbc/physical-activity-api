const Hapi = require("@hapi/hapi");
const { swaggerPlugin, swaggerDependencies } = require("./src/plugins/swagger")
const authRoutes = require("./src/routes/authRoute");
const exercisesRoutes = require("./src/routes/physicalActivitiesRoute");

async function start() {
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    host: process.env.HOST || "0.0.0.0",
    routes: {
      cors: { origin: ["*"] }
    }
  });

  await server.register([
    ...swaggerDependencies,
    swaggerPlugin
  ])

  server.route([...authRoutes, ...exercisesRoutes]);

  await server.start();
  console.log("Hapi API running on", server.info.uri);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});