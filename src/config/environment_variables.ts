type EnvVars = {
  PORT?: number
}

const envVars: EnvVars = {
  PORT: !!process.env.PORT ? Number(process.env.PORT) : undefined
}

export default envVars
