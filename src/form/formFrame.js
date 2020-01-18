export function createForm(config, validation) {
  return {
    ...config,
    valid: !validation
  };
}
