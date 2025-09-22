export interface IsRootPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
