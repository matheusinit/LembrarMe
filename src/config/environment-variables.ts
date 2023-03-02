interface EnvVars {
  PORT?: number
  HOST?: string
}

const envVars: EnvVars = {
  PORT: (process.env.PORT != null) ? Number(process.env.PORT) : undefined,
  HOST: process.env.HOST
}

export default envVars
