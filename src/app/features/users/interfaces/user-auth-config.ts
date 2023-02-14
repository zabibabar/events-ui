export abstract class UserAuthConfig {
  public abstract clientId: string
  public abstract domain: string
  public abstract scope?: string
  public abstract audience?: string
  public abstract redirectUri?: string
  public abstract logoutUri?: string
  public abstract useRefreshTokens?: boolean
  public abstract sessionCheckExpiryDays?: number
}
