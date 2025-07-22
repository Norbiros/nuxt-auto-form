export async function ensureDependencies(): Promise<boolean> {
  if (!await isPackageInstalled('zod')) {
    console.error('nuxt-auto-form requires \'zod\' package to be installed.')
    return false
  }

  const zodMajorVersion = await getPackageMajorVersion('zod')
  // Sometimes there is a weird issue with getting zod version, so we just ignore it
  if (zodMajorVersion && zodMajorVersion < 4) {
    console.error('nuxt-auto-form requires "zod" version >= 4 and found', zodMajorVersion)
    return false
  }

  const hasNuxtUI = await isPackageInstalled('@nuxt/ui')
  const hasNuxtUIPro = await isPackageInstalled('@nuxt/ui-pro')
  if (!hasNuxtUI && !hasNuxtUIPro) {
    console.error('nuxt-auto-form requires "@nuxt/ui" or "@nuxt/ui-pro" package to be installed.')
    return false
  }

  return true
}

async function isPackageInstalled(packageName: string) {
  try {
    await import(packageName)
    return true
  }
  catch {
    return false
  }
}

async function getPackageMajorVersion(packageName: string): Promise<number | null> {
  try {
    const pkg = await import(`${packageName}/package.json`)
    return Number.parseInt(pkg.version.split('.')[0])
  }
  catch {
    return null
  }
}
