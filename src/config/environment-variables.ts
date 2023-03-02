interface EnvVars {
  PORT?: number
}

const envVars: EnvVars = {
  PORT: (process.env.PORT != null) ? Number(process.env.PORT) : undefined
}

export default envVars
